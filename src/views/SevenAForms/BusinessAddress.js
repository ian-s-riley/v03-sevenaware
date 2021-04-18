/*eslint-disable*/
import React, { useState } from "react";
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
import {
  selectUser,
} from 'features/form/userSlice'

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
import InputLabel from "@material-ui/core/InputLabel";

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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import notificationStyles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";

const usStates =  ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

const useStyles = makeStyles(styles);
const useNotificationStyles = makeStyles(notificationStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function BusinessAddress() {
  const history = useHistory()
  const dispatch = useDispatch()

  const formPercentage = 20
  console.log('formPercentage', formPercentage)
  const [form, setForm] = useState(useSelector(selectForm))
  const [navigation, setNavigation] = useState(useSelector(selectNavigation))
  const thisUser = useState(useSelector(selectUser))
  console.log('form.percentComplete', form.percentComplete)
  const [isDirty, setIsDirty] = useState(form.percentComplete < formPercentage ? true : false)

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
    const { id, value } = e.currentTarget;
    setForm({ ...form, [id]: value })
    setIsDirty(true)
  }

  const handleSelectState = event => {
    setForm({ ...form, "businessState": event.target.value })
  }

  function useProfileAddress() {
    console.log('useProfileAddress: form', thisUser)
    setForm({
      ...form,
      "businessAddress1": thisUser[0].address1,
      "businessAddress2": thisUser[0].address2,
      "businessCity": thisUser[0].city,
      "businessState": thisUser[0].state,
      "businessZip": thisUser[0].zip,
      "businessZipPlus4": thisUser[0].zipPlus4,
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
    setForm({
      ...form,
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

    if (navigation.userType === "Borrower") {
      const thisForm = {
        ...form,
        percentComplete: formPercentage,
        stage: "Profile > Terms & Conditions",
        stageHeader: "Terms & Conditions",
        stageText: "Finally, we'll need your permission to verify your busines through the Lexis/Nexis database.",
        stageNavigate: "/admin/agree-lexisnexis"
      }
      dispatch(updateFormAsync(thisForm))
    }

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
        <GridItem xs={12} sm={12} md={8}>
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
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      success={addressState === "success"}
                      error={addressState === "error"}
                      id="businessAddress1"
                      labelText="Address 1"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: navigation.userType === "Borrower" ? false : true,
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
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      id="businessAddress2"
                      labelText="Address 2"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: navigation.userType === "Borrower" ? false : true,
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
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={cityState === "success"}
                      error={cityState === "error"}
                      id="businessCity"
                      labelText="City"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: navigation.userType === "Borrower" ? false : true,
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
                  <GridItem xs={12} sm={12} md={4}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <InputLabel
                      htmlFor="businessState"
                      className={classes.selectLabel}
                    >
                      State
                        </InputLabel>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      disabled={navigation.userType === "Borrower" ? false : true}
                      onChange={handleSelectState}
                      value={form.businessState || ""}
                      inputProps={{
                        name: "businessState",
                        id: "businessState"
                      }}
                    >
                      <MenuItem
                        disabled
                        classes={{
                          root: classes.selectMenuItem
                        }}
                      >
                        Choose State
                          </MenuItem>
                      {
                        usStates.map(usState => (
                          <MenuItem
                            key={usState}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value={usState}
                          >
                            {usState}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      success={addressState === "success"}
                      error={addressState === "error"}
                      id="businessZip"
                      labelText="Zip Code"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: navigation.userType === "Borrower" ? false : true,
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
                  {navigation.userType === "Borrower" && (
                    <GridItem xs={12} sm={8}>
                      
                    </GridItem>

                  )}
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
    </>
  );
}
