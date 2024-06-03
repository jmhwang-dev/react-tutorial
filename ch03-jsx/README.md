# 3.1 JSX?
## JSX
- A syntax extenxion to JavaScript
- JS 변수에 HTML 코드를 저장할수 있음
    ```JSX
    const element = <h1>Hello, wolrd<h1>;
    ```
### 장점
- 코드가 간결해해져서 가독성이 향상된다.
    ```jsx
    // JSX 사용
    <div>Hello, {name}</div>

    // JSX 사용 안 함
    React.CreateElement('div', null, `Hello. ${name}`);
    ```
- `Injection Attack`을 방어
    - 입력창에 문자나 숫자 같은 일반적인 값이 아닌 소스코드를 입력하여 해당 코드가 실행되도록 만드는 해킹 방법
    ```jsx
    // 안전하지 않은 코드
    const title = response.poteiallyMaliciousInput;
    
    // 안전한 코드: title 변수를 임베딩(삽입)하는 코드.
    const element = <h1>{title}</h1>;
    ```
    - `ReactDOM`은 렌더링하기 전에 임베딩된 값을 모두 문자열로 변환
    - 그렇기 때문에 명시적으로 선언되지 않은 값은 괄호 사이에 들어갈 수 없다. (XSS 방어)
    - XSS
        - cross-site-scripting attacks

## JSX 사용법
#### `{ }`: JSX에서는 중괄호를 사용하면 무조건 자바스크립트 코드가 들어간다.
- HTML 태그 중간에 값을 넣고 싶은 경우
    ```jsx
    const name = "name";
    const element = <h1>안녕, {name}</h1>;

    ReactDOM.render(
        element,
        document.getElementById('root')
    );
    ```

    ```jsx
    function formatName(user) {
        return user.firstName + ' ' + user.lastName;
    }

    const user = {
        firstName = 'jm',
        lastName = 'hwang'
    };

    const element = (
        <h1>
            Hello, {formatName(user)}
        </h1>
    );

    ReactDOM.render(
        element,
        document.getElementById('root')
    );
    ```
- 태그의 속성 값에 값을 넣고 싶은 경우
    ```jsx
    // 1. 큰 따옴표 사에이 문자열 넣기
    const element = <div tabIndex="0"></div>;

    // 2. 중괄호 사에이 자바스크립트 코드 넣기
    const element = <img src={user.avatarUrl}></img>;
    ```
- `children` 정의하기: HTML을 사용하듯 상위 태그가 둘러싸기
    ```jsx
    const element = (
        <div>
            <h1>hello!</h1>
        </div>
    )
    ```