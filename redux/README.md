# 상태관리와 리덕스 패키지
## 1. 리덕스 기본 개념
- flux 설계 규격을 준수하는 오픈소스 라이브러리
    - flux
        - 메타가 발표한 앱 설계 규격
        - 앱수준 상태(여러 컴포넌트가 공유하는 상태)를 리액트 방식으로 구현하는 방법
```bash
npm i redux @reduxjs/toolkit react-redux
```
> `redux`, `@reduxjs/toolkit`은 프레임워크와 무관하므로 앵귤러나 뷰에서도 사용할 수 있다.

### 앱 수준 상태
- 앱을 구성하는 모든 컴포넌트가 함께 공유할 수 있는 상태
- 줄여서 `앱 상태`라고 한다.

#### 1. `Provider` 컴포넌트와 `store` 속성
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

#### 2. 리덕스 저장소와 리듀서, 액션 알아보기
1. 리덕스 기능을 사용할 때는 앱수준 상태를 표현하는 타입을 선언해야한다.
    - `redux store`: 정의한 타입을 저장하는 공간
    - `redux store`를 생성하려면 `Reducer` 함수를 알아야한다.
```tsx
export type AppState = {
    today: Date
}
```
2. `Reducer`: 리덕스 저장소를 생성하기 위한 함수
```tsx
export type Reducer<S = any, A extends Action = AnyAction> = (
    state: S | undefined,
    action: A
) => S
```
#### 3. 스토어 객체 관리 함수
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