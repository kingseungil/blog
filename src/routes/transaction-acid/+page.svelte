<!-- auto-generated by QWER -->
<script lang="ts">
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-nocheck
  import Post from '$lib/layouts/post.svelte';
  import ImgZoom from '$lib/components/image_zoom.svelte';
  import Video from '$lib/components/video.svelte';
  import CodeCopy from '$lib/components/code_copy.svelte';
  import InfoBox from '$lib/components/info_box.svelte';
</script>

<Post>
  <article slot="post_content">
    <h2 id="transaction"><a href="#transaction">트랜잭션(Transaction)?</a></h2>
    <p>
      <code class="inline-code-block">트랜잭션&lpar;Transaction&rpar;</code>
      은 데이터베이스의 상태를 변환시키는 하나 이상의 연산들을 의미합니다.
    </p>
    <p>
      일반적으로, 트랜잭션은 하나의 논리적인 작업 단위를 구성하며, 그 작업이 완전히 수행되거나 또는 전혀 수행되지 않아야
      합니다.
    </p>
    <p>
      예를 들어, 은행 계좌에서 돈을 이체하는 경우, 한 계좌에서 돈을 빼는 연산과 다른 계좌에 돈을 넣는 연산이 하나의
      트랜잭션을 구성합니다. 이 두 연산이 모두 성공적으로 완료되어야만 트랜잭션이 완료되며, 그렇지 않은 경우에는
      트랜잭션이 롤백되어야 합니다.
    </p>
    <h3 id=""><a href="#">트랜잭션 상태</a></h3>
    <p><ImgZoom src="https://i.imgur.com/VTmT399.png" alt="https://i.imgur.com/VTmT399.png"></ImgZoom></p>
    <h4 id="active"><a href="#active">Active</a></h4>
    <p>트랜잭션의 활동 상태. 트랜잭션이 실행중이며 동작중인 상태를 말한다.</p>
    <h4 id="failed"><a href="#failed">Failed</a></h4>
    <p>트랜잭션 실패 상태. 트랜잭션이 더이상 정상적으로 진행 할 수 없는 상태를 말한다.</p>
    <h4 id="partially-committed"><a href="#partially-committed">Partially Committed</a></h4>
    <p>
      트랜잭션의 <code class="inline-code-block">Commit</code>
      명령이 도착한 상태. 트랜잭션의
      <code class="inline-code-block">commit</code>
      이전
      <code class="inline-code-block">sql</code>
      문이 수행되고
      <code class="inline-code-block">commit</code>
      만 남은 상태를 말한다.
    </p>
    <h4 id="committed"><a href="#committed">Committed</a></h4>
    <p>트랜잭션 완료 상태. 트랜잭션이 정상적으로 완료된 상태를 말한다.</p>
    <h4 id="aborted"><a href="#aborted">Aborted</a></h4>
    <p>트랜잭션이 취소 상태. 트랜잭션이 취소되고 트랜잭션 실행 이전 데이터로 돌아간 상태를 말한다.</p>
    <h5 id="partially-committed-committed">
      <a href="#partially-committed-committed">Partially Committed 와 Committed 의 차이점</a>
    </h5>
    <p>
      <code class="inline-code-block">Commit</code>
      요청이 들어오면 상태는
      <code class="inline-code-block">Partial Commited</code>
      상태가 된다. 이후
      <code class="inline-code-block">Commit</code>
      을 문제없이 수행할 수 있으면
      <code class="inline-code-block">Committed</code>
      상태로 전이되고, 만약 오류가 발생하면
      <code class="inline-code-block">Failed</code>
      상태가 된다. 즉,
      <code class="inline-code-block">Partial Commited</code>
      는
      <code class="inline-code-block">Commit</code>
      요청이 들어왔을때를 말하며,
      <code class="inline-code-block">Commited</code>
      는
      <code class="inline-code-block">Commit</code>
      을 정상적으로 완료한 상태를 말한다.
    </p>
    <h3 id=""><a href="#">트랜잭션을 사용할 때 주의할 점</a></h3>
    <p>
      트랜잭션은 꼭 필요한 최소의 코드에만 적용하는 것이 좋다. 즉 트랜잭션의 범위를 최소화하라는 의미다. 일반적으로
      데이터베이스 커넥션은 개수가 제한적이다. 그런데 각 단위 프로그램이 커넥션을 소유하는 시간이 길어진다면 사용 가능한
      여유 커넥션의 개수는 줄어들게 된다. 그러다 어느 순간에는 각 단위 프로그램에서 커넥션을 가져가기 위해 기다려야 하는
      상황이 발생할 수도 있는 것이다.
    </p>
    <h3 id=""><a href="#">트랜잭션 격리수준</a></h3>
    <ul>
      <li>
        <strong>Read Uncommitted</strong>
        : 다른 트랜잭션에서 커밋되지 않은 내용도 참조할 수 있다.
      </li>
      <li>
        <strong>Read Committed</strong>
        : 다른 트랜잭션에서 커밋된 내용만 참조할 수 있다.
      </li>
      <li>
        <strong>Repeatable Read</strong>
        : 트랜잭션에 진입하기 이전에 커밋된 내용만 참조할 수 있다.
      </li>
      <li>
        <strong>Serializable</strong>
        : 트랜잭션에 진입하면 락을 걸어 다른 트랜잭션이 접근하지 못하도록 한다. (성능 매우 떨어짐)
      </li>
    </ul>
    <h2 id="acid"><a href="#acid">ACID</a></h2>
    <p>
      <strong>ACID</strong>
      는 트랜잭션이 안전하게 수행된다는 것을 보장하기 위한 네 가지 기본 속성을 나타냅니다
    </p>
    <ol>
      <li>
        <strong>원자성(Atomicity)</strong>
        : 트랜잭션의 연산은 모두 수행되거나, 또는 전혀 수행되지 않아야 합니다. 즉, 트랜잭션 내의 모든 연산이 성공적으로
        완료되거나, 하나라도 실패하면 트랜잭션 전체가 취소(롤백)되어야 합니다.
      </li>
      <li>
        <strong>일관성(Consistency)</strong>
        : 트랜잭션이 실행을 성공적으로 완료하면 항상 일관성 있는 상태로 데이터베이스를 남겨야 합니다. 즉, 트랜잭션의
        실행 전후로 데이터베이스의 일관성 규약이 유지되어야 합니다.
      </li>
      <li>
        <strong>독립성(Isolation)</strong>
        : 동시에 실행되는 트랜잭션들이 서로에게 영향을 주지 않아야 합니다. 즉, 하나의 트랜잭션 실행 중에 다른 트랜잭션의
        연산이 끼어들 수 없습니다.
      </li>
      <li>
        <strong>지속성(Durability)</strong>
        : 트랜잭션이 성공적으로 완료되면, 그 결과는 영구적으로 반영되어야 합니다. 시스템 장애가 발생하더라도, 완료된
        트랜잭션의 결과는 손실되지 않아야 합니다.
      </li>
    </ol>
    <p>이러한 ACID 특성은 데이터베이스 시스템에서 트랜잭션의 정확성과 신뢰성을 보장하는 데 중요합니다.</p>
    <hr />
    <p><strong><em>Reference</em></strong></p>
    <ul>
      <li>
        <a
          href="https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Database#%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4"
          rel="external">
          참고
        </a>
      </li>
      <li>
        <a href="https://kingseungil.vercel.app/blog/spring-transaction/" rel="external">관련글 - spring transaction</a>
      </li>
    </ul>
  </article>
</Post>
