import React,{useState,useEffect} from 'react';
import InputField from '../../Input/Input';
import { Button} from 'reactstrap';
import * as actions from '../../../store/actions/index';
import {useDispatch,useSelector} from 'react-redux';
import {validationHandler} from '../../Validation/Validation';
import Spinner from '../../Spinner/Spinner';
import BackDrop from '../../Backdrop/Backdrop';
import {getClients} from '../../Api/Api';
import {getMarkets} from '../../Api/Api';
import {createCampaign} from '../../Api/Api';
const NewOrderForm=props=>{

  
    const [isLoading, setIsLoading] = useState(false)
    const formChange=(num)=>dispatch(actions.formChange(num));
    const changeNewOrderForm=(form)=>dispatch(actions.changeNewOrderForm(form))
    
    const dispatch=useDispatch();
    let newOrderForm=useSelector(state=>{
        return state.formControl.newOrderForm;
    })
    let form1Response=useSelector(state=>{
        return state.formControl.form1Response;
    })
   
    const [validation,setValidation]=useState({
        industrycategoryorderform: {valid: ''},
        title: {valid: ''},
        landingpage: {valid: ''},
        price: {valid: ''},
        description: {valid: ''},
        targetmarket: {valid: ''},
        budget: {valid: ''},
    })
    
    
    
    const cancelEventHandler=()=>{
        formChange(1);
    }
    const createOrderHandler=()=>{
        let form={...newOrderForm};
        let validationCopy={...validation};
        for(let key in form){
            let value=form[key];
            if(value===''){
                console.log("key"+key);
                validationCopy[key].valid='invalid';
                setValidation(validationCopy);
            }
        }
        let navigate=true;
        for(let key in form){
            let value=form[key];
            if(value===''){
                console.log("key"+key)
                navigate=false;
            }
        }
        if(navigate){
          submitDataHandler();
        }

        
    }

    const submitDataHandler=()=>{

        let form={...newOrderForm}
        
        let campaignData = {
            "clientCompanyID": form.industrycategoryorderform,
            "title": form.title,
            "description": form.description,
            "landingpageURL": form.landingpage,
            "targetMarket": form.targetmarket,
            "distributionBudget": form.budget,
            "startDate": "04/22/2021",
            "price": form.price,
             "soaID": form1Response.salesOrgCompany.soaID,
             "sosID": form1Response.salesOrgCompany.sosID,
             "salesOrgCompanyID": form1Response.salesOrgCompany.parentSalesOrgCompanyID,
             "statusByPersonID": form1Response.person.createdByPerson,
             "statusWithPersonID": form1Response.salesOrgCompany.clientPersonID
        }
        
        setIsLoading(true);
        createCampaign(campaignData)
            .then(res => {
                alert("Form Submitted Successfully!!")
                localStorage.setItem('campaingId',res.history.campaignID);
                formChange(3);
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false)
            })
    }

    const changeHandler=(e)=>{
        let form={...newOrderForm};
        let ans=validationHandler(e.target.name,e.target.value);
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
        changeNewOrderForm(form);
    }


    let labelClass="text-black font-weight-bold fw-700 fs-14 mb-0";
   
    let spanStyle={
        color:'red',
        fontSize:'17px'
    }
    let inputClassName="form-control form-control-sm";
    
    let [advertiser,setAdvertiser]=useState([]);
    useEffect(()=>{
        setIsLoading(true)
        getClients()
        .then(res=>{
            let data=res.data;
            let copyData=[];
           for( let x in res.data){
                let obj={
                    code:'',
                    name:''
                };
                obj.code=data[x].id;
                obj.name=data[x].companyName;
                copyData.push(obj);
                
            }
        
            setAdvertiser(copyData);
            setIsLoading(false)
        })
       .catch(err=>{
            console.log(err)
            setIsLoading(false)
        })
    },[newOrderForm.advertiser])

    let [market,setMarket]=useState([]);
    useEffect(()=>{
        setIsLoading(true)
        getMarkets()
        .then(res=>{
           
            let data=res.data;
            let copyData=[];
            for( let x in res.data){
                
                let obj={
                    code:'',
                    name:''
                };
                obj.code=data[x].id;
                obj.name=data[x].name;
                copyData.push(obj);
                
             }
             setMarket(copyData);
             setIsLoading(false)
        })
       .catch(err=>{
            console.log(err)
            setIsLoading(false) 
        })
    },[])

    
    
    return(
        <React.Fragment>
          <BackDrop show={isLoading} ><Spinner/></BackDrop>
            
              <div className="container mt-4" >
        <div className="row">
    <div className="col-sm-2"></div>
    <div className="col-sm-8 form ">
    <h5 className="mt-2" style={{color:'blue'}}>Add New Orders</h5>
        <div className="row mt-4">
            <div className="col-sm-12 mt-2">
                <div className="staticData pl-2" style={{backgroundColor:'#c6d9eb'}}><h5 className="lead p-1">Orders</h5></div>
            </div>
            <div className="col-sm-6 ">
                <InputField elementType='select'  spanStyle={spanStyle} value={newOrderForm.industrycategoryorderform} name="industrycategoryorderform"  type="select" label="Advertiser" options={advertiser} changed={changeHandler}/> 
            </div>
            <div className="col-sm-6">
                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newOrderForm.title} invalid={validation.title.valid} name="title" placeholder="Title" type="text" label="Title" changed={changeHandler}/> 
            </div>
            <div className="col-sm-6">
                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newOrderForm.landingpage} invalid={validation.landingpage.valid} name="landingpage" placeholder="www.testbacancy.com" type="text" label="Preferred Landing Page URL" changed={changeHandler}/> 
            </div>
            <div className="col-sm-6">
                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newOrderForm.price}  invalid={validation.price.valid} name="price" placeholder="Price" type="text" label="Price" changed={changeHandler}/> 
            </div>
             <div className="col-sm-6">
                <InputField elementType='textarea' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newOrderForm.description} invalid={validation.description.valid} name="description" placeholder="Description" type="textarea" label="Description" changed={changeHandler}/> 
             </div>
            <div className="col-sm-12 mt-2">
                <div className="staticData pl-2" style={{backgroundColor:'#c6d9eb'}}><h5 className="lead p-1">Distribution</h5></div>
            </div>
            <div className="col-sm-6">
                 <InputField elementType='select'  spanStyle={spanStyle} value={newOrderForm.targetmarket} invalid={validation.targetmarket.valid} name="targetmarket"  type="select" label="Target Market" options={market} changed={changeHandler}/> 
            </div>
            <div className="col-sm-6">
                <InputField elementType='input' labelClass={labelClass} spanStyle={spanStyle} inputClassName={inputClassName} value={newOrderForm.budget} invalid={validation.budget.valid} name="budget" placeholder="$0" type="text" label="Budget" changed={changeHandler}/> 
             </div>
            <div className="col-sm-12 mt-2 mb-4 d-flex flex-row-reverse">
            <div><Button style={{width:'150px'}} className="mr-2" color="secondary" onClick={cancelEventHandler}>Cancel</Button><Button style={{width:'150px'}} color="primary" onClick={createOrderHandler}>Create Order</Button></div>
            </div>

        </div>
    </div>
    </div>
    </div>         
      
        </React.Fragment>
    );
}

export default NewOrderForm;