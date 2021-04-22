import React from 'react';
import {Redirect} from "react-router-dom";

function Landing(props) {
    return (
        <Redirect to="/login" />
    );
}

export default Landing;
