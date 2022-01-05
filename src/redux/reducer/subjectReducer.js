import { SUBJECT_FETCH_SUCCESS, SUBJECT_FETCH_REQUEST, SUBJECT_FETCH_ERROR, SUBJECT_NOTIFICATION } from '../action/subjectType';

const intialState = {
    loading: false,
    fetchStatus: true,
    action: "Subject",
    subjectData: [],
    msg: "",
    msgType: "",
    error: "",
};

const subjectReducer = (state = intialState, action) => {
    switch (action.type) {
        // Fetch Assets
        case SUBJECT_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case SUBJECT_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                subjectData: action.result,
                msg: action.msg,
                msg: action.msgType
            };
        case SUBJECT_FETCH_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        case SUBJECT_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType,
            };
        default:
            return state;
    }
};

export default subjectReducer;
