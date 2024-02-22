import React from 'react';
import styled from 'styled-components';

const FooterTemplateBlock = styled.div`
    font-size: 0.8em;
    font-weight: 700;
    width: auto;
    height: 60px;
    margin: 10px 20px 10px;
    box-sizing: border-box;
    padding: 12px;
    position: relative;
    background: #868e96;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;

    .btnGroup {
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

        li {
            margin-bottom: 3px;
        }
    }

    button {
        padding-right: 0;
    }
`;

const StyledButton = styled.button`
    color: #ffffff;
    border: none;
    border-radius: 7px;
    height: 60%;
    width: auto;
    background: none;
    margin: 2px;
    cursor: pointer;

    a {
        color: #ffffff;
        font-style: none;
    }
`;

/**
 *
 * @param {*} param0
 * @returns
 */
function FooterTemplate() {
    return (
        <FooterTemplateBlock>
            <div className="logo">
                <ul>
                    <li>Developed by @onpul</li>
                    <li className="version">LETSDOIT / v1.0</li>
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
            </div>
        </FooterTemplateBlock>
    );
}

export default FooterTemplate;
