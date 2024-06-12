# 컨텍스트
- 컴포넌트 트리를 통해 곧바로 컴포넌트에 전달하는 새로운 방식
- 사용 이융
    `props`를 통해 상위 컴포넌트에서 하위 컴포넌트로 전달할 시
        - 컴포넌트의 깊이가 깊어질수록 코드가 지저분해지고 탐색속도가 느려짐
        - 여러 컴포넌트가 동일한 데이터를 사용하는 경우 `props`를 매번 넘겨 주어야하기 때문에 비효율적
## 구체적인 사용 예시
- 여러 컴포넌트에서 자주 필요로하는 데이터에 컴포넌트들이 접근해야하는 경우
    - 사용자의 로그인 여부, 로그인 정보, UI 테마, 현재 선택된 언어 등

### 기존 방식
```jsx
function App(props) {
    return <Toolbar theme="dark" />;
}

function Toolbar(props) {
    // 본 컴포넌트는 `Themebutton`에 `theme`을 념겨주기 위해서 `theme` prop을 갖고 있어야한다.
    // 현재 `theme`을 알아야 하는 모든 `Themebutton`에 대해서 props로 전달해야함 -> 비효율적
    return (
        <div>
            <Themebutton theme={props.theme} />
        </div>
    );
}

function ThemeButton(props) {
    return <Button theme={props.theme} />;
}
```




### context 적용
```jsx
// 1. `theme`의 기본 값은 `light`
const ThemeContext = React.createContext('light');

function App(props) {
    return (
        // 2. `Provider`를 사용하여 `App`의 하위 컴포넌트들은 `theme` 데이터(dark)을 사용한다고 명시
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    )
}

function Toolbar(props) {
    return (
        // 3. 중간에 위치한 본 컴포넌트는 `theme`을 전달할 필요가 없음
        <div>
            <ThemeButton />
        </div>
    )
}

function ThemeButton(props) {
    return (
        // 4. `App`의 하위 컴포넌트에서 `dark`를 사용한다고 명시 했으므로 여기서는 `dark`로 적용됨
        // 5. 만약 `Provider`가 없을 경우 기본값인 `light`를 사용
        <ThemeContext.Consumer>
            {value => <Button theme={value}> />}
        </ThemeContext.Consumer>
    )
}
```

# Context API
## 1. `React.createContext`
```jsx
const MyContext = React.createContext(기본값);
```
## 2. `Context.Provider`
```jsx
<Mycontext.Provider value={/* some value */}>
```
- `Provider` 컴포넌트로 감싸진 모든 `consumer` 컴포넌트는 `value prop`이 바뀔 때마다 재렌더링된다.
- 즉, 상위 컴포넌트가 업데이트 대상이 아니더라도 하위에 있는 컴포넌트가 컨텍스트를 사용한다면 하위 컴포넌트에서는 업데이트가 일어난다.
- `value` 변화를 판단하는 기준은 자바스크립트 객체의 `Object.is`라는 함수와 같은 방식으로 판단한다.
### Note
> `Provider`의 부모 컴포넌트가 재런더링이 되면 하위 컴포넌트`value prop`을 위한 새로운 객체가 매번 생성 <br>
> : 하위 컴포넌트가 불필요하게 렌더링될 수 있다.
```jsx
function App(props) {
    return (
        <MyContext.Provider value={{ something: 'something'}}>
            <Toolbar />
        </MyContext.Provider>
    );
}
```
> 이를 방지하기 위해 `value`를 직접 넣는 것이 아니라 컴포넌트의 `state`로 옮기고 해당 `state`를 넣어주어야한다.
```jsx
function App(props) {
    const [value, setValue] = useState({something: 'something'});

    return (
        <MyContext.Provider value={value}>
            <Toolbar />
        </MyContext.Provider>
    )
}
```
## 3. `Class.contextType`
- 클래스 컴포넌트에서 컨텍스트의 데이터를 구독하는 방법
- `Provider` 하위에 있는 클래스 컴포넌트에서 컨텍스트의 데이터에 접근하기 위해 사용하는 것
> 클래스 컴포넌트는 현재 거의 사용하지 않기 때문에 이런 방법이 있다는 정도로만 참고
```jsx
class Myclass extends React.Component {
    componentDidMount() {
        let value = this.context;
        /* MyContext의 값을 이용하여 원하는 작업을 수행 */
    }

    componentDidUpdate() {
        let value = this.context;
        /* MyContext의 값을 이용하여 원하는 작업을 수행 */

    }

    componentWillUnmount() {
        let value = this.context;
        /* MyContext의 값을 이용하여 원하는 작업을 수행 */

    }

    render() {
        let value = this.context;
        /* MyContext의 값에 따라서 컴포넌트들을 렌더링 */
    }
}

MyClass.contextType = MyContext;
```
> 이 API를 사용하면 단 한나의 컨텍스트만을 구독할 수 있다.

## 4. `Context.Consumer`
- 함수 컴포넌트에서 컨텍스트를 구독하는 방법
```jsx
<MyComtext.Consumer>
    {value => /* 컨텍스트의 값에 따라서 컴포넌트들을 렌더링 */}
</MyComtext.Consumer>
```
### function as a child
- 컴포넌트의 자식으로 함수가 올 수 있음을 의미
- `Context.Consumer`로 감싸주면 자식으로 들어간 함수가 현재 컨텍스트의 `value`를 받아서 리액트 노드로 리턴한다.
    - 만약 상위 컴포넌트에 `Provider`가 없다면 이 `value` 파라미터는 `createContext()`를 호출할 때 넣는 기본 값이 적용된다.
```jsx
// prop으 직접 선언하여 컴포넌트 전달
<Profile childeren={name => <p>이름: {name}</p>}>
```

```jsx
// children으로 컴포넌트 전달
<Profile>
    {name => <p>이름: {name}</p>}
</Profile>
```

## 5. `Context.displayName`
- 컨텍스트 객체는 `displayName` 이라는 속성을 갖는다.
- 크롬의 리액트 개발자 도구에서 컨텍스트의 `Provider`나 `Consumer`를 표시할 때, `displayName`을 사용한다.
```jsx
// 컨텍스트 객체 이름 표시
const MyContext = React.createContext(/* some value */);
MyContext.displayName = "MyDisplayName";
```

```jsx
// 개발자 도구에서 "MyDisplayName.Provider"로 표시됨
<MyContext.Provider>
```
```jsx
// 개발자 도구에서 "MyDisplayName.Consumer"로 표시됨
<MyContext.Consumer>
```

# 여러 개의 컨텍스트 사용하기
```jsx
const ThemeContext = React.createContext('light');

const UserContext = React.createContext({
    name: "Guest";
})

function Layout() {
    return (
        <div>
            <Sidbar />
            <Content />
        </div>
    )
}

class App extends React.Component {
    render() {
        const {signedInUser, theme} = this.props;

        return (
            <ThemeContext.Provider value={theme}>
                <UserContext.Provider value={signedInUser}>
                    <Layout />
                </UserContext.Provider>
            </ThemeContext.Provider>
        )
    }
}

function Content() {
    // 컨텍스트 컴포넌트는 2개의 컨텍스트로부터 값을 가져와서 렌더링 함
    return (
        <ThemeContext.Consumer>
            {theme => (
                <UserContext.Consumer>
                    user => (
                        <ProfilePage user={user} theme={theme} />
                    )
                </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
    )
}
```
> 2개 이상의 컨텍스트 값이 자주 함께 사용된다면, 모든 값을 제공하는 별도의 Render prop 컴포넌트를 직접 만드는 것을 고려하는 것이 좋음

# `usecontext`
- 7장에서 배운 훅을 이용한 방법. 기존 방법 보다 컨텍스트를 쉽게 사용할 수 있다.
    - 기존 방법
        - 클래스 컴포넌트에서 컨택스트 사용하는 방법
        - 함수 컴포넌트에서 `Provider`, `Consumer`를 사용하는 방법
```jsx
const MyContext = React.createContext('')
```
```jsx
function MyComponent(props) {

    const value = useContext(MyContext);

    return (
        ...
    );
}
```