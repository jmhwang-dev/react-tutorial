# 4.1 Element
## Element
- 리액트 앱의 가장 작은 빌딩 블록
- 브라우저에서 elements 탭에서 확인 가능
    - 브라우저에서 확인되는 element들은 DOM element이며, 실제로 화면에서 볼 수 있는 것들임
### React Element vs DOM Element
- DOM Element: 실제 브라우저의 DOM에 존재하는 엘리먼트
- React Element: 리액트의 virtual DOM에 존재하는 엘리먼트
```jsx
// 오른쪽: React.createElement() 함수를 사용하여 생성되는 element
const element = <h1>Hello, world</h1>;
```

## Element 형태
- JS 객체 형태로 존재
    - type
    - props
    - children
    - `React.createElement()`의 파라미터가 위 파라미터를로 구성된 것을 보면 알 수 있음
        ```
        React.createElement(
            type,
            props?,
            ...children
        )
        ```
- 이 객체는 immutable (불변)

### `React.createElement()` 함수가 동작하는 과정
#### JSX로 구현한 `ConfirmDialog` 컴포넌트
> 컴포넌트: 재사용 가능한 UI 블록을 정의하는 함수 또는 클래스
```jsx
function Button(props) {
    return (
        <button className={`bg-${props.color}`}>
            <b>{props.children}</b>
        </button>
    )
}
```

```jsx
function ConfirmDialog(props) {
    return (
        <div>
            <p>확인 후 아래 버튼 클릭</p>
            <Button color="green">확인</Button>
        </div>
    )
}
```

#### 실제 `ConfirmDialog` 컴포넌트의 엘리먼트
> 엘리먼트: UI 특정 부분을 설명하는 객체
```js
{
    type: 'div'
    props: {
        children: [
            {
                type: 'p',
                props: {
                    children: '확인 후 아래 버튼 클릭'
                }
            },
            {
                type: 'button',
                props: {
                    className: 'bg-green',
                    children: [
                        type: 'b',
                        props: {
                            children: '확인'
                        }
                    ]
                }
            }
        ]
    }
}
```
> 컴포넌트 렌더링을 위해서는 모든 컴포넌트가 `createElement()` 함수를 통해 엘리먼트로 변환된다.

# 4.2 element rendering

## Root DOM node
    ```html
    <div id='root'></div>
    ```
- `<div>` 태그 안에 있는 모든 것이 리액트 DOM에서 관리된다.
- 오직 리액트 만으로 만들어진 모든 웹사이튿ㄹ은 단 하나의 Root DOM node를 갖는다.
- 반면, 기존에 있던 웹사이트에 추가적으로 리액트를 연동하게 되면 여러 개의 Root DOM node를 갖는다.

## Rendering
```jsx
const element = <h1>리액트!</h1>
ReactDOM.render(element, document.getElementById('root'));
```
- 렌더링
    - 리액트 엘리먼트가 렌더링된다. == `Virtual DOM`에서 `실제 DOM`으로 이동되는 과정
- 렌더링은 `React.DOM.render()` 함수를 사용
    - 첫번째 파라미터인 `리액트 엘리먼트`를, 두번쨰 파라미터인 `HTML 엘리먼트` 객체에 렌더링 하는 역할
> 리액트 엘리먼트는 `Virtual DOM`에 존재하고, HTML 엘리먼트는 `실제 브라우저 DOM`에 존재한다.

### 과정
1. JSX -> `React.createElement()` -> 리액트 엘리먼로 변환<br>
2. 여러 리액트 엘리먼트들 -> `React` -> Virtual DOM 구성<br>
3. Virtual DOM -> `ReactDOM.render()` -> 실제 DOM<br>