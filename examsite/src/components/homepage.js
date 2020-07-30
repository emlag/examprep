import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as cnst from "./Const";

// function homepage() {
//   return <h1>Homepage Here</h1>;
// }

class homepage extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      filepath: "IBCS Past Papers",
      papers: { "0000": "blank" }
    };
  }

  componentDidMount() {
    //   const currentYear = new Date().getFullYear();
    const currentYear = 2015;
    for (var i = cnst.FIRST_YEAR; i <= currentYear; i++) {
      var year = "" + i;
      this.setState({
        papers: {
          ...this.state.papers,
          year: "filler"
        }
      });
    }
  }

  renderTableData() {
    console.log("here");
    Object.entries(this.state.papers).forEach(([year, value]) => {
      console.log("year:", year);
      return (
        <tr key={year}>
          <td>{year}</td>
          <td>{value}</td>
          {/* <td>
              {nov_p1}, {nov_p2}, {nov_p3}
            </td> */}
        </tr>
      );
    });

    // const { year, value } = paper; //destructuring
  }

  renderTableHeader() {
    let header = Object.keys(this.state.students[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <div>
        <h1>Papers by Year</h1>
        <table id="IBCS_Papers">
          {/* <tr>{this.renderTableHeader()}</tr> */}
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default homepage;
