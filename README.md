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

## 이슈

1. 컴포넌트로 전달하는 props 가 html 에 해당하는 태그명이 아닐 때 : prefix `$`를 붙여서 해결

2. 최상단 로고 클릭 시 로컬 이외 환경에서 404 에러 : TODO
