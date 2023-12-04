---
title: SOLID 원칙
description: solid 원칙을 정리한 내용입니다.
summary: solid 원칙
published: '2023-09-12T00:00:00.000+08:00'
updated: '2023-09-12T21:00:00.000+08:00'
tags:
  - [solid, 객체지향]
cover: https://images.velog.io/images/haero_kim/post/169ef81a-0c8c-4241-a73a-135d5b67ffea/1_XOMTPWTpDLypkp079p9XXg.png
---

## 객체지향 설계 원칙 (SOLID)

> 객체지향 설계 원칙(SOLID)은 객체지향 프로그래밍(OOP)에서 지켜야 할 5가지 원칙을 말한다.

### SRP (Single Responsibility Principle)

> `SRP (Single Responsibility Principle)` : 단일 책임 원칙
>   - 한 클래스는 하나의 책임만 가져야 한다.
>     - 하나의 책임이라는 것은 모호하다.
>       - 클 수 있고, 작을 수 있다.
>       - 문맥과 상황에 따라 다르다.
>     - 중요한 기준은 변경이다. 변경이 있을 때, 파급 효과가 적으면 단일 책임 원칙을 잘 따른 것이다.
>   - SRP를 잘 지키면 결국, **응집도는 높고, 결합도는 낮아진다.**

### OCP (Open Closed Principle)

> `OCP (Open Closed Principle)` : 개방 폐쇄 원칙
>   - 확장에는 열려있고, 변경에는 닫혀있어야 한다.
>     - **확장에 열려있다** : 변경 사항이 발생했을 때 유연하게 코드를 추가함으로써 큰 힘을 들이지 않고 확장할 수 있다.
>     - **변경에 닫혀있다** : 변경 사항이 발생했을 때 객체를 직접적으로 수정하는 것을 제한한다.
>   - 어렵게 생각할 필요없이, 추상화 사용을 통해 관계 구축을 유연하게 한다.
>   - 즉, **다형성**과 **확장**을 가능케 하는 객체지향의 장점을 살린 설계 원칙이다.
> 
> 하지만, 문제점이 있다.
> 아래 코드를 보자.
>
> ```java
> public class MemberService {
>    // private MemberRepository memberRepository = new MemoryMemberRepository();
>    private MemberRepository memberRepository = new JdbcMemberRepository();
> }
> ```
> 
> 위 코드는 OCP를 잘 지키지 못하고 있다.
> 
> 이유는 MemberService는 MemberRepository에 의존하고 있기 때문이다.
> 
> MemberRepository가 변경되면 MemberService도 변경되어야 한다. 즉, 변경에 닫혀있지 않다고 볼 수있다.
> 
> 이를 해결하기 위해선, 객체를 생성하고 연관관계를 맺어주는 별도의 조립, 설정자가 필요하다.
> 
> 이는 `DI`,`IoC`를 통해 해결할 수 있다.

### LSP (Liskov Substitution Principle)

> `LSP (Liskov Substitution Principle)` : 리스코프 치환 원칙
>   - 자식 클래스는 부모 클래스에서 가능한 행위를 수행할 수 있어야 한다.
>   - 상속보다는 Interface를 고려하고, 상속을 하더라도 비슷하게 만들어야 교체가 쉽다.

### ISP (Interface Segregation Principle)

> `ISP (Interface Segregation Principle)` : 인터페이스 분리 원칙
>   - Interface도 OCP를 따라야 구현이 편리하고 재활용성이 높아진다.
>     - 특정 클라이언트를 위한 인터페이스 여러개가 범용 인터페이스 하나보다 낫다.
>     - 인터페이스가 명확해지고, 대체 가능성이 높아진다.

### DIP (Dependency Inversion Principle)

> `DIP (Dependency Inversion Principle)` : 의존 역전 원칙
>   - 의존 관계를 맺을 때, 변화하기 쉬운 것보다 변화하기 어려운 것에 의존해야 한다.
>     - 프로그래머는 "추상화에 의존해야지, 구체화에 의존하면 안된다."
>   - 쉽게 말해, 구현 클래스에 의존하지 말고 인터페이스에 의존하라는 것이다.
> 
> ```java
> public class MemberService {
>    // private MemberRepository memberRepository = new MemoryMemberRepository();
>    private MemberRepository memberRepository = new JdbcMemberRepository();
> }
> ```
> 
> 아까 봤던 이 코드는, 인터페이스에 의존하지만 동시에 구현 클래스에도 의존하고 있다.
> 
> 따라서 DIP도 잘 지키지 못하고 있다.

## 정리

- 객체지향의 핵심은 `다형성`
- 다형성만으로는 쉽게 부품을 갈아 끼우듯이 개발할 수 없다.
- 다형성만으로는 구현 객체를 변경할 때 클라이언트 코드도 함께 변경된다.
- 다형성만으로는 OCP,DIP를 지킬 수 없다.
- 뭔가 더 필요하다 -> `스프링 IoC 컨테이너` : 스프링 컨테이너는 객체를 생성하고, 관리하면서 의존관계를 연결해준다.
