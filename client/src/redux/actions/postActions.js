import axios from 'axios';
import { addNewPost, addNewPostProfile } from '../reducers/userReducer.slice';
import { addPostDetail, likesPost, dislikesPost, likesComment } from '../reducers/postReducer.slice';
import { backend } from '../../linksDeploy';


export const getPost = (postId) => async (dispatch) => {
    try{
        let res = await axios.get(`${backend}post/` + postId,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        res = res.data
        return dispatch(addPostDetail(res))
    }catch(err){
        console.log(err)
    }
}

export const createPost = (content, userId, path) => async (dispatch) => {
    try{
        let res = await axios.post(`${backend}post/` + userId, {content: content},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(path)
        if(path === '/home'){
            return dispatch(addNewPost(res.data))
        }else if(path === `/home/profile/${userId}`){
            return dispatch(addNewPostProfile(res.data))
        }
        else return
    }catch(err){
        console.log(err)
    }
}

export const newlikePostTitle = (postId,userId) => async (dispatch) => {
    try {
        let res = await axios.put(`${backend}post/like/${postId}/${userId}`,{},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(likesPost(res.data.likes));
    } catch (err) {
        console.log(err);
    }
}

export const newDislikesPostTitle = (postId,userId) => async (dispatch) => {
    try {
        let res = await axios.put(`${backend}post/likes/${postId}/${userId}`,{},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(likesPost(res.data.dislikes));
    } catch (err) {
        console.log(err)
    }
}

export const newLikesComment = (commentId,userId) => async (dispatch) => {
    try {
        let res = await axios.put(`${backend}comment/like/${commentId}/${userId}`,{},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        let { _id, likes } = res.data;
        dispatch(likesComment({_id,likes}));
    } catch (err) {
        console.log(err)
    }
}
