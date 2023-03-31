import { sensorDataConstants } from "../actions/constants"

const initState = {
    co2: "",
    ch4: "",
    n2o: "",
    hfc: "",
    pfc: "",
    sf6: "",
    calculated: "",
    available: ""
}

export default (state = initState, action) => {
    switch(action.type) {
        case sensorDataConstants.SENSOR_DATA_REQUEST:
            state = {
            ...state,
            
            };
            break;
        case sensorDataConstants.SENSOR_DATA_SUCCESS:
            state = {
                ...state,
                co2: action.payload.message.co2,
                ch4: action.payload.message.ch4,
                n2o: action.payload.message.n2o,
                hfc: action.payload.message.hfc,
                pfc: action.payload.message.pfc,
                sf6: action.payload.message.sf6,
                calculated: action.payload.message.calculated,
                available: action.payload.message.available
            };
            break;
        case sensorDataConstants.SENSOR_DATA_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
    }
    return state;
}