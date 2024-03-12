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

1.  컴포넌트로 전달하는 props 가 html 에 해당하는 태그명이 아닐 때: prefix `$`를 붙여서 해결

2.  최상단 로고 클릭 시 로컬 이외 환경에서 404 에러: TODO

3.  전체선택 눌렀을 때, 전체 항목의 선택 여부 값 변경이 아닌, 각 항목에 해당하는 선택 여부의 반대값이 적용됨

-  이전 문제: dispatch 로 값 변경할 때, 무조건 해당 리스트 아이템 체크 여부의 반대값을 보내도록 적용했었음.
<pre>
<code>
   dispatch({
      type: 'EDITCHECK',
      id: todoList.map((key) => {
         return key.id;
      }),
      checked: todoList.map((key) => {
         return key.checked ? false : true;
      }),
   });
</code>
</pre>
- 해결 방법: reducer 내에서 체크 여부 처리
<pre>
<code>
   // dispatch 로 전달
   dispatch({
      type: 'AllCHECKTOGGLE',
      id: todoList.map((key) => {
         return key.id;
      }),
   });

   // reducer 에서 실행하는 내용
   case 'AllCHECKTOGGLE':
   return {
         ...state,
         allChecked: !state.allChecked,
         todoItem: state.todoItem.map((todo) => (action.id.indexOf(todo.id) > -1 ? { ...todo, checked: !state.allChecked } : todo)),
   };
</code>
</pre>
- 추가 내용: '전체선택' 문구 동작 방식이 토글이니, 선택 및 해제 시 '전체선택/전체해제'로 전환되도록 적용: useState로 구현
