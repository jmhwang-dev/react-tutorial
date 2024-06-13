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