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

export default function BusinessAddress() {
  const history = useHistory()
  const dispatch = useDispatch()

  const formId = "3"
  const allForms = useSelector(selectForm)    
  const thisForm = allForms.find((element) => {
    return element.id === formId;
  })
  const [form, setForm] = useState(thisForm)
  //console.log(thisForm)

  const [number, setnumber] = useState("");
  const [numberState, setnumberState] = useState("");

  const [addressState, setAddressState] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipState, setZipState] = useState("");

  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value) && value.length === 9) {
      return true;
    }
    return false;
  };

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setForm({ ...form, [id]: value})
  }

  const nextClick = () => {
    console.log('nextClick: form', form)
    //validation

    //update the form    
    //dispatch(update(form))
    //go to the next form
    history.push("/admin/restricted-yes")
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
            Finally, we'll need the address of your business.
            </h4>
          </CardHeader>
          <CardBody>
          <form>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
          <CustomInput
                    success={addressState === "success"}
                    error={addressState === "error"}
                    id="address1"
                    labelText="Address 1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.address1,
                      onChange: event => {
                        if (verifyLength(event.target.value, 1)) {
                          setAddressState("success");
                        } else {
                          setAddressState("error");
                        }
                        handleChange(event)
                      },
                      type: "text",
                      endAdornment:
                        addressState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    id="address2"
                    labelText="Address 2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{  
                      value: form.address2,
                      onChange: event => {
                        handleChange(event)
                      },
                      type: "text",      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    success={addressState === "success"}
                    error={addressState === "error"}
                    id="address1"
                    labelText="Address 1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.address1,
                      onChange: event => {
                        if (verifyLength(event.target.value, 1)) {
                          setAddressState("success");
                        } else {
                          setAddressState("error");
                        }
                        handleChange(event)
                      },
                      type: "text",
                      endAdornment:
                        addressState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="State"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="Zip Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>    
                <div className={classes.checkboxAndRadio}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(2)}
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
                  label="Use my profile address"
                />
              </div>   
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
