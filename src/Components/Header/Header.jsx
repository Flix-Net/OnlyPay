import React from 'react';
import styled from "styled-components";
import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import LogoIMG from "../../Assets/IMG/Logo.png";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logout} from "../../Redux/Slices/authSlice";
import {toast} from "react-toastify";

    let BlockHeader = styled.div`
      position: fixed;
      top: 0;
      padding: 0 11%;
      z-index: 999;
      margin: 0 auto;
      height: 65px;
      display: flex;
      align-items: center;
      background-color: rgba(10, 0, 31, 0.88);
      //background-color: rgba(38, 13, 32, 0.94);
      box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.5);
      width: 100%;
    `

    let BlockLogo = styled.div`
      height: 60px;
      width: 50%;
      padding-left: 10px;
      display: flex;
      align-items: center;
    `

    let StyledIMAGE = styled.img`
      height: 50px;
      background-color: transparent;
      padding-top: 5px;
    `

    let BlockLinks = styled.div`
      
      width: 50%;
      display: flex;
      justify-content: right;
      align-items: center;
    `

const Header = () => {

        const dispatch = useDispatch();
        const isAuth = useSelector(checkIsAuth);

        const logoutHandle = ()=>{
            dispatch(logout());
            window.localStorage.removeItem('token');
            toast("Вы вышли из системы");
        }

    return (
        <BlockHeader>

            <BlockLogo>
                <Link to={"/"}> <StyledIMAGE src={LogoIMG} alt={"img"}/> </Link>
            </BlockLogo>

                {
                    isAuth?
                        <BlockLinks>
                            <Link className={styles.linkItem} to={"/getMyPosts"} > Мои посты </Link>
                            <Link className={styles.linkItem} to={"/AddNewPost"} > Добавить пост </Link>
                            <Link onClick={logoutHandle} className={styles.linkItem} to={"/"} > Выйти </Link>
                        </BlockLinks>
                    :
                        <BlockLinks>
                            <Link className={styles.linkItem} to={"/"} > Главная </Link>
                            <Link className={styles.linkItem} to={"/Register"} > Регистрация </Link>
                            <Link className={styles.linkItem} to={"/Login"} > Войти </Link>
                        </BlockLinks>
                }

        </BlockHeader>
    );
};

export default Header;