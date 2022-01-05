import { SUBJECT_FETCH_SUCCESS, SUBJECT_FETCH_REQUEST, SUBJECT_FETCH_ERROR } from '../action/subjectType';
const axios = require("axios");
export const fetchSubject = () => {
    return function (dispatch) {
        dispatch({
            type: SUBJECT_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `https://examd.herokuapp.com/subject/`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: SUBJECT_FETCH_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: SUBJECT_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};
