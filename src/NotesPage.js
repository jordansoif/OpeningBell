import React from 'react';
import Axios from "axios";
import { Link } from '@reach/router';
import { Input, Button } from 'antd';

const { TextArea } = Input;

const divStyleRight = {
    float: "right"
}

class NotesPage extends React.Component {
    constructor(props){
        super(props);
        this.state = ""
        this.currentNotes= "";
        
        this.updateNotes = this.updateNotes.bind(this);
    }

    updateNotes () {
        var notes = document.getElementById("notesArea").value;  
        console.log(notes); 
        Axios.put(`http://localhost:5000/stock/notes/${this.props.symbol}`,{
            notes: notes
        }).then(res => {
            this.setState({
                currentNotes: res.data.notes
            })
        }).catch(err => {
            console.log(err)
        }) 
    }

    componentWillMount () {
            Axios.get(`http://localhost:5000/stock/${this.props.symbol}`)
            .then(res => {
                this.setState({
                    currentNotes: res.data.notes
                })
            }).catch(err => {
                console.log(err)
            })    
        }

    render() {
        return (
            <div>
                <h1>Notes Page for {this.props.symbol}</h1>
                <h2>Notes: {this.state.currentNotes}</h2>
                <TextArea id="notesArea" rows={4} defaultValue= 'Change Notes'/>

                <div>
                    <Button type="primary" onClick={this.updateNotes}>
                        Submit Notes
                    </Button>

                    <Link to="/">
                        <Button type="primary" style= {divStyleRight} >Back to Home</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NotesPage;
