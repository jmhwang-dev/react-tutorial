# FORM
- 사용자로부터 입력을 받기 위한 HTML 요소
## 제어 컴포넌트 (Controlled Component)
- 사용자가 입력한 값에 접근하고 제어할 수 있도록 해주는 컴포넌트
- 그 값이 리액트의통제를 받는 input form element
> HTML FORM은 자체적으로 `state`를 관리하기 때문에, 자바스크립트에서 접근하기가 쉽지않다.<br>
> 이를 해결하고자 리액트에서는 제어 컴포넌트를 사용하여 `state`를 관리한다.
### `input`
#### HTML
```html
<!-- html에서의 form-->
<form>
    <label>
        이름:
        <input type="text" name="name" />
    </label>
    <button type="submit">제출</button>
</form>
```


#### 리액트 제어 컴포넌트
```jsx
function NameForm(props) {
    const [value, setValue] = usetState('');

    const handleChange = (event) => {
        // event: 이벤트 객체
        // event.target.value: 이벤트 객체(여기서는 input)의 value 속성
        setValue(event.target.value)
    }

    const handleSubmit = (event) => {
        alert('입력한 이름: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                이름:
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <button type="submit">제출</button>
        </form>
    )
}
```
### `textarea`
#### HTML
- 여러 줄에 걸쳐서 나올 정도로 긴 텍스트를 입력받기 위한 HTML 태그
```html
<!-- textarea의 children은 텍스트 내용이 된다.-->
<textarea>
    hi
</textarea>
```
#### 리액트 제어 컴포넌트
```jsx
function RequestForm(props) {
    const [value, setValue] = useState('요청사항을 입력하세요');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('입력한 요청사항: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                요청사항:
                <textarea value={value} onChange={handleChange} />
            </label>
            <button type="submit">제출</button>
        </form>
    )
}
```

### `select`
#### HTML
- 드롭다운 목록을 보여주기 위한 HTML 태그
```html
<select>
    <option value="apple">사과</option>
    <option value="banana">바나나</option>
    <option value="grape" selected>포도</option>
</select>
```

### `select`
#### 리액트 제어 컴포넌트
```jsx
function FruitSelect(props) {
    const [value, setValue] = useState('grape');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('선택한 과일:' + value);
        event.preventDefault();
    }
    // html에서는 선택된 옵션을 `selected`로 표시했음
    // 리액트 제어 컴포넌트는 `value`로 설정함
    // 다중 선택 시: select multiple={true} value={['B', 'C]}>

    return (
        <form onSubmit={handleSubmit}>
            <label>
                choose fruit
                <select multiple={false} value={value} onChange={handleChange}>
                    <option value="apple">사과</option>
                    <option value="banana">바나나</option>
                    <option value="grape">포도</option>
                </select>
            </label>
            <button type="submit">제출</button>
        </form>
    )
}
```

### `File input`
#### HTML
```html
<input type="file" />
```
#### 리액트
> `File input` 태그는 그 값이 읽기전용이기 때문에 리엑트에서는 비제어 컴포넌트(uncontrolled component)가 된다.

## 여러 개의 입력 다루기
```jsx
function Reservation(props) {
    // 2가지 입력
    const [haveBreakfast, setHaveBreakfast] = useState(true);
    const [numberOfGuest, setNumberOfGuest] = useState(2);

    const handleSubmit = (event) => {
        alert(`아침식사 여부: ${haveBreakfast}, 방문객 수: ${numberOfGuest}`)
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                아침식사 여부: <input type="checkbox" checked={haveBreakfast} onChange={(event) => { setHaveBreakfast(event.target.checked); }} />
            </label>
            
            <br />

            <label>
                방문객 수: <input type="number" value={numberOfGuest} onChange={(event) => {setNumberOfGeust(event.target.value); }} />
            </label>
            <button type="submit">제출</button>
        </form>
    )
}
```

## Input Null Value
- value prop은 넣되 자유롭게 입력할 수 있게 만들고 싶은 경우
```jsx
const rootNode = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(<input value="hi">, rootNode)
setTimeout(() => {ReactDOM.render(<input value={null} />, rootNode)}, 1000);
```