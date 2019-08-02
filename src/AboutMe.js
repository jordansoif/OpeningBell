import React from 'react';
import ReactDOM from "react-dom";
import { Link } from '@reach/router';
import { Button } from 'antd';
import picture from"./Capture.PNG";

const divStyleRight = {
    float: "right"
}

function AboutMeButton () {
    return(
        <div>
            <header>
                <img src={picture} alt="" width="50" height="50" />
                <Link to="/" style={{color: 'black'}}>
                    Opening Bell 
                </Link>
                <Link to="/aboutme">
                    <Button style={divStyleRight} type="dashed" >About Me</Button>
                </Link>
            </header>
        </div>
    )
}

function AboutMe() {
    return(
        <div>
            <h2>About Me</h2>
            <p>this is where I would put info</p>
        <Link to="/">
            <Button type="primary" style={divStyleRight} >Back to Home</Button>
        </Link>
        </div>
        )
    }

ReactDOM.render(React.createElement(AboutMeButton), document.getElementById("topRow"));
export default AboutMe;