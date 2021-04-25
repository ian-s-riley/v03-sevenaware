import React from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Badge from "components/Badge/Badge.js";

// @material-ui/icons
import CardTravel from "@material-ui/icons/CardTravel";
import Extension from "@material-ui/icons/Extension";
import Fingerprint from "@material-ui/icons/Fingerprint";
import FlightLand from "@material-ui/icons/FlightLand";
import Build from "@material-ui/icons/Build";

import styles from "assets/jss/material-dashboard-pro-react/components/timelineStyle.js";

const useStyles = makeStyles(styles);

export default function SendNotification() {
  const classes = useStyles();

  const simple = true;

const notification = {
    // Third story
    inverted: true,
    fromUserId: "",
    toUserId: "",
    fromEmail: "ian.public@yahoo.com",
    toEmail: "ian.s.riley@outlook.com",
    action: "",
    status: "UNREAD",
    badgeColor: "success",
    badgeIcon: Build,
    title: "Title",
    body: (
      <div>
        <p>
        Body Text
        </p>
      </div>
    ),
    footerTitle: "Footer Title",
    footer: "Footer",
  }
  

  const timelineClass =
    classes.timeline +
    " " +
    cx({
      [classes.timelineSimple]: simple
    });


    const panelClasses =
    classes.timelinePanel +
    " " +
    cx({
      [classes.timelinePanelInverted]: notification.inverted || simple,
      [classes.timelineSimplePanel]: simple
    });
  const timelineBadgeClasses =
    classes.timelineBadge +
    " " +
    classes[notification.badgeColor] +
    " " +
    cx({
      [classes.timelineSimpleBadge]: simple
    });

  return (
    <ul className={timelineClass}>
      
          <li className={classes.item}>
            {notification.badgeIcon ? (
              <div className={timelineBadgeClasses}>
                <notification.badgeIcon className={classes.badgeIcon} />
              </div>
            ) : null}
            <div className={panelClasses}>
              {notification.title ? (
                <div className={classes.timelineHeading}>
                  <Badge color={notification.badgeColor}>{notification.title}</Badge>
                </div>
              ) : null}
              <div className={classes.timelineBody}>{notification.body}</div>
              {notification.footerTitle ? (
                <h6 className={classes.footerTitle}>{notification.footerTitle}</h6>
              ) : null}
              {notification.footer ? <hr className={classes.footerLine} /> : null}
              {notification.footer ? (
                <div className={classes.timelineFooter}>{notification.footer}</div>
              ) : null}
            </div>
          </li>
    </ul>
  );
}

