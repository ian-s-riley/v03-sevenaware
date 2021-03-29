import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "./Form1Steps/Step1";
import Step2 from "./Form1Steps/Step2";
import Step3 from "./Form1Steps/Step3";

export default function Form1View() {
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <Wizard
          validate
          steps={[
            { stepName: "Restricted Activities", stepComponent: Step1, stepId: "restricted" },
            { stepName: "Business Type", stepComponent: Step2, stepId: "type" },
            { stepName: "Profile", stepComponent: Step3, stepId: "profile" }
          ]}
          title="Build Your Profile"
          subtitle="Let's start by getting to know a little more about your business."
          finishButtonClick={e => alert(e)}
        />
      </GridItem>
    </GridContainer>
  );
}
