import { createStore, applyMiddleware, combineReducers } from 'redux';
import competitionReducer from './reducer/competitionReducer'
import subjectReducer from './reducer/subjectReducer'
import countryReducer from './reducer/countryReducer'
import classReducer from './reducer/classReducer'
import questionReducer from './reducer/questionReducer'
import activeCompetitionReducer from './reducer/activeCompetitionReducer'
import answerSheetUpdateReducer from './reducer/answerSheetUpdateReducer'
const thunkMiddleware = require('redux-thunk').default;

const mainReducer = combineReducers(
    {
        competitions:competitionReducer,
        subject:subjectReducer,
        country:countryReducer,
        class:classReducer,
        question:questionReducer,
        activeCompetition:activeCompetitionReducer,
        answerSheet:answerSheetUpdateReducer
    }
);

const store = createStore(mainReducer, applyMiddleware(thunkMiddleware));

export default store;