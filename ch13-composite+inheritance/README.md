# 합성과 상속
## 합성
- 여러 개의 컴포넌트르 합쳐서 새로운 컴포넌트를 만드는 것
### 1. containment
- 하위 컴포넌트를 포함하는 형태의 합성
- `props.children`을 통해 하위 컴포넌트를 하나로 모아서 제공
#### 하나의 children 집합이 필요한 경우
```jsx
// 자신의 하위 컴포넌트를 모두 포함(containment)하는 컴포넌트
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )   
}
```
```jsx
// FancyBorder를 사용하는 컴포넌트
function WelcomeDialog(props) {
    return (
        <FancyBorder color="blue">
            <!-- p, h1은 props.children으로 넘어감 -->
            <h1 className="Dialog-title">어서오세요</h1>
            <p className="Dialog-message">우리 사이트에 방문하신 것을 환영합니다.</p>
        </FancyBorder>
    )
}
```
#### 여러 개의 children 집합이 필요한 경우
```jsx
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}
```
```jsx
function App(props) {
    return (
        <SplitPane left={<Contacts />} right={<Chat />} />
    );
}
```

### 2. Specialization
- 범용적인 개념을 구별되게 구체화하는 것
```jsx
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog_message">{props.message}</p>
        </FancyBorder>
    )
}
```
```jsx
// `Dialog`의 메시지를 어떻게 사용하느냐에 따라 다이얼의 사용을 정할 수 있다.
function WelcomeDialog(props) {
    return (
        <Dialog title="어서오세요" message="우리 사이트에 방문하신 것을 환영홥니다." />
    )
}
```

### 3. Containment + Specialization
```jsx
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )   
}
```
```jsx
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">{props.title}</h1>
            <p className="Dialog_message">{props.message}</p>
            <!-- containment -->
            {props.children}
            <!-- end -->
        </FancyBorder>
    )
}
```
```jsx
function SignUpDialog(props) {
    const [nickname, setNickname] = useState('');

    const handleChange = (event) => {
        setNickname(event.target.value);
    }

    const handleSignUp = () => {
        alert(`어서 오세요, ${nickname}님!`);
    }

    return (
        // specialization
        <Dialog title="화성 탐사 프로그램" message="닉네임을 입력해 주세요.">
            <input value={nickname} onChange={handleChange} />
            <button onClick={handleSignUp}>가입하기</button>
        </Dialog>
        // end
    )
}
```

## 상속
> 메타에서도 상속 기반 컴포넌트 생성 방법을 찾아보려 했으나 그러지 못함. 상속 보다는 합성을 사용해서 개발하는 것이 더 좋은 방법