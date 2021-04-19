import React, { useContext} from 'react';
import './App.css';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import Order from './containers/Order/Order';
import { Route, Switch} from 'react-router-dom';
import ForgetPassword from './containers/ForgetPassword/ForgetPassword';
import VideoProduction from './containers/Campaingns/videoProduction/videoProduction';
import CampaingnDetails from './containers/Campaingns/campaingnsMarket/campaingnDetails/campaingnDetails';
import TestData from './test';
import ChangePassword from './containers/ForgetPassword/ForgetPassword';
import {AuthContext} from './auth-context';
function App() {

  const authContext=useContext(AuthContext);

  let routes='';
        // <Switch>
        //   <Route path="/login" component={Login}/>
        //   <Route path="/campaingndetails" component={CampaingnDetails}/>
        //     <Route path="/" component={Login}/>
        //  </Switch>
  
  
  // if(authContext.isAuth){
    
  //   routes= <Switch>
  //           <Route path="/changepassword" component={ChangePassword}/>
  //           <Route path="/test" component={TestData}/>
  //           <Route path="/campaingndetails/:id" component={CampaingnDetails}/>
  //           <Route path="/videosproduction" component={VideoProduction}/>
  //           <Route path="/forgetpassword" component={ForgetPassword}/>
  //           <Route path="/order" component={Order}/>      
  //           <Route path="/dashboard" component={Dashboard}/>
  //           <Route path="/login" component={Login}/>
  //           <Route path="/" component={Login}/>
  // </Switch>;
  // }
  // else{
    
  // }

  return (
    <div className="App">
      <Switch>
            <Route path="/changepassword" component={ChangePassword}/>
            <Route path="/test" component={TestData}/>
            <Route path="/campaingndetails/:id" component={CampaingnDetails}/>
            <Route path="/videosproduction" component={VideoProduction}/>
            <Route path="/forgetpassword" component={ForgetPassword}/>
            <Route path="/order" component={Order}/>      
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Login}/>
  </Switch>
    </div>
  );
}

export default App;
