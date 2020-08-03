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

const title = {
  textAlign: "center",
  fontFamily: "Arial"
};

const table = {
  textAlign: "center",
  fontFamily: "Arial",
  borderCollapse: "collapse",
  border: "1px solid black",
  width: "100%",
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

  // populateTable() {
  //   const currentYear = 2015;
  //   for (var i = 2013; i <= currentYear; i++) {
  //     console.log("year:", i);
  //     const paperYear = i;
  //     return (
  //       <tr key={paperYear}>
  //         <td>{paperYear}</td>
  //         <td>"filler"</td>
  //       </tr>
  //     );
  //   }
  // }

  // renderTableData() {
  //   this.populateTable();
  //   Object.entries(this.state.papers).forEach(([year, value]) => {
  //     console.log("year:", year);
  //     console.log("value:", value);
  //     return (
  //       <tr key={year}>
  //         <td>{year}</td>
  //         <td>{value}</td>
  //         {/* <td>
  //             {nov_p1}, {nov_p2}, {nov_p3}
  //           </td> */}
  //       </tr>
  //     );
  //   });

  //   // const { year, value } = paper; //destructuring
  // }

  renderTableHeader() {
    // let header = ["year", cnst.PAPER_MAY, cnst.PAPER_NOV];
    // return header.map((key, index) => {
    //   return <th key={index}>{key.toUpperCase()}</th>;
    // });
  }

  getSL1() {
    return "SLP1";
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
        <table id="papers" style={table}>
          <tr style={table}>
            <th key="1">YEAR</th>
            <th key="2" colspan="5">
              MAY
            </th>
            <th key="3" colSpan="5">
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
