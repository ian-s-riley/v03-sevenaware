import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import Warning from "@material-ui/icons/Warning";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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

class Step3 extends React.Component {
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
        <GridItem xs={12} sm={8}>
          <h4 className={classes.infoText}>
          Thank you! Please fill out the following information so we may complete your Business profile:
          </h4>
        </GridItem>
        </GridContainer>
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={5}>
          <CustomInput
            labelText="Company"
            id="company"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <CustomInput
            labelText="DBA (doing business as name)"
            id="username"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>    
        
        <GridItem xs={12} sm={12} md={5}>
          <CustomInput
            labelText="TIN/FEIN"
            id="tin"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <CustomInput
            labelText="SSN"
            id="ssn"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>    
      </GridContainer>      
      </>
    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step3);
