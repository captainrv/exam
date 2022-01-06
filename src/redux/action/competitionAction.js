import {COMPETITION_UPDATE_REQUEST,COMPETITION_UPDATE_SUCCESS,COMPETITION_UPDATE_ERROR, COMPETITION_CREATE_ERROR, COMPETITION_CREATE_REQUEST, COMPETITION_CREATE_SUCCESS, COMPETITION_FETCH_REQUEST, COMPETITION_FETCH_SUCCESS, COMPETITION_FETCH_ERROR } from '../action/competitionType';
const axios = require("axios");
export const createCompetitions = (
    competitionName,
    subjectId,
    totalQuestion,
    totalMarks,
    skills,
    countryId,
    classIds,
    startDateTime,
    endDateTime,
    age,
    charges,
    remark,
    payStatus,
    registrationStartDate,
    registrationEndDate,
    discount
) => {
    return function (dispatch) {
        dispatch({
            type: COMPETITION_CREATE_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/competitions/`,
            method: "post",
            data: {
                competitionName,
                subjectId,
                totalQuestion,
                totalMarks,
                skills,
                countryId,
                classIds,
                startDateTime,
                endDateTime,
                age,
                charges,
                remark,
                payStatus,
                registrationStartDate,
                registrationEndDate,
                discount
            },
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                console.log(res);
                dispatch({
                    type: COMPETITION_CREATE_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: false,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMPETITION_CREATE_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};


export const fetchCompetitions = () => {
    return function (dispatch) {
        dispatch({
            type: COMPETITION_FETCH_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/competitions/`,
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: COMPETITION_FETCH_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                    fetchStatus: true,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMPETITION_FETCH_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};

export const updateCompetitions = (competitionId, chooseQues) => {
    return function (dispatch) {
        dispatch({
            type: COMPETITION_UPDATE_REQUEST,
            loading: true,
        });
        var OPTIONS = {
            url: `http://localhost:5000/competitions/`,
            method: "patch",
            data: {
                competitionId, chooseQues
            },
            headers: {
                "content-type": "application/json",
            },
        };
        axios(OPTIONS)
            .then((res) => {
                dispatch({
                    type: COMPETITION_UPDATE_SUCCESS,
                    loading: false,
                    result: res.data.result,
                    msg: res.data.msg,
                    msgType: res.data.msgType,
                });
            })
            .catch((error) => {
                dispatch({
                    type: COMPETITION_UPDATE_ERROR,
                    loading: false,
                    error: error
                });
            });
    };
};
