import React from 'react';
import { Link } from 'react-router-dom';
import {  Button} from 'reactstrap';
import Logo from '../../assets/images/logo.png';
import './Navbar.css';
import Spinner from '../Spinner/Spinner';
import {useDispatch,useSelector} from 'react-redux';
const Navbar=props=>{
    
   
    let personData=useSelector(state=>{
        return state.auth.personData;
    })

    let data=personData?personData:<Spinner/>

    return(
        
        <React.Fragment>
            
            <div className="container-fluid px-lg-4 p-2">
            <div className="d-flex flex-column flex-sm-row ">
                <Link to="/dashboard"><img src={Logo} alt="logo"/></Link>
                 <nav className="navbar ml-sm-auto pb-1 mt-n2 navbar-expand-sm">
                        
                        <ul className="navbar-nav w-100 nav p-1">
                            
                            <li className="cursor-pointer  nav-item">

                            <div className="">
                                <span aria-expanded="false" data-toggle="dropdown" aria-haspopup="true" className="d-flex align-items-center">
                                
                                <Link to="/notifications"><div className="mr-4 fw-600 "><i className="fas fa-bell fa-2x bell"><span className="dot "></span></i></div></Link>
                                
                                <div className="d-flex flex-column align-items-center dropdown ">
                                    <div className="text-white fw-700 cursor-pointer bg-primary dropdown-toggle rounded-circle circle text-center d-flex align-items-center pl-1" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">ST</div> 
                                    <i className="fa fa-chevron-down"></i></div>
                                    <div className="ml-2 fw-600 "><p className="mb-0  fs-12 text-primary">SOA</p>
                                    <p className="mb-0  fs-12 text-dark">mannsoa@mailinator.com</p></div></span>
                                    <div  className="dropdown-menu shadow border-0 dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button type="button"   className="p-0 dropdown-item"><a className="link text-dark d-block py-2 px-3" href="/profile"><i className="fa text-primary fa-user mr-2 dropdown-icon"></i> Profile</a></button>
                                        <button type="button"   className="p-0 dropdown-item"><Link className="link text-dark d-block py-2 px-3" to="/changepassword"><i className="fa text-primary fa-lock mr-2 dropdown-icon"></i>Change Password</Link></button>
                                        <button type="button"  className="p-0 dropdown-item"><a className="link text-danger d-block py-2 px-3 " href="/login"><i className="fa text-danger fa-sign-out-alt mr-2"></i> Sign Out</a></button>
                                    </div>
                                    </div>
                                
                            </li>
                            </ul>
                        </nav>
                   
            </div>
        </div>   
         
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </Button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav w-100 nav p-1">
            
                <li className="nav-item">
                <Link to="/dashboard"><Button color="primary"  className={props.active==='dashboard'?'active':null}><i className="fa fa-tachometer-alt mr-2 text-white"></i>Dashboard</Button></Link>
                </li>

                <li className="nav-item md-4">
                <div className="dropdown">
                     <Button color="primary" className={`btn btn-primary dropdown-toggle ${props.active==='campaingns'?'active':null}`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <i className="fa fa-tint">Campaingns</i>
                    </Button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" to="/videosproduction">Videos in Production</Link>
                        <Link className="dropdown-item" to="/campaignsmarket">Campagins in Market</Link>
                        <Link className="dropdown-item" to="/completedcampaigns">Completed Camagins</Link>
                    </div>
                </div>
                </li>
                
                
                <li className="nav-item">
                <Button color="primary" ><i className="fa fa-id-card">Advertisers</i></Button>
                </li>
                </ul> 
                <div className="nav-item  ml-auto">
                <Link to="/order"><Button className={props.active==='order'?'active':null} color="primary" ><i className="fa fa-id-card"></i>orders</Button></Link>  
                </div>
                
            
            </div>
            </nav> 
            
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary primary-color">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

 
            <div className="collapse navbar-collapse" id="basicExampleNav">

      
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">Dashboard
            
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Features</Link>
          </li>
        
          <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">Dropdown 1</Link>
              <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink1">
                <Link className="dropdown-item" to="#">Action</Link>
                <Link className="dropdown-item" to="#">Another action</Link>
                <Link className="dropdown-item" to="#">Something else here</Link>
              </div>
            </li>

          
        </ul>
     
            </div>
    </nav>
     */}
         
            {/* </header> */}
        </React.Fragment>
    );
}

export default Navbar;