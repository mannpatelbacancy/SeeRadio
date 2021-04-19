import * as actionTypes from '../actions/actionTypes';
import React from 'react';
const initialState={
    formNumber:1,
    newAdviserForm:{
        companyname:'',
        companywebsiteaddress:'',
        industrycategory:'0de31283-5e08-475f-bfbf-a20056a95a44',
        firstname:'',
        lastname:'',
        email:'',
        mobilenumber:'',
        address1:'',
        address2:'',
        city:'',
        country:'CA',
        state:'AB',
        postal:'',
    },
    
  
   
    newOrderForm:{
        industrycategoryorderform:'0a95ff23-760c-4dac-85e0-f8663f7a0a13',
        title:'',
        landingpage:'',
        price:'',
        description:'',
        targetmarket:'04cb0f82-b601-4bdf-862f-03b3834b8b66',
        budget:''
    },

    TestForm:{
        scriptFile:{ value:null,valid: false },
        voiceFile:{ value:null,valid: false },
        advertiserAssets:{ value:null,valid: false }
    },

    form1Response:null
}

const reducer=(state=initialState,action)=>{
        switch(action.type){
            case actionTypes.FORM_CHANGE:
                return{
                    ...state,
                    formNumber:action.num
                }
            case actionTypes.CHANGE_NEWADVISERFORM:
                return{
                    ...state,
                    newAdviserForm:action.form
                }
            case actionTypes.CHANGE_NEWORDERFORM:
                 return{
                    ...state,
                    newOrderForm:action.form
                }
            case actionTypes.CHANGE_TESTFORM:
                 return{
                    ...state,
                    TestForm:action.form
                }
            case actionTypes.SET_FORM1RESPONSE:
                return{
                    ...state,
                    form1Response:action.data
                }
            default:
                return state;
            
        }
}

export default reducer;