import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import Warning from "@material-ui/icons/Warning";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Table from "components/Table/Table.js";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Danger from "components/Typography/Danger.js";
import Button from "components/CustomButtons/Button.js";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  },
  colCentered: {
    textAlign: "center"
  }
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forprofit: null
    };
  }
  sendState() {
    return this.state;
  }

  isValidated() {
    return this.state.forprofit === true;
  }

  render() {
    const { classes } = this.props;
    return (
    <>
    <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
          Is your business a for profit entity? 
          </h4>
        </GridItem>
        <GridItem xs={12} sm={12} className={classes.colCentered}>
          <Button
            color={this.state.forprofit ? "success" : null}
            onClick={() => this.setState({ ["forprofit"]: true })}
            >Yes</Button>
          <Button 
            color={this.state.forprofit === false ? "danger" : null}
            onClick={() => this.setState({ ["forprofit"]: false })}
          >No</Button>
        </GridItem>
      </GridContainer>      
      </>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step2);
