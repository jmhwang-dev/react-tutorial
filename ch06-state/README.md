# 6.1 State
- 리액트 컴포넌트의 변경 가능한 데이터
- 개발자가 직접 정의해서 사용
- *반드시 렌더링이나 데이터 흐름에 사용되는 값만 state에 포함시켜야한다.*

## 특징
- 형태는 자바스크립트 객체
    ```jsx
    class LikeButton extennds React.Component {
        constructor(props) {
            super(props);

            // 현재 컴포넌트의 상태
            this.state = {
                liked: False
            };
        }
        ...
    }
    ```
- 일반적인 자바스크립트 변수를 다루듯이 직접 수정할 수는 있지만 그렇게 해서는 안된다.
    > 반드시 `setState()`를 통해 `state`를 변경해야한다.
    ```js
    // 잘못된 방법 - 리액트가 수정된 것을 제대로 인지하지 못할 수 있음
    this.state {
        name: "jm"
    };

    // 정상적인 수정 - setState를 통한 수정
    this.setSate({
        name: "jm"
    });
    ```

# 6.2 생명주기
- 크게 Mount, Update, Unmount로 구성
- 다른 생명주기 함수가 존재하지만 지금은 클래스 컴포넌트를 거의 사용하지 않기 때문에 다루지 않았음
## 1. Mount 과정
1. state 정의 (컴포넌트의 constructor 실행)
2. 렌더링
3. `componentDidMount()` 호출
## 2. Update 과정
1. state 변경 (props 변경 또는 setState() 호출) 또는 `forceUpdate()`
2. 재렌더링
3. `componentDidUpdate()` 호출
## 3. Unmount 과정
1. 상위 컴포넌트에서 현재 컴포넌트를 더 이상 화면에 표시하지 않음
2. `componentWillUnmount()` 호출
> 컴포넌트 생명주기에서 기억해야할 부분: 컴포넌트는 계속 존재하지 않고 생성되고 업데이터되다가 사라진다.

# React Developer Tool 설치
- React Developer Tool을 설치하면 개발자 도구에서 `Component`와 `Profiler`라는 새로운 탭 생성
    - `Component`: 현재 화면에 존재하는 컴포넌트를 트리형태로 보여줌
    - `Profiler`: 컴포넌트들이 렌더링되는 과정을 기록하여 각 단계별로 살펴볼수 있음
