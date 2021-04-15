import React, {useState, useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { listForms, getForm } from '../../graphql/queries';

//redux store
import { useSelector, useDispatch } from 'react-redux';
import {
  selectForm,
  updateForm,
} from 'features/form/formSlice'
import {
  selectNavigation,
  updateNavigation,
} from 'features/form/navigationSlice'

// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";

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
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.js";

import { widgetStories } from "variables/general.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function LenderDashboard() {
  const history = useHistory()  
  const dispatch = useDispatch()
  const classes = useStyles();

  const colors = [
    "primary",
    "warning",
    "success",
    "info",
    "rose",
    "gray",
    "primary",
    "warning",
    "success",
    "info",
    "rose",
  ]

  const [forms, setForms] = useState([])
  const [form, setForm] = useState(useSelector(selectForm))
  const navigation = useSelector(selectNavigation)
  //console.log('navigation', navigation)
  //console.log('form', form)

  useEffect(() => {
    fetchForms();
  }, []);

  async function fetchForms() {
    const apiData = await API.graphql(graphqlOperation(listForms))
    const formsFromAPI = apiData.data.listForms.items 
    setForms(formsFromAPI);    
  }

  async function gotoForm(newFormId) {
    dispatch(updateNavigation({formId: newFormId}))

    const formFromAPI = await API.graphql({ query: getForm, variables: { id: newFormId  }});    
    const thisForm = formFromAPI.data.getForm                     
    console.log('fetchForm: thisForm', thisForm) 

    // //set the redux store
    dispatch(updateNavigation({...navigation, formId: newFormId }))
    dispatch(updateForm(thisForm))

    //go to the application form page for this user
    history.push("/admin/restricted")
  }

  const percentCompletedChart = {
    data: {
      labels: [form.percentComplete + " %", " "],
      series: [form.percentComplete, 100-form.percentComplete],
    },
    options: {
      height: "200px",
      donut: true,
      donutWidth: 30,
      donutSolid: true,
      startAngle: 270,
      showLabel: true
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={8}>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Hello, {navigation.userName}</p>
              <h3 className={classes.cardTitle}>
              <small>You have </small>{forms.length}<small> loan applications in progress</small>
              </h3>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card >
            <CardHeader>
            <h3 className={classes.cardTitle}>
              Active Applications & Borrowers
              </h3>
              <h4 className={classes.cardTitle}>
              Select an applciation to view progress & details.
              </h4>
            </CardHeader>            
            <CardBody>                   
                {
                forms.map(form => (
                    <GridContainer key={form.id}>
                        <GridItem xs={12} sm={12} md={4} lg={2}>
                            {form.businessName}
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8} lg={10}>
                            <CustomLinearProgress
                                onClick={() => gotoForm(form.id)}
                                variant="determinate"
                                color={colors[Math.floor(Math.random() * 10)]}
                                value={form.percentComplete}
                            />
                        </GridItem>
                    </GridContainer>
                ))
                }                                                                        
            </CardBody>
            <CardFooter product>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place />Metrics, Standards, & Reports
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
