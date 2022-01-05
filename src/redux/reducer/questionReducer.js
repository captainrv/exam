import {
    QUESTION_FETCH_REQUEST,
    QUESTION_FETCH_SUCCESS,
    QUESTION_FETCH_ERROR,
    QUESTION_NOTIFICATION,
    START_EXAM_QUESTION_FETCH_ERROR,
    START_EXAM_QUESTION_FETCH_REQUEST,
    START_EXAM_QUESTION_FETCH_SUCCESS
} from '../action/questionsType';

const intialState = {
    loading: false,
    loading1:false,
    fetchStatus: true,
    action: "Questions",
    questionData: [],
    startExamQuestionData: [],
    msg: "",
    msgType: "",
    error: "",
};

const questionsReducer = (state = intialState, action) => {
    switch (action.type) {
        // Fetch Assets
        case QUESTION_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case QUESTION_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                questionData: action.result,
                msg: action.msg,
                msg: action.msgType
            };
        case QUESTION_FETCH_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        case QUESTION_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType,
            };

        case START_EXAM_QUESTION_FETCH_REQUEST:
            return {
                ...state,
                loading1: action.loading,
            };
        case START_EXAM_QUESTION_FETCH_SUCCESS:
            return {
                ...state,
                loading1: action.loading,
                startExamQuestionData: action.result,
                msg: action.msg,
                msg: action.msgType
            };
        case START_EXAM_QUESTION_FETCH_ERROR:
            return {
                ...state,
                loading1: action.loading,
                error: action.error,
            };
        case QUESTION_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType,
            };
        default:
            return state;
    }
};

export default questionsReducer;
