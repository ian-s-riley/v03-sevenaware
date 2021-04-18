import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//AWS Amplify libraries
import { API, Storage } from 'aws-amplify';
import { getUser } from '../../graphql/queries';

// redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUser,
  updateUserAsync,
  selectUser,
} from 'features/form/userSlice'
import {
  selectNavigation,
  updateNavigation,
} from 'features/form/navigationSlice'

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
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import FormLabel from "@material-ui/core/FormLabel";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

const usStates = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
const useStyles = makeStyles(styles);

export default function UserProfile() {
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles();

  useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  const [userId, setUserId] = useState(useSelector(selectNavigation).userId)
  const [user, setUser] = useState(useSelector(selectUser))

  const [userImage, setUserImage] = useState()
  const [firstNameState, setFirstNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipState, setZipState] = useState("");

  useEffect(() => {
    fetchUser()
  }, [userId])

  async function fetchUser() {
    const userFromAPI = await API.graphql({ query: getUser, variables: { id: userId } });
    const thisUser = userFromAPI.data.getUser

    //set the redux store
    dispatch(updateUser(thisUser))

    //set the local store
    setUser(thisUser)
    //console.log('fetchUser: thisUser', thisUser)    

    //get the profile photo
    //fetchImage()
  }

  async function fetchImage() {
    //console.log('fetchImage: image', user.image)
    if (user.image) {
      const image = await Storage.get(user.image);
      setUserImage(image);
    }
  }

  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  function handleChange(e) {
    const { id, value } = e.currentTarget;
    setUser({ ...user, [id]: value })
  }

  const handleSelectState = event => {
    //console.log('handleSelectState: ', event.target.value)
    setUser({ ...user, "state": event.target.value })
  }

  async function onImageChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setUser({ ...user, image: file.name });
    await Storage.put(file.name, file);
  }

  async function saveProfile() {
    dispatch(updateUserAsync(user))

    if (user.image) {
      const image = await Storage.get(user.image);
      setUserImage(image)
    }
  }

  function switchUser(newUserId, newFormId, newUserName, newUserType) {
    setUserId(newUserId)
    dispatch(updateNavigation({ userId: newUserId, formId: newFormId, userName: newUserName, userType: newUserType }))
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
                      value: user.firstName || "",
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
                    id="lastName"
                    labelText="Last Name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: user.lastName || "",
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
                      value: user.address1 || "",
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
                    id="address2"
                    labelText="Address 2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: user.address2 || "",
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
                    id="city"
                    labelText="City"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: user.city || "",
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
                      value={user.state || ""}
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
                    id="zip"
                    labelText="Zip Code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: user.zip || "",
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
              <Button
                onClick={() => saveProfile()}
                color="rose"
                round
                className={classes.updateProfileButton}>
                Save Profile
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                  <ImageUpload
                    avatar
                    addButtonProps={{
                      color: "rose",
                      simple: true
                    }}
                    changeButtonProps={{
                      color: "rose",
                      simple: true
                    }}
                    removeButtonProps={{
                      color: "rose",
                      simple: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="title"
                    labelText="My Title"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: user.title || "",
                      onChange: event => {
                        handleChange(event)
                      },
                      type: "text",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="profile"
                    labelText="Profile"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: user.profile || "",
                      multiline: true,
                      rows: 3,
                      onChange: event => {
                        handleChange(event)
                      },
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem>
          <FormLabel className={classes.labelLeftHorizontal}>
            Switch User:
          <br /><a href="#" onClick={() => switchUser("70213c91-7f7a-4790-8146-cb26cb13daf8", "e104bf37-209c-4e92-b0b0-661503743244", "Ian Riley", "Borrower")}>Ian Riley - Borrower</a>
            <br /><a href="#" onClick={() => switchUser("f0abd9ae-b0d6-448c-a48c-1b483e4f3f5a", "6191108e-729b-40c4-a262-202692bedaa4", "Sam Samuels", "Borrower")}>Sam S. - Borrower</a>
            <br /><a href="#" onClick={() => switchUser("1c9932fa-df3a-4026-aaaf-06e29e02cb21", "a9b71b61-c7a3-47f9-ae3a-6623e60f0a4d", "Jane Doe", "Borrower")}>Jane Doe - Borrower</a>
            <br />
            <br /><a href="#" onClick={() => switchUser("96e2c4aa-f2e2-4fde-b66e-7459a04d93f8", "-1", "Mike Bruckheimer", "Lender")}>Mike Bruckheimer - Lender</a>
          </FormLabel>
        </GridItem>
      </GridContainer>
    </div>
  );
}
