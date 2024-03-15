import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useShowState } from '../TodoContext';
import TodoTemplate from './TodoTemplate';
import TodoCreateTemplate from './TodoCreateTemplate';
import CalendarTemplate from './CalendarTemplate';
import HeaderTemplate from './HeaderTemplate';
import FooterTemplate from './FooterTemplate';
import HomeTemplate from './HomeTemplate';

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
    max-height: calc(100vh - 40px - 50px- 20px);
    overflow-y: auto;
    flex: 1;
    flex-shrink: 1;
    flex-grow: 1;
    flex-basis: 1;
    /* background: #ffffff; */
    border-radius: 16px;
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); */
    margin: 10px 0;
    overflow: auto;
    /* padding: 30px 24px; */
`;

const MainTemplate = () => {
    const state = useShowState();
    const showCalendar = state.showCalendar;
    const showTodoList = state.showTodoList;
    const showForm = state.showForm;
    const showHome = state.showHome;

    return (
        <>
            <GlobalStyle />
            <WrapperBlock className="wrapper">
                <HeaderTemplate className="header" />
                {/* <FilterTemplate /> */}
                <ContainerBlock className="container">
                    {showHome ? <HomeTemplate /> : <></>}
                    {showCalendar ? <CalendarTemplate /> : <></>}
                    {showTodoList ? <TodoTemplate /> : <></>}
                    {showForm ? <TodoCreateTemplate /> : <></>}
                </ContainerBlock>
                <FooterTemplate className="footer" />
            </WrapperBlock>
        </>
    );
};

export default MainTemplate;
