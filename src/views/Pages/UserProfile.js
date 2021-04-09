import React, {useState} from "react";

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  update,
  selectForm,
} from 'features/form/formSlice'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardAvatar from "components/Card/CardAvatar.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

import avatar from "assets/img/faces/avatar.jpg";


const useStyles = makeStyles(styles);

export default function UserProfile() {
  const dispatch = useDispatch()

  const formId = "-1"
  const [form, setForm] = useState(useSelector(selectForm))

  const [firstNameState, setFirstNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipState, setZipState] = useState("");
  
  const usStates =  ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

  const classes = useStyles();

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

  const handleSelectState = event => {
    console.log('handleSelectState: ', event.target.value)
    setForm({ ...form, "userState": event.target.value})
  }

  function saveProfile() {
    const thisForm = { 
      ...form, 
      formId: formId,
    }
    dispatch(update(thisForm))
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <PermIdentity />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Your Profile
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  success={firstNameState === "success"}
                  error={firstNameState === "error"}
                  id="firstName"
                  labelText="First Name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: form.firstName,
                    onChange: event => {
                      if (verifyLength(event.target.value, 1)) {
                        setFirstNameState("success");
                      } else {
                        setFirstNameState("error");
                      }
                      handleChange(event)
                    },
                    type: "text",
                    endAdornment:
                      firstNameState === "error" ? (
                        <InputAdornment position="end">
                          <Close className={classes.danger} />
                        </InputAdornment>
                      ) : (
                        undefined
                      )
                  }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  success={lastNameState === "success"}
                  error={lastNameState === "error"}
                  id="latsName"
                  labelText="Last Name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: form.lastName,
                    onChange: event => {
                      if (verifyLength(event.target.value, 1)) {
                        setLastNameState("success");
                      } else {
                        setLastNameState("error");
                      }
                      handleChange(event)
                    },
                    type: "text",
                    endAdornment:
                      lastNameState === "error" ? (
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
              <GridContainer>                

              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  success={addressState === "success"}
                  error={addressState === "error"}
                  id="userAddress1"
                  labelText="Address 1"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: form.userAddress1,
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                      id="userAddress2"
                      labelText="Address 2"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{  
                        value: form.userAddress2,
                        onChange: event => {
                          handleChange(event)
                        },
                        type: "text",      
                      }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    success={cityState === "success"}
                    error={cityState === "error"}
                    id="userCity"
                    labelText="City"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.userCity,
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
                <GridItem xs={12} sm={12} md={3}>
                 

                <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="userState"
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
                          onChange={handleSelectState}
                          value={form.userState}
                          inputProps={{
                            name: "userState",
                            id: "userState"
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
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    success={addressState === "success"}
                    error={addressState === "error"}
                    id="userZip"
                    labelText="Zip Code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: form.userZip,
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
              <Button color="warning" className={classes.updateProfileButton}>
                Switch User
              </Button>
              <Button color="rose" onClick={saveProfile} className={classes.updateProfileButton}>
                Update Profile
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CTO / CO-FOUNDER</h6>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button color="rose" round>
                Update Bio
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
