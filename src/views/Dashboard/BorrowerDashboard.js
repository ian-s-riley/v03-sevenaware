import React, {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { getForm } from '../../graphql/queries';

//redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectForm,
  updateForm
} from 'features/form/formSlice'

// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import Warning from "@material-ui/icons/Warning";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Money from "@material-ui/icons/MonetizationOn";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Timeline from "components/Timeline/Timeline.js";

import { widgetStories } from "variables/general.js";
import businessImage from "assets/img/desal1.jpg";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { now } from "moment";

const useStyles = makeStyles(styles);

export default function BorrowerDashboard() {
  const classes = useStyles();
  const history = useHistory()  
  const dispatch = useDispatch()

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

  //const [formId, setFormId] = useState("e104bf37-209c-4e92-b0b0-661503743244")
  const [formId, setFormId] = useState("6191108e-729b-40c4-a262-202692bedaa4")
  const [form, setForm] = useState(useSelector(selectForm))

  useEffect(() => {
    fetchForm()     
  }, [formId])

  async function fetchForm() {
    //get this user's form/application from the DB
    const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});    
    const thisForm = formFromAPI.data.getForm                     

    //set the redux store
    dispatch(updateForm(thisForm))

    //set the local store
    setForm(thisForm)  
    console.log('fetchForm: thisForm', thisForm)    
  } 

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={4}>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{form.stage}</p>
              <h3 className={classes.cardTitle}>
              {form.percentComplete}% <small> completed</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
            {form.stage === "" ? (
              <NavLink
                to="/admin/restricted"
                className={
                  classes.itemLink + " " + classes.userCollapseLinks
                }
              >
                Start your applciation...
              </NavLink>              
            ) : (
              <NavLink
                to={form.stageNavigate}
                className={
                  classes.itemLink + " " + classes.userCollapseLinks
                }
              >
                Continue your applciation...
            </NavLink>              
            )}            
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
            <NavLink
                to={form.stageNavigate || "/admin/restricted"}
                className={
                  classes.itemLink + " " + classes.userCollapseLinks
                }
              >
              <ChartistGraph
                data={{
                  labels: [form.percentComplete + " %", " "],
                  series: [form.percentComplete, 100-form.percentComplete],
                }}
                type="Pie"
                options={{
                  height: "220px",
                  donut: true,
                  donutWidth: 50,
                  donutSolid: true,
                  startAngle: 270,
                  showLabel: true
                }}
              />
              </NavLink> 
            </CardHeader>
            <CardBody>  
            <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <NavLink
                    to="/admin/restricted"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                  <Tooltip
                    id="tooltip-top"
                    title="Review"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  </NavLink>
                  <Tooltip
                    id="tooltip-top"
                    title="Contact your Lender"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="primary" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>                                               
              <h4 className={classes.cardProductTitle}>
                {form.stageHeader}
              </h4>
              <p className={classes.cardProductDesciprion}>
                {form.stageText}
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>Next Step:</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Money />{form.stage}
              </div>
            </CardFooter>
          </Card>

        
        </GridItem>
        </GridContainer>          
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Business & Loan Profile</p>
              <h3 className={classes.cardTitle}>{form.loanAmount || "Up to $3,500,000.00"}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />                
                {form.percentComplete > 0 ? "Updated " + now().toString() : null}
              </div>
            </CardFooter>
          </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                  <img src={businessImage} alt="..." />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <NavLink
                    to="/admin/restricted"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                  <Tooltip
                    id="tooltip-top"
                    title="Review"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  </NavLink>
                  <Tooltip
                    id="tooltip-top"
                    title="Contact your Lender"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="primary" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
              </CardBody>
                <CardFooter product>
                  <div className={classes.price}>
                    <h4>{form.loanAmount || " "}</h4>
                  </div>
                  <div className={`${classes.stats} ${classes.productStats}`}>
                    <Place />{form.businessCity || ""} {", " + form.businessState || ""}
                  </div>
                </CardFooter>           
            </Card>
          </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Notifications</p>
              <h3 className={classes.cardTitle}>5</h3>
            </CardHeader>
            <CardBody>
            <Timeline simple stories={widgetStories} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>      
    </div>
  );
}
