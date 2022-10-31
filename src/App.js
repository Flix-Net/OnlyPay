import React from "react";
import {Routes,  Route} from "react-router-dom";
import Main from "./Pages/Main";
import Register from "./Pages/Register";
import Authorize from "./Pages/Authorize";
import AddNewPost from "./Pages/AddNewPost";
import Header from "./Components/Header/Header";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";
import {getMe} from "./Redux/Slices/authSlice";
import GetOnePost from "./Pages/GetOnePost";
import EditPost from "./Pages/EditPost";
import GetMyPosts from "./Pages/GetMyPosts";
import Container from "./Components/Container/Container";


function App() {

    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getMe());
    },[dispatch])

  return (
          <div className="App">

              <Header/>

              <Container>
                  <Routes>
                      <Route path={"/"} element={<Main/>} />
                      <Route path={"/Register"} element={<Register/>}/>
                      <Route path={"/Login"} element={<Authorize/>}/>
                      <Route path={"/AddNewPost"} element={<AddNewPost/>}/>
                      <Route path={"/getOnePost/:id"} element={<GetOnePost/>}/>
                      <Route path={"/getMyPosts"} element={<GetMyPosts/>}/>
                      <Route path={"/editPost/:id"} element={<EditPost/>}/>
                  </Routes>
              </Container>

              <ToastContainer position={"bottom-center"} />
          </div>
      );
}

export default App;
