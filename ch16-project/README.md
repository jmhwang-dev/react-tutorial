# 패키지 설치
```bash
npx create-react-app mini-blog

cd mini-blog
npm install --save react-router-dom styled-components
```
- `react-router-dom`: 리엑트 앱에서 페이지 전환을 위해 사용하는 패키지
- `styled-components`: 스타일링을 위한 라이브러리
- `--svae`: 지금 설치하는 패키지들을 `package.json` 파일이 관리하는 `dependencies`(의존성 목록)에 저장하겠다.
    - 프로젝트에 꼭 필요한 패키지들을 설치할 때 옵션 사용

# 디렉토리 설명
- src
    - component
        - list: 리스트와 관련된 컴포넌트들
        - page: 페이지 컴포넌트들을 모아놓은 폴더
        - ui: UI 컴포넌트

# `react-router-dom`
- 리액트를 위한 라우팅 라이브러리
    - 현재 버전: ^6.23.1
- 라우팅을 구성하기 위해서 사용하는 기본적인 컴포넌트
    - `BrowserRouter`
    - `Routes`
    - `Route`

```jsx
<BrowserRouter>
    <Routes>
        <Route index element={<MainPage />} />
        <Route path="places" element={<PlacePage />} />
        <Route path="games" element={<GamePage />} />
    </Routes>
</BrowserRouter>
```

## `BrowerRouter`
- `react-rounter`를 사용하여 라우팅을 할 수 있도록 해주는 컴포넌트
> 웹브라우저에는 `history`라는 기능이 내장되어 있는데 여기에는 사용가자 탐색한 페이지들의 방문 기록이 저장된다.<br>
> `BrowserRouter` 컴포넌트는 이 `history`를 이용해서 경로를 탐색할 수 있게 해주는 컴포넌트라고 이해하면된다.

## `Routes`, `Route`
- 실제로 라우팅 경로를 구성할 수 있게 해주는 컴포넌트
- `Routes` 컴포넌트는 여러 개의 `Route` 컴포넌트를 `children`으로 갖는다.
- `Route` 컴포넌트는 `Routes` 컴포넌트의 하위 컴포넌트로써 `path`, `element`라는 `props`를 갖고 있다.
    - `path`: 경로
        - ex) https://facebook.com/places 에서 `/places`
    - `element`: 경로가 일치할 경우 렌더링을 할 리액트 엘리먼트

# Production 빌드
## build
- 우리가 작성한 코드와 애플리케이션이 사용하는 이미지, css 파일 등의 파일을 모두 모아서 패키징 하는 과정
- 빌드 과정에는
    1. 코드가 식별이 불가능하도록 난독화 되기도 하고
    2. 필요 없는 공백이나 줄 바꿈 문자들을 제거하여 축소 시키는 과정도 포함된다.
- 최종적으로 만들어진 파일들은 `build` 폴더에 모이게 된다.

## `build` 폴더 구성
- `build`/`static`
    - css 파일
    - 자바스크립트 번들 파일

## 명령어
### 1. 빌드
```bash
npm run build
```
### 2. 빌드 파일을 이용해서 웹 애플리케이션 실행
- `build` 폴더를 기반으로 웹 애플리케이션을 `serving`

    ```bash
    serve -s build
    ```
- `serve` 명령어가 없다면,

    ```bash
    npm install -g serve
    ```
> `serve`는 이름 그대로 `static` 파일들을 서빙해 주는 역할을 하는 프로그램이다.

# 배포
- 빌드를 통해서 생서된 정적인 파일들을 배포하려는 서버에 올리는 과정
- 서버에 올려두고 `serve` 같은 명령어를 사용하여 서빙할 수 있게 해두면 인터넷이 되는 어디에서든지 해당 서버 주소로 접속하여 자신이 만든 웹 애플리케이션을 볼 수 있다.