import React, { useEffect,useState } from 'react';
import InputField from '../../Input/Input';
import { Button, Input,Label} from 'reactstrap';
import './Form1.css';
import {useDispatch,useSelector} from 'react-redux';
import * as actions from '../../../store/actions/index';
import { useHistory } from 'react-router';
import {validationHandler} from '../../Validation/Validation';
import Spinner from '../../Spinner/Spinner';
import BackDrop from '../../Backdrop/Backdrop';
import {getStates} from '../../Api/Api';
import {getCountries} from '../../Api/Api';
import {createClient} from '../../Api/Api';
import {getIndustries}  from '../../Api/Api';

const Form1=props=>{

    let history=useHistory();
    const [isLoading, setIsLoading] = useState(false)
    let labelClass="text-black font-weight-bold fw-700 fs-14 mb-0";
    let spanStyle={
        color:'red',
        fontSize:'17px'
    }
    let secondSpanStyle={
        color:'white',
        fontSize:'17px' 
    }
    let token=useSelector(state=>{
        return state.auth.token;
    })
    let personData=useSelector(state=>{
        return state.auth.personData;
    })

    const [validation, setValidation] = useState({
        companyname: {valid: ''},
        companywebsiteaddress:{valid:''},
        industrycategory:{valid:''},
        firstname:{valid:''},
        lastname:{valid:''},
        email:{valid:''},
        mobilenumber:{valid:''},
        address1:{valid:''},
        address2:{valid:''},
        city:{valid:''},
        country:{valid:''},
        state:{valid:''},
        postal:{valid:''},
    })


    const [newAdviserFormContactOptinal,setNewAdviserFormContactOptinal]=useState({
        firstnameoptional:'',
        lastnameoptional:'',
        emailoptional:'',
        mobilenumberoptional:'',
    })
    const [optionalContactValidation,setOptionalValidation]=useState({
        firstnameoptional:{valid:''},
        lastnameoptional:{valid:''},
        emailoptional:{valid:''},
        mobilenumberoptional:{valid:''},
    })

    const [newAdviserFormBillingOptional,setNewAdviserFormBillingOptional]=useState({
        address1optional:'',
        address2optional:'',
        cityoptional:'',
        countryoptional:'CA',
        stateoptional:'AB',
        postaloptional:''
    })
    const [optionalAddressValidation,setOptionalAddressValidation]=useState({
         address1optional:{valid:''},
        address2optional:{valid:''},
        cityoptional:{valid:''},
        countryoptional:{valid:''},
        stateoptional:{valid:''},
        postaloptional:{valid:''},
    })


    const dispatch=useDispatch();
    let newAdviserForm=useSelector(state=>{
        return state.formControl.newAdviserForm;
    })
 
   

    
    
    const formChange=(num)=>dispatch(actions.formChange(num));
    const changeNewAdviserForm=(form)=>dispatch(actions.changeNewAdviserForm(form))
    const setForm1Response=(data)=>dispatch(actions.setForm1Response(data));

    
    
    
    
    const cancelEventHandler=()=>{
        formChange(1);
        history.push('/dashboard');
    }
    
    const createAdvertisers=()=>{
        let form={...newAdviserForm};
        let validationCopy={...validation};
        for(let key in form){
            let value=form[key];
            if(value===''){
                
                validationCopy[key].valid='invalid';
                setValidation(validationCopy);
            }
        }
        let navigate=true;
        for(let key in form){
            let value=form[key];
            if(value===''){
                navigate=false;
            }
        }
        let x=document.getElementById('checkOne');
        if(x.style.display===""){
            let form={...newAdviserFormContactOptinal};
            let validationCopy={...optionalContactValidation};
            for(let key in form){
                let value=form[key];
                if(value===''){
                    console.log("key"+key);
                    validationCopy[key].valid='invalid';
                    setOptionalValidation(validationCopy);
                }
            }
            let optionalContactForm={...newAdviserFormContactOptinal};
            for(let key in optionalContactForm){
                let value=optionalContactForm[key];
                if(value===''){
                    navigate=false;
                }
            }
            
        }
        // let y=document.getElementById('checkTwo');
        // if(y.style.display===""){
        //     let form={...newAdviserFormBillingOptional};
        //     let validationCopy={...optionalAddressValidation};
        //     for(let key in form){
        //         let value=form[key];
        //         if(value===''){
        //             console.log("key"+key);
        //             validationCopy[key].valid='invalid';
        //             setOptionalAddressValidation(validationCopy);
        //         }
        //     }
        //     let newAdviserFormBillingOptional={...newAdviserFormBillingOptional};
        //     for(let key in newAdviserFormBillingOptional){
        //         let value=newAdviserFormBillingOptional[key];
        //         if(value===''){
        //             navigate=false;
        //         }
        //     }
            
        // }

       
        
        if(navigate){
            
            let  form={...newAdviserForm}
            let optionalAddressForm={...newAdviserFormBillingOptional}
            let optionalContactForm={...newAdviserFormContactOptinal};
        //     let result={
        //         "companyName":form.companyname,
        //         "industryID": form.industrycategory,
        //         "companyWebsite": form.companywebsiteaddress,
        //         "companyType": "Client",
        //         "contactAddress": {
        //             "business": {
        //                 "address": form.address1,
        //                 "address2": form.address2,
        //                 "city": form.city,
        //                 "postal": form.postal,
        //                 "country": form.country,
        //                 "state": form.state,
        //                 "provinceID": 2
        //             },
        //             "billing": {
        //                 "address": optionalAddressForm.address1optional,
        //                 "address2": optionalAddressForm.address2optional,
        //                 "city": optionalAddressForm.cityoptional,
        //                 "state": optionalAddressForm.stateoptional,
        //                 "postal": optionalAddressForm.postaloptional,
        //                 "country": optionalAddressForm.countryoptional,
        //                 "provinceID": 2
        //             },
        //             "useSame": false
        //         },
        //         "addressType": "Billing",
        //         "firstName": form.firstName,
        //         "lastName": form.lastName,
        //         "email": form.email,
        //         "phone": form.mobilenumber,
        //         "secondaryContact": {
        //             "firstName": optionalContactForm.firstnameoptional,
        //             "lastName": optionalContactForm.lastnameoptional,
        //             "email": optionalContactForm.emailoptional,
        //             "phone": optionalContactForm.mobilenumberoptional
        //         },
        //         "roleCode": "CLIENT",
        //         "createdByPerson": personData.createdByPerson
                
    //     // }
        
        let x=document.getElementById('checkTwo');
        let billing={};
        let useSameCopy=false;
        if(x.style.display===""){
          
            billing={
                
            "address": optionalAddressForm.address1optional,
            "address2": optionalAddressForm.address2optional,
            "city": optionalAddressForm.cityoptional,
            "state": optionalAddressForm.stateoptional,
            "postal": optionalAddressForm.postaloptional,
            "country": optionalAddressForm.countryoptional,
            "provinceID": 2
        }
        
    }
        else{
            
            billing={
                "address": form.address1,
                "address2": form.address2,
                "city": form.city,
                "state": form.state,
                "postal": form.postal,
                "country": form.country,
                "provinceID": 2
            }
            useSameCopy=true;
            

        }
            let result={
                "companyName":form.companyname,
                        "industryID": form.industrycategory,
                        "companyWebsite": form.companywebsiteaddress,
                        "companyType": "Client",
                        "contactAddress": {
                            "business": {
                                "address": form.address1,
                                "address2": form.address2,
                                "city": form.city,
                                "postal": form.postal,
                                "country": form.country,
                                "state": form.state,
                                "provinceID": 2
                            },
                            "billing": billing,
                        "useSame": useSameCopy
                },
                "addressType": "Billing",
                "firstName": form.firstname,
                "lastName": form.lastname,
                "email": form.email,
                "phone": form.mobilenumber,
                "secondaryContact": {
                    "firstName": optionalContactForm.firstnameoptional,
                    "lastName": optionalContactForm.lastnameoptional,
                    "email": optionalContactForm.emailoptional,
                    "phone": optionalContactForm.mobilenumberoptional
                },
                "roleCode": "CLIENT",
    "createdByPerson": personData.createdByPerson
            }
           submitDataHandler(result);
       
        }
    }
    const submitDataHandler=result=>{

        setIsLoading(true)
        createClient(result)
        .then(res=>{
            setForm1Response(res);  
            formChange(2);
            setIsLoading(false)  
        }).catch(err=>{
            alert(err);
            setIsLoading(false)
            
        })
    }
    	const optionalContactChangeHandler=(e)=>{
            e.preventDefault();
            let form={...newAdviserFormContactOptinal}
            let ans=validationHandler(e.target.name,e.target.value);
            if(ans===true){
                let optionalContactValidationCopy=optionalContactValidation;
                optionalContactValidationCopy[e.target.name].valid='';
                setOptionalValidation(optionalContactValidationCopy)    
            }
            else{
                let optionalContactValidationCopy=optionalContactValidation;
                optionalContactValidationCopy[e.target.name].valid='invalid';
                setOptionalValidation(optionalContactValidationCopy) 
            
        }
        form[e.target.name]=e.target.value;
        setNewAdviserFormContactOptinal(form);
    }
    const optionalAddressChangeHandler=(e)=>{
        e.preventDefault();
        let form={...newAdviserFormBillingOptional}
        let ans=validationHandler(e.target.name,e.target.value);
        if(ans===true){
            let optionalAddressValidationCopy=optionalAddressValidation;
            optionalAddressValidationCopy[e.target.name].valid='';
            setOptionalAddressValidation(optionalAddressValidationCopy)    
        }
        else{
            let optionalAddressValidationCopy=optionalAddressValidation;
            optionalAddressValidationCopy[e.target.name].valid='invalid';
            setOptionalAddressValidation(optionalAddressValidationCopy) 
        
    }
    form[e.target.name]=e.target.value;
    setNewAdviserFormBillingOptional(form);
 }

    const canada_postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const us_postalRegex=/^\d{5}(?:[-\s]\d{4})?$/;
    
    const changeHandler=(e)=>{
        let form={...newAdviserForm};
        let ans=validationHandler(e.target.name,e.target.value);

        if(e.target.name==='postal'&& ans){
            let country=newAdviserForm.country;
            if(country==='US'){
                if(!us_postalRegex.test(e.target.value)){
                    ans=false;
                }
            }
            else{
                if(!canada_postalRegex.test(e.target.value)){
                    ans=false;
                }
            }
        }
        
        console.log("ans"+ans);
        if(ans===true){
            let validationCopy=validation;
            validationCopy[e.target.name].valid='';
            setValidation(validationCopy)    
        }
        else{
            let validationCopy=validation;
            validationCopy[e.target.name].valid='invalid';
            setValidation(validationCopy)
        }
         form[e.target.name]=e.target.value;
        changeNewAdviserForm(form);
        
    }
    
    
    
    
    const checkOne=(props)=>{
         let x=document.getElementById('checkOne');
        if (x.style.display === "none") {
            x.style.display = "";
          } else {
            x.style.display = "none";
          }
    }
    
    const checkTwo=(props)=>{
        let x=document.getElementById('checkTwo');
        if (x.style.display === "none") {
            x.style.display = "";
          } else {
            x.style.display = "none";
          }
    }
    let [selectOptionsData,setSelectOptionsData]=useState([]);
    useEffect(()=>{
        setIsLoading(true);
        getCountries()
        .then(res=>{
            setSelectOptionsData(res);
            setIsLoading(false);
        })
       .catch(err=>{
           console.log(err);
           setIsLoading(false);
        })
    },[]);
    
    let [stateOptions,setStateOptions]=useState([]);
    useEffect(()=>{
        let country=newAdviserForm.country;
        
        setIsLoading(true);
        getStates(country)
        .then(res=>{
            setStateOptions(res);
            setIsLoading(false);
        })
       .catch(err=>{
            console.log(err)
            setIsLoading(false);
        })
    },[newAdviserForm.country])

    let [stateOptionalOptions,setStateOptionalOptions]=useState([]);
    useEffect(()=>{
        let country=newAdviserFormBillingOptional.countryoptional;
        
        setIsLoading(true);
        getStates(country)
        .then(res=>{
             setStateOptionalOptions(res);
             setIsLoading(false);
        })
       .catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    },[newAdviserFormBillingOptional.countryoptional])

    const [industryID,setIndustryId]=useState([]);
    useEffect(()=>{
        setIsLoading(true);
        getIndustries()
        .then(res=>{
            let data=res.data;
            let copyData=[];
            for(let x in res.data){
                let obj={
                    code:'',
                    name:''
                };
                obj.code=data[x].id;
                obj.name=data[x].name;
                copyData.push(obj);
                
             }
            setIndustryId(copyData);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
            alert(token)
        })
    },[newAdviserForm.industrycategory])
    
    let inputClassName="form-control form-control-sm";
    return(
        <React.Fragment>
            <BackDrop show={isLoading} ><Spinner/></BackDrop>
            <div className="container mt-4" >
                <div className="row">
                    <div className="col-sm-2"></div>
                    
                    <div className="col-sm-8 form ">
                    <h5 className="mt-2" style={{color:'blue'}}>Add New Advertisers</h5>
                    <form id="form">
                        <div className="form-row mt-4">
                            <div className="col-sm-6" >
                                <InputField elementType='input'   labelClass={labelClass} invalid={validation.companyname.valid} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.companyname} name="companyname" placeholder="Company Name" type="text" label="Company Name" changed={changeHandler}/>
                            </div>
                            <div className="valid-feedback">
                            Looks good!
                            </div> 

                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} invalid={validation.companywebsiteaddress.valid} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.companywebsiteaddress} name="companywebsiteaddress" placeholder="e.g www.abc.com" type="text" label="Comapany Website Address" changed={changeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='select' spanStyle={spanStyle} value={newAdviserForm.industrycategory} invalid={validation.industrycategory.valid} name="industrycategory"  type="select" label="Industry Category" options={industryID} changed={changeHandler}/> 
                            </div>
                            </div>
                            <div className="col-sm-6">
                           
                            </div>
                            <div className="col-sm-12">
                            
                            <div className="staticData  align-items-center"><h5 className="lead p-2">Primary Contact</h5></div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.firstname} name="firstname" invalid={validation.firstname.valid} placeholder="First Name" type="text" label="First Name" changed={changeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.lastname} name="lastname" invalid={validation.lastname.valid}placeholder="Last Name" type="text" label="Last Name" changed={changeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.email} name="email" invalid={validation.email.valid} placeholder="Enter Email" type="text" label="Email" changed={changeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.mobilenumber} name="mobilenumber" invalid={validation.mobilenumber.valid} placeholder="Enter Contact Number" type="text" label="Phone" changed={changeHandler}/> 
                             </div>
                            </div>
                            
                            <div className="col-sm-12">
                            
                            <div className="staticData  pl-4 pt-1"><Label className="form-check-label">
                            <Input type="checkbox" className="form-check-input" value="" onChange={checkOne}/><h5 className="lead ">Secondary Contact (Billing-optional)</h5>
                            </Label></div>
                            </div>
                            {/* Extra field  */}
                            <div className="row p-3 checkbox" id="checkOne" style={{display:'none'}}>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormContactOptinal.firstnameoptional} name="firstnameoptional" invalid={optionalContactValidation.firstnameoptional.valid} placeholder="First Name" type="text" label="First Name" changed={optionalContactChangeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormContactOptinal.lastnameoptional} name="lastnameoptional" invalid={optionalContactValidation.lastnameoptional.valid} placeholder="Last Name" type="text" label="Last Name" changed={optionalContactChangeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormContactOptinal.emailoptional} name="emailoptional" invalid={optionalContactValidation.emailoptional.valid} placeholder="Enter Email" type="text" label="Email" changed={optionalContactChangeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormContactOptinal.mobilenumberoptional} name="mobilenumberoptional" invalid={optionalContactValidation.mobilenumberoptional.valid} placeholder="Enter Contact Number" type="text" label="Phone" changed={optionalContactChangeHandler}/> 
                             </div>
                            </div>
                            </div>
                            
                            <div className="col-sm-12 mt-2">
                            
                            <div className="staticData "><h5 className="lead p-2">Bussiness Address</h5></div>
                            </div>
                            
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.address1} name='address1'  invalid={validation.address1.valid} placeholder=" Enter Address" type="text" label="Address" changed={changeHandler}/> 
                             </div>
                            </div><div className="col-sm-6">

                                
                            <div className="form-group ">
                                 <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.address2} name="address2" invalid={validation.address2.valid} placeholder="Enter Address" type="text" label="Address Line 2" changed={changeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                 <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.city} name="city" invalid={validation.city.valid} placeholder="Enter City" type="text" label="City" changed={changeHandler}/> 
                             </div>
                            </div><div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='select' spanStyle={spanStyle} value={newAdviserForm.country} invalid={validation.country.valid} name="country"  type="select" label="Country" options={selectOptionsData} changed={changeHandler}/> 
                            </div>
                            </div><div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='select'  spanStyle={spanStyle} value={newAdviserForm.state} invalid={validation.state.valid} name="state"  type="select" label="State/Province" options={stateOptions} changed={changeHandler}/> 
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newAdviserForm.postal} name="postal" invalid={validation.postal.valid} placeholder="Enter Postal Code" type="text" label="Postal" changed={changeHandler}/> 
                            </div>
                            </div>
                            <div className="col-sm-12">
                            
                            <div className="staticData  pl-4 pt-1"><Label className="form-check-label ">
                            <Input type="checkbox" className="form-check-input " value="" onChange={checkTwo}/><h5 className="lead ">Billing Address-optional</h5>
                            </Label></div>
                            </div>
                            {/* Extra Field  */}
                            <div className="row p-3 checkbox" id="checkTwo" style={{display:'none'}}>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormBillingOptional.address1optional} name="address1optional" invalid={optionalAddressValidation.address1optional.valid} placeholder=" Enter Address" type="text" label="Address" changed={optionalAddressChangeHandler}/> 
                             </div>
                            </div><div className="col-sm-6">

                                
                            <div className="form-group ">
                                 <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormBillingOptional.address2optional} name="address2optional" invalid={optionalAddressValidation.address1optional.valid} placeholder="Enter Address" type="text" label="Address Line 2" changed={optionalAddressChangeHandler}/> 
                             </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                 <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormBillingOptional.cityoptional} name="cityoptional" invalid={optionalAddressValidation.address1optional.valid}   placeholder="Enter City" type="text" label="City" changed={optionalAddressChangeHandler}/> 
                             </div>
                            </div><div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='select' spanStyle={secondSpanStyle} value={newAdviserFormBillingOptional.countryoptional}  name="countryoptional"  type="select" label="Country" options={selectOptionsData} changed={optionalAddressChangeHandler}/> 
                             </div>
                            </div><div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='select' value={newAdviserFormBillingOptional.stateoptional} spanStyle={secondSpanStyle} name="stateoptional"  type="select" label="State/Province" options={stateOptionalOptions} changed={optionalAddressChangeHandler}/> 
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group ">
                                <InputField elementType='input' labelClass={labelClass} spanStyle={secondSpanStyle} inputClassName={inputClassName} value={newAdviserFormBillingOptional.postaloptional} name="postaloptional" invalid={optionalAddressValidation.address1optional.valid}  placeholder="Enter Postal Code" type="text" label="Postal" changed={optionalAddressChangeHandler}/> 
                            </div>
                            </div>
                            
                            </div>
                            <div className="col-sm-12 mt-2 mb-4 d-flex flex-row-reverse">
                            <div><Button style={{width:'150px'}} className="mr-2" color="secondary" onClick={cancelEventHandler}>Cancel</Button><Button onClick={createAdvertisers} color="primary">Create Advertisers</Button></div>
                            </div>
                        </div>
                        </form>
                    </div>
                    <div className="col-sm-2"></div>
                    
                </div>

            </div>
            
        </React.Fragment>
    );
}

export default Form1;