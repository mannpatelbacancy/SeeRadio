import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import FromControlReducer from './store/reducers/FormControl';
import AuthReducer from './store/reducers/auth';
import AuthContextProvider, { AuthContext } from './auth-context';

const composeEnhancers = process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;
const rootReducers=combineReducers({
    formControl:FromControlReducer,
    auth:AuthReducer
})
const store=createStore(rootReducers,composeEnhancers(
    applyMiddleware(thunk)
));


const app=(
  
  <Provider store={store}>
    <AuthContextProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </AuthContextProvider>
  </Provider>
);

ReactDOM.render(app,document.getElementById('root'));
