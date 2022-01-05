import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Container, Row, Table, Card, Button } from 'react-bootstrap';
import { fetchCompetitions } from '../redux'
import UpdateForm from './updateForm'
import ChooseQuestions from './ChooseQuestions'
import { GoDiff } from "react-icons/go";

export const ExamList = (props) => {
    const [status, setStatus] = useState(false);
    const [quesStatus, setQuesStatus] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {

        if (props.competitions.fetchStatus !== false) {

            props.fetchCompetitions()
        }

    }, [props.competitions.fetchStatus])


    function questionPanel(comp) {
        setQuesStatus(!quesStatus)
        setData(comp)
    }


    function updatePanel(comp) {
        setStatus(!status)
        setData(comp)
    }

    if(quesStatus!==false){
        var questionChoose = <ChooseQuestions quesStatus={quesStatus} data={data}/>
    }
    return (
        <>
        <UpdateForm openStatus={status} data={data}/>
        {questionChoose}
            <Container className="mt-4">
                <Row className="mb-5">
                    <Card>
                        <h3 className='m-3'>Competitions List...</h3>
                        <Card.Body>
                            <Table striped bordered hover responsive variant="dark" >
                                <thead >
                                    <tr>
                                        <th>S.No</th>
                                        <th>Title</th>
                                        <th>Subject</th>
                                        <th>Class</th>
                                        <th>Country</th>
                                        <th>Question</th>
                                        <th>Marks</th>
                                        <th>PayStatus</th>
                                        <th>Question</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.competitions.competitionsData.map((val, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td onClick={()=>updatePanel(val)}>{val.competitionName}</td>
                                                <td>{val.subjectId}</td>
                                                <td>{val.classId}</td>
                                                <td>{val.countryId}</td>
                                                <td>{val.totalQuestion}/{val.questions.length}</td>
                                                <td>{val.totalMarks}</td>
                                                <td>{val.payStatus ? <b className='text-danger'>Paymenyt</b> : <b className='text-success'>Free</b>}</td>
                                                <td><Button variant='info' size="sm" onClick={()=>{questionPanel(val)}}><GoDiff/></Button></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    competitions: state.competitions,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCompetitions: function () {
            dispatch(fetchCompetitions())
        },
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ExamList)
