# useState
- state를 사용하기 위한 훅
## 사용 
```jsx
import React, {useState} from "react";

function Counter(props) {
    var count = 0

    return (
        <div>
            <!-- 사용 전: 버튼 클릭시 매번 재렌더링 되므로 count 증가가 반영되지 않음 -->
            <button onClick={() => count++}>
                클릭
            </button>
        </div>
    )
}
```
## 사용 후
```jsx
import React, {useState} from "react";

function Counter(props) {
    // useState 사용
    const [count, setCount] = usetState(0);

    return (
        <div>
            <!-- 사용 후: 함수의 변수로 사용하게되어 count 증가가 반영 -->
            <button onClick={() => setCount(count + 1)}>
                클릭
            </button>
        </div>
    )
}
```

# useEffect
- 리액트의 함수 컴포넌트에서 사이드 이펙트를 실행할 수 있도록 해주는 훅
- 생명주기 함수와 동일한 기능을 수행
    - `componentDidMount()`
    - `componentDidUpdate()`
    - `componentWillUnmount()`
- 이팩트 함수가 마운트와 언마운트시 단 한 번씩만 실행되게 하고 싶으면, 의존성 배열에 빈 배열을 넣으면 된다.

## 구조
```jsx
useEffect(() => {
    // 컴포넌트가 마운트 된 이후,
    // 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행됨
    // 의존성 배열에 빈 배열을 넣으면 마운트와 언마운트 시에 단 한번씩만 실행됨
    // 의존성 배열 생략 시 컴포넌트 업데이트 마다 실행됨
    ...
    return () => {
        // 컴포넌트가 마운트 해제되기 전에 실행됨
        ...
    }
}, [의존성 변수1, 의존성 변수2 ...]);
```


## `componentDidMount()`, `componentDidUnmount()`와 동일한 기능
```jsx
import React, { useState, useEffect } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);

    // componentDidMount, componentDidUpdate와 비슷하게 작동
    // 의존성 배열이 없으면 DOM이 변경된 이후에 해당 이펙트 함수를 실행하라
    useEffect(() => {
        document.title = `${count}번 클릭 했습니다.`;
    })

    return (
        <div>
            <p> 총 {count}번 클릭했습니다. </p>
            <button onClick={()=>setCount(count+1)}>
                클릭
            </button>
        </div>
    );
}
```
## `componentWillUnmount()`와 동일한 기능
```jsx
import React, { useState, useEffect } from "react";

function Counter(props) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    // useEffect()는 여러 개 사용할 수 있음
    useEffect(() => {
        document.title = `총 ${props.count}번 클릭했습니다.`;
    }, [props.count]); // 의존성 배열 추가

    useEffect(() => {
        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);

        // useEffect()에서 리턴하는 함수는 컴포넌트가 마운트 해제될 때 호출됨
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    }, [props.user.id]); // 의존성 배열 추가

    if (isOnline === null) {
        return '대기중...';
    }
    return isOnline ? '온라인' : '오프라인';
}
```

# useMemo
- Memorized value(값)을 리턴하는 훅
- 렌더링이 일어나는 동안 실행됨
- 의존성 배열에 있는 변수 중 하나라도 변하면 `create` 함수를 다시 호출
- 의존성 배열을 넣지 않으면 매번 렌더링이 발생할 때마다 실행됨
- 의존성 배열에 빈 배열을 넣으면 컴포넌트 마운트 시에만 함수가 실행됨
## 구조
```jsx
const memoizedValue = useMemo(
    () => {
        return computeExpensiveValue(의존성 변수1, 의존성 변수2);
    },
    [의존성 변수1, 의존성 변수2]
);
```
> useMemo()에서 의존성 배열에 넣은 변수들은 `create` 함수의 파라미터로 전달되지 않는다.

> 의존성 배열에 있는 변수 중 하나라도 변하면 `create` 함수를 다시 호출하는 것이기 때문에 `create` 함수에서 참조하는 모든 변수를 의존성 배열에 넣어 주는 것이 맞다.

## eslint-plugin-react-hooks 패키지
```bash
# 의존성 배열이 잘못 되어있는 경우에 자동으로 경고를 표시해주는 패키지
npm install eslint-plugin-react-hooks --save-dev
```

# useCallback
- `useMemo()` 훅과 차이점은 함수를 반환한다는 점
## 구조
```jsx
const momizedCallback = useCallback( () => {
    doSomething(의존성 변수1, 의존성 변수2);
},
[의존성 변수1, 의존성 변수2])
```
> `useCallback(function, dependencies)` 는 `useMemo(()=>function, dependencies)`와 동일하다.

> 만약 `useCallback()` 훅을 사용하지 않고 컴포넌트 내에 함수를 정의핟나면 매번 렌더링이 일어날 때마다 함수가 새로 정의된다.

> 따라서, `useCallback()`은 특정 변수의 값이 변한 경우에만 함수를 다시 정의하도록 해서 불필요한 반복 작업을 없애주는 것이다.

# useRef
- 레퍼런스를 사용하기 위한 훅
    - 레퍼런스: 특정 컴포넌트에 접근할 수 있는 객체
    - 레퍼런스 객체에는 `.current`라는 속싱이 있음
        - `.current`: 현재 레퍼런스하고 있는 엘리먼트
    - 레퍼런스 객체는 컴포넌트가 Unmount 될 때까지 계속 유지된다.
        > `useRef()` 훅은 변경 가능한 `.current`라는 속성을 가진 하나의 상자라고 보면 됨
> `useRef()` 훅은 내부 데이터가 변경되었을 때 별도로 알리지 않는다.

> DOM node가 attach 또는 detach 되었을 때 어떤 코드를 실행하고 싶다면 `useCallback()`을 사용하여 `callback ref` 방식을 사용해야한다.

## 구조
```jsx
const refContainer = useRef(초깃값);
```
## 예시
```jsx
function TextInputWithFocusButton(props) {
    const inputElem = useRef(null);

    const onButtonClick = () => {
        // current는 마운트된 input element를 가리킴
        inputElem.current.focus();
    };

    return (
        <>
            <input ref={inputElem} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}
```

# 훅의 규칙
## 1. 훅은 무조건 최상위 레벨에서만 호출해야한다.
- 반복문이나 조건문 또는 중첩된 함수들 안에서 훅으 호출하면 안된다.
- 훅은 컴포넌트가 렌더링될 때마다 매번 같은 순서로 호출되어야한다.

    ```jsx
    // 예시: if 문으로 인해 호출되지 않아 훅이 달라지므로 잘못된 코드
    function MyComponent(props) {
        const [name, setName] = useState('jm');

        if (name !== '') {
            useEffect(()=> {
                ...
            });
        }
        ...
    }
    ```
## 2. 리액트 함수 컴포넌트에서만 훅을 호출해야한다.
- 훅이 자바스크립트로 작성되었지만 자바스크립트 함수에서 훅을 호출하면 안된다.
- 훅은 리액트 함수 컴포넌트에서 호출하거나 직접 만든 커스텀 훅에서만 호출할 수 있다.

# Custom hook
- 여러 컴포넌트에서 반복적으로 사용되는 로직을 훅으로 만들어 재사용하기 위함
- 이름이 `use`로 시작하고 내부에서 다른 훅을 호출하는 하나의 자바스크립트 함수
> 여러 개의 컴포넌트에서 하나의 커스텀 훅을 사용할 때에 컴포넌트 내부에 있는 모든 `state`와 `effect`는 공유하지 않는다.
## 커스텀 훅 적용 전 예시
```jsx
import React, { useState, useEffect } from "react";

// 유저가 online이면 이름 색상을 변경하는 컴포넌트
function UserListItem(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    }, [props.user.id]); // 의존성 배열에 props.user.id 추가

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>{props.user.name}</li>
    );
}
```
## 커스텀 훅 추출 후 적용
```jsx
import { useState, useEffect } from "react";

// userStatus를 변경하는 함수를 커스텀 훅으로 구성
function useUserStatus(userId) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ServerAPI.subscribeUserStatus(userId, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(userId, handleStatusChange);
        };
    }, [userId]); // userId가 변경될 때마다 useEffect 재실행

    return isOnline;
}
```
```jsx
function UserStatus(props) {
    const isOnline = useUserStatus(props.user.id);

    if (isOnline === null) {
        return '대기중...';
    }
    return isOnline ? '온라인' : '오프라인';
}
```
```jsx
function UserListItem(props) {
    return (
        <li style={{ color: props.user.isOnline ? 'green' : 'black' }}>
            <UserStatus user={props.user} />
        </li>
    );
}
```