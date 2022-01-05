import { COUNTRY_FETCH_SUCCESS, COUNTRY_FETCH_REQUEST, COUNTRY_FETCH_ERROR, COUNTRY_NOTIFICATION } from '../action/countryType';

const intialState = {
    loading: false,
    fetchStatus: true,
    action: "Country",
    countryData: [],
    msg: "",
    msgType: "",
    error: "",
};

const countryReducer = (state = intialState, action) => {
    switch (action.type) {
        // Fetch Assets
        case COUNTRY_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case COUNTRY_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                countryData: action.result,
                msg: action.msg,
                msg: action.msgType
            };
        case COUNTRY_FETCH_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        case COUNTRY_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType,
            };
        default:
            return state;
    }
};

export default countryReducer;
