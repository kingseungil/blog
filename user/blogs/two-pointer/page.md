---
title: Two Pointers (투 포인터)
description: 투 포인터 알고리즘에 대해 알아보자.
summary: 투 포인터 알고리즘
published: '2023-08-28T00:00:00.000+08:00'
updated: '2023-08-28T21:00:00.000+08:00'
tags:
  - [two-pointers, 투 포인터]
series_title: (알고리즘) 투 포인터
series_tag: '알고리즘'
cover: https://images.velog.io/images/ho-taek/post/a9c600b5-f7f3-4686-b2b6-0b2b9a457f63/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98.png
---

## Two Pointers (투 포인터)

투 포인터 알고리즘은 리스트에 순차적으로 접근해야 할 때 두 개의 점의 위치를 기록하면서 처리하는 알고리즘이다.
 
> `두 포인터의 배치 방법`
> - **같은 방향에서 시작** : 시작점과 끝점이 첫 번째 원소의 인덱스를 가리키도록 한다.
> - **서로 다른 방향에서 시작** : 시작점은 첫 번째 원소의 인덱스를 가리키고, 끝점은 마지막 원소의 인덱스를 가리키도록 한다.
> 
> `투 포인터의 장점`
> 
> - 다중 for문을 이용해야 할 것을 투 포인터를 이용하면 하나의 for문으로 처리할 수 있다.
> - 시간 복잡도를 줄일 수 있다.

### 투 포인터 예시

> Problem: 부분합이 N이 되는 구간 찾기

#### 기존 for문을 이용한 방법
시간 복잡도 : O(N^2)

```java 
/// showLineNumber 
/// title: code.java
public class Main {
  public static int[] forLoop(int[] arr, int target) {
    int[] result = {-1,-1};

    for (int i = 0; i < arr.length; i++) {
      int sum = arr[i];
      for (int j = i+1; j < arr.length; j++) {
        if (sum == target) {
          result[0] = i;
          result[1] = j-1;
          break;
        }
        sum += arr[j];
      }
      if(sum == target) {
        break;
      }
    }
    return result;
  }
}
```

#### 투 포인터를 이용한 방법
- 시간 복잡도 : O(N)

```java 
/// showLineNumber
/// title: code.java
public class Main {
  public static int[] twoPointers(int[] arr, int target) {
    int start = 0;
    int end = 0;
    int sum = 0;
    int[] result = {-1, -1};

    while (true) {
      if (sum > target) {
        sum -= arr[start++];
      } else if (end == arr.length) {
        break;
      } else {
        sum += arr[end++];
      }
      if (sum == target) {
        result[0] = start;
        result[1] = end - 1;
        break;
      }
    }
    return result;
  }
}
```
