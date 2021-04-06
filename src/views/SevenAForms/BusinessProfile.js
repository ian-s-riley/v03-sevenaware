/*eslint-disable*/
import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  update,
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

export default function BusinessProfile() {
  const history = useHistory()
  const dispatch = useDispatch()

  const formId = "2"
  const allForms = useSelector(selectForm)    
  const thisForm = allForms.find((element) => {
    return element.id === formId;
  })
  const [form, setForm] = useState(thisForm)
  //console.log(thisForm)

  const [number, setnumber] = React.useState("");
  const [numberState, setnumberState] = React.useState("");

  const [required, setrequired] = React.useState("");
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
  }

  function setIdType(idType) {
    setForm({ ...form, "idType": idType})
  }

  const nextClick = () => {
    //console.log('nextClick: form', form)
    //validation
    if (numberState === "error") return false;  
    if (form.fein === "" && form.tin === "" && form.ssn === "") return false;  
    if (form.businessName.replace(" ", "") === "") return false;  

    //update the form    
    dispatch(update(form))

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
                      value: form.businessName,
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
                      value: form.dba,
                      onChange: event => {
                        handleChange(event)
                      },
                      type: "text",      
                    }}
                  />
            </GridItem>
            <GridItem xs={12} sm={8}><br/></GridItem>
            {(form.idType === "fein") && 
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
                    value: form.fein,
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
            {(form.idType === "tin") && 
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
                    value: form.tin,
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
            {(form.idType === "ssn") && 
            <GridItem xs={12} sm={8}>
                <CustomInput
                success={numberState === "success"}
                error={numberState === "error"}
                id="fein"
                labelText="Social Security Number (SSN)"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    value: form.ssn,
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
                {form.idType == "fein" && 
                <FormLabel className={classes.labelLeftHorizontal}>
                  Don't have a FEIN? Enter your <a href="#" onClick={() => setIdType("tin")}>TIN</a> or <a href="#" onClick={() => setIdType("ssn")}>SSN</a>.
                </FormLabel>
                }           
                {form.idType == "tin" && 
                <FormLabel className={classes.labelLeftHorizontal}>
                  Don't have a TIN? Enter your <a href="#" onClick={() => setIdType("ssn")}>SSN</a> or <a href="#" onClick={() => setIdType("fein")}>FEIN</a>.
                </FormLabel>
                }               
                {form.idType == "ssn" && 
                <FormLabel className={classes.labelLeftHorizontal}>
                  Don't have a SSN? Enter your <a href="#" onClick={() => setIdType("fein")}>FEIN</a> or <a href="#" onClick={() => setIdType("tin")}>TIN</a>.
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
