# 5.1 Component
- `props`를 입력으로 받아서 그에 맞는 리액트 엘리먼트를 생성할 수 있도록 정의한 클래스 또는 함수
- ex) 컴포넌트: 붕어빵 틀, 엘리먼트: 붕어빵
# 5.2 Props
- 리액트 컴포넌트의 속성
- 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 객체
## 속성. 그것에 대하여
### Attribute
- 해당 HTML 요소의 추가적인 정보
#### 예시
- `<img>` 요소의 `src` 속성은 이미지 파일의 경로를 지정
- `<a>` 요소의 `href` 속성은 링크의 대상 URL을 지정
#### 특징
- HTML 코드에 직접 명시됩니다.
- JavaScript로는 속성에 접근할 수 있지만, 이는 HTML 속성(attribute)의 값으로만 접근할 수 있습니다.
- JavaScript에서 속성 값이 변경되어도 실제 DOM에는 반영되지 않습니다.
### Property
- 객체의 속성
#### 특징
- JavaScript 객체로 표현됩니다.
- JavaScript로 속성에 직접 접근할 수 있습니다.
- 속성 값의 변경은 해당 요소의 현재 상태를 반영하며, 동적으로 변경되어 실제 DOM에 반영될 수 있습니다.

## Props의 특징
- 모든 리액트 컴포넌트는 그들의 props에 관해서는 Pure 함수 같은 역할을 해야한다.
### pure 함수, impure 함수
- 입력값을 변경하지 않으며, 같은 입력 값에 대해서는 항상 같은 출력값을낸다.
```js
// pure
function sum(a, b) {
    return a + b;
}

// impure
function withdraw(account, amount) {
    // 인자로 받은 account의 속성이 변경됨
    account.total -= amount;
}
```

## 사용법
### JSX를 사용하는 경우
```jsx
function App(props) {
    return (
        <Layout 
            width={2560}
            height={1440}
            header={
                <Header title="my blog" />
            }
            footer={
                <Footer />
            }
        />
    );
}
```
- `{ }`: 중괄호를 사용하면 무조건 자바스크립트 코드가 들어간다.
    - 문자열 이외에 정수, 변수, 다른 컴포넌트 등이 들어갈 경우에는 중괄호를 사용해야한다.
    - 문열도 중괄호로 감싸도 된다.

### JSX를 사용하지 않는 경우 (참고용)
```js
React.createElement(
    Profile,
    {
        name: "my blog",
        introdution: "hi",
        viewCount: 1500
    },
    null
);
```

# 5.3 컴포넌트의 종류
- 함수형 컴포넌트를 주로 사용하는데, 클래스 컴포넌트에 대해서도 알아야함.
- `Hook`: 함수형 컴포넌트를 개선하는 과정에서 개발된 것
## 함수 컴포넌트
```jsx
fucntion Welcome(props) {
    return <h1>hi, {props.name}</h1>;
}
```
## 클래스 컴포넌트
```jsx
class Welcome extends React.Component {
    render() {
        // React.Component를 상속 받아 this.props를 사용
        return <h1>hi, {this.props.name}</h1>;
    }
}
```
## 컴포넌트 이름 짓기
- 항상 대문자로 시작해야 함
    - 리액트는 소문자로 시작하는 컴포넌트를 DOM 태그로 인식하기 때문
```jsx
// HTML div 태그로 인식
const element = <div />;

// Welcome이라는 리액트 컴포넌트로 인식
const element = <Welcome name='jm' />;
```

## 컴포넌트 렌더링
```jsx
function Welcome(props) {
    return <h1>hi, {props.name}</h1>
}

const element = <Welcome name="jm" />

ReactDOM.render(
    element,
    document.getElementById('root')
)
```

## 컴포넌트 합성
- 여러 개의 컴포넌트를 합쳐서 하나의 컴포넌트를 만듬
```jsx
function Welcome(props) {
    return <h1>hi, {props.name}</h1>
}

function App(props) {
    return (
        <div>
            <Welcome name="a" />
            <Welcome name="b" />
            <Welcome name="c" />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
```
> 만약 기존 웹페이지에 리액트를 연동한다면 Root Node가 1개가 아닐 수 있기 때문에, 이런 구조가 되지 않을 수 있다.

## 컴포넌트 추출
- 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만든다.
- 이를 잘 활용하면 컴포넌트의 재사용성이 올라간다.

### 추출 전
```jsx
function Comment(props) {
    return (
        <div className="comment">
            {/* 추출 전 */}
            <div className="user-info">
                {/* 추출 전 */}
                <img className='avatar'
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                />
            </div>
            
            <div className="user-info-name">
                {props.author.name}
            </div>

            <div className="comment-text">
                {props.text}
            </div>

            <div className="comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
```

### 추출 후
```jsx
// 추출 1: Avatar
function Avatar(props) {
    return (
        <img className='avatar'
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}

// 추출 2: UserInfo
function UserInfo(props) {
    return (
        <div className="user-info">
            <Avatar user={props.user} />
            <div className="user-info-name">
                {props.user.name}
            </div>
        </div>
    )
}

// 추출 적용
function Comment(props) {
    return (
        <div className="comment">
            <UserInfo user={props.author} />
            <div className="comment-text">
                {props.text}
            </div>

            <div className="comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
```