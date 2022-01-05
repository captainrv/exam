import {
    COMPETITION_CREATE_SUCCESS,
    COMPETITION_CREATE_REQUEST,
    COMPETITION_CREATE_ERROR,
    COMPETITION_NOTIFICATION,
    COMPETITION_FETCH_ERROR,
    COMPETITION_FETCH_SUCCESS,
    COMPETITION_FETCH_REQUEST,
    COMPETITION_UPDATE_REQUEST,
    COMPETITION_UPDATE_SUCCESS,
    COMPETITION_UPDATE_ERROR
} from '../action/competitionType';

const intialState = {
    status: false,
    loading: false,
    loadingUpdate: false,
    fetchStatus: true,
    action: "Competitions",
    competitionsData: [],
    msg: "",
    msgType: "",
    error: "",
};

const competitionReducer = (state = intialState, action) => {
    switch (action.type) {
        // Fetch Assets
        case COMPETITION_CREATE_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case COMPETITION_CREATE_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                competitionsData: [
                    action.result,
                    ...state.competitionsData
                ],
                msg: action.msg,
                msgType: action.msgType
            };
        case COMPETITION_CREATE_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        case COMPETITION_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case COMPETITION_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                competitionsData: action.result,
                msg: action.msg,
                msgType: action.msgType,
                fetchStatus:action.fetchStatus
            };
        case COMPETITION_FETCH_ERROR:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        case COMPETITION_NOTIFICATION:
            return {
                ...state,
                msg: action.msg,
                msgType: action.msgType,
            };
        case COMPETITION_UPDATE_REQUEST:
            return {
                ...state,
                loadingUpdate: action.loading,
            };
        case COMPETITION_UPDATE_SUCCESS:
            const filterData = state.competitionsData.filter(val => {
                return val._id !== action.result._id
            })
            return {
                ...state,
                loadingUpdate: action.loading,
                competitionsData: [action.result,...filterData],
                msg: action.msg,
                msgType: action.msgType
            };
        case COMPETITION_UPDATE_ERROR:
            return {
                ...state,
                loadingUpdate: action.loading,
                error: action.error,
            };
        default:
            return state;
    }
};

export default competitionReducer;
