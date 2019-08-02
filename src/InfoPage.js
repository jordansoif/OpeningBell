import React from "react";
import { Input, Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import Axios from "axios"
import { Link } from "@reach/router";
import moment from "moment"

const divStyleRight = {
    float: "right"
}

class InfoPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            infoInput: "",
            stockInfo: "",
            day: "",
            month: "",
            year: "",
            targetDateOpen: "",
            targetDate: ""
        }
        this.dateValue = this.dateValue.bind(this);
        this.historicalPrice = this.historicalPrice.bind(this)
    }

    componentWillMount () {
        console.log(this.props);
        this.setState({
            infoInput: this.props.symbol,
      }), Axios.get(`https://api.worldtradingdata.com/api/v1/stock?symbol=${this.props.symbol}&api_token=webEtV2VViO9zqzRoxhxVCoUtoG8JYkzJyXMwbmxBYG9RcYjMxh9KoKhejAB`)
      .then(function (response) {
          this.setState({
              stockInfo: response.data
              }
          )
      }.bind(this));
      }

    componentDidUpdate () {
        Axios.put(`http://localhost:5000/stock/price/${this.props.symbol}`, {
            price: this.state.stockInfo.data[0].price_open
        }).then(res => {
            console.log(res)
        })
    }

    historicalPrice () {
        var monthReformat
        var dayReformat
        
        if (parseInt(this.state.day, 10) < 10) {
            dayReformat = "0" + this.state.day
        } else dayReformat = this.state.day;

        if (parseInt(this.state.month, 10) < 10) {
            monthReformat = "0" + this.state.month
        } else monthReformat = this.state.month;

        var formatDate = `${this.state.year}-${monthReformat}-${dayReformat}`;
        
        Axios.get(`https://api.worldtradingdata.com/api/v1/history?symbol=${this.state.infoInput}&sort=newest&api_token=webEtV2VViO9zqzRoxhxVCoUtoG8JYkzJyXMwbmxBYG9RcYjMxh9KoKhejAB`)
        .then(function (response) {
            console.log(response.data.history[formatDate]);
            if (!response.data.history[formatDate]) { //undefined is falsy, so this checks if the value is undefined
                return (this.setState({
                    targetDateOpen: "Does Not Exist",
                    targetDate: formatDate
                 })
            )}  else {
                this.setState({
                    targetDateOpen: response.data.history[formatDate].open,
                    targetDate: formatDate
                })
            }
    }.bind(this) )
    };

    dateValue (e) {
        this.setState({
            day: moment(e).date(),
            month: moment(e).month() + 1,
            year: moment(e).year()
        }); 
    }

    render() {
        return (
            <div>
            
            <h1>{this.state.infoInput}</h1>
            
            <h2>{(this.state.stockInfo == "") ? "" :
                (this.state.infoInput + " opened at a price of $") +  
                this.state.stockInfo.data[0].price_open}
            </h2>
            
            <h3>
               {(this.state.targetDateOpen ==  (false)) ? "" : 
               (this.state.targetDateOpen == "Does Not Exist") ? 
               this.state.targetDateOpen :
                ("The opening price of " + this.state.infoInput +
                 " on " + this.state.targetDate + " was " +
                this.state.targetDateOpen)}
            </h3>
            
            <DatePicker size="large" onChange={this.dateValue}>Historical Lookup</DatePicker>
            
            <Button onClick={this.historicalPrice} size="large">
                Historical Open Lookup
            </Button>
            
            <h4>
            <Link to="/">
                <Button type="primary" style={divStyleRight} >Go to Homepage</Button>
            </Link>
            </h4>
            
            </div>
        )
    }
};

export default InfoPage;

// fix <h3> rendering and rework how it saves to state