import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
const Dashboard=props=>{
    return(
        <React.Fragment>
            <Navbar active="dashboard"/>
            <div className="dashboard">
                
            <br/>
            <div className="container">
                <div className="row">
                <br/><h4 className="ml-5">To Do List</h4>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-12" style={{backgroundColor:'white'}}>
                        There are no task remaining...
                    </div>
                </div><br/><br/>
                <div className="row">
                    <div className="col-sm-5 col-12" style={{backgroundColor:'white'}}>
                            Video Status
                    </div>
                    <div className="col-sm-2 col-12">

                    </div>
                    <div className="col-sm-5 col-12" style={{backgroundColor:'white'}}>
                        Campain Reports
                    </div>
                </div>
            </div>
            </div>
        
        </React.Fragment>
    );
}

export default Dashboard;