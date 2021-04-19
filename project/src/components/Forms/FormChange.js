import React from 'react';
import Form1 from '../Forms/Form1/Form1';
import TestForm from '../Forms/TestForm/TestForm';
import NewOrderForm from '../Forms/newOrderForm/newOrderForm';
import { useSelector } from 'react-redux';

const FromChange=props=>{
    
    const FormNumber=useSelector(state=>{
        return state.formControl.formNumber;
    })
    let showElement='';
    if(FormNumber===1){
        showElement=<Form1/>
    }
    else if(FormNumber===2){
        showElement=<NewOrderForm/>
    }
    else if(FormNumber===3){
        showElement=<TestForm/>
    }
    
    
    return(
        <div>
            
            {showElement}
            
        </div>
            
        
    );
}

export default FromChange;

