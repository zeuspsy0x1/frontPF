import { addPostDetail
} from "../reducers/postReducer.slice";
import axios from 'axios';
import { backend } from "../../linksDeploy";

export const createComment = (userId, postId, info) => async (dispatch) => {
    try {
        const response = await axios.post(`${backend}comment/${userId}/${postId}`, info, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return dispatch(addPostDetail(response.data));
    } catch (error) {
        console.log(error)
    }
};
