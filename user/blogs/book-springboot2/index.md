---
title: (책) 스프링부트 핵심가이드 - Part 4,5
description: Part 4,5을 읽고 정리한 내용을 다루고 있습니다.
summary: Part 4. 스프링 부트 애플리케이션 개발하기, Part 5. API를 작성하는 다양한 방법
published: '2023-10-17T00:00:00.000+08:00'
updated: '2023-10-17T21:00:00.000+08:00'
tags:
  - [스프링부트 핵심가이드, springboot]
series_title: (북스터디) 스프링부트 핵심가이드
series_tag: '스프링부트 핵심가이드'
cover: https://image.yes24.com/goods/110142898/XL
---

> [스프링부트 핵심가이드](https://ridibooks.com/books/1160000073?_s=search&_q=%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8+%ED%95%B5%EC%8B%AC&_rdt_sid=search&_rdt_idx=0)을 읽고 정리한 내용입니다.
>
> 위 책의 Part 4, 5를 읽고 정리한 내용을 다루고 있습니다.

## Part 4. 스프링 부트 애플리케이션 개발하기

이 도서에서는 빌드 관리 도구로 `Maven`을 사용합니다.

**빌드 관리 도구?**

> 빌드 관리 도구는 JVM이나 WAS가 프로젝트를 인식하고 실행할 수 있게 우리가 작성한 소스코드와 프로젝트에
> 사용된 파일들(.xml, .jar, .properties)을 빌드하는 도구입니다. 빌드 관리 도구를 이용하면 라이브러리 간 의존성을 관리하고, 빌드 시점에 필요한 작업을 자동화할 수 있습니다.

## Part 5. API를 작성하는 다양한 방법

### GET API 만들기

#### @RequestMapping으로 구현하기

```java 
/// showLineNumber
/// title: code.java
@RestController
@RequestMapping("/api/v1/get-api")
public class GetController {
    
    // http://localhost:8080/api/v1/get-api/hello
    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String getHello() {
        return "Hello world";
    }
}
```

스프링 4.3 이후로는 `@RequestMapping` 대신 새로운 어노테이션을 사용합니다.
- `@GetMapping`
- `@PostMapping`
- `@PutMapping`
- `@DeleteMapping`

#### @PathVariable을 활용한 GET 메서드 구현

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/get-api/variable1/{variable}
@GetMapping(value = "/variable1/{variable}")
public String getVariable1(@PathVariable String variable) {
    return variable;
}
```

@PathVariable은 URL에 중괄호로 표시된 위치의 값을 받아 변수에 저장합니다.

값을 전달할 때 주로 사용하는 방법이며, GET 요청에서 많이 사용됩니다.

위 방식에서 주의할 점은, @GetMapping 어노테이션과 @Pathvariable에 지정된 변수의 이름을 동일하게 맞춰야 합니다.

만약 변수의 이름을 동일하게 맞추기 어려운 상황이라면 @PathVariable 어노테이션에 변수 이름을 지정해주면 됩니다.

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/get-api/variable1/{variable}
@GetMapping(value = "/variable1/{variable}")
public String getVariable2(@PathVariable("variable") String var) {
    return variable;
}
```

#### @RequestParam을 활용한 GET 메서드 구현

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/get-api/request1?name=value1&email=value2&organization=value3
@GetMapping(value = "/request1")
public String getRequestParam1(
  @RequestParam String name,
  @RequestParam String email,
  @RequestParam String organization
  ) {
    return name + " " + email + " " +organization;
  }
```

@RequestParam은 URL에 ? 뒤에 표시되는 파라미터를 받아 변수에 저장합니다.

> 쿼리스트링은 key=value 형태로 데이터를 전달하며, 이때 key는 변수명이고 value는 변수에 저장됩니다.
> 
> key를 기준으로 메서드의 매개변수에 이름을 매핑하면 값을 가져올 수 있습니다.

만약 쿼리스트링에 어떤 값이 들어올지 모른다면 `Map` 객체를 활용할 수도 있습니다.

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/get-api/request2?key1=value1&key2=value2
@GetMapping(value = "/request2")
public String getRequestParam2(@RequestParam Map<string, string> param) {
  StringBuilder sb = new StringBuilder();
  param.entrySet().forEach(map -> {
      sb.append(map.getKey() + " : " + map.getValue() + "\n");
    })
    return sb.toString();
  }
```

#### DTO 객체를 활용한 GET 메서드 구현

**DTO란?**

> DTO는 Data Transfer Object의 약자로, 다른 레이어 간의 데이터 교환에 활용됩니다. 간략하게 설명하자면
> 각 클래스 및 인터페이스를 호출하면서 전달하는 매개변수로 사용되는 데이터 객체입니다.


```java
/// showLineNumber
/// title: code.java
public class MemberDto {
    private String name;
    private String email;
    private String organization;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    @Override
    public String toString() {
        return "MemberDto{" +
          "name='" + name + '\'' +
          ", email='" + email + '\'' +
          ", organization='" + organization + '\'' +
          '}';
    }
}
```

DTO 클래스는 전달하고자 하는 필드 객체를 선언하고 getter/setter 메서드를 구현합니다. DTO 클래스에
선언된 필드는 컨트롤러의 메서드에서 쿼리 파라미터의 키와 매핑됩니다. 즉, 쿼리스트링의 키가 정해져 있지만
받아야 할 파라미터가 많을 경우에 DTO 클래스를 활용하면 편리합니다.

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/get-api/request3?name=value1&email=value2&organization=value3
@GetMapping(value = "/request3")
public String getRequestParam3(MemberDto memberDto) {
    return memberDto.toString();
}
```
### POST API 만들기

> POST API는 웹 애플리케이션을 통해 데이터베이스 등의 저장소에 리소스를 저장할 때 사용되는 API입니다.
> 
> POST API는 GET API와 달리 데이터를 HTTP 메시지 바디에 담아 전달해서 URI가 비교적 간단합니다.

#### @RequestMapping으로 구현하기

```java
/// showLineNumber
/// title: code.java
@RequestMapping(value = "/domain", method = RequestMethod.POST)
public String postExample() {
    return "POST API";
}
```

#### @RequestBody를 활용한 POST 메서드 구현

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/post-api/member
@PostMapping(value = "/member")
public String postMember(@RequestBody Map<String,Object> postData) {
    StringBuilder sb = new StringBuilder();
    
    postData.entrySet().forEach(map -> {
        sb.append(map.getKey() + " : " + map.getValue() + "\n");
    });
    
    return sb.toString();
}
```

위 예제는 Map객체를 이용했는데, Map은 어떤 값이 들어올지 특정하기 어려울 때 주로 사용합니다.

요청 메시지에 들어갈 값이 정해져 있다면 `DTO` 객체를 활용하는 것이 좋습니다.

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/post-api/member2
@PostMapping(value = "/member2")
public String postMember(@RequestBody MemberDto memberDto) {
    return memberDto.toString();
}
```

### PUT API 만들기

> PUT API는 웹 애플리케이션을 통해 데이터베이스 등의 저장소에 리소스를 수정할 때 사용되는 API입니다.

#### @RequestBody를 활용한 PUT 메서드 구현

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/put-api/member
@PutMapping(value = "/member")
public String putMember(@RequestBody Map<String,Object> putData) {
    StringBuilder sb = new StringBuilder();
    
    putData.entrySet().forEach(map -> {
        sb.append(map.getKey() + " : " + map.getValue() + "\n");
    });
    
    return sb.toString();
}
```

put도 똑같이 매개변수에 DTO를 활용할 수 있습니다.

> @RestController 어노테이션이 지정된 클래스는 @ResponseBody를 생략할 수 있는데, 
> 이 @ResponseBody는 자동으로 JSON과 같은 형식으로 변환해서 전달하는 역할을 수행합니다.

#### @ResponseEntity를 활용한 PUT 메서드 구현

스프링 프레임워크에는 `HttpEntity`라는 클래스가 있습니다. HttpEntity는 다음과 같이 
Header와 Body로 구성된 HTTP 요청과 응답을 구성하는 역할을 합니다.

```java
/// showLineNumber
/// title: code.java
public class HttpEntity<T> {
    private final HttpHeaders headers;
    
    @Nullable
    private final T body;
    
    // ...
}
```

`ResponseEntity`, `RequestEntity`는 HttpEntity를 상속받아 구현한 클래스입니다.

그중 `ResponseEntity`는 서버에 들어온 요청에 대해 응답 데이터를 구성해서 전달할 수 있게 합니다.

```java
/// showLineNumber
/// title: code.java
public class ResponseEntity<T> extends HttpEntity<T> {
    private final Object status;
    
    ...
}
```

이 클래스를 활용하면 응답 코드 변경은 물론 Header, Body를 더욱 쉽게 구성할 수 있습니다.

```java
/// showLineNumber
/// title: code.java
// http://localhost:8080/api/v1/put-api/member3
@PutMapping(value = "/member3")
public ResponseEntity<MemberDto> putMemberDto3(@RequestBody MemberDto memberDto) {
    return ResponseEntity
            .status(HttpStatus.ACCEPTED) // 202
            .body(memberDto);
}
```

### DELETE API 만들기

> DELETE API는 웹 애플리케이션 서버를 거쳐 데이터베이스 등의 저장소에 저장된 리소스를 삭제할 때 사용되는 API입니다.
> 
> 보통 GET API와 마찬가지로 URI에 데이터를 포함시켜 전달합니다.

코드 부분은 생략하겠습니다. GET API와 동일하게 구현하면 됩니다. (@DeleteMapping 이용)
