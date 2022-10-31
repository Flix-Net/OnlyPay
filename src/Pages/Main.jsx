import React from 'react';
import styled, {keyframes} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth} from "../Redux/Slices/authSlice";
import PostItem from "../Components/PostItem/PostItem";
import {clearStatus, getAllPosts} from "../Redux/Slices/postSlice";
import {toast} from "react-toastify";

let MainTeg = styled.div`
  text-align: center;
  margin: 0 auto;
`

const rotate = keyframes`
  0%{
    background-position: 0 0;
  }
  50%{
    background-position: 300% 0;
  }
  100%{
    background-position: 0 0;
  }
`;

let LineWelcome = styled.div`
  width: 900px;
  font-size: 34px;
  padding-bottom: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 65px auto 0;
  font-style: italic;
`

let Welcome = styled.div`
  display: inline;
  font-size: 34px;
  font-weight: 800;
  background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #ffff00, #00ff00, #0000ff, #fb0094);
  //background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  transition: .3s;
  padding: 17px 3px 17px 12px;
  line-height: 1;
  position: relative;

  animation: ${rotate} 50s linear infinite;

  &:hover {
    filter: blur(3px);
    transition: .3s;
    cursor: pointer;
  }

`





const Shadow = styled.div`
  position: relative;
  margin: 50px auto ;
  width: 270px;
  height: 65px;
  background: #0B003C;
  border-radius: 20px;
  line-height: 60px;
  font-size: 24px;
  font-weight: 800;
  
  &:before,:after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 20px;
    background-size: 400%;
    z-index: -1;
    animation: ${rotate} 40s linear infinite;
    transition: .3s;
  }
  
  &:after{
    filter: blur(10px);
  }
  
  &:hover{
    &:after{
      filter: blur(20px);
      cursor: pointer;
      animation: ${rotate} 80s linear infinite;
    }
  }
`







const Main = () => {

    const dispatch = useDispatch();
    let username = useSelector((state) => state.authReducer.user || 'Гость' );
    const arrPosts = useSelector(state => state.postReducer.posts);
    let status = useSelector(state => state.postReducer.status)
    let isAuth = useSelector(checkIsAuth);

    React.useEffect(()=>{
       dispatch(getAllPosts());
    },[dispatch])

    React.useEffect(()=>{
        if (status)
        {
            toast(status);
            dispatch(clearStatus());
        }

    },[status, dispatch])

    return (
        <MainTeg>

            <LineWelcome>
                    {username} <div>, добро пожаловать на </div> <Welcome>OnlyPay</Welcome>
            </LineWelcome>

            <Shadow>Зарегистрироваться</Shadow>

            <h1>Главная страница</h1>

            {isAuth ?
                <div>
                    <h2>Здравствуйте, {username}!</h2>
                </div>
                :<h2>Добро пожаловать, Пользователь!</h2>
            }

            <div>
                {arrPosts.length ?
                    <div>
                        Обычные посты

                        {arrPosts.map((post)=>(
                            <PostItem key={post._id} {...post} />
                        ))}
                    </div> :
                    <div>Постов нет</div>
                }

            </div>

        </MainTeg>
    );
};

export default Main;