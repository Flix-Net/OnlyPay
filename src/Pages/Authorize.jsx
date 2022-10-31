import React from 'react';
import Button from "../Components/UI/Button/Button";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, loginUser} from "../Redux/Slices/authSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Input from "../Components/UI/Input/Input";

let Form = styled.form`
  height: 500px;
  width: 380px;
  background-color: transparent;
  border: 1px solid #03A9F4;
  border-radius: 20px;
  box-shadow: 2px 2px 10px #03A9F4,
            -2px -2px 10px #03a9f4;
  padding: 25px;

  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`

let Title = styled.h1`
  color: #03A9F4;
  font-size: 40px;
`

const Authorize = () => {

    let [login, setLogin] = React.useState("");
    let [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const {status} = useSelector((state) => state.authReducer);
    const isAuth = useSelector(checkIsAuth);
    const navigate = useNavigate();

    React.useEffect(()=>{

        if(status) toast(status);
        if(isAuth) navigate("/");

    },[status, isAuth,navigate])

    let handleSubmit = ()=>{
        dispatch(loginUser({login, password}));
    }

    return (
        <>
            <Form onSubmit={e=>e.preventDefault()}>
                <Title>Авторизация </Title>
                <Input borbotCol = { login !== "" ? "greenyellow" : "#03A9F4"} value={login} onChange={ (e)=>{ setLogin(e.target.value) } } type={"text"} placeholder={"Login or Email"} />
                <Input borbotCol = { password !== "" ? "greenyellow" : "#03A9F4"} value={password} onChange={ e => setPassword(e.target.value) } type={"password"} placeholder={"Password"} />
                <Button width={"244px"} type={"submit"} onClick={handleSubmit} >Войти</Button>
            </Form>
        </>
    );
};

export default Authorize;