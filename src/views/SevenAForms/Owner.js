/*eslint-disable*/
import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,
  selectForm,
} from 'features/form/formSlice'
import {
  selectNavigation,
} from 'features/form/navigationSlice'

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

const useStyles = makeStyles(styles);

export default function Owner() {
  const history = useHistory()
  const dispatch = useDispatch()

  const formPercentage = 30
  console.log('formPercentage', formPercentage)
  const [form, setForm] = useState(useSelector(selectForm))
  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  console.log('form.percentComplete', form.percentComplete)
  const [isDirty, setIsDirty] = useState(form.percentComplete < formPercentage ? true : false)

  function handleChange(id, value) {
    setForm({ ...form, [id]: value})
    setIsDirty(true)
  }

  const nextClick = () => {
    //console.log('nextClick: form', form)    
    //a selection is required
    if (form.fullOwner === null) return false;    
    //update the form    
    if (isDirty && navigation.userType === "Borrower") {
      const thisForm = { 
        ...form, 
        percentComplete: formPercentage,
        stage: "Business Profile > Ownership",
        stageHeader: "Who owns this business?",
        stageText: "We'll need to know some details about the ownership structure of your business.", 
        stageNavigate: "/admin/owners"
      }
      dispatch(updateFormAsync(thisForm))             
    }  

    //go to the next form
    form.fullOwner 
    ? 
    navigation.userType === "Lender" ? history.push("/admin/lender-dashboard") : history.push("/admin/borrower-dashboard")    
    :
    history.push("/admin/owners")    
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
            Do you own 100% or your business?
            </h4>
          </CardHeader>
          <CardBody>
          <form>
          <GridContainer justify="center">
              <GridItem xs={12} sm={12} className={classes.center}>
                <Button
                  disabled={navigation.userType === "Borrower" ? false : true}
                  color={form.fullOwner ? "success" : null}
                  onClick={() => handleChange("fullOwner", true)}
                  >Yes</Button>
                <Button 
                  disabled={navigation.userType === "Borrower" ? false : true}
                  onClick={() => handleChange("fullOwner", false)}
                  color={form.fullOwner === false ? "danger" : null}
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
