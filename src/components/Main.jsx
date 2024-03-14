import React, { useRef } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useShowState } from '../TodoContext';
import TodoTemplate from '../components/TodoTemplate';
import TodoHead from '../components/TodoHead';
import TodoList from '../components/TodoList';
import TodoCreate from '../components/TodoCreate';
import CalendarTemplate from '../components/CalendarTemplate';
import FilterTemplate from '../components/FilterTemplate';
import TodoEdit from '../components/TodoEdit';
import ReportTemplate from '../components/ReportTemplate';
import HeaderTemplate from '../components/HeaderTemplate';
import FooterTemplate from '../components/FooterTemplate';

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
        line-height: 1em;
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
        color: #000000;
    }
    body {
        background: #e9ecef;
    }
    #root {
        height: 100%;
    }
    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: #e9ecef;
        font-family: 'campton', 'Apple SD Gothic Neo', 'NanumBarunGothic', '나눔바른고딕', 'Malgun Gothic', '맑은 고딕', 'dotum', 'sans-serif';
    }
`;

const WrapperBlock = styled.div`
    height: 100vh;
    box-sizing: border-box;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
`;

const ContainerBlock = styled.div`
    flex: 1;
    flex-shrink: 1;
    flex-grow: 1;
    flex-basis: 1;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin: 10px 0;
    padding: 20px 0;
`;

const Main = () => {
    const state = useShowState();
    const showCalendar = state.showCalendar;
    const showTodoList = state.showTodoList;
    const showForm = state.showForm;
    const showReport = state.showReport;

    return (
        <>
            <GlobalStyle />
            <WrapperBlock className="wrapper">
                <HeaderTemplate className="header" />
                <FilterTemplate />
                <ContainerBlock className="container">
                    {showCalendar ? <CalendarTemplate /> : <></>}
                    {showReport ? <ReportTemplate /> : <></>}
                    {showTodoList ? (
                        <TodoTemplate>
                            <TodoHead />
                            <TodoEdit />
                            <TodoList />
                        </TodoTemplate>
                    ) : (
                        <></>
                    )}
                    {showForm ? <TodoCreate /> : <></>}
                </ContainerBlock>
                <FooterTemplate className="footer" />
            </WrapperBlock>
        </>
    );
};

export default Main;
