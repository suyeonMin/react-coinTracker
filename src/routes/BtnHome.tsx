import { Link } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.span`
    position: fixed;
    left: 20px; top: 20px;
    display: flex; align-items: center; justify-content: center;
    width: 30px; height: 30px;
    font-size: 20px;
    color: ${props => props.theme.bgColor};
    border-radius: 50%; 
    background-color: ${props => props.theme.homeBtnColor};
    cursor: pointer
`

function BtnHome(){
    return <Btn>
        <Link to="/">&larr;</Link>
    </Btn>
}

export default BtnHome;