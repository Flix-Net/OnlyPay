import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import Button from "../Components/UI/Button/Button";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "../Utils/axios";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../Redux/Slices/postSlice";
import BackIcon from "../Assets/IMG/icons8-back-67.png";


let Block_Content = styled.div`
  background: linear-gradient(90deg, rgba(12, 3, 52, 0) 0%, rgba(13, 6, 44, 0.4) 4%, rgba(13, 7, 43, 0.8) 7%, rgba(13, 8, 41, 1) 10%, rgba(14, 10, 35, 1) 38%, rgba(15, 12, 29, 1) 70%, rgba(38, 13, 32, 1) 100%);
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  z-index: 20;
  padding: 5% 1% 2% 3%;

  overflow: scroll;
  @supports (scrollbar-gutter: stable) {
    overflow: auto;
    scrollbar-gutter: stable;
  }
`

let BlockPicture = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -20;
  width: auto;
  max-width: 60%;
  height: 100vh;
  object-fit: cover;
  background-color: #a4a4a4;
`

let BlockTitle = styled.div`
  text-align: center;
  font-size: 32px;
  line-height: 1.3;
`

let BlockText = styled.div`
  margin-top: 50px;
  padding-right: 5px;
  font-size: 18px;
  max-height: 540px;
  z-index: 1000;
`

let Control = styled.div`
  width: 800px;
  position: absolute;
  bottom: ${props => props.bottom || "0"};
  left: ${props => props.left || "0"};
  right: ${props => props.right || "0"};
`

const GetOnePost = () => {
    console.log("Старт getOnePost");
    let params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [post,setPost] = useState(null);
    let username = useSelector(state => state.authReducer.user);
    console.log(username);

    let fetchPost = useCallback (async ()=>{
        const {data} = await axios.get(`/post/getOnePost/${params.id}`);
        setPost(data);
        console.log(`data is ${data}`);
    },[params.id]);

    React.useEffect( ()=>{
        fetchPost();
    },[fetchPost])

    let handleButtonDel = ()=>{
        dispatch(deletePost(params.id));
        navigate("/");
    }



    return (
        <div>
            <Control left={"0px"} bottom={"650px"}>
                <Link to={-1} > <Button margin={"0 0 10px 10px"}> Назад </Button> </Link>
            </Control>


            {post ?
                    <div>

                        <BlockPicture src={`http://localhost:4000/${post.imgURL}`}  alt={"image"}/>

                        <Block_Content>
                            <BlockTitle>{post.title}</BlockTitle>
                            <BlockText>{post.text}</BlockText>
                        </Block_Content>

                    </div>
                :
                    <div>Пост грузится...</div>
            }

            <div>
                {post?.author === username ?
                <Control bottom={"0px"} left={"0px"}>
                    <Link to={`/editPost/${params.id}`}> <Button margin={"0 0 10px 10px"}>Редактировать</Button> </Link>
                    <Button margin={"0 0 0 460px"} onClick={handleButtonDel} >Удалить</Button>
                </Control> :
                    <></>
                }
            </div>

        </div>
    );
};

export default GetOnePost;