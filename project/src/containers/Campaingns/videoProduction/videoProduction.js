import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import {Button} from 'reactstrap';
import { PaginationTable } from './Table/table'
const VideoProduction=props=>{
    return(
        <React.Fragment>
            <Navbar active="campaingns"/>
            <div className='mx-4 videosTable'>
                <div className='row my-3'>
                    <div className='col-md-4'>
                        <Button className='filterButton'><i class="fa fa-filter mr-2"></i>Search Filters</Button>
                    </div>
                    <div className='col-md-4  text-center'>
                        <span className='videosInProductionTitle' ><h4>Videos In Production</h4></span>
                    </div>
                </div>
                <PaginationTable />
            </div>
        </React.Fragment>
    );
}

export default VideoProduction;