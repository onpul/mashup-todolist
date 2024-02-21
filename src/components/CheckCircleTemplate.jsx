import { styled, css } from 'styled-components';
import { useTodoDispatch } from '../TodoContext';
import { MdDone } from 'react-icons/md';

const CheckCircle = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;

    ${(props) =>
        props.$done &&
        css`
            border: 1px solid #6699ff;
            color: #6699ff;
        `}
`;

function CheckCircleTemplate({ props }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id: props.id });

    return (
        <>
            <CheckCircle $done={props.done} onClick={onToggle}>
                {props.done && <MdDone />}
            </CheckCircle>
        </>
    );
}

export default CheckCircleTemplate;
