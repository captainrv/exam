import {
    EXAM_SHEET_FETCH_ERROR,
    EXAM_SHEET_FETCH_REQUEST,
    EXAM_SHEET_FETCH_SUCCESS,
    EXAM_SHEET_UPDATE_ERROR,
    EXAM_SHEET_UPDATE_REQUEST,
    EXAM_SHEET_UPDATE_SUCCESS,
    EXAM_SHEET_NOTIFICATION
} from '../action/examSheetType';


const intialState = {
    status: false,
    loading: false,
    loadingUpdate: false,
    fetchStatus: true,
    action: "ExamSheet",
    answerSheetData: {},
    msg: "",
    msgType: "",
    error: "",
};

const answerSheetUpdateReducer = (state = intialState, action) => {
    switch (action.type) {
        case EXAM_SHEET_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case EXAM_SHEET_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                answerSheetData: action.result,
                msg: action.msg,
                msgType: action.msgType,
                fetchStatus: action.fetchStatus
            };
        case EXAM_SHEET_FETCH_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        case EXAM_SHEET_UPDATE_REQUEST:
            return {
                ...state,
                loadingUpdate: action.loading,
            };
        case EXAM_SHEET_UPDATE_SUCCESS:
            return {
                ...state,
                loadingUpdate: action.loading,
                answerSheetData: action.result,
                msg: action.msg,
                msgType: action.msgType
            };
        case EXAM_SHEET_UPDATE_ERROR:
            return {
                ...state,
                loadingUpdate: action.loading,
                error: action.error,
            };
            case EXAM_SHEET_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType
            };
        default:
            return state;
    }
};

export default answerSheetUpdateReducer;
