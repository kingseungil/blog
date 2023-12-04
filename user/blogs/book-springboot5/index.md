---
title: (책) 스프링부트 핵심가이드 - Part 8 (1)
description: Part 8을 읽고 정리한 내용을 다루고 있습니다.
summary: Part 8. Spring Data JPA 활용
published: '2023-11-02T00:00:00.000+08:00'
updated: '2023-11-02T21:00:00.000+08:00'
tags:
  - [스프링부트 핵심가이드, springboot]
series_title: (북스터디) 스프링부트 핵심가이드
series_tag: '스프링부트 핵심가이드'
cover: https://image.yes24.com/goods/110142898/XL
---

> [스프링부트 핵심가이드](https://ridibooks.com/books/1160000073?_s=search&_q=%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8+%ED%95%B5%EC%8B%AC&_rdt_sid=search&_rdt_idx=0)을 읽고 정리한 내용입니다.
>
> 위 책의 Part 8를 읽고 정리한 내용을 다루고 있습니다.

# Part 8. Spring Data JPA 활용

## JPQL

> `JPQL (JPA Query Language)`
>
> JPQL은 JPA에서 사용할 수 있는 쿼리를 의미합니다. JPQL 문법은 SQL과 매우 비슷해서 데이터베이스 쿼리에
> 익숙한 분들이라면 어렵지 않게 사용할 수 있습니다.
>
> SQL과 차이점은 SQL에서는 테이블이나 칼럼의 이름을 사용하는 것과 달리 JPQL은 엔티티 객체를 대상으로
> 수행하는 쿼리이기 때문에 매핑된 엔티티의 이름과 필드의 이름을 사용한다는 것입니다.

## 쿼리 메서드 살펴보기

```java
// (리턴타입) + {주제 + 서술어(속성)} 
List<Person> findByLastnameAndEmail(String lastname, String email);
```

쿼리메서드는 크게 동작을 결정하는 주제(Subject)와 서술어(Predicate)로 구분합니다.
`find...By` , `exists...By`와 같은 키워드로 쿼리의 주제를 정하며 `By`는 서술어의 시작을 나타내는 구분자 역할입니다.

서술어 부분은 검색 및 정렬 조건을 지정하는 영역입니다. 기본적으로 엔티티의 속성으로 정의할 수 있고, AND, OR로 확장하는 것도 가능합니다.

### 쿼리 메서드의 주제 키워드

#### exists...By

특정 데이터가 존재하는지 확인하는 키워드입니다. 리턴 타입으로는 boolean을 사용합니다.

```java
boolean existsByNumber(Long number);
```

#### count...By

조회 쿼리를 수행한 후 쿼리 결과로 나온 레코드의 개수를 리턴합니다.

```java
long countByName(String name);
```

#### delete...By, remove...By

삭제 쿼리를 수행합니다. 리턴 타입이 없거나 삭제한 횟수를 리턴합니다.

```java
void deleteByName(String name);
long removeByName(String name);
```

#### ...First(Number), ...Top(Number)

쿼리를 통해 조회된 결괏값의 개수를 제한하는 키워드입니다. 두 키워드는 동일한 동작을 수행하며, 주제와 By 사이에 위치합니다.
일반적으로 이 키워드는 한 번의 동작으로 여러 건을 조회할 때 사용되며, 단 건으로 조회하기 위해서는 `(Number)`를 생략하면 됩니다.

```java
List<Product> findFirst5ByName(String name); // 5건 조회
List<Product> findTop100ByName(String name); // 100건 조회
Product findFirstByName(String name); // 단건 조회
```

### 쿼리 메서드의 조건자 키워드

#### Is, Equals

값의 일치를 조건으로 사용하는 키워드입니다. `Is`는 생략 가능하며 `Equals`로 대체할 수 있습니다.

```java
Product findByNumberIs(Long number);
Product findByNumberEquals(Long number);
Product findByNumber(Long number);
```

#### (Is)Not

값의 불일치를 조건으로 사용하는 키워드입니다. `Is`는 생략 가능하며 `Not`으로 대체할 수 있습니다.

```java
Product findByNumberIsNot(Long number);
Product findByNumberNot(Long number);
```

#### (Is)Null, (Is)NotNull

값이 null인지 검사하는 키워드입니다. `Is`는 생략 가능하며 `Null`로 대체할 수 있습니다.

```java
Product findByNumberIsNull();
Product findByNumberIsNotNull();
```

#### (Is)True, (Is)False

값이 true인지 검사하는 키워드입니다. `Is`는 생략 가능하며 `True`로 대체할 수 있습니다.

```java
Product findByNumberIsTrue();
Product findByNumberTrue();
```

#### And, Or

여러 조건을 묶을 때 사용합니다

```java
Product findByNumberAndName(Long number, String name);
Product findByNumberOrName(Long number, String name);
```

#### (Is)GreaterThan, (Is)LessThan, (Is)Between

값의 크기를 비교하는 키워드입니다.

```java
Product findByNumberGreaterThan(Long number); // number > ?
Product findByNumberGreaterThanEqual(Long number); // number >= ?
Product findByNumberBetween(Long number1, Long number2); // number1 <= ? AND number2 >= ?
```

#### StartingWite, EndingWith, Containing, Like

문자열의 시작, 끝, 포함 여부를 검사하는 키워드입니다. `StartingWith`는 `LIKE '문자열%'`, `EndingWith`는 `LIKE '%문자열'`, `Containing`은 `LIKE '%문자열%'`과 같은 동작을 수행합니다.
`Like` 키워드는 코드 수준에서 메서드를 호출하면서 전달하는 값에 `%`를 포함시켜야 합니다.

```java
Product findByNameStartingWith(String name); // name LIKE 'name%'
Product findByNameEndingWith(String name); // name LIKE '%name'
Product findByNameContaining(String name); // name LIKE '%name%'
Product findByNameLike(String name); // name LIKE '%name%'
```

### 페이징 처리

> `페이징`: 데이터베이스의 레코드를 개수로 나눠 페이지를 구분하는 것을 의미합니다.

JPA에서는 이 같은 페이징 처리를 위해 `Page`, `Pageable` 인터페이스를 제공합니다.

```java
Page<Product> findByName(String name, Pageable pageable);
```

위와 같이 리턴 타입으로 `Page`를 사용하면 페이징 처리가 가능합니다. 
`Pageable` 인터페이스는 페이징 처리에 필요한 정보를 담고 있습니다.

서비스단에서 페이징 처리를 위해 `Pageable` 인터페이스를 구현한 `PageRequest` 객체를 생성해야 합니다.

(PageRequest는 Pageable 인터페이스의 구현체입니다.)

```java
PageRequest pageRequest = PageRequest.of(0, 10); // 0번째 페이지, 10개씩 조회
Page<Product> products = productRepository.findByName("name", pageRequest);
```

- `of(int page, int size)` : 데이터를 정렬하지 않습니다.
- `of(int page, int size, Sort sort)` : sort에 의해 정렬합니다.
- `of(int page, int size, Direction direction, String... properties)` : Sort.by(direction, properties)에 의해 정렬합니다.