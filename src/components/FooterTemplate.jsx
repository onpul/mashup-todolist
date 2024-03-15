import React, { useState } from 'react';
import styled from 'styled-components';
import { useShowDispatch, useTodoState } from '../TodoContext';
import moment from 'moment';

const FooterTemplateBlock = styled.div`
    width: auto;
    height: 50px;
    margin-bottom: 0;
    box-sizing: border-box;
    position: relative;
    background: #ffffff;
    font-size: 1em;
    font-weight: 900;
    display: flex;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    color: #6699ff;
    .logo {
        li {
            margin-bottom: 3px;
        }
    }
    button {
        padding-right: 0;
    }
`;

const ButtonBlock = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;

    .footerBtn {
        width: 100%;
        text-align: center;
    }
`;

/**
 *
 * @param {*} param0
 * @returns
 */
function FooterTemplate() {
    const todoState = useTodoState();
    const showDispatch = useShowDispatch();
    const todoItems = todoState.todoItem;
    const [list, setList] = useState(null);
    const fncButtonAction = (e) => {
        const type = e.target.id || '';
        switch (type) {
            case 'home':
                showDispatch(
                    {
                        type: 'SHOWORHIDE',
                        showCalendar: false,
                        showForm: false,
                        showSetting: false,
                        showEditMode: false,
                        showTodoList: false,
                        showReport: false,
                        showHome: true,
                    },
                    []
                );
                break;
            case 'today':
                setList(todoItems.filter((todo) => moment(todo.date).isBetween(moment(), moment(), undefined, '[]') && !todo.completed));
                break;
            case 'detail':
                showDispatch(
                    {
                        type: 'SHOWORHIDE',
                        showCalendar: false,
                        showForm: false,
                        showSetting: false,
                        showEditMode: false,
                        showTodoList: true,
                        showReport: false,
                        showHome: false,
                    },
                    []
                );
                break;
            case 'calendar':
                showDispatch(
                    {
                        type: 'SHOWORHIDE',
                        showCalendar: true,
                        showForm: false,
                        showSetting: false,
                        showEditMode: false,
                        showTodoList: false,
                        showReport: false,
                        showHome: false,
                    },
                    []
                );
                break;
            case 'add':
                showDispatch(
                    {
                        type: 'SHOWORHIDE',
                        showCalendar: false,
                        showForm: true,
                        showSetting: false,
                        showEditMode: false,
                        showTodoList: false,
                        showReport: false,
                        showHome: false,
                    },
                    []
                );
                break;

            default:
                break;
        }
    };
    return (
        <FooterTemplateBlock>
            <ButtonBlock>
                <div className="footerBtn" id="home" onClick={fncButtonAction}>
                    홈
                </div>
                <div className="footerBtn" id="today" onClick={fncButtonAction}>
                    오늘
                </div>
                <div className="footerBtn" id="detail" onClick={fncButtonAction}>
                    상세
                </div>
                <div className="footerBtn" id="calendar" onClick={fncButtonAction}>
                    달력
                </div>
                <div className="footerBtn" id="add" onClick={fncButtonAction}>
                    추가
                </div>
            </ButtonBlock>
            {/* <div className="logo">
                <ul>
                    <li>Developed by @onpul</li>
                    <li className="version">SIMPLETODO / v1.0</li>
                </ul>
            </div>
            <div className="btnGroup">
                <ul>
                    <li>
                        <StyledButton>
                            <a href="mailto:mjchoi.atwork@gmail.com">email</a>
                        </StyledButton>
                        <StyledButton>
                            <a href="https://github.com/onpul">github</a>
                        </StyledButton>
                        <StyledButton>
                            <a href="https://onpul.tistory.com/">blog</a>
                        </StyledButton>
                    </li>
                </ul>
            </div> */}
        </FooterTemplateBlock>
    );
}

export default FooterTemplate;
