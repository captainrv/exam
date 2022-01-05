import {
    ACTIVE_COMPETITION_FETCH_ERROR,
    ACTIVE_COMPETITION_FETCH_SUCCESS,
    ACTIVE_COMPETITION_FETCH_REQUEST,

} from '../action/activeCompetitionType';

const intialState = {
    status: false,
    loading: false,
    fetchStatus: true,
    action: "ActiveCompetitions",
    activeCompetitionsData: [],
    msg: "",
    msgType: "",
    error: "",
};

const activeCompetitionReducer = (state = intialState, action) => {
    switch (action.type) {
        case ACTIVE_COMPETITION_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
            };
        case ACTIVE_COMPETITION_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                activeCompetitionsData: action.result,
                msg: action.msg,
                msgType: action.msgType,
                fetchStatus:action.fetchStatus
            };
        case ACTIVE_COMPETITION_FETCH_REQUEST:
            return {
                ...state,
                loading: action.loading,
                error: action.error,
            };
        default:
            return state;
    }
};

export default activeCompetitionReducer;
