import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadable from "react-loadable";
import LoadiingModal from "./Elements/LoadingModal";


const LoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <LoadiingModal />
        );
    } else if (error) {
        return <h1> Sorry, unable to load the page.</h1>;
    } else {
        return null;
    }
};

const Sidebar = loadable({
    loader: () =>
        import(/*webpackChunkName: "Sidebar"*/ "./Layout/sidebar"),
    loading: LoadingComponent,
});
const ExamList = loadable({
    loader: () =>
        import(/*webpackChunkName: "ExamList"*/ "./ExamList"),
    loading: LoadingComponent,
});
const Competitions = loadable({
    loader: () =>
        import(/*webpackChunkName: "Competitions"*/ "./Competitions"),
    loading: LoadingComponent,
});
const ExamAttempet = loadable({
    loader: () =>
        import(/*webpackChunkName: "ExamAttempet"*/ "./ExamAttempet"),
    loading: LoadingComponent,
});
const ExamPanel = loadable({
    loader: () =>
        import(/*webpackChunkName: "ExamPanel"*/ "./ExamPanel"),
    loading: LoadingComponent,
});
const ResultPanel = loadable({
    loader: () =>
        import(/*webpackChunkName: "ResultPanel"*/ "./ResultPanel"),
    loading: LoadingComponent,
});

function mainComponent() {
    return (
        <>
            <Router>
                    <Sidebar />
                    <Switch>
                        <Route exact path="/exam" component={Competitions} />
                        <Route exact path="/" component={ExamList} />
                        <Route exact path="/examattempet" component={ExamAttempet} />
                        <Route exact path="/examattempet/:id" component={ExamPanel} />
                        <Route exact path="/result/" component={ResultPanel} />
                    </Switch>
            </Router>
        </>
    )
}

export default mainComponent
