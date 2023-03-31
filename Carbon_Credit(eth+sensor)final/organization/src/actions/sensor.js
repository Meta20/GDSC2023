import axiosInstance from "../helpers/axios";
import axios from "../helpers/axios";
import { sensorDataConstants } from "./constants";

export const sensorData = () => {
    return async (dispatch) =>{
        dispatch({type: sensorDataConstants.SENSOR_DATA_REQUEST});
        const res = await axios.get("/sensor");
        if(res.status === 200){
            console.log(res.data);
            dispatch({type: sensorDataConstants.SENSOR_DATA_SUCCESS,
                        payload: {
                            message: res.data
                        }
            });
            return true;
        }else{
            dispatch({type: sensorDataConstants.SENSOR_DATA_FAILURE,
                payload: {error: "Something wrong happened while replacing!"}
            });
            return false;
        }
    }
}