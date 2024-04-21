---
title: VO, DTO
description: VO, DTO, Spring
summary: VO와 DTO의 차이점과 사용하는 이유에 대해 알아보자
published: '2024-04-21T00:00:00.000+08:00'
updated: '2024-04-21T21:00:00.000+08:00'
tags:
  - [VO, DTO, Spring, Egov, Mybatis, 전자정부프레임워크]
series_title: VO, DTO
series_tag: 'Study'
---

## VO

:::info VO(Value Object) : 값을 갖는 순수한 도메인, 값 표현용
VO는 값 자체를 표현하는 객체이다.
객체들의 주소가 달라도 값이 같으면 동일한 것으로 여긴다.

예를 들어, 고유번호가 서로 다른 만원 2장이 있다고 생각하자. 이 둘은 고유번호(주소)는 다르지만 10000원(값)은 동일하다.

VO는 `getter` 메소드와 함께 비즈니스 로직도 포함할 수 있다. 단, `setter` 메소드는 가지지 않는다. 또, 값 비교를 위해 _equals(), hashCode()_ 메소드를 오버라이딩 해줘야 한다.
:::

```java
// Money.java
public class Money {
    private final String currency;
    private final int value;

    public Money(String currency, int value) {
        this.currency = currency;
        this.value = value;
    }

    public String getCurrency() {
        return currency;
    }

    public int getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Money money = (Money) o;
        return value == money.value && Objects.equals(currency, money.currency);
    }

    @Override
    public int hashCode() {
        return Objects.hash(currency, value);
    }
}

// MoneyTest.java
public class MoneyTest {
    @DisplayName("VO 동등비교를 한다.")
    @Test
    void isSameObjects() {
        Money money1 = new Money("원", 10000);
        Money money2 = new Money("원", 10000);

        assertThat(money1).isEqualTo(money2);
        assertThat(money1).hasSameHashCodeAs(money2);
    }
}
```


## DTO

:::info DTO(Data Transfer Object) : Layer 간 데이터 교환, 데이터 전달용

DTO는 데이터를 전달하기 위한 객체이다. 계층간 데이터를 주고 받을 때, 데이터를 담아서 전달하는 바구니로 생각할 수 있다. 여러 레이어 사이에서 DTO를 사용할 수 있지만, 주로 View와 Controller 사이에서 데이터를 주고 받을 때 활용한다.

DTO는 `getter/setter`메소드를 포함한다. 이 외의 비즈니스 로직은 포함하지 않는다.


:::

setter를 가지는 경우 가변 객체로 활용할 수 있다.

```java
public class MemberDto {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```
---
한편, setter가 아닌 생성자를 이용해서 초기화하는 경우 불변 객체로 활용할 수 있다.

불변객체로 만들면 데이터를 전달하는 과정에서 데이터가 변조되지 않음을 보장할 수 있다.

```java
public class MemberDto {
    private final String name;
    private final int age;

    public MemberDto(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```