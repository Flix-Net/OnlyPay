import React, {useState, useCallback} from 'react';
import Input from "../Components/UI/Input/Input";
import TextArea from "../Components/UI/TextArea/TextArea";
import Button from "../Components/UI/Button/Button";
import styled from "styled-components";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "../Utils/axios";
import {initialStatus} from "../Redux/Slices/postSlice";

let BlockForm = styled.form`
  //border: 2px solid red;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 600px;
`

// let StyledLabel = styled.label`
//   margin-top: ${props => props.martop || "10px"};
//   margin-bottom: 5px;
//   color: grey;
// `

let BlockButtons = styled.div`
  display: flex;
  justify-content: space-between;
`

let LoadingPicture = styled.img`
  margin-top: 10px;
  padding: 5px;
  width: 600px;
  height: auto;
  max-height: 300px;
  min-height: 100px;
  border: 2px dashed #a100ff;
`

const EditPost = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let status = useSelector( state => state.postReducer.status );

    let [title, setTitle] = useState();
    let [text, setText] = useState();
    let [oldImage, setOldImage] = useState();
    let [newImage, setNewImage] = useState();


    let fetchPost = useCallback (async ()=>{
        const {data} = await axios.get(`/post/getOnePost/${params.id}`);
        setTitle(data.title);
        setText(data.text);
        setOldImage(data.imgURL);

    },[params.id]);

    React.useEffect(()=>{
        fetchPost();
    },[fetchPost])


    let handleSubmit = async ()=>{
        try {
            const updatedPost = new FormData();
            updatedPost.append("title", title);
            updatedPost.append("text", text);
            updatedPost.append("image", newImage);
            const {data} = await axios.put(`post/editPost/${params.id}`, updatedPost);
            dispatch(initialStatus(data.message));
            navigate(`/getMyPosts`);
        }
        catch (err)
        {
            console.log(err);
        }
    }

    return (
        <BlockForm onSubmit={(e)=>e.preventDefault()} enctype="multipart/form-data" >
            <Input width={"600px"} onChange={ e => {
                setNewImage( e.target.files[0]);
                setOldImage("");
            }    } type={"file"} name={"file"} />

            {oldImage ?
                    <div>
                        <LoadingPicture src={`http://localhost:4000/${oldImage}`} alt="image"/>
                    </div>
                :
                    newImage ?
                            <div>
                                <LoadingPicture src={URL.createObjectURL(newImage)} alt="image"/>
                            </div>
                        :
                            <LoadingPicture alt=""/>
            }

            <Input width={"600px"} value={title} onChange={ (e) => setTitle( e.target.value) } placeholder={"Заголовок"} type={"text"} />
            <TextArea value={text} onChange={ (e) => setText( e.target.value) }  placeholder={"Описание"}  />

            <BlockButtons>
                <Button onClick={handleSubmit}>Изменить</Button>
                <Link to={`/getOnePost/${params.id}`}> <Button>Отмена</Button> </Link>
            </BlockButtons>
        </BlockForm>
    );
};

export default EditPost;