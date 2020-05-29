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
            var alertList = [
    
                {
                    "id": 26,
                    "alertType": "ALERT_PATIENT",
                    "acknowledgementType": null,
                    "acknowledgedOn": null,
                    "acknowledgedBy": null,
                    "oldDetails": {
                        "bedId": null,
                        "bedName": null,
                        "roomId": null,
                        "roomName": null,
                        "unitId": null,
                        "unitName": null,
                        "diet": "Reg/Pureed Meats, ",
                        "allergies": "**NF-**",
                        "supplements": "",
                        "tubeFeedings": "",
                        "instructions": "deqdew3q",
                        "preferences": "ewdw3rw3qwer5"
                    },
                    "newDetails": {
                        "bedId": null,
                        "bedName": null,
                        "roomId": null,
                        "roomName": null,
                        "unitId": null,
                        "unitName": null,
                        "diet": "Reg/Pureed Meats, *Standard1, 1200 - 1400 kcal, 1400 - 1600 kcal, 1600 - 1800 kcal1",
                        "allergies": "**NF-**",
                        "supplements": "",
                        "tubeFeedings": "",
                        "instructions": "deqdew3q",
                        "preferences": "ewdw3rw3qwer5"
                    },
                    "patientAlert": true,
                    "transferAlert": false,
                    "dischargeAlert": false
                },
                {
                    "id": 27,
                    "alertType": "ALERT_PATIENT",
                    "acknowledgementType": null,
                    "acknowledgedOn": null,
                    "acknowledgedBy": null,
                    "oldDetails": {
                        "bedId": null,
                        "bedName": null,
                        "roomId": null,
                        "roomName": null,
                        "unitId": null,
                        "unitName": null,
                        "diet": "Reg/Pureed Meats, ",
                        "allergies": "**NF-**",
                        "supplements": "",
                        "tubeFeedings": "",
                        "instructions": "deqdew3q",
                        "preferences": "ewdw3rw3qwer5"
                    },
                    "newDetails": {
                        "bedId": null,
                        "bedName": null,
                        "roomId": null,
                        "roomName": null,
                        "unitId": null,
                        "unitName": null,
                        "diet": "Reg/Pureed Meats, *Standard1, 1200 - 1400 kcal, 1400 - 1600 kcal, 1600 - 1800 kcal1",
                        "allergies": "**NF-**",
                        "supplements": "",
                        "tubeFeedings": "",
                        "instructions": "deqdew3q",
                        "preferences": "ewdw3rw3qwer5"
                    },
                    "patientAlert": true,
                    "transferAlert": false,
                    "dischargeAlert": false
                }
            ]
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