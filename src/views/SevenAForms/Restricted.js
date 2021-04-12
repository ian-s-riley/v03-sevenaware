/*eslint-disable*/
import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateForm,
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

const useStyles = makeStyles(styles);

export default function Restricted() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [isDirty, setIsDirty] = useState(false)
  const [form, setForm] = useState(useSelector(selectForm))
  //console.log('useSelector(selectForm)', form)

  function handleChange(id, value) {
    setForm({ ...form, [id]: value})
    setIsDirty(true)
  }

  const nextClick = () => {    
    //a selection is required
    if (form.restricted === null) return false;    
    //update the form    
    if (isDirty) {
      const thisForm = { 
        ...form, 
        percentComplete: 10,
        stage: "Eligibility > ForProfit",
        stageHeader: "Verify Eligibility",
        stageText: "Next, we'll need to know your profit structure for SBA loans.", 
        stageNavigate: "/admin/forprofit"
      }

      //console.log('nextClick: thisForm', thisForm)    
      dispatch(updateFormAsync(thisForm))
    }    

    //go to the next form
    form.restricted 
    ? 
    history.push("/admin/restricted-yes")
    :
    history.push("/admin/forprofit")
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
            Does your business generate revenue from any of the following activities?
            </h4>
          </CardHeader>
          <CardBody>
          <form>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
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
              <GridItem xs={12} sm={12} className={classes.center}>
                <Button
                  color={form.restricted ? "danger" : null}
                  onClick={() => handleChange("restricted", true)}
                  >Yes</Button>
                <Button 
                  onClick={() => handleChange("restricted", false)}
                  color={form.restricted === false ? "success" : null}
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
