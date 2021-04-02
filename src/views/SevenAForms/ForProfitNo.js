/*eslint-disable*/
import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import Danger from "components/Typography/Danger.js";
import Warning from "@material-ui/icons/Warning";
import Icon from "@material-ui/core/Icon";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Home from "@material-ui/icons/Home";
import Business from "@material-ui/icons/Business";
import AccountBalance from "@material-ui/icons/AccountBalance";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/pricingPageStyle.js";

const useStyles = makeStyles(styles);

export default function ForProfitNo() {
  const history = useHistory()  
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6} className={classes.center}>
          <h2>Non-profit Business</h2>
          <h5>
            SBA 7(a) loans are only available to for-profit companies. 
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <Card pricing raised>
            <CardBody pricing>
              <h6 className={classes.cardCategory}>NON-PROFIT</h6>
              <div className={classes.icon}>
                <Warning color="error" />
              </div>
              <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                Alternate Lending Options
              </h3>
              <p className={classes.cardDescription}>
                We've got other options to explore. Some non-traditional funding sources...
              </p>              
              <Button round color="success">
                Learn More
              </Button>
            </CardBody>
            <CardFooter>
            
              <a href="#" className={classes.right} onClick={() => history.goBack()}>go back</a>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
