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
import PDF from "../../../IBCS Past Papers";

const title = {
  textAlign: "center",
  fontFamily: "Arial"
};

const table = {
  textAlign: "center",
  fontFamily: "Arial",
  borderCollapse: "collapse",
  border: "1px solid black",
  padding: "5px"
};

class homepage extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      papers: { "0000": "blank" }
    };
  }

  // componentDidMount() {
  //   //   const currentYear = new Date().getFullYear();
  //   const currentYear = 2015;
  //   for (var i = 2014; i <= currentYear; i++) {
  //     const paperYear = i;
  //     this.setState({
  //       papers: {
  //         ...this.state.papers,
  //         paperYear: "filler"
  //       }
  //     });
  //   }
  // }

  renderTableHeader() {
    // let header = ["year", cnst.PAPER_MAY, cnst.PAPER_NOV];
    // return header.map((key, index) => {
    //   return <th key={index}>{key.toUpperCase()}</th>;
    // });
  }

  getSL1() {
    return <a href="https://example.com/faq.html"> SLP1 </a>;
  }

  getSL2() {
    return "SLP2";
  }

  getHL1() {
    return "HLP1";
  }

  getHL2() {
    return "HLP2";
  }

  getHL3() {
    return "HLP3";
  }

  buildTable = years => {
    const yearRows = years.map((year, idx) => {
      return (
        <tr key={idx}>
          <td style={table}>{year}</td>
          <td style={table}>{this.getSL1()}</td>
          <td style={table}>{this.getSL2()}</td>
          <td style={table}>{this.getHL1()}</td>
          <td style={table}>{this.getHL2()}</td>
          <td style={table}>{this.getHL3()}</td>

          <td style={table}>{this.getSL1()}</td>
          <td style={table}>{this.getSL2()}</td>
          <td style={table}>{this.getHL1()}</td>
          <td style={table}>{this.getHL2()}</td>
          <td style={table}>{this.getHL3()}</td>
        </tr>
      );
    });
    return yearRows;
  };

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <div>
        <h1 id="title" style={title}>
          Papers by Year
        </h1>
        <table id="papers">
          <tr style={table}>
            <th key="1" style={{ border: "1px solid black", padding: "5px" }}>
              YEAR
            </th>
            <th
              key="2"
              colspan="5"
              style={{ border: "1px solid black", padding: "5px" }}
            >
              MAY
            </th>
            <th
              key="3"
              colSpan="5"
              style={{ border: "1px solid black", padding: "5px" }}
            >
              NOV
            </th>
          </tr>
          <tbody>{this.buildTable(cnst.PAPER_YEARS)}</tbody>
        </table>
      </div>
    );
  }
}

export default homepage;
