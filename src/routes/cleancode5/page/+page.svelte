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
    <h1 id=""><a href="#">에러 핸들링</a></h1>
    <h2 id="01"><a href="#01">01. 예외 처리 방식</a></h2>
    <h3 id=""><a href="#">오류 코드를 리턴하지 말고, 예외를 던져라</a></h3>
    <p><ImgZoom src="/cleancode5/page/img.png" alt="/cleancode5/page/img.png"></ImgZoom></p>
    <p>옛날에는 오류를 나타낼 때 에러코드를 던졌다.</p>
    <p>하지만 예외를 던지는 것이 명확하고, 처리 흐름이 깔끔해진다.</p>
    <hr />
    <p><ImgZoom src="/cleancode5/page/img_1.png" alt="/cleancode5/page/img_1.png"></ImgZoom></p>
    <ol>
      <li>오류가 발생한 부분에서 예외를 던진다. (별도의 처리가 필요한 예외라면 checked exception을 던진다.)</li>
      <li>checked exception에 대한 예외처리를 하지 않는다면 메서드 선언부에 throws를 명시해야 한다.</li>
      <li>예외를 처리할 수 있는 곳에서 catch 하여 처리한다.</li>
    </ol>
    <h2 id="02-unchecked-exception"><a href="#02-unchecked-exception">02. Unchecked Exception을 사용하라</a></h2>
    <p><ImgZoom src="/cleancode5/page/img_2.png" alt="/cleancode5/page/img_2.png"></ImgZoom></p>
    <p><ImgZoom src="/cleancode5/page/img_3.png" alt="/cleancode5/page/img_3.png"></ImgZoom></p>
    <p>
      <a href="https://www.nextree.co.kr/p3239/" rel="external">https://www.nextree.co.kr/p3239/</a>
       참고
    </p>
    <blockquote>
      <p><strong>Exception에 관한 규약 in Effective Java</strong></p>
      <p><ImgZoom src="/cleancode5/page/img_4.png" alt="/cleancode5/page/img_4.png"></ImgZoom></p>
    </blockquote>
    <h3 id="checked-exception"><a href="#checked-exception">Checked Exception이 나쁜 이유</a></h3>
    <p><ImgZoom src="/cleancode5/page/img_1.png" alt="/cleancode5/page/img_1.png"></ImgZoom></p>
    <p>위 코드를 다시보면 다음과 같은 문제점이 있다.</p>
    <ol>
      <li>
        특정 메소드에서 checked expcetion을 throw하고 상위 메소드에서 그 exception을 catch한다면 모든 중간단계 메소드에
        exception을 throw 해야 한다.
      </li>
      <li>OCP 위배 : 상위 레벨 메소드에서 하위 레벨 메소드의 디테일에 대해 알아야 하기 때문에 OCP 원칙에 위배된다.</li>
      <li>필요한 경우 checked exception을 사용해야 되지만 일반적인 경우 득보다 실이 많다.</li>
    </ol>
    <h2 id="03-exception"><a href="#03-exception">03. Exception 잘 쓰기</a></h2>
    <h3 id=""><a href="#">예외에 메시지를 담아라</a></h3>
    <blockquote>
      <p>예외에 의미 있는 정보 담기</p>
    </blockquote>
    <p><ImgZoom src="/cleancode5/page/img_5.png" alt="/cleancode5/page/img_5.png"></ImgZoom></p>
    <ul>
      <li>오류가 발생한 원인과 위치를 찾기 쉽도록, 예외를 던질 때는 전후 상황을 충분히 덧붙인다.</li>
      <li>실패한 연산 이름과 유형 등 정보를 담아 예외를 던진다.</li>
    </ul>
    <h3 id="exception-wrapper"><a href="#exception-wrapper">exception wrapper</a></h3>
    <p><ImgZoom src="/cleancode5/page/img_6.png" alt="/cleancode5/page/img_6.png"></ImgZoom></p>
    <p>위 코드를 보면 로그만 찍을 뿐, 할 수 있는 일이 없다.</p>
    <p>
      이런 경우에는 exception wrapper를 사용한다. (
      <strong>예외를 감싸는 클래스를 만드는 것</strong>
      )
    </p>
    <p><ImgZoom src="/cleancode5/page/img_7.png" alt="/cleancode5/page/img_7.png"></ImgZoom></p>
    <ul>
      <li>port.open() 시 발생하는 checked exception들을 감싸도록 port를 가지는 LocalPort 클래스를 만든다.</li>
      <li>port.open()이 던지는 checked exception들은 하나의 PortDeviceFailure exception으로 감싸서 던진다.</li>
    </ul>
    <h2 id="04"><a href="#04">04. 실무 예외 처리 패턴</a></h2>
    <h3 id="getorelse"><a href="#getorelse">getOrElse</a></h3>
    <blockquote>
      <p>예외 대신 기본 값을 리턴합니다.</p>
    </blockquote>
    <ol>
      <li>null이 아닌 기본 값</li>
      <li>도메인에 맞는 기본 값</li>
    </ol>
    <h4 id="null"><a href="#null">null이 아닌 기본 값</a></h4>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Bad</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> employees <span class="token operator">=</span> <span class="token function">getEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">if</span> <span class="token punctuation">(</span>employees <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> e <span class="token operator">:</span> employees<span class="token punctuation">)</span><span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    totalPay <span class="token operator">+=</span> e<span class="token punctuation">.</span><span class="token function">getPay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>위 코드를 보면, getEmployees를 설계할 때, 데이터가 없는 경우를 null로 표현했는데, 다른 방법이 없을까?</p>
    <p>null을 리턴한다면 이후 코드에서 모두 null 체크를 해야하는 번거로움이 있다.</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Good</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> employees <span class="token operator">=</span> <span class="token function">getEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> e <span class="token operator">:</span> employees<span class="token punctuation">)</span><span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">  totalPay <span class="token operator">+=</span> e<span class="token punctuation">.</span><span class="token function">getPay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> <span class="token function">getEmployees</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token comment">/* 데이터가 없는 경우 */</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">      <span class="token keyword">return</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>위 코드처럼, 복수형의 데이터를 가져올 때는 데이터의 없음을 의미하는 컬렉션을 리턴하면 된다.</p>
    <p><strong>null 보다 size가 0인 컬렉션이 훨씬 안전하다.</strong></p>
    <p>하지만 빈 컬렉션, 빈 문자열을 적용할 수 없는 경우라면 어떻게 해야할까?</p>
    <h4 id=""><a href="#">도메인에 맞는 기본 값</a></h4>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Bad</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token class-name">UserLevel</span> userLevel <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">try</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token class-name">User</span> user <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findByUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    userLevel <span class="token operator">=</span> user<span class="token punctuation">.</span><span class="token function">getUserLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UserNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    userLevel <span class="token operator">=</span> <span class="token class-name">UserLevel</span><span class="token punctuation">.</span><span class="token constant">BASIC</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// UserLevel을 이용한 처리</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>위 코드는, 호출부에서 예외 처리를 통해 userLevel 값을 처리한다.</p>
    <p>코드를 계속 읽어나가다보면 논리적인 흐름이 끊긴다는 것을 알 수 있다.</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Good</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">UserLevel</span> <span class="token constant">USER_BASIC_LEVEL</span> <span class="token operator">=</span> <span class="token class-name">UserLevel</span><span class="token punctuation">.</span><span class="token constant">BASIC</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">public</span> <span class="token class-name">UserLevel</span> <span class="token function">getUserLevelOrDefault</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token keyword">try</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            <span class="token class-name">User</span> user <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findByUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            <span class="token keyword">return</span> user<span class="token punctuation">.</span><span class="token function">getUserLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">UserNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            <span class="token keyword">return</span> <span class="token constant">USER_BASIC_LEVEL</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>
      예외 처리를 데이터를 제공하는 쪽에서 처리해서 호출부 코드를 깔끔하게 만들 수 있다. (도메인에 맞는 기본값을 도메인
      서비스에서 관리)
    </p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// 호출부</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token class-name">UserLevel</span> userLevel <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">getUserLevelOrDefault</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>이렇게 논리적인 흐름도 끊기지 않으면서, 도메인에 맞는 기본값을 제공할 수 있다.</p>
    <p>하지만 또 도메인에 맞는 기본값을 제공할 수 없는 경우가 있다.</p>
    <h3 id="getorelsethrow"><a href="#getorelsethrow">getOrElseThrow</a></h3>
    <blockquote>
      <p>null 대신 예외를 던진다. (기본값이 없다면)</p>
    </blockquote>
    <h4 id="null"><a href="#null">null 대신 예외를 던진다.</a></h4>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Bad</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token class-name">User</span> user <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findByUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token comment">// user를 이용한 처리</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>user를 사용하는 쪽에서 매번 null 체크를 해야한다.</p>
    <p>가독성 뿐 아니라 안정성도 떨어진다.</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Good</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserService</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">UserLevel</span> <span class="token constant">USER_BASIC_LEVEL</span> <span class="token operator">=</span> <span class="token class-name">UserLevel</span><span class="token punctuation">.</span><span class="token constant">BASIC</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    </div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">public</span> <span class="token class-name">User</span> <span class="token function">getUserOrElseThrow</span><span class="token punctuation">(</span><span class="token class-name">String</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token class-name">User</span> user <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findByUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"사용자가 존재하지 않습니다. userId="</span> <span class="token operator">+</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token keyword">return</span> user<span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// 호출부</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token class-name">User</span> user <span class="token operator">=</span> userService<span class="token punctuation">.</span><span class="token function">getUserOrElseThrow</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// user를 이용한 처리</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>이렇게 null 대신 예외를 던지면, 호출부에서는 매번 null 체크를 할 필요 없이 안전하게 사용할 수 있다.</p>
    <h3 id="null"><a href="#null">파라미터의 null을 점검하라</a></h3>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Bad</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MetricsCalculator</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">xProjection</span><span class="token punctuation">(</span><span class="token class-name">Point</span> p1<span class="token punctuation">,</span> <span class="token class-name">Point</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token keyword">return</span> <span class="token punctuation">(</span>p2<span class="token punctuation">.</span>x <span class="token operator">-</span> p1<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// 호출부</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">calculator<span class="token punctuation">.</span><span class="token function">xProjection</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NullPointerException 발생</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <p>파라미터로 null을 리턴하는 것도 나쁘지만 null을 메서드로 넘기는 것은 더 나쁘다.</p>
    <p>(null을 메서드의 파라미터로 넣어야 하는 API를 사용하는 경우가 아니면 null을 넘기지 말자)</p>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// Good</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MetricsCalculator</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">xProjection</span><span class="token punctuation">(</span><span class="token class-name">Point</span> p1<span class="token punctuation">,</span> <span class="token class-name">Point</span> p2<span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token keyword">if</span> <span class="token punctuation">(</span>p1 <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> p2 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"p1, p2는 null이 될 수 없습니다."</span><span class="token punctuation">)</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">        <span class="token keyword">return</span> <span class="token punctuation">(</span>p2<span class="token punctuation">.</span>x <span class="token operator">-</span> p1<span class="token punctuation">.</span>x<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.5</span><span class="token punctuation">;</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">    <span class="token punctuation">}</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token punctuation">}</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <div class="code-block">
      <CodeCopy>
        <pre><code
            class="language-java">{@html String.raw`<div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content"><span class="token comment">// 호출부</span></div></div><div class="code-line"><div class="code-linenotation"><span class="no-line-number"></span><span class="no-line-diff"></span></div><div class="code-content">calculator<span class="token punctuation">.</span><span class="token function">xProjection</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// IllegalArgumentException 발생</span></div></div>`}</code></pre>
      </CodeCopy>
    </div>
    <h2 id="05-exception"><a href="#05-exception">05. 오픈소스 속 Exception 살펴보기</a></h2>
    <h3 id="apps-android-commons"><a href="#apps-android-commons">apps-android-commons</a></h3>
    <p><ImgZoom src="/cleancode5/page/img_8.png" alt="/cleancode5/page/img_8.png"></ImgZoom></p>
    <p>
      <a
        href="https://github.com/commons-app/apps-android-commons/blob/f8a8f9207028a6fb5a35483c040821f22daf755e/app/src/main/java/fr/free/nrw/commons/bookmarks/pictures/BookmarkPicturesDao.java"
        rel="external">
        Code
      </a>
    </p>
    <h3 id="elasticsearch"><a href="#elasticsearch">Elasticsearch</a></h3>
    <p><ImgZoom src="/cleancode5/page/img_9.png" alt="/cleancode5/page/img_9.png"></ImgZoom></p>
    <p>
      <a
        href="https://github.com/elastic/elasticsearch/blob/main/modules/mapper-extras/src/main/java/org/elasticsearch/index/mapper/extras/ScaledFloatFieldMapper.java#L364"
        rel="external">
        Code
      </a>
    </p>
  </article>
</Post>
