import { styled, css } from 'styled-components';
import { useTodoDispatch } from '../TodoContext';
import { MdDone } from 'react-icons/md';

const CheckSquare = styled.div`
    width: 20px;
    height: 20px;
    /* border-radius: 16px; */
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    color: #ced4da;
`;

function CheckSquareTemplate({ props }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'CHECKTOGGLE', id: props.id });

    return (
        <>
            <CheckSquare $done={props.done} onClick={!props.disabled ? onToggle : null} $disabled={props.disabled}>
                {props.done && <MdDone />}
            </CheckSquare>
        </>
    );
}

export default CheckSquareTemplate;
