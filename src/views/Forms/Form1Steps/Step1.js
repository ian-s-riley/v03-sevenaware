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

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restricted: null
    };
  }
  sendState() {
    return this.state;
  }

  isValidated() {
    return this.state.restricted === false;
  }

  render() {
    const { classes } = this.props;
    return (
    <>
    <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Does your business generate revenue from any of the following activities?
          </h4>
        </GridItem>
        <GridItem xs={12} sm={6}>
        <Table
              hover
              tableData={[
                [<Danger><Warning /></Danger>, "Speculative trading activities"],
                [<Danger><Warning /></Danger>, "Dealing in rare coins or stamps"],
                [<Danger><Warning /></Danger>, "Lending"],
                [<Danger><Warning /></Danger>, "Loan packaging"],
                [<Danger><Warning /></Danger>, "Pyramid sales plans"],
                [<Danger><Warning /></Danger>, "Firms involved in illegal activities that are against the law in the jurisdiction where the business is located (including cannabis)"],
                [<Danger><Warning /></Danger>, "Gambling"],
              ]}
            />
        </GridItem>
        <GridItem xs={12} sm={12} className={classes.colCentered}>
          <Button
            color={this.state.restricted ? "danger" : null}
            onClick={() => this.setState({ ["restricted"]: true })}
            >Yes</Button>
          <Button 
            color={this.state.restricted === false ? "success" : null}
            onClick={() => this.setState({ ["restricted"]: false })}
          >No</Button>
        </GridItem>
      </GridContainer>      
      </>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
