import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../style/styles";
import { connect } from "react-redux";

class SwitchTheme extends Component {

  render() {
    var url = "../css/" + this.props.theme + ".css"
    return <React.Fragment>
      <link href={url} rel="stylesheet" />
      {this.props.children}</React.Fragment>
  }
}

const mapStatetoProps = (state) => {
  return {
    theme: state.dropDown.theme,
  }
}

export default connect(
  mapStatetoProps,
  null
)(withStyles(styles)(SwitchTheme));
