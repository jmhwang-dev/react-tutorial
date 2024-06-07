# 리스트와 키
- 반복되는 엘리먼트들을 렌더링 하기위해 `list`와 `map()`을 사용
- 엘리먼트를 구분하기 위해 `key` 사용
```jsx
const numbers = [1,2,3,4,5];
const listItems = numbers.map((number) => <li>{number}</li>)
```
```jsx
React.DOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
)
```

# 기본적인 리스트 컴포넌트
```jsx
function NumberList(props) {
    const {numbers} = props;
    // map 활용
    const listItems = numbers.map((number) => <li>{number}</li>)

    return (
        <ul>{listItems}</ul>
    )
}
```
```jsx
const numbers = [1,2,3,4,5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
)
```

# 리스트의 키
- 리스트에서 아이템을 구분하기 위한 고유한 문자열
> 키 값은 엘리먼트 사이에서만 고유한 값이면 됨
## 숫자 값을 사용한 키
```jsx
function NumberList(props) {
    const {numbers} = props;
    
    const listItems = numbers.map((number) => 
        // key 활용
        <li key={number.toString()}>{number}</li>
    );

    return (
        <ul>{listItems}</ul>
    )
}
```
```jsx
const numbers = [1,2,3,4,5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
)
```

## `id`를 이용한 키
> `map()` 함수 안에 있는 엘리먼트는 꼭 키가 필요하다.
```jsx
const todoItems = todos.map((todo, index) => 
    // 아이템들의 고유한 ID가 없을 경우에만 사용해야함
    <li key={index}>
        {todo.text}
    </li>
)
```