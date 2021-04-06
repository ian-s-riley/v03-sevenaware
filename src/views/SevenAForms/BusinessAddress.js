/*eslint-disable*/
import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// redux store
import { useSelector, useDispatch } from 'react-redux';

import {
  update,
  selectForm,
} from 'features/form/formSlice'

//address verification
const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import Danger from "components/Typography/Danger.js";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Warning from "@material-ui/icons/Warning";

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
import Instruction from "components/Instruction/Instruction.js";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import notificationStyles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";
import noticeModal1 from "assets/img/card-1.jpeg";
import noticeModal2 from "assets/img/card-2.jpeg";

const useStyles = makeStyles(styles);
const useNotificationStyles = makeStyles(notificationStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function BusinessAddress() {
  const history = useHistory()
  const dispatch = useDispatch()

  const formId = "3"
  const allForms = useSelector(selectForm)       

  const thisForm = allForms.find((element) => {
    return element.id === formId;
  })
  const [form, setForm] = useState(thisForm)
  console.log('BusinessAddress.js: thisForm', thisForm)

  const [lookup, setLookup] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    zipPlus4: "",
  })
    
  const thisUser = allForms.find((element) => {
    return element.id === "-1";
  })

  const [noticeModal, setNoticeModal] = React.useState(false);

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

  function useProfileAddress() {
    //console.log('useProfileAddress: thisUser', user)
    setForm({ ...form, 
      "address1": thisUser.address1, 
      "address2": thisUser.address2, 
      "city": thisUser.city, 
      "state": thisUser.state, 
      "zip": thisUser.zip,
      "zipPlus4": thisUser.zipPlus4,
    })
  }

  let authId = "5754b539-a016-8109-970c-4c11834d47cb"
  let authToken = "asVs4YKeYeeUx29M1XeJ"
  const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);
  let client = SmartyStreetsCore.buildClient.usStreet(credentials);

  const nextClick = () => {
    //console.log('nextClick: form', form)
    //validation
    if (form.address1 === "" || form.city === "" || form.state == "" || form.zip == "") return false; 

    let lookup1 = new Lookup();
    //lookup1.addressee = "John Doe";
    lookup1.street = form.address1
    lookup1.street2 = form.address2;
    lookup1.secondary = "";
    lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
    lookup1.city = form.city;
    lookup1.state = form.state;
    lookup1.zipCode = form.zip;
    lookup1.maxCandidates = 3;
    lookup1.match = "invalid"; // "invalid" is the most permissive match,
                               // this will always return at least one result even if the address is invalid.
                               // Refer to the documentation for additional MatchStrategy options.
    
    client.send(lookup1)    
      .then(handleSuccess)
      .catch(handleError);     
    
    setNoticeModal(true)    
  }

  function handleSuccess(response) {
    //response.lookups.map(lookup => console.log(lookup.result));
    setForm({ ...form, 
      "address1": response.lookups[0].result[0].deliveryLine1, 
      "address2": response.lookups[0].result[0].deliveryLine2 || "", 
      "city": response.lookups[0].result[0].components.cityName, 
      "state": response.lookups[0].result[0].components.state, 
      "zip": response.lookups[0].result[0].components.zipCode,
      "zipPlus4": response.lookups[0].result[0].components.plus4Code,
    }) 
  }
  
  function handleError(response) {
    console.log(response);
  }

  function handleVerifyAddress() {
    //console.log('handleVerifyAddress: form', form)

    //update the form    
    dispatch(update(form))
    
    //go to the next form
    history.push("/admin/dashboard")
  }
  
  const classes = useStyles();
  const notificationClasses = useNotificationStyles();

  return (
    <>
    <Dialog
      classes={{
        root: notificationClasses.modalRoot,
        paper: notificationClasses.modal
      }}
      open={noticeModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setNoticeModal(false)}
      aria-labelledby="notice-modal-slide-title"
      aria-describedby="notice-modal-slide-description"
    >
      <DialogTitle
        id="notice-modal-slide-title"
        disableTypography
        className={notificationClasses.modalHeader}
      >
        <Button
          justIcon
          className={notificationClasses.modalCloseButton}
          key="close"
          aria-label="Close"
          color="transparent"
          onClick={() => setNoticeModal(false)}
        >
          <Close className={notificationClasses.modalClose} />
        </Button>
        <h4 className={notificationClasses.modalTitle}>Address Verified</h4>
      </DialogTitle>
      <DialogContent
        id="notice-modal-slide-description"
        className={notificationClasses.modalBody}
      >
        <p>
          {form.address1 + " " + form.address2}
          <br />
          {form.city + " " + form.state + " " + form.zip + "-" + form.zipPlus4} 
          <br />
        </p>
        <p>
          This address was verified using the SmartyStreets lookup API. Shall we continue using this validated address? 
        </p>
      </DialogContent>
      <DialogActions
        className={
          notificationClasses.modalFooter + " " + notificationClasses.modalFooterCenter
        }
      >
        <Button
          onClick={() => setNoticeModal(false)}
          color="warning"
          round
        >
          Not Yet
        </Button>
        <Button
          onClick={() => handleVerifyAddress()}
          color="info"
          round
        >
          Looks Good
        </Button>
      </DialogActions>
    </Dialog>
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
          <GridItem xs={12} sm={12} md={8}>
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
                <GridItem xs={12} sm={12} md={8}>
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
                </GridContainer>
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    success={cityState === "success"}
                    error={cityState === "error"}
                    id="city"
                    labelText="City"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.city,
                      onChange: event => {
                        if (verifyLength(event.target.value, 1)) {
                          setCityState("success");
                        } else {
                          setCityState("error");
                        }
                        handleChange(event)
                      },
                      type: "text",
                      endAdornment:
                        cityState === "error" ? (
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
                    id="state"
                    labelText="State"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{  
                      value: form.state,
                      onChange: event => {
                        handleChange(event)
                      },
                      type: "text",      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                    success={addressState === "success"}
                    error={addressState === "error"}
                    id="zip"
                    labelText="Zip Code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.zip,
                      onChange: event => {
                        if (verifyLength(event.target.value, 1)) {
                          setZipState("success");
                        } else {
                          setZipState("error");
                        }
                        handleChange(event)
                      },
                      type: "text",
                      endAdornment:
                        zipState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>    
                </GridContainer>
                <GridContainer justify="center">
                <div className={classes.checkboxAndRadio}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => useProfileAddress()}
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
    </>
  );
}
