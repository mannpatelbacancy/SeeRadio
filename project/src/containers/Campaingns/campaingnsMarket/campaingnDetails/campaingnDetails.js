import React, { useEffect,useState   } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import './campaingnDetails.css';
import InputField from '../../../../components/Input/Input';
import {Button} from 'reactstrap';
import { useParams } from 'react-router'
import {getCampaign} from '../../../../components/Api/Api'; 
import Spinner from '../../../../components/Spinner/Spinner';
import BackDrop from '../../../../components/Backdrop/Backdrop';
import Dropzone from '../../../../components/Forms/TestForm/DropZone';
import {Table,Row} from 'reactstrap';
const CampaingnDetails=props=>{
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [campaignData, setCampaignData] = useState({
        advertiser: '',
        orderName: '',
        orderNumber: '',
        salesOrganization: '',
        sescription: '',
        landingWebsiteURL: '',
        distributionBudget: '',
        targetMarket: '',
        industryCategory: '',
        actionRequiredBy: ''
    })
    const [assets, setAssets] = useState({
        scriptFile: null,
        voiceFile: null,
        advertiserAssets: null
    })
    const [forceUpdate, setForceUpdate] = useState(0)
    
    useEffect(()=>{
        
        getCampaign(id)
            .then(res=>{
                setCampaignData({
                    advertiser: res.data.clientCompany.companyName,
                    orderName: res.data.title,
                    orderNumber: res.data.clientCampaignNumber,
                    salesOrganization: res.data.SalesOrgCompany.companyName,
                    description: res.data.title,
                    landingWebsiteURL: res.data.landingpageURL,
                    distributionBudget: res.data.distributionBudget,
                    targetMarket: res.data.targetMarket,
                    industryCategory: res.data.clientCompany.Industry.name,
                    actionRequiredBy: res.data.statusWithPerson.firstName + ' ' + res.data.statusWithPerson.lastName
                })
                let tempAdvertiserAssets, tempScriptFile, tempVoiceFile;
                tempAdvertiserAssets = res.data.CampaignAssets.filter(file => file.type === 'OTHER')
                tempScriptFile = res.data.CampaignAssets.filter(file => file.type === 'SCRIPT')
                tempVoiceFile = res.data.CampaignAssets.filter(file => file.type === 'AUDIO')
                console.log("tempavertiser"+tempAdvertiserAssets);
                setAssets({ advertiserAssets: tempAdvertiserAssets, scriptFile: tempScriptFile, voiceFile: tempVoiceFile });
            })
            .catch(err=>{
                alert("error"+err);
            })
        },[forceUpdate])

        const onChangeHandler = () => {
            setForceUpdate(forceUpdate + 1)
        }

    return(
        <React.Fragment>
            <BackDrop show={isLoading} ><Spinner/></BackDrop>
            <Navbar active="campaingns"/>
            <section className="campingndetails">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-12">
                            <div className="row my-3">
                                <div className="col-lg-3 col-sm-6">
                                    <h6 className="text-secondary d-flex">Advertiser</h6>
                                    <p className="text-dark font-weight-bold">{campaignData.advertiser}</p>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <h6 className="text-secondary d-flex">Order Name</h6>
                                    <p className="text-dark font-weight-bold">{campaignData.orderName}</p>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <h6 className="text-secondary d-flex">Order Number</h6>
                                    <p className="text-dark font-weight-bold">{campaignData.orderNumber}</p>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <h6 className="text-secondary d-flex">Sales Organization</h6>
                                    <p className="text-dark font-weight-bold">{campaignData.salesOrganization}</p>
                                </div>
                                
                                <div className="bg-white rounded shadow-sm col-sm-12 border-bottom py-2">
                                    
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="d-flex">
                                                    <p className="text-secondary mb-1">Status</p>
                                                </div>
                                                <p className="font-weight-light text-black">text</p>
                                            </div>
                                            <div className="col-lg-4 ">
                                                <div className="d-flex">
                                                    <p className="text-secondary mb-1">Action Required By</p>
                                                </div>
                                                <p className="font-weight-light text-black" >{campaignData.actionRequiredBy}</p>
                                            </div>
                                            <div className="col-lg-2 ">
                                                <div className="d-flex">
                                                    <p className="text-secondary mb-1">Next Action Due By</p>
                                                </div>
                                                <p className="font-weight-light text-black" >text</p>
                                            </div>
                                            <div className="col-lg-3 ">
                                            <i class="fa fa-refresh" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                 
                                
                                    <div class="row mb-1">
                                        <div class="col-lg-12">
                                            <h6 class="text-graylight fw-700 border-bottom pb-2 mb-3">Information</h6>
                                            </div>
                                            
                                                <div class="col-xl-4 col-lg-5  border-right">
                                                    <div style={{backgroundColor:'#c6d9eb'}}><h6 class="text-black fw-700 p-2 fs-14 d-flex">Account Manager Assigned
                                                     </h6></div><p class="fw-600 text-black mb-0 p-2 fs-14 d-flex">text</p>
                                                </div>
                                                
                                                <div class="col-xl-4 col-lg-5 ">
                                                    <div style={{backgroundColor:'#c6d9eb'}}><h6 class="text-black fw-700 p-2 fs-14 d-flex">Distribution Partner Company Assigned 
                                                     </h6></div><p class="fw-600 text-black mb-0 p-2 fs-14 d-flex">text</p>
                                                </div>
                                                <div className="col-xl-4 col-lg-2">

                                                </div>

                                                <div class="col-xl-4 col-lg-5  border-right">
                                                    <div style={{backgroundColor:'#c6d9eb'}}><h6 class="text-black fw-700 p-2 fs-14 d-flex">Sales Person Assigned
                                                     </h6></div><p class="fw-600 text-black mb-0 p-2 fs-14 d-flex">text</p>
                                                </div>
                                                
                                                <div class="col-xl-4 col-lg-5 ">
                                                    <div style={{backgroundColor:'#c6d9eb'}}><h6 class="text-black fw-700 p-2 fs-14 d-flex">Graphic Designer Assigned 
                                                     </h6></div><p class="fw-600 text-black mb-0 p-2 fs-14 d-flex">text</p>
                                                </div>
                                                <div className="col-xl-4 col-lg-2">

                                                </div>

                                                <div className="col-lg-12 text-graylight fw-700 border-bottom mt-3">
                                                    <h6>Production Progress</h6>
                                                </div>
                                                <div className="py-3 col-lg-12 col-sm-12 text-center">
                                                        Advertiser Assests Required
                                                </div>

                                                <div className="col-sm-12 col-lg-12">
                                                    <div style={{cursor:'pointer'}}><h6 style={{color:'blue'}}><i class="fa fa-download ml-sm-3 " aria-hidden="true"></i>Download All Assests</h6></div>

                                                </div>
                                                <div className="col-lg-12 col-sm-12">
                                                    <div className="align-items-center" style={{backgroundColor:'#c6d9eb'}}><h5 className="lead p-2">Script File</h5></div>
                                                </div>
                                                <div className="col-sm-12 " style={{ border: '0px solid black', height: '60px' }}>

                                
                                <Dropzone campaignID={id} swapDisplay={true} fileType='SCRIPT' file={assets.scriptFile} accept='.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' maxFiles={1} label='Script File' message='Drag & Drop Your SCRIPT File Here' name="scriptFile" onChange={onChangeHandler} />

                            </div>
                            <hr />
                            <div className="col-sm-12 mt-2">
                                <div className="staticData pl-2" style={{ backgroundColor: '#c6d9eb' }}><h5 className="lead p-1">Voice File</h5></div>
                            </div>
                            <div className="col-sm-12 " style={{ border: '0px solid black', height: '60px' }}>
                            <Dropzone campaignID={id}  swapDisplay={true} fileType='AUDIO' file={assets.voiceFile} accept='audio/*' maxFiles={1} label='Voice File' message='Drag & Drop Your AUDIO File Here' name="voiceFile" onChange={onChangeHandler} />
                            </div>
                            <hr />

                            <div className="col-sm-12 mt-2">
                                <div className="staticData pl-2" style={{ backgroundColor: '#c6d9eb' }}><h5 className="lead p-1">Advertisers Assets</h5></div>
                            </div>
                            <div className="col-sm-12" style={{ border: '0px solid black', height: '60px' }}>
                            <Dropzone campaignID={id} swapDisplay={false} fileType='OTHER' accept='' maxFiles={0} label='Advertiser Assets' message='Drag & Drop Your File Here' name="advertiserAssets" onChange={onChangeHandler} />
                            </div>
                            <div className="col-sm-12 col-lg-12 py-3">
                            <div className=" pl-2" ><h5 className="lead p-1 d-inline" style={{ backgroundColor: '#c6d9eb' }}>Advertisers Assets List</h5></div>   
                            </div>  


                          <div className="col-sm-12 col-12 col-lg-12">  
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
                                    
                                    assets.advertiserAssets !== null && assets.advertiserAssets.map(file => {
                                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "July", "Aug", "Sep", "Oct", "Nov", "Dec"
                                        ];
                                        var fromDate = new Date(file.updatedAt);
                                        return <tr key={file.id}>
                                            <td md={4}>{file.assetOrignalName}</td>
                                            <td md={3}>{file.uploadedByPerson.firstName + ' ' + file.uploadedByPerson.lastName}</td>
                                            <td md={3}>{fromDate.getDate() + '-' + monthNames[fromDate.getMonth()] + '-' + fromDate.getFullYear()}</td>
                                            <td md={2}><Button onClick={() => window.open(file.assetUrl, '_blank')} type="submit">Download</Button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                        </div>
                    
                     <div className="col-sm-12 col-lg-12 pt-3">
                                <div className="border-bottom"><h6>Order</h6></div>
                            </div>
                            <div className="col-sm-12 col-lg-12 pt-1">
                                <div className="text-dark"><h5>Description</h5></div>
                            </div>
                            <div className="col-sm-12 col-lg-12 pt-1">
                                <div className="text-normal"><h5>{campaignData.description}</h5></div>
                            </div> 
                            
                            <div className="col-sm-4 col-lg-4 pt-1">
                                <div className="text-dark"><h5>Prefered Landing Website Url</h5></div>
                                <p className="cursor-pointer " style={{cursor:'pointer'}}>{campaignData.landingWebsiteURL}</p>
                            </div>
                            
                            <div className="col-sm-4 col-lg-4 pt-1">
                                <div className="text-dark"><h5>Distribution Budget</h5></div>
                                <p>{campaignData.distributionBudget}</p>
                            </div>       
                            <div class="w-100"></div>
                            
                            <div className="col-sm-4 col-lg-4 pt-1">
                                <div className="text-dark"><h5>Target Market</h5></div>
                                <p>{campaignData.targetMarket}</p>
                            </div>    
                            
                            <div className="col-sm-4 col-lg-4 pt-1">
                                <div className="text-dark"><h5>Industry Category</h5></div>
                                <p>{campaignData.industryCategory}</p>
                            </div> 
                            <div className="col-sm-4 col-lg-4 pt-1">
                                <div className="text-dark"><h5>Order Dates</h5></div>
                                <p>Not Selected</p>
                            </div> 
                            
                            
                            
                            
                            </div>         
                                                                                    
                                    
                                </div>

                            <div className="col-sm-3 col-lg-3">
                                    <Button color="primary">Download All Assets</Button>
                            </div>
                            <div className="col-sm-2 col-lg-2 offset-lg-5">
                                 <Button color="primary  w-75">Edit</Button>
                            </div>
                            <div className="col-sm-2 col-lg-2 ">
                                 <Button color="primary  w-75" outline>Back</Button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    );
}


export default CampaingnDetails;