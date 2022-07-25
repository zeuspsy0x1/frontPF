import { AllReviewes,
    NewReview
} from "../reducers/reviewReducer";
import axios from 'axios';
import { backend } from '../../linksDeploy';

export const getAllReviewes = () => async (dispatch) => {
    try {
        const response = await axios.get(`${backend}review`);
        return dispatch(AllReviewes(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const createNewReview = (userId, info) => async (dispatch) => {
    try {
        const response = await axios.post(`${backend}review/${userId}`, info, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return dispatch(NewReview(response.data));
    } catch (error) {
        console.log(error)
    }
};

export const modifyReview = (userId, reviewId, info) => async (dispatch) => {
    try {
        const response = await axios.put(`${backend}review/${userId}/${reviewId}`, info, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return dispatch(AllReviewes(response.data));
    } catch (error) {
        console.log(error)
    }
};

export const deleteReview = (userId, reviewId) => async (dispatch) => {
    try {
        const response = await axios.delete(`${backend}review/${userId}/${reviewId}`, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return dispatch(AllReviewes(response.data));
    } catch (error) {
        console.log(error)
    }
};
