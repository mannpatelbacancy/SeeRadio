
import Stepper from "./Stepper";
import React, { Component } from "react";

import {connect} from 'react-redux';
 class StepperMain extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      element:''
    };
  }
  
  handleClick(clickType,num) {
    const { currentStep } = this.state;
    let newStep = currentStep;
    clickType === "next" ? newStep++ : newStep--;
    
    if (newStep > 0 && newStep <= 5) {
      this.setState({
        currentStep: num
      });
    }
  }

  render() {
    
    
    
    return (
      <>
        

        <div className="stepper-container-horizontal">
          <Stepper
            direction="horizontal"
            currentStepNumber={this.props.formNumber-1}
            steps={stepsArray}
            stepColor="purple"
            
          />
        </div>
        <center>
        <div className="buttons-container">
          
        </div>
        </center>
      </>
    );
  }
}

const stepsArray = [
  
  "Add Adverstiser",
  "Add Order",
  "Add Assets",
  
];

const mapStateToProps=(state)=>{
    return{
        formNumber:state.formControl.formNumber
    }
    

}
export default connect(mapStateToProps)(StepperMain);