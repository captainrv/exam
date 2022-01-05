import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { Container, Row, Table, Card, Col, Button } from 'react-bootstrap';
import { fetchActiveCompetitions } from '../redux'
import { GoDiff } from "react-icons/go";
import dateFormat from "dateformat";
export const ExamAttempet = (props) => {
    const [status, setStatus] = useState(false);
    const [quesStatus, setQuesStatus] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        if (props.activeCompetition.fetchStatus !== false) {
            props.fetchActiveCompetitions()
        }
    }, [props.activeCompetition.msg])

    return (
        <>
            <Container className="mt-4">
                <Row className="mb-5">
                    <h3 className='m-3'>Competitions List...</h3>
                    {props.activeCompetition.activeCompetitionsData.map((val, i) => (
                        <Col sm={3} key={i}>
                            <Link to={`/examattempet/${val._id}`}>
                            <Card className='p-2' role='button' >
                                <h4 className='text-center'>{val.competitionName}</h4>
                                <ul>
                                    <li>{val.classData.title} {val.countryData.name}</li>
                                    <li>Totol Question : {val.subjectData.title}</li>
                                    <li>Totol Question : {val.totalQuestion}</li>
                                    <li>Totol Marks : {val.totalQuestion}</li>
                                    <li>Start In : {dateFormat(val.startDateTime)}</li>
                                </ul>
                            </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    activeCompetition: state.activeCompetition,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchActiveCompetitions: function () {
            dispatch(fetchActiveCompetitions())
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ExamAttempet)
