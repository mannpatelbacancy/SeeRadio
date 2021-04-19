import { Button} from 'reactstrap';
import React, { useState ,useContext} from 'react';
import Logo from '../../assets/images/logo.png';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import InputField from '../../components/Input/Input';
import {validationHandler} from '../../components/Validation/Validation';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';
import BackDrop from '../../components/Backdrop/Backdrop';
import {login} from '../../components/Api/Api';
import {AuthContext} from '../../auth-context';
const Login=props=>{
    let history=useHistory();
    const dispatch=useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    
    const authContext=useContext(AuthContext);

    const [userDetail, setUserDetail] = useState({
        email:'',
        password:'',
    })

    const [validation,setValidation]=useState({
        email:'',
        password:''
    })
    
    let spanStyle={
        color:'red',
        fontSize:'17px'
    }

    
    const loginSuccessHandler=(token,personData)=>dispatch(actions.loginSuccessHandler(token,personData))
    
    const changeHandler=(event)=>{
       
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

    const loginCheckHandler=()=>{
        
        setIsLoading(true);
        login(userDetail)
        .then(res => {
                    alert("Successfully logged in!!!");
                    localStorage.setItem('token',res.token)
                    loginSuccessHandler(res.token,res.personData);
                    authContext.login();
                    history.push("/dashboard");
                    setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false)
            alert(err)
        })

    }
    const loginHandler=()=>{
        let userDetailCopy=userDetail;
        let validationCopy=validation;
        if(userDetailCopy.email && userDetail.password){
            if(validationCopy.email==='' && validationCopy.password===''){
                loginCheckHandler(userDetailCopy.email,userDetailCopy.password);
            }
        }
        else{
            alert("Pl enter details");
        }
        
        
    }
    return(
        <React.Fragment>
        
        <BackDrop show={isLoading} ><Spinner/></BackDrop>
        <div className="login d-flex flex-wrap justify-content-center align-items-center">
            <div className="login-box w-100 mx-auto">
            <div className="text-center mb-4">
            <img src={Logo} alt="logo"></img>
            </div>
            <div className="bg-white rounded-40 p-4">
                
                    <div className="form-group ">
                    <InputField elementType='input' labelClass="text-black fw-700 fs-14 mb-0"  spanStyle={spanStyle} inputClassName="form-control border-bottom border-top-0 border-left-0 border-right-0" invalid={validation.email} value={userDetail.email} name="email" placeholder="Enter email address" type="email" label="Email" changed={changeHandler}/>
                    </div>
                    
                    <div className=" from-group mb-3">
                         <InputField elementType='input' labelClass="text-black fw-700 fs-14 mb-0"  spanStyle={spanStyle} inputClassName="form-control border-bottom border-top-0 border-left-0 border-right-0" invalid={validation.password} value={userDetail.password} name="password" placeholder="Enter password" type="password" label="Password" changed={changeHandler}/> 
                    </div>
                    
                    </div>
                    <Button color="primary" size="lg" block onClick={loginHandler}>Login</Button> 
                
                <div className="text-center">
                    <Link to="forgetpassword"><Button color="link"  style={{textDecoration:'none'}}>Forgot Password?</Button></Link>
                </div>
            </div>
        </div>
    
        </React.Fragment>
    );
}


export default Login;