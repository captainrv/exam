import {
    QUESTION_FETCH_REQUEST,
    QUESTION_FETCH_SUCCESS,
    QUESTION_FETCH_ERROR,
    START_EXAM_QUESTION_FETCH_REQUEST,
    START_EXAM_QUESTION_FETCH_SUCCESS,
    START_EXAM_QUESTION_FETCH_ERROR
} from '../action/questionsType';
const axios = require("axios");
export const fetchQuestion = (countryId, classId, subjectId) => {
    return function (dispatch) {
        dispatch({
            type: QUESTION_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/questions/`,
            method: "post",
            data: {
                countryId,
                classId,
                subjectId,
            },
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: QUESTION_FETCH_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: QUESTION_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};


export const startExamQuestion = (questions) => {
    return function (dispatch) {
        dispatch({
            type: START_EXAM_QUESTION_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/questions/start`,
            method: "post",
            data: {
                questions,
            },
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: START_EXAM_QUESTION_FETCH_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: START_EXAM_QUESTION_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};