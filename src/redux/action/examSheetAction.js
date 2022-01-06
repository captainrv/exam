import {EXAM_SHEET_FETCH_ERROR,EXAM_SHEET_FETCH_REQUEST,EXAM_SHEET_FETCH_SUCCESS,EXAM_SHEET_UPDATE_ERROR,EXAM_SHEET_UPDATE_REQUEST,EXAM_SHEET_UPDATE_SUCCESS} from '../action/examSheetType';
const axios = require("axios");
export const answerSheetUpdate = (answerKeyId,answerData,competitionId,status) => {
    return function (dispatch) {
        dispatch({
            type: EXAM_SHEET_UPDATE_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/examsheet/`,
            method: "post",
            data: {answerKeyId,answerData,competitionId,status},
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                console.log(res.data.result);
                dispatch({
                    type: EXAM_SHEET_UPDATE_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                });
            })
            .catch((error) => {
                dispatch({
                    type: EXAM_SHEET_UPDATE_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};



export const fetchAnswerSheet = (competitionId) => {
    return function (dispatch) {
        dispatch({
            type: EXAM_SHEET_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/examsheet/${competitionId}`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                console.log(res.data.result.length);
                if(res.data.result.length>0){
                    var reData = res.data.result[0]
                }else{
                    var reData = {}
                }
                dispatch({
                    type: EXAM_SHEET_FETCH_SUCCESS,
                    loading: false,
                    result: reData,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: EXAM_SHEET_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};