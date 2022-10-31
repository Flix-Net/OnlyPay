import React from 'react';
import axios from "../Utils/axios";
import PostItem from "../Components/PostItem/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {clearStatus} from "../Redux/Slices/postSlice";

const GetMyPosts = () => {

    let [posts, setPosts] = React.useState([]);
    let status = useSelector(state => state.postReducer.status);
    const dispatch = useDispatch();
    const fetchMyPosts = async ()=>{
        let {data} = await axios.get("/post/getMyPosts");
        setPosts(data);
    };

    React.useEffect(()=>{
        fetchMyPosts();
    },[]);

    React.useEffect(()=>{
        if (status) {
            toast(status);
            dispatch(clearStatus());
            fetchMyPosts();
        }

    },[status])

    return (
        <div>

            <h1>Здесь будут все мои посты!</h1>

            <div>

                {posts.length ?
                    <div>
                        {posts.map((post)=>(
                            <PostItem key={post._id} {...post} />
                        ))}
                    </div> :
                    <div>Постов нет</div>
                }

            </div>

        </div>
    );
};

export default GetMyPosts;