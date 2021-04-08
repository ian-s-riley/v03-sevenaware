import React, {useState} from "react";
import { NavLink } from "react-router-dom";

//redux store
import { useSelector } from 'react-redux';
import {
  selectForm,
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
import ArtTrack from "@material-ui/icons/ArtTrack";

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

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import priceImage1 from "assets/img/percent1.jpg";
import priceImage2 from "assets/img/desal1.jpg";
import { blue } from "@material-ui/core/colors";

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [form, setForm] = useState(useSelector(selectForm))
  console.log('form', form)

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
        <GridItem xs={12} sm={6} md={6} lg={4}>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Eligibility</p>
              <h3 className={classes.cardTitle}>
              {form.percentComplete}%<small>completed</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
            <NavLink
              to="/admin/restricted"
              className={
                classes.itemLink + " " + classes.userCollapseLinks
              }
            >
              Continue yoru applciation...
            </NavLink>              
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card >
            <CardHeader>
            <NavLink
                to="/admin/restricted"
                className={
                  classes.itemLink + " " + classes.userCollapseLinks
                }
              >
              <ChartistGraph
                data={percentCompletedChart.data}
                type="Pie"
                options={percentCompletedChart.options}
              />
              </NavLink>
            </CardHeader>
            <CardBody>                                      
              <h4 className={classes.cardProductTitle}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  We'll need a little more information
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                The first step in your SBA 7(a) loan is verification of your business and its ownership structure. There are still a few more details we need.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>Approval</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place />Lexis/Nexis
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
              <h3 className={classes.cardTitle}>$134,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Updated 3 days ago...
              </div>
            </CardFooter>
          </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={priceImage2} alt="..." />
              </a>
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
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  New Desalination Plant
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
              Desalination is a process that takes away mineral components from saline water. More generally, desalination refers to the removal of salts and minerals from a target substance,[1] as in soil desalination, which is an issue for agriculture.[2] Saltwater (especially sea water) is desalinated to produce water suitable for human consumption or irrigation.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <h4>$123,456</h4>
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> San Diego, CA
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
