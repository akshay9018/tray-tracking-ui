import {
    UNSELECT_MEAL_ORDER,
    LOADING_SCREEN,
    MARK_ERROR_ON_ACKNOWLEDGMENT,
    FETCH_ALERT_MEAL_ORDER_DETAILS,
    CLOSE_TRAY_ALERT,
    UNDO_ON_HOLD,
    UPDATE_ALERTS,
} from './Types';
import { get, post } from '../../services/httpService';

export const fetchTrayAlertDetails = (mealOrder) => {
    return (dispatch) => {
        dispatch({ type: LOADING_SCREEN, loadingAlert: true })
        return get({
            url: '/traytracking/fetchTrayAlertAndUpdatedDetails?mealOrderId=' + mealOrder.id
        }).then((response) => {
            dispatch({ type: FETCH_ALERT_MEAL_ORDER_DETAILS, alertList: response.data })
            dispatch({ type: LOADING_SCREEN, loadingAlert: false })
        }).catch((e) => {
            var alertList = [{"mealOrderId":11430,"id":141,"alertType":"ALERT_PATIENT","acknowledgementType":null,"acknowledgedOn":null,"acknowledgedBy":null,"oldDetails":{"zone":null,"unitName":null,"roomName":null,"bedName":null,"kitchenId":null,"unitId":null,"bedId":null,"diet":"Reg/Pureed Meats, Six Small Meals, Thick Fluids-Honey","allergies":"e, rr, testing is completed from testing is completed from ","supplements":"e, rr, testing is completed from testing is completed from ","tubeFeeding":"eerrr, tete e, rr, testing is completed from testing is completed from ","instructions":"e, rr, testing is completed from testing is completed from ","preferences":"e, rr, testing is completed from testing is completed from ","textureId":343,"specialDiets":"Six Small Meals, Thick Fluids-Honey","notes":"e, rr, testing is completed from testing is completed from "},"newDetails":{"zone":null,"unitName":null,"roomName":null,"bedName":null,"kitchenId":null,"unitId":null,"bedId":null,"diet":"Reg/Pureed Meats, 1800 - 2000 kcal 1800 - 2000 kcal 1800 - 2000 kcal, Six Small Meals, Thick Fluids-Honey","allergies":"e, rr, testing is completed from testing is completed from ","supplements":"e, rr, testing is completed from testing is completed from ","tubeFeeding":"eerrr, testint gitnsdj asdgfsaydfgiusf ligfdoy8fwgidyAO8YDGIAFGYS , tete","instructions":"e, rr, testing is completed from testing is completed from ","preferences":"sdfasf vsfdfgsdgd gegwegdf grerwgdsfb sdfgsdcgsd","textureId":343,"specialDiets":"1800 - 2000 kcal 1800 - 2000 kcal 1800 - 2000 kcal, Six Small Meals, Thick Fluids-Honey","notes":null},"eventTime":null,"patientAlert":true,"transferAlert":false,"dischargeAlert":false},{"mealOrderId":11430,"id":140,"alertType":"ALERT_PATIENT_NOTE","acknowledgementType":null,"acknowledgedOn":null,"acknowledgedBy":null,"oldDetails":{"zone":null,"unitName":null,"roomName":null,"bedName":null,"kitchenId":null,"unitId":null,"bedId":null,"diet":"--, Six Small Meals, Thick Fluids-Honey","allergies":"","supplements":"e","tubeFeeding":"eerrr, tete","instructions":"","preferences":"","textureId":343,"specialDiets":"Six Small Meals, Thick Fluids-Honey","notes":null},"newDetails":{"zone":null,"unitName":null,"roomName":null,"bedName":null,"kitchenId":null,"unitId":null,"bedId":null,"diet":"--","allergies":"","supplements":"e, rr, testing is completed from testing is completed from ","tubeFeeding":"eerrr, testint gitnsdj asdgfsaydfgiusf ligfdoy8fwgidyAO8YDGIAFGYS , tete","instructions":"e, rr, testing is completed from testing is completed from ","preferences":"sdfasf vsfdfgsdgd gegwegdf grerwgdsfb sdfgsdcgsd","textureId":343,"specialDiets":null,"notes":"e, rr, testing is completed from testing is completed from "},"eventTime":null,"patientAlert":true,"transferAlert":false,"dischargeAlert":false}]

            console.log("Error while fetching tray trayAlert details: " + e)
            dispatch({ type: LOADING_SCREEN, loadingAlert: false })
            dispatch({ type: FETCH_ALERT_MEAL_ORDER_DETAILS, alertList })
            
        })
    }
}
export const acknowledgeAlert = (screenName, mealOrder, trayAlerts, acknowledgementType, searchText) => {
    return (dispatch) => {
        var trayAlertId = trayAlerts[0].id
        var totalAlerts = trayAlerts.length - 1; //remaining alerts after this
        
        dispatch({ type: LOADING_SCREEN, loadingAlert: true })
        return post({
            url: '/traytracking/acknowledgeAlert',
            data: { id: trayAlertId, acknowledgementType, mealOrderId: mealOrder.id }
        }).then(() => {
            dispatch({type: UPDATE_ALERTS, acknowledgementType})
            dispatch({ type: acknowledgementType+screenName, mealOrder, searchText, trayAlertId, totalAlerts })
            dispatch({ type: LOADING_SCREEN, loadingAlert: false })
        }).catch((e) => {
           // dispatch({ type: UNSELECT_MEAL_ORDER })
            console.log("Error while acknowledging alert: " + e)
            dispatch({ type: LOADING_SCREEN, loadingAlert: false })
            dispatch({type: UPDATE_ALERTS, acknowledgementType})
            //dispatch({type: MARK_ERROR_ON_ACKNOWLEDGMENT})
            dispatch({ type: acknowledgementType+screenName, mealOrder, searchText, trayAlertId, totalAlerts })
        })
    }
}

export const closeAlertedTicketMessage = () => ((dispatch) => {
    dispatch({ type: CLOSE_TRAY_ALERT })
    dispatch({ type: UNSELECT_MEAL_ORDER })
})

export const undoAlert = (screenName, mealOrder, searchText) => {
    return (dispatch) => {
        dispatch({ type: LOADING_SCREEN, loadingAlert: true })
        return post({
            url: '/traytracking/undoAlert',
            data: { id: mealOrder.trayAlertId, mealOrderId: mealOrder.id },
        }).then(() => {
            dispatch({ type: UNDO_ON_HOLD+screenName, mealOrder, searchText })
            dispatch({ type: UNSELECT_MEAL_ORDER })
            dispatch({ type: LOADING_SCREEN, loadingAlert: false })
        }).catch((e) => {
            console.log("Error while marking undo alert: " + e)
            dispatch({ type: LOADING_SCREEN, loadingAlert: false })
            dispatch({ type: UNSELECT_MEAL_ORDER })
            dispatch({ type: UNDO_ON_HOLD+screenName, mealOrder, searchText })
        })
    }
}