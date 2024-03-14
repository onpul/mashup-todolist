import React from 'react';
import styled from 'styled-components';
import { useShowState, useShowDispatch } from '../TodoContext';
import moment from 'moment';
import 'moment/locale/ko';

const HeaderTemplateBlock = styled.div`
    font-size: 1em;
    box-sizing: border-box;
    position: relative;
    height: 40px;
    width: auto;
    position: relative;
    background: #6699ff;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    padding: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .btnGroup {
        font-size: 1em;
        height: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .logo {
        color: #ffffff;
    }
`;

const StyledButton = styled.button`
    color: #ffffff;
    border: none;
    width: auto;
    background: none;
    padding: 0;
    cursor: pointer;
    font-size: 1em;
`;

/**
 *
 * @param {*} param0
 * @returns
 */
function HeaderTemplate() {
    const state = useShowState();
    const dispatch = useShowDispatch();

    function onclick() {
        const showForm = state.showForm;
        dispatch(
            {
                type: 'SHOWORHIDE',
                showForm: !showForm,
                showSetting: false,
                showEditMode: false,
                showCalendar: false,
                showTodoList: false,
            },
            []
        );
    }

    // const refresh = () => window.location.replace('/');
    const today = moment().format('YYYY년 MM월 DD일 dddd');
    return (
        <HeaderTemplateBlock>
            <div className="logo">{today}</div>
            <div className="btnGroup">
                <StyledButton onClick={onclick}>추가</StyledButton>
            </div>
        </HeaderTemplateBlock>
    );
}

export default HeaderTemplate;
