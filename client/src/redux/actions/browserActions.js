import { browser , errorBrowser} from "../reducers/browserReducers.slice";
import axios from "axios";
import { backend } from "../../linksDeploy";

export const browserAction = (data) => async (dispatch) => {
   try {
    let searchs = await axios.get(`${backend}user/browser/${data}`,{headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
       return dispatch(browser(searchs.data));
   } catch (err) {
    if(err.response.status === 404 || err.response.status === 400 ) {
      dispatch(errorBrowser(err.response.data.err))
    }
   }
};
