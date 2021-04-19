import React,{useState,useEffect} from 'react';
import { Button } from 'reactstrap';
import * as actions from '../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory} from 'react-router';
import './TestForm.css';
import {Row,Col,Table} from 'reactstrap';
import Dropzone from './DropZone'; 
import {getPersonById} from '../../Api/Api';
import Spinner from '../../Spinner/Spinner';
import BackDrop from '../../Backdrop/Backdrop';

const TestForm = props => {

    let history=useHistory();
    const dispatch=useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const formChange=(num)=>dispatch(actions.formChange(num));
    const setTestForm=(testForm)=>dispatch(actions.setTestForm(testForm));

    const cancelEventHandler=()=>{

        formChange(1);
        history.push('/dashboard');
    }
    const backFormHadler=()=>{
        formChange(2);
    }
    const createOrderHandler=()=>{
        formChange(1);
        history.push('/dashboard');
    } 
    
    
    let TestForm=useSelector(state=>{
        return state.formControl.TestForm;
    })

    const onChangeHandler = (acceptedFile, name) => {
        
        let tempdata ={...TestForm};

        
        if(name==='advertiserAssets' && tempdata.advertiserAssets.value!==null){
            
            console.log("datasas"+JSON.stringify( tempdata['advertiserAssets'].value));
            
            tempdata['advertiserAssets'].value=tempdata['advertiserAssets'].value.concat(acceptedFile)
            tempdata['advertiserAssets'].valid=true;
                        
            setTestForm(tempdata)
        }
        else{
            
            if(name==="scriptFile"){
            tempdata['scriptFile'].value=acceptedFile;
            tempdata['scriptFile'].valid=true;
            setTestForm(tempdata)
            }
            else if(name==="voiceFile"){
                tempdata['voiceFile'].value=acceptedFile;
                tempdata['voiceFile'].valid=true;
                setTestForm(tempdata)
            }
            else if(name==="advertiserAssets"){
                tempdata['advertiserAssets'].value=acceptedFile;
                tempdata['advertiserAssets'].valid=true;
                setTestForm(tempdata)
            }
            

        }
    }
    let forms={...TestForm}
    const [personName, setPersonName] = useState()

    useEffect(() => {
        if (forms.advertiserAssets.value !== null) {

            forms.advertiserAssets.value.forEach((file) => {
                        setIsLoading(true);
                        getPersonById(file.uploadedBy)
                        .then(res => {
                         
                            let tempPersonName = res.data.person.firstName + ' ' + res.data.person.lastName
                            setPersonName(tempPersonName)
                            setIsLoading(false)
                        })
                        .catch(res => {
                            console.log(res);
                            setIsLoading(false);
                        })

                
            })

        }
    }, [forms.advertiserAssets.value]);
    
    let form ={...TestForm};
    let table = <>
        <Row>
            <Col className='backgroundGrey my-3'>
                Advertiser Assets
            </Col>
        </Row>
        <Row>
            <Table className='responsive-table striped'>
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>File Uploaded By</th>
                        <th>File Uploaded Date</th>
                        <th>Download</th>
                    </tr>
                </thead>
               
                <tbody>
                    {
                        form.advertiserAssets.value !== null && form.advertiserAssets.value.map(file => {
                            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "July", "Aug", "Sep", "Oct", "Nov", "Dec"
                            ];
                            var fromDate = new Date(file.updatedAt);
                            return <tr key={file.id}>
                                <td md={4}>{file.assetOrignalName}</td>
                                <td md={3}>{personName}</td>
                                <td md={3}>{fromDate.getDate() + '-' + monthNames[fromDate.getMonth()] + '-' + fromDate.getFullYear()}</td>
                                <td md={2}><a href={file.assetUrl} target="_blank" download={file.assetOrignalName}  style={{ color: 'red' }}><Button color="danger" outline>Download</Button></a></td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Row>
    </>
    
      
    return (
        <React.Fragment>
          <BackDrop show={isLoading} ><Spinner/></BackDrop>
            <div className="container mt-4 overflow-hidden" >
                <div className="row">

                    <div className="col-sm-2"></div>
                    <div className="col-sm-8 form">
                        <h5 className="mt-2" style={{ color: 'grey' }}>Test</h5>
                        <div className="row g-5">
                             <div className="col-sm-12 mt-2">
                                <div className="staticData pl-2" style={{ backgroundColor: '#c6d9eb' }}><h5 className="lead p-1">Script File</h5></div>
                            </div>
                             <div className="col-sm-12 " style={{ height: '70px' }}>
                                     <Dropzone  fileType='SCRIPT' swapDisplay={true}  accept='.doc,.docx,.xml,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' maxFiles={1} label='Script File' message='Drag & Drop Your SCRIPT File Here' name="scriptFile" file={TestForm.scriptFile.value} onChange={onChangeHandler}  />
                             </div> 
                            <hr />
                            <div className="col-sm-12 mt-2">
                                <div className="staticData pl-2" style={{ backgroundColor: '#c6d9eb' }}><h5 className="lead p-1">Voice File</h5></div>
                            </div>
                            <div className="col-sm-12 " style={{ height: '70px' }}>
                                     <Dropzone fileType='AUDIO' swapDisplay={true} accept='audio/*' maxFiles={1} label='Voice File' message='Drag & Drop Your AUDIO File Here' name="voiceFile" file={TestForm.voiceFile.value} onChange={onChangeHandler} />
                             </div>
                             
                            <div className="col-sm-12 mt-2">
                                <div className="staticData pl-2" style={{ backgroundColor: '#c6d9eb' }}><h5 className="lead p-1">Advertisers Assets</h5></div>
                            </div>
                            
                            <div className="col-sm-12 " style={{ height: '70px' }}>
                                    <Dropzone fileType='OTHER' swapDisplay={false} accept='' maxFiles={0} label='Advertiser Assets' message='Drag & Drop Your File Here' name="advertiserAssets" file={TestForm.advertiserAssets.value} onChange={onChangeHandler} />
                             </div> 
                             
                            <div className="col-sm-12 ">
                            {table} 
                             </div>

                            
        
                            {/* Last three buttons */}
                            <div className="col-sm-6 mt-2">
                                <div><Button style={{width:'100px'}} className="mr-2" color="primary" onClick={backFormHadler}>Back</Button></div>
                            </div>
                            <div className="col-sm-6 mt-2 mb-4 d-flex flex-row-reverse">
                                <div><Button style={{width:'100px'}} className="mr-2" color="secondary" onClick={cancelEventHandler}>Cancel</Button>
                                <Button style={{ width: '100px' }} color="primary" onClick={createOrderHandler}>Done</Button></div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

export default TestForm;
