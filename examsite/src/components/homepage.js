import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router";
import * as cnst from "./Const";
import * as firebase from "firebase";
// import Pdf from "../../../IBCS Past Papers/2015/May/P1/HL/Computer_science_paper_1__SL.pdf";

const title = {
  textAlign: "center",
  fontFamily: "Arial"
};

var i = 0;

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
      sl: [],
      hl: []
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.state.slP1 !== prevState.slP1) {
    //   console.log("state updated");
    // }
    // console.log("updated");
  }

  setPaperStates = monthRef => {
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef
      .child("papers")
      .child("2014")
      .child("may")
      .child("p1")
      .child("sl")
      .child(cnst.PAPER_FILE_P1_SL);

    for (const type of cnst.PAPER_TYPES_SL) {
      var typeRef = monthRef.child(type).child("sl");
      cnst.PAPER_FILE_SL.map((name, idx) => {
        var paperRef = typeRef.child(name);
        // console.log("reference:", paperRef.fullPath);

        paperRef
          .getDownloadURL()
          .then(url => {
            // this.setState(prevState => ({
            //   sl: [...prevState.sl, url]
            // }));
            this.setState({
              sl: [...this.state.sl, url]
            });
          })
          .catch(function(error) {
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
            }
          });
      });
    }

    for (const type of cnst.PAPER_TYPES_HL) {
      var typeRef = monthRef.child(type).child("hl");
      cnst.PAPER_FILE_HL.map((name, idx) => {
        var paperRef = typeRef.child(name);
        paperRef
          .getDownloadURL()
          //infinite loop caused by setState
          .then(url => {
            // this.setState(prevState => ({
            //   hl: [...prevState.hl, url]
            // }));
            this.setState({
              hl: [...this.state.hl, url]
            });
          })
          .catch(function(error) {
            switch (error.code) {
              case "storage/object-not-found":
                // File doesn't exist
                break;
            }
          });
      });
    }
  };

  buildTable = years => {
    const yearData = years.map((year, idx) => {
      var storageRef = firebase.storage().ref();
      var fileRef = storageRef.child("papers").child(year);

      for (const month of cnst.PAPER_MONTHS) {
        console.log(i++);
        var monthRef = fileRef.child(month);
        this.setPaperStates(monthRef);
      }

      console.log("s state:", this.state.sl);
      console.log("hl state:", this.state.hl);

      // const monthData = cnst.PAPER_MONTHS.map((month, idx) => {
      //   console.log(i++);
      //   var monthRef = fileRef.child(month);
      //   this.setPaperStates(monthRef);
      //   return (
      //     <tr key={idx}>
      //       <td style={table}>{year}</td>
      //       <td style={table}>
      //         <a href={this.state.sl[0]}> SLP1, {this.state.sl[0]} </a>
      //       </td>
      //       <td style={table}>
      //         <a href={this.state.sl[1]}> SLP2, {this.state.sl[1]}</a>
      //       </td>
      //       <td style={table}>
      //         <a href={this.state.hl[2]}> HLP1, {this.state.hl[2]}</a>
      //       </td>
      //       <td style={table}>
      //         <a href={this.state.hl[1]}> HLP2, {this.state.hl[1]}</a>
      //       </td>
      //       <td style={table}>
      //         <a href={this.state.hl[0]}> HLP3, {this.state.hl[0]}</a>
      //       </td>
      //     </tr>
      //   );
      // });
      // return monthData;
    });
    return yearData;
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
