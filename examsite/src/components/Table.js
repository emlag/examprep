import React, { Component } from "react";
import * as cnst from "./Const";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

class Table extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      filepath: "~/Desktop/examprep/IBCS Past Papers",
      papers: {}
    };
    this.getTableData();
  }

  getTableData() {
    //   const currentYear = new Date().getFullYear();
    const currentYear = 2015;
    for (var i = cnst.FIRST_YEAR; i <= currentYear; i++) {
      this.setState({
        papers: {
          ...this.state.papers,
          i: "filler"
        }
      });
    }
  }

  renderTableData() {
    return this.state.papers.map((paper, index) => {
      const { year, value } = paper; //destructuring

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
        <h1>React Dynamic Table</h1>
        <table id="IBCS_Papers">
          {/* <tr>{this.renderTableHeader()}</tr> */}
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
