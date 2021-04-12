/*eslint-disable*/
import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,
  selectForm,
} from 'features/form/formSlice'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import Danger from "components/Typography/Danger.js";
import Warning from "@material-ui/icons/Warning";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

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
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { isFunctionOrConstructorTypeNode } from "typescript";

const useStyles = makeStyles(styles);

export default function ForProfit() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [isDirty, setIsDirty] = useState(false)
  const [form, setForm] = useState(useSelector(selectForm))

  function handleChange(id, value) {
    setForm({ ...form, [id]: value})
    setIsDirty(true)
  }

  const nextClick = () => {
    //console.log('nextClick: form', form)    
    //a selection is required
    if (form.forProfit === null) return false;    
    //update the form    
    if (isDirty) {
      const thisForm = { 
        ...form, 
        percentComplete: 20,
        stage: "Profile > Business",
        stageHeader: "Create Business Profile",
        stageText: "Let's start with your business name.", 
        stageNavigate: "/admin/business-profile"
      }
      dispatch(updateFormAsync(thisForm))
    }    

    //go to the next form
    form.forProfit 
    ? 
    history.push("/admin/business-profile")    
    :
    history.push("/admin/forprofit-no")    
  };
  
  const classes = useStyles();

  return (
    <GridContainer justify="center">
      <GridItem  xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="warning" icon>
            <CardIcon color="warning">
              <Warning />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>
            Is your business a for profit entity?
            </h4>
          </CardHeader>
          <CardBody>
          <form>
          <GridContainer justify="center">
              <GridItem xs={12} sm={12} className={classes.center}>
                <Button
                  color={form.forProfit ? "success" : null}
                  onClick={() => handleChange("forProfit", true)}
                  >Yes</Button>
                <Button 
                  onClick={() => handleChange("forProfit", false)}
                  color={form.forProfit === false ? "danger" : null}
                >No</Button>
              </GridItem>
            </GridContainer>
            <Button
                onClick={() => history.goBack()}
              >
                Previous
              </Button>
            <Button
                color="info"
                onClick={nextClick}
                className={classes.registerButton}
              >
                Next
              </Button>
          </form>
            
          </CardBody>
        </Card>
      
        </GridItem>
    </GridContainer>
  );
}
