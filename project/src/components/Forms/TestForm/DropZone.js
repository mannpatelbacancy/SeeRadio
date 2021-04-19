import React, {useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Col, Row } from 'reactstrap';
import './DropZone.css';
import Spinner from '../../Spinner/Spinner';
import BackDrop from '../../Backdrop/Backdrop';
import {useSelector} from 'react-redux';
import {getPersonById} from '../../Api/Api';
import {uploadFile} from '../../Api/Api';

const style = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const Dropzone = (props) => {

    const [isLoading, setIsLoading] = useState(false)
  
    let personData=useSelector(state=>{
        return state.auth.personData;
    })
    const [personName, setPersonName] = useState()

    
    
    
    
    let id=localStorage.getItem('campaingId');
    
    
        let formData = new FormData()
      
        formData.append('type', props.fileType)
        formData.append('uploadedBy', personData.id)
        if(props.campaignID){
            formData.append('campaignID', props.campaignID)
        } else {
            formData.append('campaignID', id)
        }
         const onDrop = (acceptedFiles) => {
        
        if(props.fileType==="OTHER"){
            
            for(let f in acceptedFiles){
                
                formData.append('file',acceptedFiles[f]);
            }
        }
        else{
            
            formData.append('file', acceptedFiles[0]);
        }
        
        
    setIsLoading(true)
    uploadFile(formData)
       .then(res => {
           props.onChange(res.data, props.name)
           alert('fileupload Successfully')
           setIsLoading(false);
       })
       .catch(res => {
           console.log(res)
            setIsLoading(false)
        });
        
            
        
    }

    

    
    let { getRootProps, getInputProps, open,acceptedFiles} = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: props.maxFiles,
        accept: props.accept,
        onDrop
    });

      let dropzone
      if (props.file && props.file.length !== 0 && props.swapDisplay && props.swapDisplay === true) {
          var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "July", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          var fromDate = new Date(props.file[0].updatedAt);
        
        getPersonById(props.file[0].uploadedBy)  
       .then(res => {
           let tempPersonName = res.data.person.firstName + ' ' + res.data.person.lastName
           setPersonName(tempPersonName)
       })
       .catch(res => {
           
           console.log(res);
       })
          
          dropzone = <>
              <BackDrop show={isLoading} ><Spinner/></BackDrop>
              <Row>
                  <Col md={1}>
                      <i class="fa-file fa fa-3x  text-primary mr-3"></i>
                  </Col>
                  <Col md={11}>
                      <Row>
                          <Col>
                              <div>
                                  <div className='heading'>File Name</div>
                                  <div>{props.file[0].assetOrignalName.substring(0, 25) + `${props.file[0].assetOrignalName.length > 25 ? '...' : ''}`}</div>
                              </div>
                          </Col>
                          <Col>
                              <div>
                                  <div className='heading'>File Uploaded By</div>
                                  <div>{personName}</div>
                              </div>
                          </Col>
                          <Col>
                              <div>
                                  <div className='heading'>Upload Date</div>
                                  <div>{fromDate.getDate() + '-' + monthNames[fromDate.getMonth()] + '-' + fromDate.getFullYear()}</div>
                              </div>
                          </Col>
                      </Row>
                  </Col>
              </Row>
          </>
      } else {
          dropzone = <>
          <BackDrop show={isLoading} ><Spinner/></BackDrop>
              <Row>
                <Col {...getRootProps({ refKey: 'innerref', style, className: 'dropzone' })} md={6}>
                    <input {...getInputProps()} name={props.name} />
                    {props.message}
                </Col>
                <Col md={1} className='orColumn'>
                    Or
            </Col>
                <Col md={5}>
                    <Button className='uploadButton' onClick={open}>Upload</Button>
                </Col>
            </Row>
          </>
      }
      return dropzone;
}

export default Dropzone;