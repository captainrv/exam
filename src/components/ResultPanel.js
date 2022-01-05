import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Container, Row, Table, Card, Col, Button } from 'react-bootstrap';
import { fetchActiveCompetitions } from '../redux'
export const ExamAttempet = (props) => {
    const [status, setStatus] = useState(false);

    return (
        <>
            <Container className="mt-4">
                <Row className="mb-5">
                    <h3 className='m-3'>Competitions Compelete</h3>
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
      
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ExamAttempet)
