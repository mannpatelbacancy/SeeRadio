import * as actionTypes from './actionTypes';

export const formChange=(num)=>{
    return{
        type:actionTypes.FORM_CHANGE,
        num:num
    }
}

export const changeNewAdviserForm=(form)=>{
    return{
        type:actionTypes.CHANGE_NEWADVISERFORM,
        form:form
    }
}
export const changeNewOrderForm=(form)=>{
    return{
        type:actionTypes.CHANGE_NEWORDERFORM,
        form:form
    }
}
export const setTestForm=(form)=>{
    return{
        type:actionTypes.CHANGE_TESTFORM,
        form:form
    }
}

export const setForm1Response=(data)=>{
    return{
        type:actionTypes.SET_FORM1RESPONSE,
        data:data
    }
}