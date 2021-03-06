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

export default function AgreeLexisNexis() {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const formPercentage = 25
  console.log('formPercentage', formPercentage)
  const [form, setForm] = useState(useSelector(selectForm))
  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  console.log('form.percentComplete', form.percentComplete)
  const [isDirty, setIsDirty] = useState(form.percentComplete < formPercentage ? true : false)

  function handleAgree() {    
    const agree = !form.agreeLexisNexis
    console.log('handleAgree : agree', agree)
    setForm({ ...form, "agreeLexisNexis": agree})
    setIsDirty(true)
  }

  const nextClick = () => {
    //console.log('nextClick: form', form)    
    //a selection is required
    if (form.agreeLexisNexis !== true) return false;  
    
    if (isDirty && navigation.userType === "Borrower") {
      //update the form    
      const thisForm = { 
        ...form, 
        percentComplete: formPercentage,
        stage: "Business Profile > Ownership",
        stageHeader: "Who owns this business?",
        stageText: "We'll need to know some details about the ownership structure of your company.", 
        stageNavigate: "/admin/owner"
      }
      dispatch(updateFormAsync(thisForm))
    }
    
    //go to the next form
    history.push("/admin/owner")
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
            Thank you, now we need your permission to contact the <a href="#" target="_blank">Lexis/Nexis</a> service:  
            </h4>
          </CardHeader>
          <CardBody>
          <form>
          <GridContainer justify="center">
            <GridItem xs={12} sm={8}>
              <Table
                    hover
                    tableData={[
                      [<Check />, "To automatically fill in information during your loan process."],
                      [<Check />, "To help identify data entry mistakes and typos."],
                      [<Check />, "To immediately verify identities & business details."],
                      [<Check />, "To run credit and background checks."],
                    ]}
                  />
              </GridItem>
              <GridItem xs={12} sm={8}><br /></GridItem>
              <GridItem xs={12} sm={8}>
              <div className={classes.checkboxAndRadio}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      disabled={navigation.userType === "Borrower" ? false : true}
                      onClick={() => handleAgree()}
                      checked={form.agreeLexisNexis || false}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label="I agree to allow 7(a)ware use my information for identity & information verification. "
                />
              </div>  
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
                 
            </GridContainer>
            <Button
                onClick={() => history.goBack()}
              >
                Previous
              </Button>
            <Button
                disabled={!form.agreeLexisNexis}
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
