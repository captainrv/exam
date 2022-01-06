import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import dateFormat from "dateformat";
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { fetchActiveCompetitions, startExamQuestion, answerSheetUpdate, fetchAnswerSheet } from '../redux'
import LoadingModal from './Elements/LoadingModal'
import {EXAM_SHEET_NOTIFICATION} from '../redux/action/examSheetType'

export const ExamPanel = (props) => {
    const [competitionData, setCompetitionData] = useState({});
    const [displayQue, setDisplayQue] = useState({});
    const [displayView, setDisplayView] = useState({});
    const [questionData, setQuestionData] = useState([]);
    const [answerSheet, setAnswerSheet] = useState([]);
    const [answerCurrent, setAnswerCurrent] = useState({});
    const [counter, setCounter] = useState({});
    const [answerKeyId, setAnswerKeyId] = useState();
    const [queNo, setQueNo] = useState(0);
    const [status, setStatus] = useState(0);
    const [competitionId, setCompetitionId] = useState(props.match.params.id);

    useEffect(() => {
        const competition = props.activeCompetition.activeCompetitionsData.filter(val => {
            return val._id === competitionId
        })
        if (competition.length > 0) {
            const competitionQuestion = Object.assign({}, ...competition);
            setCompetitionData(competitionQuestion);
            if (props.questions.fetchStatus !== false) {
                props.startExamQuestion(competitionQuestion.questions)
            }
        }
        if (props.activeCompetition.fetchStatus !== false) {
            props.fetchActiveCompetitions()
        }
        props.fetchAnswerSheet(competitionId)

    }, [props.activeCompetition.loading])

    useEffect(() => {
        if (props.questions.startExamQuestionData.length > 0) {
            setQuestionData(props.questions.startExamQuestionData);
            const recentQue = props.questions.startExamQuestionData[queNo];
            setDisplayQue(recentQue)
            setDisplayView(recentQue.data)
            const updateAnswerKey = { _id: recentQue._id, answer: '', status: "warning" }
            setAnswerSheet([...answerSheet, updateAnswerKey]);
            setAnswerCurrent(updateAnswerKey)
            if(props.answerSheetOnline.answerSheetData._id!==undefined){
                const activeAnswer = props.answerSheetOnline.answerSheetData.answerKey.filter(val=>val._id===recentQue._id)
                setAnswerKeyId(props.answerSheetOnline.answerSheetData._id)
                setAnswerSheet(props.answerSheetOnline.answerSheetData.answerKey);
                setAnswerCurrent(...activeAnswer)
            }
        }
        if(props.answerSheetOnline.answerSheetData.status!== 0 && props.answerSheetOnline.answerSheetData.status!==undefined){
            window.location.href="/result";
        }
        const notAttempted = props.questions.startExamQuestionData.length;
        const notAnswered = answerSheet.filter(val => val.status === "warning")
        const answered = answerSheet.filter(val => val.status === "success")
        const markReview = answerSheet.filter(val => val.status === "primary")
      
        setCounter({ notAttempted: notAttempted - notAnswered.length - answered.length - markReview.length, notAnswered: notAnswered.length, answered: answered.length, markReview: markReview.length })
        if(props.answerSheetOnline.msg!==""){
            props.msgReset()
        }

    }, [props.questions,props.answerSheetOnline.msg])


    function finalSubmit(){
        setStatus(1);
        props.answerSheetUpdate(answerKeyId, answerSheet, competitionId,1)

    }

    function showQuestions(i) {
        if (i >= 0 && i < questionData.length) {
            var filterQuestion = questionData[i];
            setQueNo(i);
            setDisplayQue(filterQuestion);
            setDisplayView(filterQuestion.data);
            const filterAnswer = answerSheet.filter(val => val._id !== filterQuestion._id);
            const keyAnswer = answerSheet.filter(val => val._id === filterQuestion._id);
            if (keyAnswer.length > 0) {
                var variantColor = keyAnswer[0].status;
                var answer = keyAnswer[0].answer;
            } else {
                var variantColor = "warning";
                var answer = "";
            }
            const updateAnswerKey = { _id: filterQuestion._id, answer: answer, status: variantColor }
            setAnswerSheet([...filterAnswer, updateAnswerKey]);
            setAnswerCurrent(updateAnswerKey);
            const notAttempted = props.questions.startExamQuestionData.length;
            const notAnswered = answerSheet.filter(val => val.status === "warning")
            const answered = answerSheet.filter(val => val.status === "success")
            const markReview = answerSheet.filter(val => val.status === "primary")
            setCounter({ notAttempted: notAttempted - notAnswered.length - answered.length - markReview.length, notAnswered: notAnswered.length, answered: answered.length, markReview: markReview.length })
            const answerKeyDatas = [...filterAnswer, updateAnswerKey]  
            props.answerSheetUpdate(answerKeyId, answerKeyDatas, competitionId, status)
        }
    }

    function anserSubmit(answer, questionid) {
        const filterAnswer = answerSheet.filter(val => val._id !== questionid);
        if (answer !== "") {
            var variantColor = "success";
        } else {
            var variantColor = "warning";
        }
        const updateAnswerKey = { _id: questionid, answer: answer, status: variantColor }
        setAnswerSheet([...filterAnswer, updateAnswerKey]);
        setAnswerCurrent(updateAnswerKey);
    }

    function markReviews(queId) {
        const filterAnswer = answerSheet.filter(val => val._id !== queId);
        const filterMark = answerSheet.filter(val => val._id === queId);
        var answer = filterMark[0].answer;
        const updateAnswerKey = { _id: queId, answer: answer, status: 'primary' }
        setAnswerSheet([...filterAnswer, updateAnswerKey]);
        setAnswerCurrent(updateAnswerKey);
    }

    return (
        <>
            {props.questions.loading1 || props.activeCompetition.loading ? <LoadingModal /> :
                <Container className="mt-2" fluid>
                    <Row className="mb-5">
                        <Col sm={9}>
                            <Card className="bg-light">
                                <Card.Header>
                                    <Col sm={12} className='mt-2'><h5>{displayQue.title}</h5></Col>
                                </Card.Header>
                                <Card.Body className='layout'>
                                    <Row>
                                        <h5>Question {queNo + 1} </h5><br /><hr />
                                        <Col sm={12} className='mt-5 p-2'><p><b> {displayView.lhs || (
                                            <input
                                                type="text"
                                                value={answerCurrent.answer}
                                                onChange={(e) => anserSubmit(e.target.value, displayQue._id)}
                                            />)}  {displayView.lhsUnit}  {displayView.rhs || (
                                                <input
                                                    type="text"
                                                    value={answerCurrent.answer}
                                                    onChange={(e) => anserSubmit(e.target.value, displayQue._id)}
                                                />)} {displayView.rhsUnit}. </b></p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <div className="d-grid gap-2">
                                                <Button variant='secondary' onClick={() => { showQuestions(queNo - 1); }} className='m-1 btn-block   '>Previous</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-grid gap-2">
                                                <Button variant='info' onClick={() => showQuestions(queNo + 1)} className='m-1'>Next</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-grid gap-2">
                                                <Button variant='primary' onClick={() =>markReviews(displayQue._id)} className='m-1'>Mark & Reviews</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="d-grid gap-2">
                                                <Button variant='success' className='m-1' onClick={()=>finalSubmit()}>Submit</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={3}>
                            <Card className='bg-light'>
                                <Card.Header>
                                    <h5 className='text-center'>Time Left</h5  >
                                </Card.Header>
                                <Card.Header>
                                    <h5 className='text-center'>Questions List</h5  >
                                </Card.Header>
                                <Card.Body className='over'>
                                    <Row className='p-2'>
                                        {props.questions.startExamQuestionData.map((val, k) => {
                                            const filterAnswer = answerSheet.filter(ans => ans._id === val._id);
                                            const filterAns = filterAnswer[0];
                                            if (val._id === displayQue._id) {
                                                var color = "info";
                                            } else {
                                                if (filterAns === undefined && val._id !== displayQue._id) {
                                                    var color = "dark";
                                                } else {
                                                    var color = filterAns.status;
                                                }
                                            }
                                            return (
                                                <Col sm="3" md="3" className='text-center' key={k}>
                                                    <Button variant={color} className="m-1 btnRound text-white" onClick={() => showQuestions(k)}>{k + 1}</Button>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Row className='text-center'>
                                        <Col className='mt-2'>
                                            <Button variant={"dark"} className=" btnRound">{counter.notAttempted || 0}</Button>
                                        </Col>
                                        <Col className='mt-2'>
                                            <Button variant={"warning"} className=" btnRound">{counter.notAnswered || 0}</Button>
                                        </Col>
                                        <Col className='mt-2'>
                                            <Button variant={"success"} className="btnRound">{counter.answered || 0}</Button>
                                        </Col>
                                        <Col className='mt-2'>
                                            <Button variant={"primary"} className="btnRound">{counter.markReview || 0}</Button>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={12}>
                            <Card>
                                <Card.Body>
                                    <Row className='text-center'>
                                        <Col className='mt-2'>
                                            <Button variant={"dark"} className="m-1 btnRound2"></Button> <br /><b className='fonSize'>Not Attempted</b>
                                        </Col>
                                        <Col className='mt-2'>
                                            <Button variant={"info"} className="m-1 btnRound2"></Button><br /> <b className='fonSize'>Current</b>
                                        </Col>
                                        <Col className='mt-2'>
                                            <Button variant={"warning"} className="m-1 btnRound2"><br /></Button><br /><b className='fonSize'>  Not Answered</b>
                                        </Col>
                                        <Col className='mt-2'>
                                            <Button variant={"success"} className="m-1 btnRound2"><br /></Button> <br /><b className='fonSize'> Answered</b>
                                        </Col>
                                        <Col className='mt-2'>
                                            <Button variant={"primary"} className="m-1 btnRound2"><br /></Button> <br /> <b className='fonSize'>Mark & Review</b>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>}
        </>
    )
}

const mapStateToProps = (state) => ({
    activeCompetition: state.activeCompetition,
    questions: state.question,
    answerSheetOnline: state.answerSheet
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchActiveCompetitions: function () {
            dispatch(fetchActiveCompetitions())
        },
        startExamQuestion: function (questions) {
            dispatch(startExamQuestion(questions))
        },
        answerSheetUpdate: function (answerKeyId, answerData, competitionId,status) {
            dispatch(answerSheetUpdate(answerKeyId, answerData, competitionId,status))
        },
        fetchAnswerSheet: function (competitionId) {
            dispatch(fetchAnswerSheet(competitionId))
        },
        msgReset: function () {
            dispatch({
                type: EXAM_SHEET_NOTIFICATION,
                msg: "",
                msgType: "",
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamPanel)
