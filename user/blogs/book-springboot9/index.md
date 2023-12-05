---
title: (책) 스프링부트 핵심가이드 - Part 11
description: Part 11를 읽고 정리한 내용을 다루고 있습니다.
summary: Part 11. 액추에이어 활용하기
published: '2023-12-05T11:00:00.000+08:00'
updated: '2023-12-05T21:00:00.000+08:00'
tags:
  - [스프링부트 핵심가이드, springboot]
series_title: (북스터디) 스프링부트 핵심가이드
series_tag: '스프링부트 핵심가이드'
cover: https://image.yes24.com/goods/110142898/XL
---

# Part 11. 액추에이어 활용하기

애플리케이션을 개발하는 단계를 지나 운영 단계에 접어들면 애플리케이션이 정상적으로 동작하는지 모니터링하는 환경을 구축하는 것이 매우 중요해집니다.
스프링 부트 액추에이터는 HTTP 엔드포인트나 `JMX`를 활용해 애플리케이션을 모니터링하고 관리할 수 있는 기능을 제공합니다. 이번 장에서는 액추에이터의 환경을 설정하고
활용하는 방법을 다룰 예정입니다.

:::tip JMX란?
JMX(Java Management Extension)는 실행 중인 애플리케이션의 상태를 모니터링하고 설정을 변경할 수 있게 해주는 API입니다.
JMX를 통해 리소스 관리를 하려면 MBean(Manged Bean)을 생성해야 합니다.
:::

## 액추에이터 종속성 추가

액추에이터를 사용하려면 `spring-boot-starter-actuator` 모듈을 추가해야 합니다.

```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
}
```

## 엔드포인트

엑추에이터의 엔드포인트는 애플리케이션의 모니터링을 사용하는 경로입니다. 스프링 부트에는 여러 내장 엔드포인트가 포함돼 있으며, 커스텀 엔드포인트를 추가할 수도 있습니다.
액추에이터를 추가하면 기본적으로 엔드포인트 URL로 /actuator가 추가되며 이 뒤에 경로를 추가해 상세 내역에 접근합니다. 만약 /actuator가 아닌 다른 경로를 사용하고 싶다면
설정파일을 통해 변경할 수 있습니다.

```yaml
/// title: application.yml
management:
  endpoints:
    web:
      base-path: /custom-path
```

자주 활용되는 엔드포인트는 다음과 같습니다.

| 엔드포인트            | 설명                                                                               |
|------------------|----------------------------------------------------------------------------------|
| `auditevents`    | 호출된 Audit 이벤트 정보를 확인할 수 있습니다. AuditEventRepository를 구현한 빈이 있어야 합니다.              |
| `beans`          | 애플리케이션에 등록된 빈 정보를 확인할 수 있습니다.                                                    |
| `caches`         | 사용 가능한 캐시 정보를 확인할 수 있습니다.                                                        |
| `conditions`     | 자동 설정이 적용된 조건을 확인할 수 있습니다.                                                       |
| `configprops`    | @ConfigurationProperties로 정의한 설정 정보를 확인할 수 있습니다.                                 |
| `env`            | 애플리케이션에서 사용할 수 있는 환경 속성을 표시합니다.                                                  |
| `health`         | 애플리케이션의 상태 정보를 확인할 수 있습니다.                                                       |
| `httptrace`      | 가장 최근에 이뤄진 100건의 HTTP 요청/응답 정보를 확인할 수 있습니다. HttpTraceRepository를 구현한 빈이 있어야 합니다. |
| `info`           | 애플리케이션의 정보를 확인할 수 있습니다.                                                          |
| `loggers`        | 애플리케이션의 로거 구성을 표시하고 수정합니다.                                                       |
| `metrics`        | 애플리케이션의 메트릭 정보를 확인할 수 있습니다.                                                      |
| `mappings`       | 애플리케이션의 URL 매핑 정보를 확인할 수 있습니다.                                                   |
| `quartz`         | Quartz 스케줄러의 상태 정보를 확인할 수 있습니다.                                                  |
| `scheduledtasks` | 스케줄러의 상태 정보를 확인할 수 있습니다.                                                         |
| `sessions`       | HTTP 세션 정보를 확인하거나 삭제할 수 있습니다.                                                    |
| `shutdown`       | 애플리케이션을 종료합니다.                                                                   |
| `startup`        | 애플리케이션의 시작 과정에서 로드된 빈 정보를 확인할 수 있습니다. BufferingApplicationStartup을 사용해야 합니다.     |
| `threaddump`     | 스레드 덤프를 수행합니다.                                                                   |

만약 SpringMVC, WebFlux, Jersey을 사용한다면 추가로 다음과 같은 엔드포인트를 사용할 수 있습니다.

| 엔드포인트        | 설명                                                                                                  |
|--------------|-----------------------------------------------------------------------------------------------------|
| `heapdump`   | 힙 덤프 파일을 반환합니다.                                                                                     |
| `jolokia`    | Jolokia가 클래스패스에 있을 때 HTTP를 통해 JMX 빈을 표시합니다. jolokia-core 모듈에 대한 의존성 추가가 필요하며, WebFlux에서는 사용할 수 없습니다 |
| `logfile`    | logging.file.name 또는 logging.file.path 속성에 지정된 파일을 반환합니다.                                           |
| `Prometheus` | Prometheus 서버에서 스크랩할 수 있는 형식으로 메트릭을 표시합니다. micrometer-registry-prometheus 모듈에 대한 의존성 추가가 필요합니다.     |

엔드포인트 활성화 여부와 노출 여부도 설정파일을 통해 변경할 수 있습니다.

```yaml
/// title: application.yml
management:
  endpoints:
    shutdown:
      enabled: true
    cache:
      enabled: false
```

비활성화된 엔드포인트는 애플리케이션 컨텍스트에서 완전히 제거됩니다. 위 설정을 shutdown 기능을 활성화하고 cache 기능을 비활성화하겠다는 의미입니다.

또한 액추에이터 설정을 통해 기능 활성화/비활성화가 아니라 엔드포인트의 노출 여부만 설정하는 것도 가능합니다.

```yaml
/// title: application.yml
## 엔드포인트 노출 설정
## HTTP 설정
management:
  endpoints:
    web:
      exposure:
        include: *
        exclude: threaddump,heapdump

## JMX 설정
management:
  endpoints:
    jmx:
      exposure:
        include: *
        exclude: threaddump,heapdump
```

## 액추에이터 기능 살펴보기

### 애플리케이션 기본 정보(/info)

```yaml
/// title: application.yml
info:
  organization:
    name:wikibooks
  contact:
    email:test@gmail.com
    phoneNumber:010-1234-5678
```

위 예제처럼 설정하고 `http://localhost:8080/actuator/info`로 접근하면 다음과 같은 결과를 확인할 수 있습니다.

```json
{
  "organization": {
    "name": "wikibooks"
  },
  "contact": {
    "email": "test@gmail.com",
    "phoneNumber": "010-1234-5678"
    }
}
```

### 애플리케이션 상태(/health)

`http://localhost:8080/actuator/health`로 접근하면 다음과 같은 결과를 확인할 수 있습니다.

```json
{
  "status": "UP"
}
```

status는 다음과 같은 값으로 표시됩니다.

- `UP`: 애플리케이션의 상태가 정상입니다.
- `DOWN`: 애플리케이션의 상태가 비정상입니다.
- `OUT_OF_SERVICE`: 애플리케이션이 서비스를 제공할 수 없는 상태입니다.
- `UNKNOWN`: 애플리케이션의 상태를 확인할 수 없습니다.

이 결과들은 주로 네트워크 계층 중 L4(Loadbalancing) 레벨에서 사용됩니다.

### 빈 정보 확인(/beans)

`http://localhost:8080/actuator/beans`로 접근하면 스프링 컨테이너에 등록된 빈의 정보들을 확인할 수 있습니다.

### 그 외 엔드포인트

액추에이터의 엔드포인트는 위에서 설명한 것 외에도 다양한 기능을 제공합니다. 자세한 내용은 [공식 문서](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-endpoints)를 참고해 주세요!