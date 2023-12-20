import React from 'react';
import styled, { css } from 'styled-components';

const HeaderTemplateBlock = styled.div`
    width: auto;
    height: 40px;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    margin: 10px;
    display: flex;
    flex-direction: row;
    text-align: center;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 2px 0 2px;
`;

const StyledButton = styled.button`
    color: white;
    border: none;
    border-radius: 5px;
    height: 80%;
    width: auto;
    background: #2e8b57;
    margin: 2px;
`;

/**
 *
 * @param {*} param0
 * @returns
 *
 * 필터 템플릿(버튼) 필요한 거
 * 1. 달력버튼 / 전체보기 -> 우선
 * - 달력버튼 눌렀을 때 달력 노출되도록 구현해보기(디폴트는 해당일의 투두임)
 */
function HeaderTemplate({ children }) {
    return (
        <div>
            <HeaderTemplateBlock>
                <StyledButton>달력보기</StyledButton>
                <StyledButton>전체일정보기</StyledButton>
            </HeaderTemplateBlock>
        </div>
    );
}

export default HeaderTemplate;
