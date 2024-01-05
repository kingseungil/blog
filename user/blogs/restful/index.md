---
title: Restful이란?
description: RESTful API에 대해 알아보자.
summary: RESTful API
published: '2023-07-27T00:00:00.000+08:00'
updated: '2023-07-27T21:00:00.000+08:00'
tags:
   - [restful, rest]
cover: https://velog.velcdn.com/images/goyo/post/5c75ac85-f540-4727-b953-a8dce123a1a7/image.svg
series_title: Restful
series_tag: Study
---

`REST` : REpresentational State Transfer

REST는 하나의 아키텍처 스타일로, 웹 서비스를 자원(Resource) 중심으로 설계하고, HTTP 메소드를 통해 자원을 처리하는 방식입니다. 이를 `Resource Oriented Architecture`라고도 합니다. API 설계의 중심에 자원이 있으며, 자원의 상태와 행위르롤 명시적이고 직관적으로 분리합니다.

💡 **REST 6가지 원칙**

1. `Uniform Interface` : 표준화된 인터페이스를 사용하여 상호작용을 단순화하고 일관성을 유지합니다.
2. `Stateless` : 각 요청이 독립적이고, 서버가 클라이언트의 상태 정보를 저장하지 않습니다.
3. `Caching` : 응답 결과에 캐싱 정보를 포함하여 네트워크 부하를 줄이고 성능을 향상시킵니다.
4. `Client-Server` : 클라이언트와 서버가 역할을 분리하여 서로에 영향을 미치지 않습니다.
5. `Hierarchical System` : 시스템을 계층적으로 구성하여 보안, 로드 밸런싱, 캐싱 등을 적용할 수 있습니다.
6. `Code on demand` : 필요한 경우에만 클라이언트에 코드를 전송하여 기능을 확장할 수 있습니다.

## RESTful하게 API를 디자인 한다는 것은 무엇을 의미할까?

1. 리소스와 행위를 명시적이고 직관적으로 분리합니다.
   1. 리소스는 `URI`로 표현되며, 리소스가 가리키는 것은 `명사`로 표현합니다.
   2. 행위는 `HTTP Method`로 표현하며, `GET`,`POST`,`PUT`,`PATCH`,`DELETE`를 각각의 목적에 맞게 사용합니다.
2. Message는 Header와 Body를 명확하게 분리해서 사용합니다.
   1. Entity에 대한 내용은 body에 담습니다.
   2. 애플리케이션 서버가 행동할 판단의 근거가 되는 컨트롤 정보인 API 버전 정보, 응답받고자 하는 MIME 타입 등은 header에 담습니다.
   3. header와 body는 http header와 http body로 나눌 수도 있고, http body에 들어가는 json 구조로 분리할 수도 있습니다.
3. API 버전을 관리합니다.
   1. 환경은 항상 변하기 때문에 API의 signature가 변경될 수도 있습니다.
   2. 특정 API를 변경할 때는 반드시 하위호환성을 보장해야 합니다.
4. 서버와 클라이언트가 같은 방식을 사용해서 요청하도록 합니다.
   1. 브라우저는 form-data 형식의 submit으로 보내고 서버에서는 json 형태로 보내는 식의 분리보다는 json으로 보내든, 둘 다 form-data 형식으로 보내든 하나로 통일합니다.
   2. 다른 말로 표현하자면 URI가 플랫폼 중립적이어야 합니다.

### 어떠한 장점이 존재하는가?

1. **Open API를 제공하기 쉽습니다.** REST는 표준화된 인터페이스와 자체 설명적인 메시지를 사용하기 때문에, 다른 개발자들이 쉽게 이해하고 사용할 수 있습니다.
2. **멀티플랫폼 지원 및 연동이 용이합니다.** REST는 HTTP를 기반으로 하기 때문에, 다양한 플랫폼과 언어에서 손쉽게 구현하고 통신할 수 있습니다.
3. **원하는 타입으로 데이터를 주고 받을 수 있습니다.** REST는 헤더에 MIME 타입을 명시함으로써, JSON,XML,TEXT 등 다양한 형식의 데이터를 송수신할 수 있습니다.
4. **기존 웹 인프라(HTTP)를 그대로 사용할 수 있습니다.** REST는 HTTP의 기능과 제약을 최대한 활용하기 때문에, 별도의 인프라를 구축할 필요가 없습니다.

### 단점은 뭐가 있을까?

1. **사용할 수 있는 메소드가 한정적입니다.** REST는 HTTP method를 사용하여 행위를 표현하기 때문에, CRUD 외의 복잡한 로직을 구현하기 어려울 수 있습니다.
2. **분산환경에는 부적합합니다.** REST는 상태를 저장하지 않기 때문에, 여러 서버에 걸쳐서 작업을 처리하기 어려울 수 있습니다.
3. **HTTP 통신 모델에 대해서만 지원합니다.** REST는 HTTP 프로토콜에 의존하기 때문에, 다른 프로토콜을 사용하는 웹 서비스와 호환되지 않을 수 있습니다.

---

[참고](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Development_common_sense)
