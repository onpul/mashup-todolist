import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import { useShowDispatch, useTodoState } from '../TodoContext';
import moment from 'moment';

const FooterTemplateBlock = styled.div`
    z-index: 999;
    width: auto;
    height: 50px;
    margin-bottom: 0;
    box-sizing: border-box;
    position: static;
    bottom: 0;
    background: #ffffff;
    font-size: 1em;
    font-weight: 900;
    display: flex;
    /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); */
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
    .clicked {
        color: #ff6b6b;
    }
`;

const ButtonBlock = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    text-align: center;

    /* .footerBtn {
        width: 100%;
        text-align: center;
    } */
`;

const ButtonItem = styled.div`
    ${(color) =>
        color === '#ff6b6b'
            ? css`
                  color: #ff6b6b;
              `
            : css`
                  color: #6699ff;
              `}
`;

/**
 *
 * @param {*} param0
 * @returns
 */
function FooterTemplate() {
    const showDispatch = useShowDispatch();
    const [clicked, setClicked] = useState(null);
    const fncButtonAction = (e) => {
        debugger;
        setClicked(e.target.id);
        debugger;
        console.log(clicked);
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
                window.location.replace('/mashup-todolist');
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
    //color={`${clicked === 'home' ? '#ff6b6b' : '#6699ff'}`}
    return (
        <FooterTemplateBlock>
            <ButtonBlock>
                <ButtonItem style={{ color: `${clicked === 'home' ? '#ff6b6b' : '#6699ff'}` }} id="home" onClick={fncButtonAction}>
                    홈
                </ButtonItem>
                <ButtonItem style={{ color: `${clicked === 'today' ? '#ff6b6b' : '#6699ff'}` }} id="today" onClick={fncButtonAction}>
                    오늘
                </ButtonItem>
                <ButtonItem style={{ color: `${clicked === 'detail' ? '#ff6b6b' : '#6699ff'}` }} id="detail" onClick={fncButtonAction}>
                    상세
                </ButtonItem>
                <ButtonItem style={{ color: `${clicked === 'calendar' ? '#ff6b6b' : '#6699ff'}` }} id="calendar" onClick={fncButtonAction}>
                    달력
                </ButtonItem>
                <ButtonItem style={{ color: `${clicked === 'add' ? '#ff6b6b' : '#6699ff'}` }} id="add" onClick={fncButtonAction}>
                    추가
                </ButtonItem>
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
