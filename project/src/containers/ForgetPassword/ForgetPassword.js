import { Button,Form,Input} from 'reactstrap';
import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import './ForgetPassword.css';
import { useHistory } from 'react-router-dom';
import InputField from '../../components/Input/Input';
import {validationHandler} from '../../components/Validation/Validation';
import {useSelector} from 'react-redux';
import axios from 'axios'; 

const ForgetPassword=props=>{
    // const [currentPassword,setCurrentPassword]=useState('');
    // const [newPassword,setNewPassword]=useState('');
    // const [confirmPassword,setConfirmPassword]=useState('');
    const [userDetail, setUserDetail] = useState({
        currentPassword:'',
        newPassword:'',
        confirmPassword:'',
    })
    const [validation,setValidation]=useState({
        currentPassword:'',
        newPassword:'',
        confirmPassword:'',
    })
    let history=useHistory();
    let spanStyle={
        color:'red',
        fontSize:'17px'
    }
    

    const changeHandler=(event)=>{
        console.log(event.target.name);
        let ans=validationHandler(event.target.name,event.target.value);
        
        let validationCopy=validation;
        if(ans){
            
            validationCopy[event.target.name]='';
            setValidation(validationCopy)
        }
        else{
            
            validationCopy[event.target.name]='invalid';
            setValidation(validationCopy)
        }
        setUserDetail({ ...userDetail, [event.target.name]: event.target.value })
    }
    // let eyeCheckClass='fa fa-eye-slash';
    // let temp=true;
    // // const check=()=>{
    // //     if(temp){
    // //         eyeCheckClass="fa fa-eye-slash"
    // //         temp=false;
    // //     }
    // //     else{
    // //         eyeCheckClass="fa fa-eye";
    // //     }
    // }
    let token=useSelector(state=>{
        return state.auth.token;
    })
    const setPasswordHandler=()=>{

        let userDetailCopy=userDetail;
        let validationCopy=validation;
        if(userDetailCopy.currentPassword && userDetailCopy.newPassword && userDetailCopy.confirmPassword){
            if(validationCopy.currentPassword==='' && validationCopy.newPassword===''  && validationCopy.confirmPassword===''){
                alert("Successfully Done!!!");
                // loginCheckHandler(userDetailCopy.email,userDetailCopy.password);
                alert("user"+userDetailCopy.currentPassword+"kk"+userDetailCopy.newPassword)
                let data = {
                    "oldPassword": userDetailCopy.currentPassword,
                    "newPassword": userDetailCopy.newPassword
                }
                
            axios.post('http://localhost:3000/api/person/changePassword', data, {
                headers:{
                    "x-token":token
                }
            })
                .then(res => {
                    if (res.data.success === true) {
                        alert('success')
                        localStorage.setItem('token', res.data.data.token)
                        // props.passwordChangeHandler(res.data.data.token)
                         props.history.push('/dashboard') 
                    }
                })
                .catch(res => console.log(res))
                // history.push("/login");
            }
        }
        else{
            alert("pl enter details");
        }
        
    }
    return(
        
        <div className="forgetpassword d-flex flex-wrap justify-content-center align-items-center">
            <div className="forgetpassword-box w-100 mx-auto">
            <div className="text-center mb-4">
            <img src={Logo} alt="logo"></img>
            </div>
            <div className="bg-white rounded-40 p-4">
                <Form >
                    
                    <div className="form-group position-relative mb-4">
                        <InputField elementType='input' labelClass="text-black fw-700 fs-14 mb-0"  spanStyle={spanStyle} inputClassName="form-control border-bottom border-top-0 border-left-0 border-right-0" invalid={validation.currentPassword} value={userDetail.currentPassword} name="currentPassword" placeholder="Enter Current Password" type="password" label="Current Password" changed={changeHandler}/> 
                    </div>
                    <div className="form-group position-relative mb-4">
                        <InputField elementType='input' labelClass="text-black fw-700 fs-14 mb-0"  spanStyle={spanStyle} inputClassName="form-control border-bottom border-top-0 border-left-0 border-right-0" invalid={validation.newPassword} value={userDetail.newPassword} name="newPassword" placeholder="Enter New Password" type="password" label="New Password" changed={changeHandler}/> 
                        <span className="p-0">Use 8 or more characters with a mix upperCase, loweCase,numbers & symbols</span>
                    </div>
                    <div className="form-group position-relative mb-4">
                         <InputField elementType='input' labelClass="text-black fw-700 fs-14 mb-0"  spanStyle={spanStyle} inputClassName="form-control border-bottom border-top-0 border-left-0 border-right-0" invalid={validation.confirmPassword} value={userDetail.confirmPassword} name="confirmPassword" placeholder="Confirm Password" type="password" label="Confirm Password" changed={changeHandler}/> 
                    </div>
                    <Button color="primary" size="lg" block onClick={setPasswordHandler}>Change Password</Button> 
                </Form>
               
            </div>
        </div>
    </div>
        
    );
}


export default ForgetPassword;