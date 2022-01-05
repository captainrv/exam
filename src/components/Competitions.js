import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from "react-redux";
import { Form, Container, Button, Row, Col, FloatingLabel, Card, Spinner } from 'react-bootstrap'
import ReactNotification from "react-notifications-component";
import { COMPETITION_NOTIFICATION } from '../redux/action/competitionType'
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createCompetitions, fetchSubject, fetchCountry, fetchClass } from '../redux';

function Competitions(props) {
    const [validated, setValidated] = useState(false);
    const [status, setStatus] = useState(false);

    const [competitionName, setCompetitionName] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [totalQuestion, setTotalQuestion] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [skills, setSkills] = useState("");
    const [countryId, setCountryId] = useState("");
    const [classIds, setClassIds] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");
    const [registrationStartDate, setRegistrationStartDate] = useState("")
    const [registrationEndDate, setRegistrationEndDate] = useState("")
    const [age, setAge] = useState("");
    const [charges, setCharges] = useState("");
    const [discount, setDiscount] = useState("");
    const [remark, setRemark] = useState("");
    const [payStatus, setPayStatus] = useState(false);

    const dispatch = useDispatch();

    function resetForm() {
        setCompetitionName();
        setSubjectId();
        setTotalQuestion();
        setTotalMarks();
        setSkills();
        setCountryId();
        setClassIds();
        setStartDateTime();
        setEndDateTime();
        setRegistrationStartDate();
        setRegistrationEndDate();
        setAge();
        setCharges();
        setDiscount();
        setRemark();
        setPayStatus();
        setStatus();
        setValidated(false)
    }

    useEffect(() => {
        if (props.competitions.msgType !== "") {
            notifAction(props.competitions.msg, props.competitions.msgType)
        }
        if (props.subject.fetchStatus !== false) {
            props.fetchSubject()
        }
        if (props.country.fetchStatus !== false) {
            props.fetchCountry()
        }

    }, [props.competitions.msgType, props.subject.fetchStatus])



    function notifAction(msg, msgType) {
        console.log(msg, msgType);
        store.addNotification({
            message: msg,
            type: msgType,
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
        props.msgReset();
    }
    function createExam(e) {
        e.preventDefault();
        if (e.target.checkValidity() === true) {
            e.stopPropagation();
            setValidated(true);
            props.createCompetitions(
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
                discount)
        } else {
            setValidated(true);
        }
    }


    function classFetch(counId) {
        const countryId = props.country.countryData.filter(val=>{
            return val._id===counId
        })
        const {code} = countryId[0]
        props.fetchClass(code)
    }


    return (
        <>
            <ReactNotification />
            <Container>
                <Form noValidate validated={validated} onSubmit={(e) => createExam(e)}>
                    <Row className="mb-12 m-3 ">
                        <Card body className='bg-light'>
                            <h2 className='mt-2 mb-3'>Competition Generate...</h2>
                            <Row className="mb-3 ">
                                <Form.Group as={Col} md="6" controlId="validationCustom01" >
                                    <Form.Label>Competition Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Competition Name"
                                        value={competitionName}
                                        onChange={(e) => setCompetitionName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide a valid Competition Name</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>subject</Form.Label>
                                    <Form.Select aria-label="Default select example" defaultValue={subjectId}
                                        onChange={(e) => {
                                            setSubjectId(e.target.value);
                                        }} required >
                                        <option value="">{props.subject.loading ? "Loading..." : "Select subject"}</option>
                                        {props.subject.subjectData.map((val, i) => (
                                            <option key={i} value={val._id}>{val.title}.</option>
                                        ))
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid subject.
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom02">
                                    <Form.Label>Total Question</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Total Question"
                                        value={totalQuestion}
                                        onChange={(e) => setTotalQuestion(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Please provide a valid Total Question.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom03">
                                    <Form.Label>Total Marks</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Total Marks"
                                        value={totalMarks}
                                        onChange={(e) => setTotalMarks(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Total Marks.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom05">
                                    <Form.Label>Skills</Form.Label>
                                    <Form.Control type="text" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} disabled />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Skills.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom06">
                                    <Form.Label>Start Date Time</Form.Label>
                                    <Form.Control type="datetime-local" placeholder="Star Date Time" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Star Date Time.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom07">
                                    <Form.Label>End Date Time</Form.Label>
                                    <Form.Control type="datetime-local" placeholder="end Date Time" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid End Date Time.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 ">
                                <Form.Group as={Col} md="4" controlId="validationCustom12">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select aria-label="Default select example" defaultValue={countryId}
                                        onChange={(e) => {
                                            setCountryId(e.target.value);
                                            classFetch(e.target.value)
                                        }} required >
                                        <option value="">{props.country.loading ? "Loading..." : "Select country"}</option>
                                        {props.country.countryData.map((coun, i) => (
                                            <option key={i} value={coun._id}>{coun.name}.</option>
                                        ))
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Country
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom16">
                                    <Form.Label>Class</Form.Label>
                                    <Form.Select aria-label="Default select example" defaultValue={classIds}
                                        onChange={(e) => {
                                            setClassIds(e.target.value);
                                        }} required >
                                        <option value="">{props.class.loading ? "Loading..." : "Select Class"}</option>
                                        {props.class.classData.map((cla, i) => (
                                            <option key={i} value={cla._id}>{cla.title}.</option>
                                        ))
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Country
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom11">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Age.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationCustom06">
                                    <Form.Label>Registration Start Date</Form.Label>
                                    <Form.Control type="datetime-local" placeholder="Registration Start Date" value={registrationStartDate} onChange={(e) => setRegistrationStartDate(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Star Registration Start Date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom07">
                                    <Form.Label>Registration End Date </Form.Label>
                                    <Form.Control type="datetime-local" placeholder="Registration End Date" value={registrationEndDate} onChange={(e) => setRegistrationEndDate(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid End Registration End Date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md={status ? "4" : "12"} controlId="validationCustom08"  >
                                    <Form.Label>Exam Type</Form.Label>
                                    <Form.Select aria-label="Default select example" defaultValue={payStatus} onChange={(e) => { setPayStatus(e.target.value); setStatus(!status) }} required>
                                        <option value={true}>Paid</option>
                                        <option value={false}>Free</option>
                                    </Form.Select>
                                </Form.Group>
                                {
                                    status ? (
                                        <>
                                            <Form.Group as={Col} md="4" controlId="validationCustom09">
                                                <Form.Label>Charges</Form.Label>
                                                <Form.Control type="Number" value={charges} placeholder="Enter Charges" onChange={(e) => setCharges(e.target.value)} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid Fee.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="validationCustom09">
                                                <Form.Label>Discount %</Form.Label>
                                                <Form.Control type="Number" value={discount} placeholder="Enter Discount %" onChange={(e) => setDiscount(e.target.value)} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a enter discount %
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </>
                                    ) :
                                        ("")
                                }
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col} md="12" controlId="validationCustom13">
                                    <Form.Label>Remark</Form.Label>
                                    <FloatingLabel controlId="floatingTextarea2" label="Remark...">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            style={{ height: '100px' }}
                                            onChange={(e) => setRemark(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            <Row className='md-3'>
                                <Form.Group as={Col} className="mb-6 d-grid gap-2" onClick={() => resetForm()} >
                                    <Button variant="secondary" type="reset">Clear</Button>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-6 d-grid gap-2">
                                    {props.competitions.loading ?
                                        <Button variant="light">
                                            <Spinner animation="border" variant="dark" size="sm" />
                                        </Button>
                                        :
                                        <Button variant="dark" type="submit" value="submit" >Create Exam</Button>
                                    }

                                </Form.Group>
                            </Row>
                        </Card>
                    </Row>
                </Form>
            </Container >
        </>
    )
}

const mapStatetoProps = (state) => {
    return {
        competitions: state.competitions,
        subject: state.subject,
        country: state.country,
        class: state.class,
    };
};

const mapDispatchtoProps = (dispatch) => {
    return {
        createCompetitions: function (
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
        ) {
            dispatch(createCompetitions(
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
            ));
        },
        fetchSubject: function () {
            dispatch(fetchSubject())
        },
        fetchCountry: function () {
            dispatch(fetchCountry())
        },
        fetchClass: function (countryCode) {
            dispatch(fetchClass(countryCode))
        },
        msgReset: function () {
            dispatch({
                type: COMPETITION_NOTIFICATION,
                msg: "",
                msgType: "",
            });
        },
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Competitions);