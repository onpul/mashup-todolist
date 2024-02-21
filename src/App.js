import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';
import CalendarTemplate from './components/CalendarTemplate';
import HeaderTemplate from './components/HeaderTemplate';
import FilterTemplate from './components/FilterTemplate';
import MainTemplate from './components/MainTemplate';
import FooterTemplate from './components/FooterTemplate';
import TodoEdit from './components/TodoEdit';

const GlobalStyle = createGlobalStyle`
/* 기본 적용 스타일 초기화 */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  /* font: inherit; */
  vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
  display: block;
  }
  body {
  line-height: 1;
  }
  ol, ul {
  list-style: none;
  }
  blockquote, q {
  quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
  content: '';
  content: none;
  }
  table {
  border-collapse: collapse;
  border-spacing: 0;
  }
  form {
    box-sizing: border-box;
  }
  a {
        text-decoration: none;
        color: #ffffff;
    }
  body {
    background: #e9ecef;
    font-family: 'campton', 'Apple SD Gothic Neo', 'NanumBarunGothic', '나눔바른고딕', 'Malgun Gothic', '맑은 고딕', 'dotum', 'sans-serif';
  }
  div#root {
    height: 100%;
  }
  html, body {
    background: #e9ecef;
    font-family: 'campton', 'Apple SD Gothic Neo', 'NanumBarunGothic', '나눔바른고딕', 'Malgun Gothic', '맑은 고딕', 'dotum', 'sans-serif';
  }
`;

function App() {
    return (
        <>
            <TodoProvider>
                <GlobalStyle />
                <MainTemplate>
                    <HeaderTemplate />
                    <FilterTemplate />
                    <CalendarTemplate />
                    <TodoTemplate>
                        <TodoHead />
                        <TodoCreate />
                        <TodoEdit />
                        <TodoList />
                    </TodoTemplate>
                    <FooterTemplate />
                </MainTemplate>
            </TodoProvider>
        </>
    );
}

export default App;
