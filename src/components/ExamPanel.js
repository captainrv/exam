import React, { useState, useEffect, style } from 'react';
import { connect, useDispatch } from 'react-redux';
import dateFormat from "dateformat";
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { fetchActiveCompetitions, startExamQuestion, answerSheetUpdate, fetchAnswerSheet } from '../redux'

export const ExamPanel = (props) => {
    const [answerKeyId, setAnswerKeyId] = useState("");
    const [competitionQue, setCompetitionQue] = useState([]);
    const [answerSheet, setAnswerSheet] = useState([]);
    const [competitionData, setCompetitionData] = useState([]);
    const [competitionId, setCompetitionId] = useState(props.match.params.id);
    const [displayNo, setDisplayNo] = useState(0);
    const [status, setStatus] = useState(0);
    const [answerInput, setAnswerInput] = useState({});
    useEffect(() => {
        const competition = props.activeCompetition.activeCompetitionsData.filter(val => {
            return val._id === competitionId
        })
        if (props.activeCompetition.fetchStatus !== false) {
            props.fetchActiveCompetitions()
        }
        if (competition.length > 0) {
            setCompetitionData(competition);
            const competitionQuestion = competition[0];
            if (props.questions.fetchStatus !== false) {
                props.startExamQuestion(competitionQuestion.questions)
            }
        }

    }, [props.activeCompetition.loading, props.questions.msg])

    function shaowQuestions(i) {
        if (i >= 0 && i < props.questions.startExamQuestionData.length) {
            var anserId = props.questions.startExamQuestionData[i];
            const filterAnswer = answerSheet.filter(val => val._id === anserId._id);
            setDisplayNo(i);
            if (filterAnswer.length > 0) {
                setAnswerInput(...filterAnswer)
            } else {
                setAnswerInput({ ans: "", status: "danger" })
            }

        }
    }
    useEffect(() => {
        if (props.answerSheetOnline.fetchStatus !== false) {
            props.fetchAnswerSheet(competitionId)
        }
        if(props.answerSheetOnline.answerSheetData!==""){
            if(props.answerSheetOnline.answerSheetData.answerKey!==undefined){
                setAnswerSheet(props.answerSheetOnline.answerSheetData.answerKey)
                setAnswerKeyId(props.answerSheetOnline.answerSheetData._id)
            }
      
        }
        if(props.answerSheetOnline.answerSheetData.status!== 0 && props.answerSheetOnline.answerSheetData.status!==undefined){
            window.location.href="/result";
        }

    }, [props.answerSheetOnline.location])


    function finalSubmit(){
        setStatus(1);
        props.answerSheetUpdate(answerKeyId, answerSheet, competitionId,1)

    }



    function markReview(id) {   
        const filterAnswer = answerSheet.filter(val => val._id !== id);
    }

    function anserSubmit(answer, questionid) {
        const filterAnswer = answerSheet.filter(val => val._id !== questionid);
        setAnswerSheet([...filterAnswer, { ans: answer, _id: questionid, status: "success" }]);
        setAnswerInput({ ans: answer, _id: questionid, status: "success" })
        const answerKeyDatas = [...filterAnswer, { ans: answer, _id: questionid, status: "success" }];
        props.answerSheetUpdate(answerKeyId, answerKeyDatas, competitionId,status)
    }
    var displayQuestion = [];
    if (props.questions.startExamQuestionData.length !== 0) {
        displayQuestion = [props.questions.startExamQuestionData[displayNo]];
    }
    return (
        <>
            <Container className="mt-4" fluid>
                <Row className="mb-5">
                    {competitionData.map((val, i) => (
                        <Col sm={3} key={i}>
                            <Card className='p-2 bg-light'>
                                <Card.Body>
                                    <Row className='p-2'>
                                        {props.questions.startExamQuestionData.map((val, k) => {
                                            if (val._id !== displayQuestion[0]._id) {
                                                var color = "dark";
                                            } else {
                                                var color = "info"
                                            }
                                            return (
                                                <Col sm="3" md="3" className='text-center' key={k}>
                                                    <Button variant={color} className="m-1 btnRound" onClick={() => shaowQuestions(k)}>{k + 1}</Button>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col sm={9}>
                        <Card className="bg-light">
                            <Card.Body>
                                <Row>
                                    <h3>Exam Panel</h3>
                                    {displayQuestion.map((val, i) => {
                                        return (
                                            <Col key={i}>
                                                <Col sm={12} className='mt-2'><p>{val.title}</p></Col>
                                                <Col sm={12} className='mt-5 p-2'><p>Q.No {displayNo + 1} : <b>{val.data.lhs || (
                                                    <input
                                                        type="text"
                                                        value={answerInput.ans}
                                                        onChange={(e) => anserSubmit(e.target.value, val._id)
                                                        }
                                                    />)} {val.data.lhsUnit} {val.data.rhs || (
                                                        <input
                                                            type="text"
                                                            value={answerInput.ans}
                                                            onChange={(e) => anserSubmit(e.target.value, val._id)
                                                            }
                                                        />)} {val.data.rhsUnit}. </b></p></Col>
                                                <Row className='mt-5'>
                                                    <Col>
                                                        <div className="d-grid gap-2">
                                                            <Button variant='secondary' onClick={() => { shaowQuestions(displayNo - 1); }} className='m-1 btn-block   '>Previous</Button>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="d-grid gap-2">
                                                            <Button variant='info' onClick={() => shaowQuestions(displayNo + 1)} className='m-1'>Next</Button>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="d-grid gap-2">
                                                            <Button variant='primary' onClick={() => { markReview(val.id) }} className='m-1 btn-block   '>Mark For Review</Button>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className="d-grid gap-2">
                                                            <Button variant='success' className='m-1' onClick={() => { finalSubmit() }}>Submit</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })}

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
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
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ExamPanel)
