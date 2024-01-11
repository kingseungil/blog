---
title: Springboot Async 적용하기
description: Springboot Async 적용하기
summary: 이메일 인증 등의 비동기 작업을 처리하기 위해 Springboot Async를 적용해보자.
published: 2024-01-11T00:00:40.765Z
updated: 2024-01-11T00:00:40.765Z
cover: ""
tags:
  - [Springboot, Async, JavaMailSender]
series_title: Async
series_tag: 'Springboot'
---

# 서론

회원가입 시 이메일로 인증코드를 보내는 기능을 구현했는데, 이메일 전송에 시간이 걸려서 회원가입이 느려지는 문제가 발생했다.

이를 해결하기 위해 `Springboot Async`를 적용하고자 한다.

# Springboot Async

스프링부트에서 비동기 작업을 처리하기 위해 `@Async` 어노테이션을 제공한다.

`@Async` 어노테이션을 사용하면 Main Thread가 아니라 Sub Thread에 Task를 할당하여 비동기 작업을 처리할 수 있다.

## 설정

`@EnableAsync` 어노테이션을 사용하여 비동기 작업을 사용할 수 있도록 설정한다.

```java
@EnableAsync
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

위 코드처럼 application 클래스에 `@EnableAsync` 어노테이션을 추가해도 되고, 별도의 설정 클래스를 만들어서 `@EnableAsync` 어노테이션을 추가해도 된다.

```java
@EnableAsync
@Configuration
public class AsyncConfig {

    @Bean(name = "mailSenderExecutor", destroyMethod = "shutdown")
    public ThreadPoolTaskExecutor mailSenderExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(30);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix("mailSenderExecutor-");
        executor.initialize();
        return executor;
    }
}
```

위 AsyncConfig 클래스를 살펴보자.

> __executor.setCorePoolSize(5)__
>  - `Core Pool Size` : 기본적으로 생성되어 있는 Thread의 개수를 의미한다. 기본값은 1이다.
>
> __executor.setMaxPoolSize(30)__
>  - `Max Pool Size` : 최대 Thread의 개수를 의미한다. 기본값은 `Integer.MAX_VALUE`이다.
>
> __executor.setQueueCapacity(10)__
>  - `Queue Capacity` : `Core Pool Size`를 넘어서는 요청이 들어오면 Queue에 저장한다. 기본값은 `Integer.MAX_VALUE`이다.
>
> __executor.setThreadNamePrefix("mailSenderExecutor-")__
>  - `Thread Name Prefix` : Thread의 이름을 지정한다. 기본값은 `SimpleAsyncTaskExecutor-`이다.

## 사용

`@Async` 어노테이션을 사용하여 비동기 작업을 처리할 메서드를 지정한다.

```java
/// title: JavaMailServiceImpl.java
/// hlLines: 3,17,22
    @Override
    @Async("mailSenderExecutor")
    public CompletableFuture<String> sendVerificationCode(String email) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        String verificationCode = generateVerificationCode();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            helper.setTo(email);
            helper.setSubject(EMAIL_SUBJECT);
            helper.setText("인증 코드 : " + verificationCode);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new MailException(MAIL_SEND_ERROR);
        }
        log.info("Sent a verification code: {} to {}", verificationCode, email);

        return CompletableFuture.completedFuture(verificationCode);
    }

    @Override
    @Async("mailSenderExecutor")
    public void sendTemporaryPassword(String email, String password) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            helper.setTo(email);
            helper.setSubject(EMAIL_SUBJECT);
            helper.setText("임시 비밀번호 : " + password);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new MailException(MAIL_SEND_ERROR);
        }
        log.info("Sent a temporary password: {} to {}", password, email);
    }
```

위 코드처럼 `@Async` 어노테이션을 사용하여 비동기 작업을 처리할 메서드를 지정한다.

`sendVerificationCode` 메서드는 반환값을 가지고 있는데, `CompletableFuture`를 사용하여 비동기 작업의 결과를 반환할 수 있다.

두번째 메서드 `sendTemporaryPassword`는 반환값이 없는 메서드이다. 이런 경우에는 `void`를 반환하면 된다.

이제 `sendVerificationCode` 메서드를 호출하는 코드를 살펴보자.

```java
/// title: MemberService.java
/// hlLines: 18-20
public SignUpResponse saveMember(SignUpRequest signUpRequest, MultipartFile profileImage) {
        validateDuplicateEmail(signUpRequest.email());
        validateDuplicateNickname(signUpRequest.nickname());

        Region region = getRegion(signUpRequest.region());
        String password = passwordEncoder.encode(signUpRequest.password());
        String imageUrl = s3Service.uploadAndGetImageURL(profileImage, S3Directory.MEMBER);
        Member member = Member.builder()
                              .email(signUpRequest.email())
                              .nickname(signUpRequest.nickname())
                              .password(password)
                              .profileImage(imageUrl)
                              .role(ROLE_USER)
                              .region(region)
                              .build();
        memberRepository.save(member);

        CompletableFuture<String> code = mailService.sendVerificationCode(member.getEmail());
        code.thenAcceptAsync(
          verificationCode -> saveEmailVerification(verificationCode, member)); // 비동기 처리해서 코드를 받아오면 저장

        return SignUpResponse.from(member.getId(), member.getEmail());
    }
```

`sendVerificationCode` 메서드를 호출하면 `CompletableFuture` 객체를 반환한다.

`CompletableFuture` 객체는 비동기 작업의 결과를 가지고 있으므로, `thenAcceptAsync` 메서드를 사용하여 비동기 작업의 결과를 받아올 수 있다.

`thenAcceptAsync` 메서드는 `CompletableFuture` 객체의 비동기 작업이 완료되면 실행된다. 이때, `verificationCode`를 인자로 받아서 `saveEmailVerification` 메서드를 실행한다.

기존에는 `sendVerificationCode` 메서드를 호출하면 `verificationCode`를 반환하도록 구현했었다. 이메일을 보내는 작업이 동기적으로 처리돼서 회원가입 요청이 이메일을 보내는 작업이 끝날 때까지 대기해야 했다.

그러다 보니 시간이 약 __4,5초__ 정도 걸렸는데 이를 비동기적으로 처리하니 __4~500ms__ 정도 걸리는 것을 확인할 수 있었다.