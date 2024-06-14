# 상태관리와 `redux` 패키지
## ch05_1. `redux` 기본 개념 이해하기
### 1. `redux`와 `redux` 관련 필수 패키지
- flux 설계 규격을 준수하는 오픈소스 라이브러리
    - flux
        - 메타가 발표한 앱 설계 규격
        - 앱수준 상태(여러 컴포넌트가 공유하는 상태)를 리액트 방식으로 구현하는 방법
```bash
npm i redux @reduxjs/toolkit react-redux
```
> `redux`, `@reduxjs/toolkit`은 프레임워크와 무관하므로 앵귤러나 뷰에서도 사용할 수 있다.

### 2. 앱 수준 상태
- 앱을 구성하는 모든 컴포넌트가 함께 공유할 수 있는 상태
- 줄여서 `앱 상태`라고 한다.

#### 2-1. `Provider` 컴포넌트와 `store` 속성
- `Provider`를 사용하려면 `store` 속성이 필요하다.
```tsx
// Provider 라는 이름이 너무 흔하므로 이 예제에서는 별칭으로 사용
import {Provider as ReduxProvider} from 'react-redux'
```
```tsx
export default App() {
    return (
        <ReduxProvider store={}>
            ...
        </ReduxProvider>
    )
}
```
#### 2-2. `redux store`와 리듀서, 액션 알아보기
1. `redux` 기능을 사용할 때는 앱수준 상태를 표현하는 타입을 선언해야한다.
    - `redux store`: 정의한 타입을 저장하는 공간
    - `redux store`를 생성하려면 `Reducer` 함수를 알아야한다.
```tsx
export type AppState = {
    today: Date
}
```
2. `Reducer`: `redux store`를 생성하기 위한 함수
```tsx
export type Reducer<S = any, A extends Action = AnyAction> = (
    state: S | undefined,
    action: A
) => S
```
#### 2-3. 스토어 객체 관리 함수
- `configureStore`: `Reducer` 함수에서 반환한 `새로운 상태`를 `store`라는 객체로 정리해 관리하는 함수
```tsx
import {configureStore} from '@reduxjs/toolkit'
```

```tsx
export declare function configureStore<S, A, M>(
    options: ConfigureStoreOptions<S,A,M>): Enhanced<S, A, M>;
```

```tsx
export interface ConfigureStoreOptions<S, A, M> {
    reducer
    middleware?
    devTools?
    reloadedState?
    enhancers?
}
```

### 3. `useSelector` 훅 사용하기
- `useSelector`: `redux store`에 어떤 내용이 저장되었는지 알고자 `store` 상태값을 반환해주는 훅
```tsx
import {useSelector} from 'react-redux'
```
```tsx
// 예시
const today = useSelector<AppState, Date>(state => state.today);
```

#### 3-1. `redux` 액션 알아보기
- `Action`: `redux store`의 특정 속성 값을 변경

```ts
export type SetTodayAction = Action<'setToday'> {
    today: Date
}

export type Actions = SetTodayAction
```

#### 3-2. `redux` 리듀서 알아보기
```ts
import { AppState } from './AppState';
import { Actions } from './actions';

const initialState: AppState = {
    today: new Date()
};
  
export const rootReducer = (state: AppState = initialState, action: Actions) => {
    // const newState = {...prevState};    // 깊은 복사 필요
    // return newState;

    switch (action.type) {
        case 'setToday': {
            return {...state, today: action.today}
        }
    }
    return state;
};
```

### 4. `useDispatch` 훅 사용하기
- `redux store`에 저장된 `store` 객체의 멤버나 일부를 변경해주는 훅
```ts
import {useDispatch} from 'react-redux'
```

```ts
const dispatch = useDispatch()
dispatch({type: 'setToday', today: new Date()})
```

 `dispatch` 함수와 `reducer` 간의 관계 이애하기
- `dispatch( Action )`->`reducer`-> `redux store`
    - 앱 수준 상태의 일부 속성 값을 변경하려면 `Action`을 만들어야한다.
    - `Action`은 반드시 `dispatch` 함수로 `reducer`에 전달해야한다.
    - `reducer`에 전달되는 `state`, `action`을 통해 새로운 `state` 객체를 만들어 `redux store`에 저장한다.

### 5. `useReducer` 훅 사용하기
- `redux`의 `reducer`와 같은 기능
- `Provider`와 같은 컨텍스트 없이 사용
> `useReducer` 훅의 상태는 다른 훅 함수들처럼 `useReducer` 훅을 호출한 컴포넌트 안에서만 유효하다.<br>
> 반면, `redux`의 상태는 앱의 모든 컴포넌트에서 접근할 수 있다.

```ts
import {useReducer} from 'react'
```
```ts
const [state, dispatch] = useReducer(reducer, initial_state)
```

 `redux`의 `reducer`와 `useReducer` 훅의 차이
- 초기 샅태 값을 설정하는 부분에서 차이가 있다.
```ts
const initialState: AppState = {
    today: new Date()
}

export const rootReducer = (state: AppState = initialState, action: AppActions) => {}
```

```ts
useReducer((state: AppState, action: AppActions) => {}, {today: new Date()})
```

## ch05_2. `reducer` 활용하기
### 1. 리듀서 합치기
- `combineReducers()`
    - 여러 `reducer`를 통합하여 새로운 리듀서를 만듬
```ts
import {combinReducers} from 'redux'
```

### 2. 앱 상태를 구성하는 멤버 상태 구현하기
### 3. 시계 만들기
### 4. 카운터 만들기
#### 리듀서는 순수 함수여야 한다.
### 5. 사용자 정보 변경 기능 만들기
### 6. 사용자 카드 만들기

## ch05_3 'redux' 미들웨어 이해하기

### 1. `redux` 미들웨어란?
### 2. `logger` 미들웨어 만들기
#### 2-1. 미들웨어 설정하기
#### 2-2. 미들웨어 테스트하기
#### 2-3. `redux-logger` 패키지 사용하기
### 3. `redux-thunk` 미들웨어 알아보기
#### 3-1. 로딩 UI 구현하기
#### 3-2. 오류 메시지 구현하기
### 4. 사용자 정보 변경 기능 개선하기

## ch05_4 트렐로 따라 만들기