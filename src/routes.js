import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";

import BorrowerDashboard from "views/Dashboard/BorrowerDashboard.js";
import LenderDashboard from "views/Dashboard/LenderDashboard.js";
import Restricted from "views/SevenAForms/Restricted";
import RestrictedYes from "views/SevenAForms/RestrictedYes";
import ForProfit from "views/SevenAForms/ForProfit";
import ForProfitNo from "views/SevenAForms/ForProfitNo";
import BusinessProfile from "views/SevenAForms/BusinessProfile";
import BusinessAddress from "views/SevenAForms/BusinessAddress";
import AgreeLexisNexis from "views/SevenAForms/AgreeLexisNexis";
import Owner from "views/SevenAForms/Owner";
import Owners from "views/SevenAForms/Owners";
import SendNotification from "components/Notifications/SendNotification"

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

var dashRoutes = [  
  {
    path: "/borrower-dashboard",
    name: "Borrower Dashboard",
    icon: DashboardIcon,
    component: BorrowerDashboard,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/lender-dashboard",
    name: "Lender Dashboard",
    icon: Apps,
    component: LenderDashboard,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/send-notification",
    name: "Send Notification",
    icon: Apps,
    component: SendNotification,
    layout: "/admin",
    invisible: false
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "???????? ??????????????",
    icon: DashboardIcon,
    component: BorrowerDashboard,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/restricted",
    name: "Eligibility > Restricted Activities",
    mini: "E-R",
    component: Restricted,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/restricted-yes",
    name: "Eligibility > Restricted Activities",
    mini: "E",
    component: RestrictedYes,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/forprofit",
    name: "Eligibility > For Profit",
    mini: "E",
    component: ForProfit,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/forprofit-no",
    name: "Eligibility > For Profit",
    mini: "E",
    component: ForProfitNo,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/business-profile",
    name: "Business Profile > Identification",
    mini: "P",
    component: BusinessProfile,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/business-address",
    name: "Business Profile > Address",
    mini: "P",
    component: BusinessAddress,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/agree-lexisnexis",
    name: "Business Profile > Verification",
    mini: "P",
    component: AgreeLexisNexis,
    layout: "/admin",
    invisible: true
  }, 
  {
    path: "/owner",
    name: "Business Profile > Ownership",
    mini: "O",
    component: Owner,
    layout: "/admin",
    invisible: true
  },  
  {
    path: "/owners",
    name: "Business Profile > Multiple Owners",
    mini: "O",
    component: Owners,
    layout: "/admin",
    invisible: true
  },  
  {
    collapse: true,
    name: "Pages",
    rtlName: "??????????",
    icon: Image,
    state: "pageCollapse",
    invisible: true,
    views: [
      {
        path: "/pricing-page",
        name: "Pricing Page",
        rtlName: "????????????????",
        mini: "PP",
        rtlMini: "??",
        component: PricingPage,
        layout: "/auth"
      },
      {
        path: "/rtl-support-page",
        name: "RTL Support",
        rtlName: "?????????? ??????",
        mini: "RS",
        rtlMini: "????",
        component: RTLSupport,
        layout: "/rtl"
      },
      {
        path: "/timeline-page",
        name: "Timeline Page",
        rtlName: "???????????????? ????????????",
        mini: "T",
        rtlMini: "????",
        component: TimelinePage,
        layout: "/admin"
      },
      {
        path: "/login-page",
        name: "Login Page",
        rtlName: "?????????????????? ????????????",
        mini: "L",
        rtlMini: "????????",
        component: LoginPage,
        layout: "/auth"
      },
      {
        path: "/register-page",
        name: "Register Page",
        rtlName: "??????????",
        mini: "R",
        rtlMini: "????",
        component: RegisterPage,
        layout: "/auth"
      },
      {
        path: "/lock-screen-page",
        name: "Lock Screen Page",
        rtlName: "???????? ????????????",
        mini: "LS",
        rtlMini: "????????",
        component: LockScreenPage,
        layout: "/auth"
      },
      {
        path: "/user-page",
        name: "User Profile",
        rtlName: "?????? ???????????? ????????????????",
        mini: "UP",
        rtlMini: "????",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: "/error-page",
        name: "Error Page",
        rtlName: "???????? ??????????",
        mini: "E",
        rtlMini: "????????????",
        component: ErrorPage,
        layout: "/auth"
      }
    ]
  },
  {
    collapse: true,
    name: "Components",
    rtlName: "????????????????",
    icon: Apps,
    state: "componentsCollapse",
    invisible: true,
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        rtlName: "???????????? ?????????? ??????????????????",
        mini: "MC",
        rtlMini: "??",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            rtlName: "????????",
            mini: "B",
            rtlMini: "??",
            component: Buttons,
            layout: "/admin"
          }
        ]
      },
      {
        path: "/buttons",
        name: "Buttons",
        rtlName: "????????",
        mini: "B",
        rtlMini: "??",
        component: Buttons,
        layout: "/admin"
      },
      {
        path: "/grid-system",
        name: "Grid System",
        rtlName: "???????? ????????????",
        mini: "GS",
        rtlMini: "????",
        component: GridSystem,
        layout: "/admin"
      },
      {
        path: "/panels",
        name: "Panels",
        rtlName: "??????????",
        mini: "P",
        rtlMini: "??",
        component: Panels,
        layout: "/admin"
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        rtlName: "?????????? ??????????",
        mini: "SA",
        rtlMini: "??????",
        component: SweetAlert,
        layout: "/admin"
      },
      {
        path: "/notifications",
        name: "Notifications",
        rtlName: "??????????????",
        mini: "N",
        rtlMini: "??",
        component: Notifications,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        rtlName: "????????????",
        mini: "I",
        rtlMini: "??",
        component: Icons,
        layout: "/admin"
      },
      {
        path: "/typography",
        name: "Typography",
        rtlName: "??????????",
        mini: "T",
        rtlMini: "??",
        component: Typography,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "????????????????",
    icon: "content_paste",
    state: "formsCollapse",
    invisible: true,
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "?????????? ??????????",
        mini: "RF",
        rtlMini: "????",
        component: RegularForms,
        layout: "/admin"
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "?????????? ??????????",
        mini: "EF",
        rtlMini: "??????",
        component: ExtendedForms,
        layout: "/admin"
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "?????????? ???????????? ???? ??????????",
        mini: "VF",
        rtlMini: "????",
        component: ValidationForms,
        layout: "/admin"
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "????????",
        mini: "W",
        rtlMini: "??",
        component: Wizard,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "??????????????",
    icon: GridOn,
    state: "tablesCollapse",
    invisible: true,
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "???????????? ??????????",
        mini: "RT",
        rtlMini: "????",
        component: RegularTables,
        layout: "/admin"
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "?????????? ??????????",
        mini: "ET",
        rtlMini: "??????",
        component: ExtendedTables,
        layout: "/admin"
      },
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "???? ?????? ??????????????",
        mini: "RT",
        rtlMini: "????",
        component: ReactTables,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Maps",
    rtlName: "??????????",
    icon: Place,
    state: "mapsCollapse",
    invisible: true,
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "?????????? ????????",
        mini: "GM",
        rtlMini: "????",
        component: GoogleMaps,
        layout: "/admin"
      },
      {
        path: "/full-screen-maps",
        name: "Full Screen Map",
        rtlName: "?????????? ?????????? ????????????",
        mini: "FSM",
        rtlMini: "??????",
        component: FullScreenMap,
        layout: "/admin"
      },
      {
        path: "/vector-maps",
        name: "Vector Map",
        rtlName: "?????????? ????????????",
        mini: "VM",
        rtlMini: "????",
        component: VectorMap,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "????????????????",
    icon: WidgetsIcon,
    component: Widgets,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "???????????? ????????????????",
    icon: Timeline,
    component: Charts,
    layout: "/admin",
    invisible: true,
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "??????????????",
    icon: DateRange,
    component: Calendar,
    layout: "/admin",
    invisible: true,
  }
];
export default dashRoutes;
