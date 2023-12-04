---
title: (책) 스프링부트 핵심가이드 - Part 9
description: Part 9을 읽고 정리한 내용을 다루고 있습니다.
summary: Part 9. 연관관계 매핑
published: '2023-11-16T00:00:00.000+08:00'
updated: '2023-11-16T21:00:00.000+08:00'
tags:
  - [스프링부트 핵심가이드, springboot]
series_title: (북스터디) 스프링부트 핵심가이드
series_tag: '스프링부트 핵심가이드'
cover: https://image.yes24.com/goods/110142898/XL
---

> [스프링부트 핵심가이드](https://ridibooks.com/books/1160000073?_s=search&_q=%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8+%ED%95%B5%EC%8B%AC&_rdt_sid=search&_rdt_idx=0)을 읽고 정리한 내용입니다.
>
> 위 책의 Part 9를 읽고 정리한 내용을 다루고 있습니다.

# Part 9. 연관관계 매핑

## 일대일 매핑

### 일대일 단방향 매핑

일대일 단방향 매핑은 다음과 같이 `@OneToOne` 어노테이션을 사용하여 매핑할 수 있습니다.

```java 
/// showLineNumber
/// title: ProductDetail.java
@Entity
public class ProductDetail {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_number")
    private Product product;
}
```

`@OneToOne` 어노테이션을 사용하면 ProductDetail 엔티티와 Product 엔티티는 일대일 관계임을 알 수 있습니다.

또한 `@JoinColumn` 어노테이션은 기본값이 설정돼 있어 자동으로 이름을 매핑하지만 의도한 이름이 들어가지 않으므로
`name` 속성을 사용해 원하는 칼럼명을 지정하는 것이 좋습니다. 만약 `@JoinColumn`을 선언하지 않으면 엔티티를 매핑하는 중간 테이블이 생기면서 관리 포인트가 늘어나 좋지 않습니다.

> @JoinColumn에서 사용할 수 있는 속성
>
> - name: 매핑할 외래 키 이름
> - referencedColumnName: 외래 키가 참조하는 대상 테이블의 컬럼명
> - foreignKey: 외래 키에 대한 제약조건을 직접 지정할 수 있습니다.

```java
// @OneToOne 어노테이션 인터페이스
public @interface OneToOne {
    Class<?> targetEntity() default void.class;

    CascadeType[] cascade() default {};

    FetchType fetch() default EAGER;

    boolean optional() default true;

    String mappedBy() default "";

    boolean orphanRemoval() default false;
}
```

지금은 fetch()와 optional() 요소만 살펴보겠습니다. 기본 fetch 전략은 `EAGER`, 즉 `즉시 로딩`입니다.
그리고 optional() 메서드는 기본값으로 true가 설정되어 있는데, 매핑되는 값이 nullable이라는 것을 의미합니다.
반드시 값이 있어야 한다면 false로 설정하면 됩니다. (left join -> inner join)

### 일대일 양방향 매핑

이번에는 앞에서 생성한 일대일 단방향 설정을 양방향 설정으로 변경해보겠습니다. 사실 객체에서의 양방향 개념은
양쪽에서 단방향으로 서로를 매핑하는 것을 의미합니다.

```java 
/// showLineNumber 
/// title: Product.java
@Entity
public class Product {
    // ...

    @OneToOne
    private ProductDetail productDetail;
}
```

하지만 양쪽에서 외래키를 가지고 있으면 left join이 두번 발생하므로 성능상 좋지 않습니다. 실제 데이터베이스에서도
테이블 간 연관관계를 맺으면 **한쪽 테이블**이 외래키를 가지는 구조로 이뤄집니다. (주인 개념)
따라서 JPA에서도 이를 반영해서 한쪽의 테이블에서만 외래키를 가지도록 설정하는 것이 좋습니다.

이 경우 엔티티는 양방향으로 매핑하되 한쪽에게만 외래키를 줘야 하는데, 이 때 사용되는 속성 값이 `mappedBy`입니다.
어떤 객체가 주인인지 표시하는 속성이라고 볼 수 있습니다.

```java 
/// showLineNumber
/// title: Product.java
@Entity
@public class Product {
    // ...

    @OneToOne(mappedBy = "product")
    private ProductDetail productDetail;
}
```

위 코드처럼 Product 엔티티에 mappedBy 속성을 추가하면 ProductDetail 엔티티가 주인이 되어 외래키를 가지게 됩니다.
(Product 테이블에는 외래키가 사라짐)

## 다대일, 일대다 매핑

### 다대일 단방향 매핑

다대일 단방향 매핑은 다음과 같이 `@ManyToOne` 어노테이션을 사용하여 매핑할 수 있습니다.

```java 
/// showLineNumber
/// title: Provider.java
@Entity
public class Provider {
    
    @Id
    @GeneratedValue
    private Long Id;

    private String name;
}
```

```java 
/// showLineNumber 
/// title: Product.java
@Entity
public class Product {

    // ...

    @OneToOne(mappedBy = "product")
    private ProductDetail productDetail;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;
}
```

위 코드를 보면 Provider 테이블과 Product 테이블은 다대일 관계임을 알 수 있습니다. 즉 하나의 공급자는 여러 상품을 공급할 수 있습니다.

```java
productRepository.findById(1L).ifPresent(product -> {
    System.out.println(product.getName()); 
    System.out.println(product.getProvider().getName()); 
});
```

위 코드를 실행하면 다음과 같은 SQL이 실행됩니다.

```sql
select
    product0_.id as id1_1_0_,
    product0_.name as name2_1_0_,
    product0_.price as price3_1_0_,
    product0_.provider_id as provider4_1_0_,
    provider1_.id as id1_0_1_,
    provider1_.name as name2_0_1_
from
    product product0_
left outer join
    provider provider1_
        on product0_.provider_id=provider1_.id
where
    product0_.id=?
```

또한 Product 엔티티에서 단방향으로 Provider 엔티티와 연관관계를 맺고 있으므로 ProductRepository만으로도 Provider 엔티티를 조회할 수 있습니다.

### 다대일 양방향 매핑

```java 
/// showLineNumber 
/// title: Provider.java
@Entity
public class Provider {
    
    // ...

    @OneToMany(mappedBy = "provider", fetch = FetchType.EAGER)
    private List<Product> productList = new ArrayList<>();
}
```

```java
/// showLineNumber
/// title: Product.java
@Entity
public class Product {

    // ...

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;
}
```

기존의 Provider 엔티티에 `@OneToMany` 어노테이션을 추가하여 양방향 매핑을 설정했습니다.

일대다 관계의 경우, 여러 상품 엔티티가 포함될 수 있으므로 컬렉션 (Collcetions, List, Map...) 형식으로 필드를 생성합니다. 그리고 mappedBy를 통해 외래키 관리를 Product 엔티티에 위임합니다.

> - `지연로딩(Lazy)`: 연관된 엔티티를 실제 사용할 때 조회합니다. (프록시 객체를 사용)
> - `즉시로딩(Eager)`: 엔티티를 조회할 때 연관된 엔티티도 함께 조회합니다.

### 일대다 매핑

앞에서 다대일 단방향, 양방향 매핑을 살펴봤습니다. 이번에는 일대다 단방향 방법을 알아보겠습니다.
참고로 일대다 양방향 매핑은 지원하지 않습니다. (어느 엔티티 클래스도 연관관계의 주인이 될 수 없음)

```java 
/// showLineNumber 
/// title: Category.java
@Entity
public class Category {

    // ..

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id)
    private List<Product> products = new ArrayList<>();
}
```

이렇게 설정을 해주면 하나의 카테고리에 여러 상품이 포함될 수 있습니다.
Product 엔티티 클래스에서는 별도의 설정이 필요하지 않습니다. 그리고 일대다 단방향 매핑은 외래키가 매핑의 주체가 아닌 반대 테이블에 추가됩니다. (Product 테이블에 category_id 컬럼이 추가됨)

하지만 일대다 단방향 매핑은 다음과 같은 문제점이 있습니다. 

```java
Category category = categoryRepository.findById(1L).orElseThrow();
category.getProducts().add(product);

categoryRepository.save(category);
```

위 코드를 실행하면 다음과 같은 SQL이 실행됩니다.

```sql
select
    category0_.id as id1_0_0_,
    category0_.name as name2_0_0_,
    products1_.category_id as category4_1_1_,
    products1_.id as id1_1_1_,
    products1_.id as id1_1_2_,
    products1_.category_id as category4_1_2_,
    products1_.name as name2_1_2_,
    products1_.price as price3_1_2_,
    products1_.provider_id as provider5_1_2_
from
    category category0_
left outer join
    product products1_
        on category0_.id=products1_.category_id
where
    category0_.id=?

insert
into
    product
    (category_id, name, price, provider_id, id)
values
    (?, ?, ?, ?, ?)

/* update 발생 */
update
    product
set
    category_id=?
where
    id=?
```

일대다 단방향 매핑은 외래키를 관리하는 주체가 반대 테이블이므로, 새로운 상품을 추가할 때마다 외래키를 업데이트해야 합니다. 이는 성능상 좋지 않으므로 다대일 단방향 매핑을 사용하는 것이 좋습니다.

## 다대다 매핑

다대다(M:N) 연관관계는 실무에서 거의 사용되지 않는 구성입니다. 다대다는 각 엔티티에서 서로를 리스트로 가지는 구조가 만들어집니다. 이런 경우, 교차 엔티티라고 부르는 중간 테이블을 생성해서 다대다 관계를 일대다 또는 다대일 관계로 해소합니다.

## 영속성 전이

> 특정 엔티티의 영속성 상태를 변경할 때 그 엔티티와 연관된 엔티티의 영속성에도 영양을 미쳐
> 영속성 상태를 변경하는 것을 의미합니다.

```java
// 예시
public @interface OneToMany {
    // ...
    CascadeType[] cascade() default {};
    // ...
}

@OneToMany(cascade = CascadeType.ALL) // 모든 영속 상태 변경에 대해 영속성 전이 적용
@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}) // 영속, 병합에 대해 영속성 전이 적용
@OneToMany(cascade = CascadeType.REMOVE) // 삭제에 대해 영속성 전이 적용
@OneToMany(cascade = CascadeType.REFRESH) // REFRESH에 대해 영속성 전이 적용
@OneToMany(cascade = CascadeType.DETACH) // DETACH에 대해 영속성 전이 적용
```
