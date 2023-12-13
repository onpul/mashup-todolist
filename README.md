# mashup-todolist

## 프로젝트 구조

1. 상태 관리 구조(v.0.0 / 20231211)
   | | | 상태 관리 구조 | | |
   |:-:|:-:|:-:|:-:|:-:|
   | | | App <br/> (todos, onRemove, onToggle) | | |
   | | ↙ | ↓ | ↘︎ | |
   | TodoHead <br/> (undoneTasks) | | TodoList <br/> (todo, onRemove, onToggle) | | TodoCreate <br/>(onCreate) |
   | | | ↓ | | |
   | | | TodoItem | | |

-   App 에서 todos 상태와, onToggle, onRemove, onCreate 함수를 지니고 있게 하고,
-   해당 값들을 props 를 사용해서 자식 컴포넌트들에게 전달해 주는 방식으로 구현
-   (작은 프로젝트이고, 컴포넌트의 개념을 이해하는 것이 목적이기 때문에 추후 개선하기로 함.)

## 프로젝트 진행중 참고 자료 및 링크

-   벨로퍼트 모던 리액트: https://react.vlpt.us/

## 개발 기록

### 20231205

1. react app 실행, 필요한 라이브러리 다운로드

-   'create-react-app' 실행 후 vscode 내에서 라이브러리 다운로드함

### 20231206

1. 회사 PC 내에서 두 개의 깃 계정(회사, 개인)을 사용하기 위한 설정

-   https://onpul.tistory.com/entry/git-%ED%9A%8C%EC%82%AC-pc%EC%97%90%EC%84%9C-%EA%B3%84%EC%A0%95-%EB%91%90-%EA%B0%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%86%8C%EC%8A%A4%ED%8A%B8%EB%A6%AC%EC%97%90%EC%84%9C-%EA%B3%84%EC%A0%95-%EB%91%90-%EA%B0%9C-%EC%82%AC%EC%9A%A9
-   소스트리 사용 없이 명령어로 푸쉬했을 때 확인

### 20231209

1. 개인 PC에 해당 프로젝트 clone 및 환경세팅 완료

### 20231211

1. Routing

-   라우팅은 기본적으로 네트워크에서 경로를 선택하는 프로세스
-   그냥 a 태그 사용하면 안 되나? -> a 태그 사용하면 페이지 전체가 새로 로딩된다. 화면 깜빡임이 필수적으로 발생하고, 이는 사용자 경험을 떨어뜨리는 큰 요인임.

2. Redux

-   리액트에서 값이 변경되는 데이터를 state로 지정하고 특정 로직에 따라 변경하여 화면에 보여 줌.
-   상태 값이 적을 때는 로컬에서 상태를 관리해도 충분하나, 컴포넌트가 많아질수록 상태값을 변경해야 한다면 너무 비효율적임.
-   그리고 Props를 통해 상태값을 전달하게 된다면 코드의 가독성이 떨어지고 유지보수가 힘들어지게 됨.
-   또한, state 변경 시 Props 전달 과정에서 불필요하게 관여된 컴포넌트들 또한 리렌더링이 발생함.
-   따라서, Redux는 데이터를 하나의 공간에 모아 두고 데이터를 전역 상태로 관리할 수 있는 상태 관리 라이브러리임.

3. 벨로퍼트 문서에서는 컴포넌트(디자인) 부분만 가져오고, 이후 내용은 구글링 통해 직접 구현해 보는 게 나을 것 같아서, 테스트한 내용들은 temp 폴더 생성하여 옮김

4. api 통신 - axios 중복 호출 이슈 -> 공식 문서 보고 다시 적용해 볼 예정 / 중복 호출, 비동기 처리 이슈

### 20231212

## 이슈

1. useEffect 두 번 호출되는 현상: 콘솔로 마운트, 언마운트 찍었을 때 두 번씩 호출 됨...
2. 컴포넌트로 전달하는 props 가 html 에 해당하는 태그명이 아닐 때 prefix `&`를 붙여서 해결

### 20231213

1. 기능 구현 중...
2. 구글 스프레드 시트로 DB 연동해 보려 했으나, 망 차단돼서 그냥 mockend로 구축해 두고 추후 갈음해야겠다...
