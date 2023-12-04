---
title: (책) 스프링부트 핵심가이드 - Part 10
description: Part 10을 읽고 정리한 내용을 다루고 있습니다.
summary: Part 10. 유효성 검사와 예외 처리
published: '2023-11-27T00:00:00.000+08:00'
updated: '2023-11-27T21:00:00.000+08:00'
tags:
  - [스프링부트 핵심가이드, springboot]
series_title: (북스터디) 스프링부트 핵심가이드
series_tag: '스프링부트 핵심가이드'
cover: https://image.yes24.com/goods/110142898/XL
---

> [스프링부트 핵심가이드](https://ridibooks.com/books/1160000073?_s=search&_q=%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8+%ED%95%B5%EC%8B%AC&_rdt_sid=search&_rdt_idx=0)을 읽고 정리한 내용입니다.
>
> 위 책의 Part 10을 읽고 정리한 내용을 다루고 있습니다.

# Part 10. 유효성 검사와 예외 처리

## 스프링 부트에서의 유효성 검사

```java title="build.gradle"
// spring-boot-starter-validation 의존성 추가
implementation 'org.springframework.boot:spring-boot-starter-validation'
```

유효성 검사는 각 계층으로 데이터가 넘어오는 시점에 해당 데이터에 대한 검사를 실시합니다. 보통 DTO 객체를 대상으로 검사를 실시합니다.

```java showLineNumbers title="ValidRequestDto.java"
// DTO 객체
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ValidRequestDto {
    
    @NotBlank
    String name;
    
    @Email
    String email;
    
    @Pattern(regexp = "01(?:0|1|[6-9])[.-]?\\d{3,4}[.-]?\\d{4}")
    String phoneNumber;
    
    @Min(value = 20)
    @Max(value = 40)
    int age;
    
    @Positive
    int count;
    
    @AssertTrue
    boolean booleanCheck;
}
```

```java showLineNumbers title="ValidController.java"
// Controller
@PostMapping("/valid")
public ResponseEntity<String> checkValidation(
  @Valid @RequestBody ValidRequestDto validRequestDto) {
    return ResponseEntity.ok("valid");
}
```

위 예제를 보면 각 필드에 어노테이션이 선언된 것을 볼 수 있습니다. 각 어노테이션은 유효성 검사를 위한 조건을 설정하는 데 사용됩니다.
그리고 DTO 객체에 `@Valid` 어노테이션을 선언하여 유효성 검사를 실시하도록 합니다.

### 대표적인 어노테이션

#### 문자열 검증

- `@Null` : null 값만 허용합니다.
- `@NotNull` : null 값은 허용하지 않습니다. "", " "은 허용합니다.
- `@NotEmpty` : null, ""을 허용하지 않습니다. " "은 허용합니다.
- `@NotBlank` : null, "", " "을 허용하지 않습니다.

#### 최댓값/최솟값 검증

- BigDecimal, BigInteger, int, long 등의 타입을 지원합니다.
- `@DemicalMax(value = "$numberString")` : 지정한 값보다 작은 값을 허용합니다.
- `@DemicalMin(value = "$numberString")` : 지정한 값보다 큰 값을 허용합니다.
- `@Max(value = "$number")` : 지정한 값 이하의 값을 허용합니다.
- `@Min(value = "$number")` : 지정한 값 이상의 값을 허용합니다.

#### 값의 범위 검증

- BigDecimal, BigInteger, int, long 등의 타입을 지원합니다.
- `@Positive` : 양수만 허용합니다.
- `@PositiveOrZero` : 양수와 0만 허용합니다.
- `@Negative` : 음수만 허용합니다.
- `@NegativeOrZero` : 음수와 0만 허용합니다.

#### 시간에 대한 검증

- Date, LocalDate, LocalDateTime, ZonedDateTime 등의 타입을 지원합니다.
- `@Future` : 현재보다 미래의 날짜를 허용합니다
- `@FutureOrPresent` : 현재를 포함한 미래의 날짜를 허용합니다.
- `@Past` : 현재보다 과거의 날짜를 허용합니다.
- `@PastOrPresent` : 현재를 포함한 과거의 날짜를 허용합니다.

#### 이메일 검증

- `@Email` : 이메일 형식을 검사합니다. ""는 허용합니다.

#### 자릿수 범위 검증

- BigDecimal, BigInteger, int, long 등의 타입을 지원합니다.
- `@Digits(integer = $number1, fraction = $number2)` : $number1의 정수 자릿수와 $number2의 소수 자릿수를 허용합니다.

#### Boolean 검증

- `@AssertTrue` : true 인지 체크합니다. null 값은 체크하지 않습니다.
- `@AssertFalse` : false 인지 체크합니다. null 값은 체크하지 않습니다.

#### 문자열 길이 검증

- `@Size(min = $number1, max = $number2)` : $number1 이상 $number2 이하의 길이를 허용합니다.

#### 정규식 검증

- `@Pattern(regexp = "$expresstion")` : 지정한 정규식을 허용합니다. java.util.regex.Pattern을 사용합니다.

### @Validataed 활용

앞에서 살펴본 `@Valid` 어노테이션은 자바에서 지원하는 어노테이션이며, 스프링도 `@Validated`라는 별도의 어노테이션으로 유효성 검사를 지원합니다.
`@Validated` 어노테이션은 `@Valid` 어노테이션의 기능을 포함하고 있기 때문에 `@Validated` 어노테이션만 선언해도 유효성 검사를 실시할 수 있습니다.
또한 `@Validated` 어노테이션은 유효성 검사를 그룹을 묶어 대상을 특정할 수 있는 기능이 있습니다.

```java
public interface ValidationGroup1 {
    
}

public interface ValidationGroup2 {
    
}
```

```java showLineNumbers title="ValidRequestDto.java"
// DTO 객체
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ValidRequestDto {
    
    @NotBlank
    String name;
    
    @Email
    String email;
    
    @Pattern(regexp = "01(?:0|1|[6-9])[.-]?\\d{3,4}[.-]?\\d{4}")
    String phoneNumber;
    
    @Min(value = 20, groups = ValidationGroup1.class) // ValidationGroup1 그룹에 속한 경우에만 검사
    @Max(value = 40 , groups = ValidationGroup1.class) // ValidationGroup1 그룹에 속한 경우에만 검사
    int age;
    
    @Positive(groups = ValidationGroup2.class) // ValidationGroup2 그룹에 속한 경우에만 검사
    int count;
    
    @AssertTrue
    boolean booleanCheck;
}
```

앞에서 본 DTO 객체에서 특정 부분에 `groups` 속성을 추가하였습니다. 이 속성은 유효성 검사를 그룹으로 묶어 대상을 특정할 수 있습니다.

```java showLineNumbers title="ValidController.java"
// @Validated 어노테이션만 선언 : groups가 설정되지 않은 필드에 대해 검사
@PostMapping("/validated")
public ResponseEntity<String> checkValidation(
  @Validated @RequestBody ValidRequestDto validRequestDto) {
    return ResponseEntity.ok("valid");
}

// @Validated 어노테이션에 그룹을 설정 : groups1이 설정된 필드에 대해 검사
@PostMapping("/validated/group1")
public ResponseEntity<String> checkValidationGroup1(
  @Validated(ValidationGroup1.class) @RequestBody ValidRequestDto validRequestDto) {
    return ResponseEntity.ok("valid");
}

// @Validated 어노테이션에 그룹을 설정 : groups1이 설정된 필드에 대해 검사

@PostMapping("/validated/group2")
public ResponseEntity<String> checkValidationGroup2(
  @Validated(ValidationGroup2.class) @RequestBody ValidRequestDto validRequestDto) {
    return ResponseEntity.ok("valid");
}

// @Validated 어노테이션에 그룹을 설정 : groups1, groups2가 설정된 필드에 대해 검사
@PostMapping("/validated/all-group")
public ResponseEntity<String> checkValidationAllGroup(
  @Validated({ValidationGroup1.class, ValidationGroup2.class}) @RequestBody ValidRequestDto validRequestDto) {
    return ResponseEntity.ok("valid");
}
```

`@Validated` 어노테이션은 `@Valid` 어노테이션과 마찬가지로 메소드의 파라미터에 선언할 수 있습니다.

이처럼 그룹을 지정해서 유효성 검사를 실시하는 경우에는 어떤 상황에 사용할지를 적절하게 설계해야 의도대로 유효성 검사를 실시할수 있습니다.
만약 이를 제대로 설계하지 않으면 비효율적이거나 생산적이지 못한 패턴을 의미하는 안티 패턴이 발생하게 됩니다.

### 커스텀 Validation 추가

실무에서는 유효성 검사를 실시할 때 자바 또는 스프링의 유효성 검사 어노테이션에서 제공하지 않는 기능을 써야 할 때도 있습니다.
이 경우 `ConstraintValidator`와 커스텀 어노테이션을 활용하여 커스텀 유효성 검사를 추가할 수 있습니다. 동일한 정규식을 계속 쓰는 @Pattern 어노테이션의 경우가 가장 흔한 사례입니다.

예시로 전화번호 형식이 일치하는지 확인하는 간단한 유효성 검사 어노테이션을 생성해 보겠습니다.

1. TelePhone 어노테이션을 생성합니다.

```java showLineNumbers title="TelePhone.java"
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {TelePhoneValidator.class})
public @interface TelePhone {
    
    String message() default "Invalid phone number";
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
}
```

2. ConstraintValidator 인터페이스를 구현하는 클래스를 생성합니다.

```java showLineNumbers title="TelePhoneValidator.java"
public class TelePhoneValidator implements ConstraintValidator<TelePhone, String> {
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }
        
        return value.matches("01(?:0|1|[6-9])[.-]?\\d{3,4}[.-]?\\d{4}");
    }
}
```

인터페이스를 선언할 때는 어떤 어노테이션 인터페이스인지 타입을 지정해야 합니다. 여기서는 `@TelePhone` 어노테이션을 사용하기 때문에 `@TelePhone, String`을 지정합니다.
`isValid` 메소드는 유효성 검사를 실시하는 메소드입니다. 여기서는 전화번호 형식에 맞는지를 검사하고 있습니다. (false가 리턴되면 MethodArgumentNotValidException 예외가 발생합니다.)

3. ValidatedRequestDto에 적용하기

```java showLineNumbers title="ValidatedRequestDto.java"
// DTO 객체

// ...
public class ValidatedRequestDto {
    
    // ...
    @TelePhone
    String phoneNumber;
    // ...
}
```

## 예외 처리

애플리케이션을 개발할 때는 불가피하게 많은 오류가 발생하게 됩니다. 자바에서는 이러한 오류는 try-catch, throws 구문을 활용해 처리합니다.
스프링부트에서는 더욱 편리하게 예외 처리를 할 수 있는 기능을 제공합니다.

### 예외와 에러

- `예외(Exception)` : 입력 값의 처리가 불가능하거나 참조된 값이 잘못된 경우 등 애플리케이션이 정상적으로 동작하지 못하는 상황.
  - 개발자가 직접 처리할 수 있는 것이므로 미리 코드 설계를 통해 처리할 수 있습니다.
- `에러(Error)` : 시스템에 뭔가 비정상적인 상황이 발생한 경우 (메모리 부족, 스택 오버플로우 등)
  - 개발자가 직접 처리할 수 없으므로 예외처리를 통해 처리할 수 없습니다.

#### 예외 클래스

![예외 클래스 구조](https://www.nextree.co.kr/content/images/2021/01/Exception-Class.png)

모든 예외 클래스는 Throwable 클래스를 상속받습니다. 이 클래스는 크게 `Checked Exception`과 `Unchecked Exception`으로 나뉩니다.

![Checked Exception과 Unchecked Exception](https://www.nextree.co.kr/content/images/2021/01/exception-table.png)

#### 예외 처리 방법

예외가 발생했을 때 이를 처리하는 방법은 크게 세 가지가 있습니다.

- 예외 복구
- 예외 처리 회피
- 예외 전환

##### 예외 복구

> 예외 상황을 파악해서 문제를 해결하는 방식 - try/catch

```java
int a =1;
String b = "a";

try {
    System.out.println(Integer.parseInt(b));
} catch (NumberFormatException e) {
    // 예외가 발생하면 이를 복구하기 위한 코드를 작성합니다.
    b = "2";
    System.out.println(a + Integer.parseInt(b));
}
```

##### 예외 처리 회피

> 예외가 발생한 시점에서 바로 처리하는 것이 아니라 호출한 곳으로 예외를 던져서 처리하도록 하는 방식 - throws

```java
int a =1;
String b = "a";

try {
    System.out.println(Integer.parseInt(b));
} catch (NumberFormatException e) {
    // 예외가 발생하면 호출부에 예외를 던집니다.
    throw new NumberFormatException("숫자가 아닙니다.");
}
```

##### 예외 전환

> 앞의 두 방식을 적잘하게 섞어서 사용하는 방식

예외가 발생하면 어떤 예외가 발생했느냐에 따라 호출부로 예외 내용을 전달하면서 좀 더 적합한 예외 타입으로 전달할 필요가 있습니다.
또는 애플리케이션에서 예외 처리를 좀 더 단순하게 하기 위해 래핑(wrapping)해야 하는 경우도 있습니다.

이런 경우에는 try/catch 방식을 사용하면서 catch 블록에서 throw 키워드를 사용해 다른 예외 타입으로 전달하면 됩니다.
이 방식은 앞으로 나올 커스텀 예외를 만드는 과정에서 사용되는 방식이므로 별도로 예제를 작성하지 않겠습니다.

### 스프링부트에서의 예외 처리

예외가 발생했을 때 클라이언트에 오류 메시지를 전달하려면 각 레이어에서 발생한 예외를 엔드포인트 레벨인 컨트롤러로 전달해야 합니다.
이렇게 전달받은 예외를 스프링부트에서 처리하는 방식으로 크게 두 가지가 있습니다.

- @(Rest)ControllerAdvice와 @ExceptionHandler를 통해 모든 컨트롤러의 예외 처리
- @ExceptionHandler를 통해 특정 컨트롤러의 예외 처리

#### @ControllerAdvice와 @ExceptionHandler를 통해 모든 컨트롤러의 예외 처리

```java showLineNumbers title="CustomeExceptionHandler.java"
@RestControllerAdvice
@Slf4j
public class CustomeExceptionHandler {
      
      @ExceptionHandler(value = RuntimeException.class)
      public ResponseEntity<Map<String,String>> handleException(RuntimeException e, HttpServletRequest request) {
          HttpHeaders requestHeaders = new HttpHeaders();
          HttpStatus status = HttpStatus.BAD_REQUEST;
          
          log.error("Advice 내 handleException 호출, (), {}", request.getRequestURI(), e.getMessage());
        
          Map<String,String> map = new HashMap<>();
          map.put("error type" , httpStatus.getReasonPhrase());
          map.put("code", "400");
          map.put("message", e.getMessage());

          return new ResponseEntity<>(map, responseHeaders, httpStatus);
      }
  }
```

위 코드를 통해 RuntimeException이 발생하면 해당 핸들러에서 포착돼서 처리되게 됩니다.

#### 커스텀 예외
  
커스텀 예외를 만들어서 사용하면 네이밍에 개발자의 의도를 담을 수 있기 때문에 이름만으로도 어느 정도 예외 상황을 짐작할 수 있습니다.
또한 애플리케이션에서 발생하는 예외를 개발자가 직접 관리하기가 수월해집니다. 표준 예외를 상속받은 커스텀 예외들을 개발자가 직접 코드로 관리하기 때문에
책임 소재를 애플리케이션 내부로 가져올 수 있습니다. 이를 통해 동일한 예외 상황이 발생한 경우 한 곳에서 처리하며 특정 상황에 맞는 예외 코드를 적용할 수 있게 됩니다.

##### 커스텀 예외 클래스 생성하기

이 부분은 제가 따로 사용했던 코드를 가져와서 설명하겠습니다.

```java showLineNumbers title="ErrorCode.java"
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에 문제가 발생했습니다."),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    // auth
    UNMATCHED_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    ALREADY_EXISTED_USER(HttpStatus.BAD_REQUEST, "이미 존재하는 유저입니다."),
    NOT_SUPPORTED_USER_TYPE(HttpStatus.BAD_REQUEST, "지원하지 않는 유저 타입입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),
    NOT_ACTIVATED_USER(HttpStatus.BAD_REQUEST, "활성화되지 않은 유저입니다."),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
    EMPTY_TOKEN(HttpStatus.NOT_FOUND, "토큰이 존재하지 않습니다."),

    // store
    ALREADY_EXISTED_STORE(HttpStatus.BAD_REQUEST, "이미 존재하는 상점입니다."),
    NOT_EXISTED_STORE(HttpStatus.NOT_FOUND, "존재하지 않는 상점입니다."),
    NOT_OWNER_STORE(HttpStatus.BAD_REQUEST, "상점의 소유자가 아닙니다."),

    // reservation
    NOT_EXISTED_RESERVATION(HttpStatus.NOT_FOUND, "존재하지 않는 예약입니다."),
    NOT_RESERVATION_OWNER(HttpStatus.BAD_REQUEST, "예약의 소유자가 아닙니다."),
    ALREADY_EXISTED_RESERVATION(HttpStatus.BAD_REQUEST, "이미 존재하는 예약입니다."),
    DONT_CHANGE_RESERVATION_STATUS(HttpStatus.BAD_REQUEST, "예약 상태를 변경할 수 없습니다."),
    NOT_ARRIVE_TIME(HttpStatus.BAD_REQUEST, "도착 시간이 아닙니다. 10분 전부터 진행할 수 있습니다."),

    // review
    CANNOT_WRITE_REVIEW(HttpStatus.BAD_REQUEST, "리뷰를 작성할 수 없습니다."),
    ALREADY_WRITTEN_REVIEW(HttpStatus.BAD_REQUEST, "이미 작성한 리뷰가 있습니다."),
    NOT_EXISTED_REVIEW(HttpStatus.NOT_FOUND, "존재하지 않는 리뷰입니다."),
    NOT_REVIEW_OWNER(HttpStatus.BAD_REQUEST, "리뷰의 소유자가 아닙니다.");

    private final HttpStatus status;
    private final String message;
}
```

우선 위 코드는 `ErrorCode`라는 enum 클래스입니다. enum 클래스는 상수를 정의하는 데 사용되며, 여기서는 예외 코드와 예외 메시지를 정의하고 있습니다.
이렇게 정의된 예외 코드는 `CustomException` 클래스에서 사용됩니다.

```java showLineNumbers title="CustomException.java"
import com.zb.type.ErrorCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
```

`CustomException` 클래스는 `RuntimeException`을 상속받고 있습니다. 이 클래스는 예외가 발생했을 때 예외 코드를 전달받아 예외 메시지를 설정하고 있습니다.

다음은 `CustomExceptionHandler` 에서 사용할 `ErrorResponse` 클래스입니다.

```java showLineNumbers title="ErrorResponse.java"
import com.zb.type.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorResponse {

    private ErrorCode errorCode;
    private String errorMessage;
}
```

`ErrorResponse` 클래스는 예외가 발생했을 때 클라이언트에 전달할 응답 객체입니다. 이 클래스는 `CustomExceptionHandler`에서 사용됩니다.

```java showLineNumbers title="CustomExceptionHandler.java"
package com.zb.exception;

import static com.zb.type.ErrorCode.INTERNAL_SERVER_ERROR;
import static com.zb.type.ErrorCode.INVALID_REQUEST;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(CustomException e) {
        log.error(e.getErrorCode() + " is occurred", e);

        ErrorResponse errorResponse = ErrorResponse.builder()
                                                   .errorCode(e.getErrorCode())
                                                   .errorMessage(e.getMessage())
                                                   .build();

        return ResponseEntity.status(e.getErrorCode().getStatus())
                             .body(errorResponse);
    }


    // Validation 에러
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getMessage() + " is occurred", e);

        List<String> errors = new ArrayList<>();
        e.getBindingResult().getAllErrors()
         .forEach(error -> errors.add(error.getDefaultMessage()));

        return ResponseEntity.status(BAD_REQUEST)
                             .body(errors);
    }

}
```

이 핸들러 코드에서 CustomException이 발생하면 `handleGlobalException` 메소드에서 처리하고 있습니다.
이렇게하면 예외가 발생했을 때 예외 코드와 예외 메시지를 클라이언트에 전달할 수 있습니다.
