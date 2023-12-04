---
title: Spring Transaction
description: Spring Transaction에 대해 알아봅니다.
summary: Spring Transaction
published: '2023-10-21T00:00:00.000+08:00'
updated: '2023-10-21T21:00:00.000+08:00'
tags:
  - [spring, transaction]
cover: https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/bkFM/image/P7TmdIvrj8vGorCzoHl5UnKzN74.jpg
---

## Spring Transaction

`@Transactional`

> 스프링에서 제공하는 어노테이션으로, 메소드나 클래스에 적용할 수 있습니다.
> 
> 이 어노테이션은 프록시 객체를 생성하여 트랜잭션을 관리합니다. (PlatformTransactionManager)
> 
> import org.springframework.transaction.annotation.Transactional; 을 사용해야 합니다.
> 
> javax.transaction.Transactional 은 옵션 설정이 불가능합니다.

### 세부설정

#### Isolation (격리수준)

> 트랜잭션 격리수준은 트랜잭션에서 일관성 없는 데이터를 허용하도록 하는 수준을 말합니다.

- `DEFAULT` : DB의 기본 격리수준을 따릅니다.
- `READ_UNCOMMITTED` : 커밋되지 않은 데이터에 대한 읽기를 허용합니다.
  - Dirty Read 발생 (커밋되지 않은 데이터를 읽을 수 있음)
- `READ_COMMITTED` : 커밋된 데이터만 읽기를 허용합니다.
  - Dirty Read 방지
- `REPEATABLE_READ` : 트랜잭션 내에서 SELECT 시 같은 데이터를 읽어도 항상 같은 데이터가 조회됩니다.
  - Non-Repeatable Read 발생 (같은 데이터를 읽었는데 다른 데이터가 조회됨)
- `SERIALIZABLE` : 트랜잭션 내에서 SELECT 시 같은 데이터를 읽어도 항상 같은 데이터가 조회되며, 트랜잭션이 완료될 때까지 다른 트랜잭션에서는 해당 데이터에 대한 변경이 불가능합니다.
  - Phantom Read 발생 (같은 데이터를 읽었는데 다른 데이터가 조회됨)

```java
@Transactional(isolation = Isolation.DEFAULT)
```

#### Propagation (전파수준)

> 트랜잭션 동작 도중 다른 트랜잭션을 호출할 경우, 어떻게 동작할지를 결정하는 수준을 말합니다.

- `REQUIRED` : 부모 트랜잭션이 존재하면 해당 트랜잭션을 사용하고, 없으면 새로운 트랜잭션을 생성합니다. (기본값)
- `SUPPORTS` : 부모 트랜잭션이 존재하면 해당 트랜잭션을 사용하고, 없으면 트랜잭션 없이 진행합니다.
- `REQUIRES_NEW` : 부모 트랜잭션이 존재하더라도 새로운 트랜잭션을 생성합니다.
- `NESTED` : 부모 트랜잭션이 존재하면 중첩된 트랜잭션을 생성합니다. (부모 트랜잭션 안에 있는 트랜잭션)
  - 예시) 일기 작성 관련해서 로그를 DB에 저장하는 상황
  - 1. 로그 저장(중첩된 트랜잭션)이 실패한다해도 일기 작성(부모 트랜잭션)은 성공해야 함
  - 2. 일기 작성(부모 트랜잭션)이 실패한다면 로그 저장(중첩된 트랜잭션)까지 롤백되어야 함

```java
@Transactional(propagation = Propagation.REQUIRED)
```

#### ReadOnly 속성

> 트랜잭션 동작 도중 데이터를 변경하지 않는다면, 해당 트랜잭션을 읽기 전용으로 설정할 수 있습니다.

- `readOnly = true` : 트랜잭션 동작 도중 데이터를 변경하지 않습니다.
- `readOnly = false` : 트랜잭션 동작 도중 데이터를 변경합니다. (기본값)

```java
@Transactional(readOnly = true)
```

#### 트랜잭션 롤백 예외

> 트랜잭션 동작 도중 특정 예외가 발생하면 트랜잭션을 롤백할 수 있습니다.
>
> Defalut : RuntimeException , Error

```java
@Transactional(rollbackFor = {Exception.class}) // Exception 예외가 발생하면 트랜잭션을 롤백합니다.
@Transactional(noRollbackFor = {Exception.class}) // Exception 예외가 발생해도 트랜잭션을 롤백하지 않습니다.
```

#### timeout 속성

> 트랜잭션 동작 도중 특정 시간이 초과되면 트랜잭션을 롤백할 수 있습니다.
>
> Default : -1 (무제한)

```java
@Transactional(timeout = 10) // 10초가 초과되면 트랜잭션을 롤백합니다.
```
