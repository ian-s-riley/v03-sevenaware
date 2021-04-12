/*eslint-disable*/
import React, {useState} from "react";
import { useHistory } from "react-router-dom";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormAsync,
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

const useStyles = makeStyles(styles);
const useNotificationStyles = makeStyles(notificationStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function BusinessAddress() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [form, setForm] = useState(useSelector(selectForm))

  const [isDirty, setIsDirty] = useState(false)
  const [noticeModal, setNoticeModal] = React.useState(false);
  const [addressState, setAddressState] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipState, setZipState] = useState("");

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
    setIsDirty(true)
  }

  function useProfileAddress() {
    console.log('useProfileAddress: form', form)
    setForm({ ...form, 
      "businessAddress1": form.userAddress1, 
      "businessAddress2": form.userAddress2, 
      "businessCity": form.userCity, 
      "businessState": form.userState, 
      "businessZip": form.userZip,
      "businessZipPlus4": form.userZipPlus4,
    })
    setIsDirty(true)
  }

  let authId = "5754b539-a016-8109-970c-4c11834d47cb"
  let authToken = "asVs4YKeYeeUx29M1XeJ"
  const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);
  let client = SmartyStreetsCore.buildClient.usStreet(credentials);

  const nextClick = () => {
    //console.log('nextClick: form', form)
    //validation
    if (form.address1 === "" || form.city === "" || form.state == "" || form.zip == "") return false; 

    if (isDirty) {
      let lookup1 = new Lookup();
      lookup1.street = form.businessAddress1
      lookup1.street2 = form.businessAddress2;
      lookup1.city = form.businessCity;
      lookup1.state = form.businessState;
      lookup1.zipCode = form.businessZip;
      lookup1.maxCandidates = 3;
      lookup1.match = "invalid"; // "invalid" is the most permissive match,
                                 // this will always return at least one result even if the address is invalid.
                                 // Refer to the documentation for additional MatchStrategy options.
      
      client.send(lookup1)    
        .then(handleSuccess)
        .catch(handleError);     
      
      setNoticeModal(true)  
    } else {
      //go to the next form
      history.push("/admin/agree-lexisnexis")
    }   
  }

  function handleSuccess(response) {
    //response.lookups.map(lookup => console.log(lookup.result));
    setForm({ ...form, 
      "businessAddress1": response.lookups[0].result[0].deliveryLine1, 
      "businessAddress2": response.lookups[0].result[0].deliveryLine2 || "", 
      "businessCity": response.lookups[0].result[0].components.cityName, 
      "businessState": response.lookups[0].result[0].components.state, 
      "businessZip": response.lookups[0].result[0].components.zipCode,
      "businessZipPlus4": response.lookups[0].result[0].components.plus4Code,
    }) 
  }
  
  function handleError(response) {
    console.log(response);
  }

  function handleVerifyAddress() {
    //console.log('handleVerifyAddress: form', form)

    const thisForm = { 
      ...form, 
      percentComplete: 40,
      stage: "Profile > Terms & Conditions",
      stageHeader: "Terms & Conditions",
      stageText: "Finally, we'll need your permission to verify your busines through the Lexis/Nexis database.", 
      stageNavigate: "/admin/agree-lexisnexis"
    }
    dispatch(updateFormAsync(thisForm))
    
    //go to the next form
    history.push("/admin/agree-lexisnexis")
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
        <h5>
          {form.businessAddress1 + " " + form.businessAddress2}
          <br />
          {form.businessCity + " " + form.businessState + " " + form.businessZip + "-" + form.businessZipPlus4} 
          <br />
        </h5>
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
            Where is your business located?
            </h4>
          </CardHeader>
          <CardBody>
          <form>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
          <CustomInput
                    success={addressState === "success"}
                    error={addressState === "error"}
                    id="businessAddress1"
                    labelText="Address 1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.businessAddress1 || "",
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
                    id="businessAddress2"
                    labelText="Address 2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{  
                      value: form.businessAddress2 || "",
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
                    id="businessCity"
                    labelText="City"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.businessCity || "",
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
                    id="businessState"
                    labelText="State"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{  
                      value: form.businessState || "",
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
                    id="businessZip"
                    labelText="Zip Code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.businessZip || "",
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
