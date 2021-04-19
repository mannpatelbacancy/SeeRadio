import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import StepperMain from '../../components/Stepper/StepperMain';
import FormChange from '../../components/Forms/FormChange';
const Order=props=>{
    return(
        <React.Fragment>
            <Navbar active="order"/>
            <StepperMain/>
            {/* <NewOrderForm/> */}
            {/* <Form1/> */}
            {/* <TestForm/> */}
            <FormChange/>
        </React.Fragment>
    );
}

export default Order;