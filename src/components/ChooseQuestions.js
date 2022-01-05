import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap'
import "react-sliding-pane/dist/react-sliding-pane.css";
import { fetchQuestion, updateCompetitions } from "../redux";
import { QUESTION_NOTIFICATION } from '../redux/action/questionsType'
const updateForm = (props) => {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState({});
    const [chooseQues, setChooseQues] = useState([]);
    useEffect(() => {
        setStatus(props.quesStatus);
        const filterData = props.competitions.competitionsData.filter(val => {
            return val._id === props.data._id
        })
        const filterVal = filterData[0];
        setData(filterVal);
        setChooseQues(filterVal.questions)
    }, [props.competitions.msgType])

    useEffect(() => {
        if (props.question.fetchStatus !== false) {
            const { countryId, classId, subjectId } = props.data;
            props.fetchQuestion(countryId, classId, subjectId)
        }
    }, [])

    function mychooseque(val) {
        const choose = chooseQues.filter(vals => {
            return vals === val
        })
        if (choose.length !== 0) {
            var unSelect = chooseQues.filter(dals => {
                return dals !== val
            })
            setChooseQues(unSelect)
        } else {
            if (data.totalQuestion > data.questions.length) {
                setChooseQues([...chooseQues, val])
                var unSelect = [...chooseQues, val];
            } else {
                store.addNotification({
                    message: "Question Choose limit complete",
                    type: "warning",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                        showIcon: true,
                    },
                    width: 250,
                });
            }

        }
            props.updateCompetitions(data._id, unSelect);

    }

    return (
        <>
            <ReactNotification />
            <SlidingPane
                className=""
                overlayClassName="some-custom-overlay-class"
                isOpen={status}
                title="Questions Choose..."
                subtitle={`Questions Choose Panel `}
                onRequestClose={() => setStatus(false)}
            >
                <Container  >
                    <Row>
                        {props.question.loading ?
                            <Col md="auto">
                                <Spinner animation="grow" size="sm" />
                                <Spinner animation="grow" size="sm" />
                                <Spinner animation="grow" size="sm" />
                            </Col>
                            :
                            props.question.questionData.map((val, i) => {
                                var chooseStatus = chooseQues.some(item => item === val._id)
                                return (
                                    <Col sm={6} key={i} title={val.title}>
                                        <Card className={`p-2 m-1 ${chooseStatus ? "bg-success text-white" : "bg-light"}`} role="button" onClick={(e) => mychooseque(val._id)}>
                                            <p>Q.{i + 1} : <b> {val.data.lhs || "___"} {val.data.lhsUnit} {val.data.rhs || "___"} {val.data.rhsUnit}.</b></p>
                                            <p> Ans : <b className={chooseStatus ? "text-white" : " text-success"}> {val.answer}</b> </p>
                                        </Card>
                                    </Col>
                                )
                            })}
                    </Row>
                </Container>
            </SlidingPane>
        </>
    );
};

const mapStatetoProps = (state) => {
    return {
        question: state.question,
        competitions: state.competitions,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        fetchQuestion: function (countryId, classId, subjectId) {
            dispatch(fetchQuestion(countryId, classId, subjectId))
        },
        updateCompetitions: function (competitionId, chooseQues) {
            dispatch(updateCompetitions(competitionId, chooseQues))
        },
        msgReset: function () {
            dispatch({
                type: QUESTION_NOTIFICATION,
                msg: "",
                msgType: "",
            });
        },
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(updateForm);