import React from "react";
import { Input, Button, Table } from "antd";
import "antd/dist/antd.css";
import Axios from "axios";
import { Link } from "@reach/router";

const tableFormat = [
  {
    title: "Symbol",
    key: "symbol",
    render: e => (
      <span>
        <a href={`/infopage/${e.symbol}`}>{e.symbol}</a>
      </span>
    )
  },
  {
    title: "Today's Opening Price",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "Notes",
    key: "notes",
    render: e => (
      <span>
        <a href={`/notes/${e.symbol}`}>See/Edit Notes</a>
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: e => (
      <span>
        <a onClick={() => deleteEntry(e.symbol)}>Delete</a>
      </span>
    )
  }
];

function deleteEntry(e) {
  Axios.delete(`http://localhost:5000/stock/delete/${e}`).then(res => {
    console.log(res);
  });
  console.log(e + " has been deleted from the db.");
}

const divStyleRight = {
  float: "right"
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      StockInfo: "",
      recentSearches: ""
    };
    this.inputState = this.inputState.bind(this);
    this.postSearch = this.postSearch.bind(this);
    this.pageRefresh = this.pageRefresh.bind(this);
  }

  inputState(e) {
    this.setState({
      input: e.target.value.toUpperCase()
    });
  }

  postSearch() {
    if (
      this.state.recentSearches
        .map(e => {
          return e.symbol;
        })
        .includes(this.state.input)
    ) {
      return console.log("symbol already added");
    } else {
      Axios.post("http://localhost:5000/stock", {
        id: Math.floor(Math.random() * 20),
        symbol: this.state.input,
        price: null,
        notes: ""
      });
    }
  }

  pageRefresh() {
    Axios.get("http://localhost:5000/stock")
      .then(response => {
        this.setState({
          recentSearches: response.data
        });
        console.log(this.state.recentSearches);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    Axios.get("http://localhost:5000/stock")
      .then(response => {
        this.setState({
          recentSearches: response.data
        });
        console.log(this.state.recentSearches);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Stonk"
          onChange={this.inputState}
          onPressEnter={this.postSearch}
        />

        <Link to={`/infopage/${this.state.input}`}>
          <Button type="primary" onClick={this.postSearch}>
            Look Up Stonk
          </Button>
        </Link>
        <br />
        <Table dataSource={this.state.recentSearches} columns={tableFormat} />
        <Button type="primary" style={divStyleRight} onClick={this.pageRefresh}>
          Refresh List
        </Button>
      </div>
    );
  }
}

export default HomePage;
