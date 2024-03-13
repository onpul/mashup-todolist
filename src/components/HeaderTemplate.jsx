import React from 'react';
import styled from 'styled-components';
import { useTodoDispatch, useTodoState } from '../TodoContext';

const HeaderTemplateBlock = styled.div`
    width: auto;
    height: 40px;
    margin: 20px 20px 10px;
    position: relative;
    background: #6699ff;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    padding: 0 12px 0 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .btnGroup {
        height: 100%;
        display: flex;
        flex-direction: row;
        text-align: center;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
    }
    .logo {
        color: #ffffff;
        font-weight: 900;
    }
`;

const StyledButton = styled.button`
    font-weight: 700;
    color: #ffffff;
    border: none;
    border-radius: 7px;
    height: 60%;
    width: auto;
    background: none;
    margin-left: 2px;
    padding: 0;
    cursor: pointer;

    /* padding: 8px; */
    /* border-radius: 20px; */
    /* box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3); */
`;

/**
 *
 * @param {*} param0
 * @returns
 */
function HeaderTemplate() {
    const state = useTodoState();
    const dispatch = useTodoDispatch();

    function onclick() {
        const showForm = state.showForm;

        dispatch(
            {
                type: 'SHOWORHIDE',
                showForm: !showForm,
            },
            []
        );
    }

    const refresh = () => window.location.replace('/');
    return (
        <HeaderTemplateBlock>
            <div className="logo" onClick={refresh}>
                SIMPLETODO
            </div>
            <div className="btnGroup">
                {/* <StyledButton onClick={onclick}>추가하기</StyledButton> */}
                <StyledButton>설정</StyledButton>
            </div>
        </HeaderTemplateBlock>
    );
}

export default HeaderTemplate;
