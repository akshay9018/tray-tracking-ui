
import {post} from '../../services/httpService';
import { LOADING, CLEAR_INCART_FILTERS, CLEAR_UNIT_DELIVERY_FILTER } from './Types';

export const logOut = (history) => {
    return (dispatch) => {
        dispatch({type:LOADING, flag:true})
        return post({
            url:'/traytracking/doLogout',
            mock: false
        }).then((response)=>{   
            dispatch({type:LOADING, flag:false})
            dispatch({type: CLEAR_INCART_FILTERS})
            dispatch({type:CLEAR_UNIT_DELIVERY_FILTER})
            sessionStorage.removeItem("jwtToken");
            sessionStorage.removeItem("name")    
            dispatch({type:"LOGOUT"});
            history.push('/login');
        }).catch((e)=>{
            dispatch({type:LOADING, flag:false})
            console.log("Error while trying to log out.");
        })       
    }
}
export const signIn = (data,history) => {
    return (dispatch) => {
        dispatch({type:LOADING, flag:true})
        return post({
            url:'/traytracking/doLogin',
            data: data
        }).then(function(response){
            loginSuccess(response,history)(dispatch);
        }).catch((e)=>{
            loginSuccess(false,history)(dispatch);
        })       
    }
}

export const loginSuccess = (response,history) => ( dispatch) =>{  
   /* if(sessionStorage.getItem('theme') === null){
        sessionStorage.setItem('theme', 'LightMode')
    }*/ 
    if(!!response){
        sessionStorage.setItem("jwtToken", response.data.accessToken);
        sessionStorage.setItem("facilityName", response.data.facilityName);
		sessionStorage.setItem("name", response.data.name);
        dispatch({type:"LOGIN_SUCCESS", data:response.data})
    } else {
        sessionStorage.setItem("jwtToken", 'response.data.accessToken');
        sessionStorage.setItem("facilityName", 'response.data.facilityName');
		sessionStorage.setItem("name", 'response.data.name');
        dispatch({type:"LOGIN_SUCCESS"})
    }
    history.push('/trayEvents')
    dispatch({type:LOADING, flag:false})
} 