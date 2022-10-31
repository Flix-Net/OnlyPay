import React from 'react';
import styled from "styled-components";
import Button from "../Components/UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {clearStatus, createPost} from "../Redux/Slices/postSlice";
import {toast} from "react-toastify";
import Input from "../Components/UI/Input/Input";
import TextArea from "../Components/UI/TextArea/TextArea";
import {useNavigate} from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import '../SimpleEditor/dist/simplemde.min.css';

let BlockForm = styled.form`
  //border: 2px solid red;
  margin: 75px auto 0;
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
  border: 5px dotted orange;
`

const AddNewPost = () => {

    const navigate = useNavigate();
    let [title,setTitle] = React.useState("");
    let [text, setText] = React.useState("");
    let [imgURL, setImgURL] = React.useState("");
    const dispatch = useDispatch();
    let author = useSelector(state => state.authReducer.user);
    let status = useSelector( state => state.postReducer.status );

    React.useEffect(()=>{
        if (status)
        {
            toast(status);
            dispatch(clearStatus());
        }

    },[status, dispatch])

    let handleSubmit = ()=>{
        try {
            const data = new FormData();
            data.append("author", author);
            data.append("title", title);
            data.append("text",text);
            data.append("imgURL",imgURL);

            dispatch(createPost(data) );
            handleClear();
            navigate(`/getMyPosts`);
        }
        catch (err)
        {
            console.log(err);
        }
    }

    let handleClear = ()=>{
        setTitle("");
        setText("");
    }

    const onChange = React.useCallback((text)=>{
        setText(text);
    },[]);

    const options = React.useMemo(
        ()=>({
            spellCheker:false,
            maxHeight: '400px',
            autofocus: true,
            placeholder:"Введите текст...",
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
    }),[]);

    return (
        <>
            <BlockForm onSubmit={(e)=>e.preventDefault()} enctype="multipart/form-data" >
                <Input width={"600px"} onChange={ e => setImgURL( e.target.files[0] ) } type={"file"} name={"file"} />

                {imgURL ?
                    <div>
                        <LoadingPicture src={URL.createObjectURL(imgURL)} alt="image"/>
                    </div> :
                    <LoadingPicture alt=""/>
                }

                <Input width={"600px"} value={title} onChange={ (e) => setTitle( e.target.value) } placeholder={"Заголовок"} type={"text"} />
                {/*<TextArea value={text} onChange={ (e) => setText( e.target.value) }  placeholder={"Описание"}  />*/}
                <SimpleMDE value={text} onChange={ onChange } options={options} />
                <BlockButtons>
                    <Button onClick={handleClear} width={"180px"}  >Очистить</Button>
                    <Button onClick={handleSubmit} width={"180px"} >Добавить</Button>

                </BlockButtons>
            </BlockForm>
        </>
    );
};

export default AddNewPost;