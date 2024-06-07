# 조건부 렌더링
- 어떠한 조건에 따라서 렌더링이 달라지는 것
```jsx
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Sign up!<h1>;
}
```
```jsx
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}
```
## trusthy, Falsy
- truthy: `true`는 아니지만 `true`로 여겨지는 값
```js
true, {}, [], 42, "0", "false"
```
- falsy: `false`는 아니지만 `false`로 여겨지는 것
```js
false, 0, -0, '', "", ``, null, undefined, NaN
```

# 엘리먼트 변수
- 리액트 엘리먼트를 변수처럼 다루는 방법
```jsx
function LoginButton(props) {
    return (
        // React DOM - onClick 처럼 camel case로 작성
        <button onClick={props.onClick}>
            로그인
        </button>
    )
}
function LogoutButton(props) {
    return (
        // React DOM
        <button onClick={props.onClick}>
            로그아웃
        </button>
    )
}
```
```jsx
function LogintControl(props) {
    const [isLoggedIn, setLoggedIn] = useState(false)

    const handleLoginClick = () => {
        setIsLoggedIn(true);
    }
    const handleLogoutClick = () => {
        setIsLoggedIn(false);
    }
    
    // element variable
    let button;
    if (isLoggedIn) {
        button = <LogoutButton onClick={handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={handleLoginClick} />;
    }

    return (
        <div>
            <Greeting isLoggedIn={isLoggedIn} />
            {button}
        </div>
    )
}
```

# 인라인 조건
- Inline: 코드를 별도로 분리된 곳에 작성하지 않고 해당 코드가 필요한 곳 안에 직접 집어 넣음
- 인라인 조건: 조건문을 코드 안에 집어 넣는 것
## 인라인 If
- `if`문을 필요한 곳에 직접 집어 넣어서 사용하는 방법
- `&&`라는 논리연산자를 이용
### 단축평가
- 첫번째 조건문이 `true`이면 두번째 조건문을 평가
- 첫번째 조건문이 `false`이면 두번째 조건문은 평가하지 않음
```js
true && expression // 결과: expressiong
false && expression // 결과: false
```
### 예시
```jsx
function Mailbox(props) {
    const unreadMessage = props.unreadMessages;

    return (
        <div>
            <h1>안녕하세요</h1>
            {unreadMessage.length} > 0 &&
                <h2>
                    현재 {unreadMessages.length}개의 읽지 않은 메시지가 있습니다.
                </h2>
        </div>
    )
}
```
> 주의사항
- `&&` 연산자를 사용할 때, 조건문에 falsy expression을 사용하면 뒤에 나오는 expression은 평가가 된다.
- 그러나 Falsy expression의 결과 값이 그대로 리턴된다.
    ```jsx
    function Counter(props) {
        const count = 0;

        return (
            <div>
                {count && <h1>현재 카운트: {count}</h1>}    // 결과: 0 -> falsy expression(count) 반환됨
            </div>   
        )
    }
    ```
## 인라인 If-Else
- 삼항연산자 사용
```
조건문 ? 참일경우 : 거짓일 경우
```

### 예시 1
```jsx
function UserStatus(props) {
    return (
        <div>
            현재 상태: {props.isLoggedIn? '로그인' : '로그인하지 않음'}
        </div>
    )
}
```

### 예시 2
```jsx
function LoginButton(props) {
    return (
        // React DOM - onClick 처럼 camel case로 작성
        <button onClick={props.onClick}>
            로그인
        </button>
    )
}
function LogoutButton(props) {
    return (
        // React DOM
        <button onClick={props.onClick}>
            로그아웃
        </button>
    )
}
```
```jsx
function LoginControl(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setIsLoggedIn(true);
    }
    const handleLogoutClick = () => {
        setIsLoggedIn(false);
    }

    return (
        <div>
            <Greeting isLoggedIn={isLoggedIn} />
            // 삼항연산자 적용
            {isLoggedIn ? <LogoutButton onClick={handleLogoutClick /}> : <Loginbutton onClick={handleLoginClick} />}
        </div>
    )
}
```
# 컴포넌트 렌더링 막기
- `null`을 리턴하면 됨
```jsx
function WarningBanner(props) {
    if (!props.waring) {
        return null;
    }
    return (
        <div>경고</div>
    );
}
```
```jsx
function MainPage(props) {
    const [showWarning, setShowWarning] = usetState(false);

    const handleToggleClick = () => {
        setShowWarning(prevShowWarning => prevShowWarning);
    }

    return (
        <div>
            <WarningBanner waring={showWarning} />
            <button onClick={handleToggleClick}>
                {showWarning ? '감추기': "보이기"}
            </button>
        </div>
    )
}
```