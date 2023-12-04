---
title: (책) 스프링부트 핵심가이드 - Part 8 (2)
description: Part 8을 읽고 정리한 내용을 다루고 있습니다.
summary: Part 8. Spring Data JPA 활용
published: '2023-11-07T00:00:00.000+08:00'
updated: '2023-11-07T21:00:00.000+08:00'
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

## @Query 어노테이션 사용하기

`@Query` 어노테이션을 사용하면 메서드에 직접 JPQL의 쿼리를 정의할 수 있습니다.

```java 
/// showLineNumber
/// title: UserRepository.java
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.name = ?1")
    List<User> findByName(String name);
}
```

위와 같이 메서드에 `@Query` 어노테이션을 사용하면 메서드에 정의한 쿼리가 실행됩니다.

`@Query` 어노테이션을 사용할 때 주의할 점은 메서드의 파라미터를 쿼리에 바인딩할 때 `?1`, `?2`와 같이 위치 기반으로 바인딩해야 합니다.

`@Param` 어노테이션을 사용하면 파라미터의 이름을 쿼리에 바인딩할 수 있습니다.

```java
@Query("SELECT u FROM User u WHERE u.name = :name")
List<User> findByName(@Param("name") String name);
```

## QueryDSL 적용하기

앞에서는 `@Query` 어노테이션을 사용하여 직접 JPQL의 쿼리를 작성하는 방법을 알아봤습니다.
메서드의 이름을 기반으로 생성하는 JPQL의 한계는 `@Query` 어노테이션을 통해 대부분 해소할 수 있지만,
직접 문자열을 입력하기 때문에 컴파일 시점에 에러를 잡지 못하고 런타임 에러가 발생할 수 있습니다.

이 같은 문제를 해결하기 위해 사용되는 것이 `QueryDSL`입니다. `QueryDSL`은 JPQL을 자바 코드로 작성할 수 있도록 도와주는 라이브러리입니다.

### QueryDSL이란?

`QueryDSL`은 정적 타입을 이용해 SQL과 같은 쿼리를 생성할 수 있도록 지원하는 프레임워크입니다.
문자열이나 XMl 파일을 통해 쿼리를 작성하는 대신 `QueryDSL`이 제공하는 플루언트 API를 활용해 쿼리를 생성할 수 있습니다.

### QueryDSL의 장점

- IDE가 제공하는 코드 자동 완성 기능을 사용할 수 있습니다.
- 문법적으로 잘못된 쿼리를 허용하지 않습니다.
- 고정된 SQL 쿼리를 작성하지 않기 떄문에 동적으로 쿼리를 생성할 수 있습니다.
- 코드로 작성하므로 가독성 및 생산성이 향상됩니다.
- 도메인 타입과 프로퍼티를 안전하게 참조할 수 있습니다.

### QueryDSL을 사용하기 위한 프로젝트 설정

~~생략~~

### 기본적인 QueryDSL 사용하기

우선 테스트 코드로 기본적인 사용법을 알아보겠습니다.

```java 
/// showLineNumber
/// title: QuerydslTest.java
@PersistenceContext
EntityManager entityManager;

@Test
void queryDslTest () {
  JPAQuery<Product> query = new JPAQuery<>(entityManager);
  QProduct qProduct = QProduct.product;
  
  List<Product> productList = query
                                .from(qProduct)
                                .where(qProduct.name.eq("test"))
                                .orderBy(qProduct.price.desc())
                                .fetch();
  
  assertThat(productList).isNotNull();
}
```

위 코드는 `Product` 엔티티의 `name`이 `test`인 데이터를 `price`의 내림차순으로 조회하는 코드입니다.

우선 QueryDSL을 사용하기 위해선 JPAQuery 객체를 사용합니다. JPAQuery 객체는 `EntityManager`를 활용해 생성할 수 있습니다.
이렇게 생성된 JPAQuery 객체는 빌더 형식으로 쿼리를 작성할 수 있습니다.

List타입으로 값을 리턴받기 위해서는 `fetch()` 메서드를 사용해야 하는데, 만약 4.0.1이전 버전의 QueryDSL을 사용한다면
`list()` 메서드를 사용해야 합니다. 반환 메서드로 사용할 수 있는 메서드는 다음과 같습니다.

```
- List<T> fetch() : 리스트로 결과를 반환합니다.
- T fetchOne : 단건 결과를 반환합니다.
- T fetchFirst() : limit(1).fetchOne()과 같습니다.
```

위 예제처럼 JPAQuery 객체를 사용하는 방법 외에 다른 방법도 있습니다.

```java 
/// showLineNumber
/// title: QuerydslTest.java
@Test
void queryDslTest2 () {
  JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
  QProduct qProduct = QProduct.product;
  
  List<Product> productList = jpaQueryFactory.selectFrom(qProduct)
                                .where(qProduct.name.eq("test"))
                                .orderBy(qProduct.price.desc())
                                .fetch();
}
```

위 예제에서는 `JPAQueryFactory`를 활용해 쿼리를 작성합니다. `JPAQuery`와 달리 select절부터 작성 가능합니다.
만약 전체 컬럼이 아닌 일부만 조회하고 싶다면 select()와 from() 메서드를 구분하여 사용하면 됩니다.

### QuerydslPredicateExecutor

Spring data JPA에서는 QueryDSL을 더욱 편하게 사용할 수 있도록 `QuerydslPredicateExecutor` 인터페이스를 제공합니다.

`QuerydslPredicateExecutor` 인터페이스는 `JpaRepository`와 함께 리포지토리에서 상속받아 사용할 수 있습니다.

```java
public interface QProductRepository extends JpaRepository<Product, Long> ,
        QuerydslPredicateExecutor<Product> {
}  
```

`QuerydslPredicateExecutor` 인터페이스는 `Predicate` 타입의 파라미터를 받아 동적으로 쿼리를 생성합니다.
`Predicate`는 표현식을 작성할 수 있게 QueryDSL에서 제공하는 인터페이스입니다.

```java
Optional<T> findOne(Predicate predicate);
Iterable<T> findAll(Predicate predicate);
Iterable<T> findAll(Predicate predicate, Sort sort);
Iterable<T> findAll(Predicate predicate, OrderSpecifier<?>... orders);
Iterable<T> findAll(OrderSpecifier<?>... orders);

Page<T> findAll(Predicate predicate, Pageable pagealbe);
long count(Predicate predicate);
boolean exists(Predicate predicate);
```

`Predicate`를 이용해 findOne() 메서드를 호출하는 방법은 아래와 같습니다.

```java 
/// showLineNumber
/// title: QuerydslTest.java
@Test
void test() {
  Predicate predicate = QProduct.product.name.containsIgnoreCase("test")
                        .and(QProduct.product.price.betwwen(1000,2500));
  
  Optional<Product> product = productRepository.findOne(predicate);
  
  assertThat(product).isNotNull();
}
```

이처럼 `Predicate`는 간단하게 표현식으로 정의하는 쿼리로 생각하면 됩니다. 하지만 join이나 fetch 등의 기능은 사용할 수 없다는 단점이 있습니다.

### [한걸음 더] JPA Auditing 적용

JPA에서 Audit이란 감시하다라는 뜻으로, 각 데이터마다 누가,언제 데이터를 생성했고 변경했는지 감시한다는 의미로 사용됩니다.
엔티티 클래스에는 공통적으로 들어가는 필드가 있습니다. 예를 들어, 생성일자와 변경일자 같은 것입니다.
Spring Data JPA에서는 이러한 값을 자동으로 넣어주는 기능을 제공합니다.

#### JPA Auditing 기능 활성화

`@EnableJpaAuditing` 어노테이션을 사용하면 JPA Auditing 기능을 활성화할 수 있습니다.

```java 
/// showLineNumber 
/// title: Application.java
@SpringBootApplication
@EnableJpaAuditing
public class Application {
  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}
```

위와 같이 어노테이션을 추가하면 정상적으로 기능이 활성화되지만, 테스트하는 일부 코드에서 에러가 발생할 수 있습니다.
예를 들면, @WebMvcTest 어노테이션을 지정해서 테스트를 수행하는 코드를 작성하면 애플리케이션 클래스를 호출하는 과정에서
예외가 발생할 수 있습니다. 이 같은 문제를 해결하기 위해 별도의 Configuration 클래스를 생성해서 애플리케이션 클래스의 기능과 분리해서 활성화 할 수 있습니다.

```java 
/// showLineNumber
/// title: JpaConfig.java
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
```

#### BaseEntity 만들기

```java 
/// showLineNumber
/// title: BaseEntity.java
@Getter
@Setter
@ToString
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity { 
    
    @CreatedDate
    @Colmn(updateable = false)
    @private LocalDAteTime createdAt;
  
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

- `@MappedSuperclass` : 테이블과 매핑되지 않고 자식 클래스에게 매핑 정보만 제공하는 어노테이션입니다.
- `@EntityListeners` : 엔티티의 생명주기를 감시하는 리스너를 설정하는 어노테이션입니다.
- `@CreatedDate` : 엔티티가 생성되어 저장될 때 시간 정보를 자동으로 저장하는 어노테이션입니다.
- `@LastModifiedDate` : 엔티티가 수정될 때 시간 정보를 자동으로 저장하는 어노테이션입니다.

위 BaseEntity를 이용하여 Product 엔티티를 수정해보겠습니다.

```java 
/// title: Product.java
...
public class Product extends BaseEntity {
  ...
}
```

이렇게 BaseEntity를 상속받으면 Product 엔티티에는 createdAt과 updatedAt 필드가 추가됩니다.
