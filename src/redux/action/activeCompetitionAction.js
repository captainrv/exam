import {ACTIVE_COMPETITION_FETCH_ERROR,ACTIVE_COMPETITION_FETCH_REQUEST,ACTIVE_COMPETITION_FETCH_SUCCESS} from './activeCompetitionType'
const axios = require("axios");
export const fetchActiveCompetitions = () => {
    return function (dispatch) {
        dispatch({
            type: ACTIVE_COMPETITION_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/competitions/active`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: ACTIVE_COMPETITION_FETCH_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: ACTIVE_COMPETITION_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};