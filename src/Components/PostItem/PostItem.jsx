import React from 'react';
import styled from "styled-components";
import Moment from "react-moment";
import {FaClock, FaEye, FaPen} from "react-icons/fa";
import {Link} from "react-router-dom";

const BlockItem = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  //overflow: hidden;
  width: 1200px;
  height: 400px;
  margin: 35px auto 50px auto;
  display: flex;
  transition: .2s;
  padding: 3px;

  &:hover {
    //box-shadow: 4px 4px 20px #212121,
    //          -4px -4px 20px #212121;
    //border: 1px solid #6E31AA;
    box-shadow: 1px 1px 2px #6E31AA,
              -1px -1px 2px #6E31AA;
  }
`

const BlockImage = styled.div`
  text-align: center;
  width: ${props => props.width || "50%"};
  height: auto;
  background-color: transparent;
  transition: .2s;
  position: relative;
  border-radius: 10px;
  box-shadow: 8px 8px 25px #000b15;
`

const Read = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 32px;
  object-fit: cover;
  background-color: rgba(0, 0, 0, 0);
  display: block;
  color: transparent;
  transition: .3s;
  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    padding-top: 28%;
    cursor: pointer;
  }
`

const IMG = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const BlockContent = styled.div`
  width: 50%;
  height: auto;
  padding: 15px 15px 15px 25px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  word-break: break-all;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Text = styled.div`
  font-size: 16px;
  text-align: start;
  font-style: italic;
  width: 100%;
  
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const BlockData = styled.div`
  border-top: 1px solid #03A9F4;
  margin-top: 20px;
  display: flex;
`

const DatePub = styled.div`
  font-size: 18px;
  width: 33.333%;
  text-align: center;
`

const Author = styled.div`
  font-size: 18px;
  width: 33.333%;
  text-align: center;
`

const Views = styled.div`
  font-size: 18px;
  width: 33.333%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 65px;
`

const PostItem = (props) => {

    const postID = props._id;
    let Image = props.imgURL;
    console.log(props.imgURL);

    return (
        <BlockItem>

            {
                Image ?
                    <BlockImage>
                        <Link to={`/getOnePost/${postID}`} ><Read  >Читать</Read></Link>
                        <IMG  src={`http://localhost:4000/${props.imgURL}`} alt={"img"} />
                    </BlockImage>
                    :
                    <BlockImage>
                        <Link to={`/getOnePost/${postID}`} ><Read  >Читать</Read></Link>
                    </BlockImage>
            }


            <BlockContent>
                <div>
                    <Title>{props.title}</Title>
                    <Text>{props.text}</Text>
                </div>
                <BlockData>
                    <Views> <FaEye size={"23px"}/> {props.view}</Views>
                    <Author> <FaPen /> {props.author}</Author>
                    <DatePub> <FaClock/> <Moment date={props.createdAt} format={"D MMM YYYY"} /> </DatePub>
                </BlockData>
            </BlockContent>

        </BlockItem>
    );
};

export default PostItem;

