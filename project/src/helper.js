import React,{useSelector} from 'react';

const Helper=props=>{
    
    
let token=useSelector(state=>{
    return state.auth.token;
})
const getToken = () => {
    return token
}
    return(
        <>
        {token}
        </>
    );
}
export default Helper;
