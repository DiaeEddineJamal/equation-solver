import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ODEForm from "./components/ODEForm";
import PDEForm from "./components/PDEForm";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";

function App() {
  const stepperRef = useRef(null);

  return (
    <div className="app-container">
      <Navbar />
      <Header />
      <div className="stepper-container">
        <Stepper ref={stepperRef}>
          <StepperPanel header="Ordinary Differential Equations">
            <div className="form-panel">
              <ODEForm />
            </div>
          </StepperPanel>

          <StepperPanel header="Partial Differential Equations">
            <div className="form-panel">
              <PDEForm />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
}

export default App;
