import { CLASS_FETCH_SUCCESS, CLASS_FETCH_REQUEST, CLASS_FETCH_ERROR, CLASS_NOTIFICATION } from '../action/classType';

const intialState = {
    loading: false,
    fetchStatus: true,
    action: "Class",
    classData: [],
    msg: "",
    msgType: "",
    error: "",
};

const classReducer = (state = intialState, action) => {
    switch (action.type) {
        // Fetch Assets
        case CLASS_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case CLASS_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                classData: action.result,
                msg: action.msg,
                msg: action.msgType
            };
        case CLASS_FETCH_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        case CLASS_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType,
            };
        default:
            return state;
    }
};

export default classReducer;
