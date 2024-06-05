# 이벤트 핸들러
- 이벤트가 발생했을 때 해당 이벤트를 처리하는 함수
```html
<!-- html DOM -->
<button onclick="activate()">Activate</button>
```
```html
<!-- React DOM --> 
<button onClick={activate}>Activate</button>
```

## 에시 - 클래스 컴포넌트로 이벤트 핸들러 bind
```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isToggleOn: true};
        this.handleClick = this.handleClick.bind(this); // callback에서 `this`를 사용하기 위해서는 바인딩 필수
    }

    handleClick() {
        this.setState(pervState => ({
            isToggleOn: !prevState.isToggleOne
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'On':'Off' }
            </button>
        )
    }
}
```
## `bind`
- 기본적으로 클래스 함수들은 bind 되지 않는다.
- bind를 하지 않으면 `this.handleClick`은 global scope에서 호출됨
- global scope에서 `this.handleClick`은 `undegined`이므로 사용할 수가 없음
> 이것은 리액트에만 해당되는 내용이 아니라 자바스크립트 함수의 동작원리 중 일부이다.

### 1. 클래스 필드 문법을 사용하여 bind
> class로 컴포넌트를 만드는 경우는 거의 없기 때문에 참고로만 알아두기
```jsx
class MyButton extends React.Component{
    handleClick = () => {
        console.log('this is:', this)
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                클릭
            </button>
        )
    }
}
```

### 2. arrow function을 사용하여 bind
```jsx
class MyButton extends React.Component{
    handleClick = () => {
        console.log('this is:', this)
    }

    render() {
        return (
            <button onClick={()=>this.handleClick()}>
                클릭
            </button>
        )
    }
}
```

## 예시 - 함수 컴포넌트로 이벤트 핸들러 bind
```jsx
// 방법 1. 함수 안에 함수로 정의
function Toggle(props) {
    const [isToggleOn, setIsToggleOn] = useState(false);

    function handleClick() {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }
    return (
        <button onClick={handleClick}>
            { isToggleOn ? "on":"off"}
        </button>
    )
}
```
```jsx
// 방법 2. 화살표 함수 이용하여 정의
function Toggle(props) {
    const [isToggleOn, setIsToggleOn] = useState(false);

    function handleClick = () => {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }
    return (
        <button onClick={handleClick}>
            { isToggleOn ? "on":"off"}
        </button>
    )
}
```

# 이벤트 핸들러에 arguments 전달하기
```jsx
function MyButton(props) {
    const handleDelete = (id, event) => {
        console.log(id, event.target)
    }

    return (
        <button onClick={(event) => handleDelete(1, event)}>삭제하기</button>
    )
}
```