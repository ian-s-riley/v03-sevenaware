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

export default function BusinessProfile() {
  const history = useHistory()
  const dispatch = useDispatch()
  
  const [form, setForm] = useState(useSelector(selectForm))
  const [navigation, setNavigation] = useState(useSelector(selectNavigation))

  const [isDirty, setIsDirty] = useState(false)
  const [idType, setIdType] = useState("fein")
  const [numberState, setnumberState] = React.useState("");
  const [requiredState, setrequiredState] = React.useState("");

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value) && value.length === 9) {
      return true;
    }
    return false;
  };

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    //console.log('verifyLength: length', length)
    //console.log('verifyLength: value', value)
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setForm({ ...form, [id]: value})
      setIsDirty(true)
  }

  function handleSetIdType(idType) {
    setIdType(idType)
    setForm({ ...form, "idType": idType})
    setIsDirty(true)
  }

  const nextClick = () => {
    //console.log('nextClick: form', form)
    console.log('nextClick: isDirty',  isDirty)
    //validation
    if (numberState === "error") return false;  
    if (form.fein === "" && form.tin === "" && form.ssn === "") return false;  
    if (form.businessName.replace(" ", "") === "") return false;  

    if (isDirty && navigation.userType === "Borrower") {
      //update the form    
      const thisForm = { 
        ...form, 
        percentComplete: 30,
        stage: "Profile > Address",
        stageHeader: "Business Address",
        stageText: "We'll need to know where your business is located.", 
        stageNavigate: "/admin/business-address"
      }
      dispatch(updateFormAsync(thisForm))
    }    

    //go to the next form
    history.push("/admin/business-address")
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
            Let’s gather some initial information on your business to speed-up your application process...
            </h4>
          </CardHeader>
          <CardBody>
          <form>
          <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
              <CustomInput
                    success={requiredState === "success"}
                    error={requiredState === "error"}
                    id="businessName"
                    labelText="Business Name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.businessName || "",
                      onChange: event => {
                        if (verifyLength(event.target.value, 1)) {
                          setrequiredState("success");
                        } else {
                          setrequiredState("error");
                        }
                        handleChange(event)
                      },
                      type: "text",
                      endAdornment:
                        requiredState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
            </GridItem>
            <GridItem xs={12} sm={8}>
              <CustomInput
                    id="dba"
                    labelText="Doing Business as Name (DBA)"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{  
                      value: form.dba || "",
                      onChange: event => {
                        handleChange(event)
                      },
                      type: "text",      
                    }}
                  />
            </GridItem>
            <GridItem xs={12} sm={8}><br/></GridItem>
            {(idType === "fein") && 
            <GridItem xs={12} sm={8}>
                <CustomInput
                success={numberState === "success"}
                error={numberState === "error"}
                id="fein"
                labelText="Federal Employer ID Number (FEIN)"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{                    
                    value: form.fein || "",
                    onChange: event => {
                    if (verifyNumber(event.target.value)) {
                        setnumberState("success");
                    } else {
                        setnumberState("error");
                    }
                    handleChange(event)
                    },  
                    maxLength: 9,                  
                    endAdornment:
                    numberState === "error" ? (
                        <InputAdornment position="end">
                        <Close className={classes.danger} />
                        </InputAdornment>
                    ) : (
                        undefined
                    )
                }}
                />
            </GridItem>
            }
            {(idType === "tin") && 
            <GridItem xs={12} sm={8}>
                <CustomInput
                success={numberState === "success"}
                error={numberState === "error"}
                id="tin"
                labelText="Tax ID Number (TIN)"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    value: form.tin || "",
                    onChange: event => {
                    if (verifyNumber(event.target.value)) {
                        setnumberState("success");
                    } else {
                        setnumberState("error");
                    }
                    handleChange(event)
                    },  
                    maxLength: 9,                  
                    endAdornment:
                    numberState === "error" ? (
                        <InputAdornment position="end">
                        <Close className={classes.danger} />
                        </InputAdornment>
                    ) : (
                        undefined
                    )
                }}
                />
            </GridItem>
            }
            {(idType === "ssn") && 
            <GridItem xs={12} sm={8}>
                <CustomInput
                success={numberState === "success"}
                error={numberState === "error"}
                id="ssn"
                labelText="Social Security Number (SSN)"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    value: form.ssn || "",
                    onChange: event => {
                    if (verifyNumber(event.target.value)) {
                        setnumberState("success");
                    } else {
                        setnumberState("error");
                    }
                    handleChange(event)
                    },  
                    maxLength: 9,                  
                    endAdornment:
                    numberState === "error" ? (
                        <InputAdornment position="end">
                        <Close className={classes.danger} />
                        </InputAdornment>
                    ) : (
                        undefined
                    )
                }}
                />
            </GridItem>
            }            
            <GridItem xs={12} sm={8}>
                {idType == "fein" && 
                <FormLabel className={classes.labelLeftHorizontal}>
                  Don't have a FEIN? Enter your <a href="#" onClick={() => handleSetIdType("tin")}>TIN</a> or <a href="#" onClick={() => handleSetIdType("ssn")}> SSN</a>.
                </FormLabel>
                }           
                {idType == "tin" && 
                <FormLabel className={classes.labelLeftHorizontal}>
                  Don't have a TIN? Enter your <a href="#" onClick={() => handleSetIdType("ssn")}> SSN</a> or <a href="#" onClick={() => handleSetIdType("fein")}> FEIN</a>.
                </FormLabel>
                }               
                {idType == "ssn" && 
                <FormLabel className={classes.labelLeftHorizontal}>
                  Don't have a SSN? Enter your <a href="#" onClick={() => handleSetIdType("fein")}> FEIN</a> or <a href="#" onClick={() => handleSetIdType("tin")}> TIN</a>.
                </FormLabel>
                }            
              </GridItem>
              <GridItem xs={12} sm={8}><br /><br /></GridItem>              
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
