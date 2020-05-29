import {
    FETCH_ALERT_MEAL_ORDER_DETAILS,
    MARK_ERROR_ON_ACKNOWLEDGMENT,
    CLOSE_TRAY_ALERT,
    UPDATE_ALERTS,
    PROCEED_WITH_TRAY,
    SEND_TO_HOLD,
    NOT_EATEN,
} from "../actions/Types";

export const initialState = {
    showAlertedTrayMessage: false,
    alertList: [],
    errorOnAcknowledgment: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALERT_MEAL_ORDER_DETAILS: {
            return {
                ...state,
                showAlertedTrayMessage: true,
                alertList: action.alertList,
            };
        }
        case UPDATE_ALERTS: {
            var alertList = updateAlertsAsPerAcknowledgementType(action.acknowledgementType, state.alertList)
            return {
                ...state,
                showAlertedTrayMessage: alertList.length > 0,
                alertList
            }
        }
        case CLOSE_TRAY_ALERT: {
            return {
                ...state,
                showAlertedTrayMessage: false,
                errorOnAcknowledgment: false,
            }
        }
        case MARK_ERROR_ON_ACKNOWLEDGMENT: {
            return {
                ...state,
                errorOnAcknowledgment: true,
                showAlertedTrayMessage: false,
            }
        }
        default:
            return state;
    }
};

function updateAlertsAsPerAcknowledgementType(acknowledgementType, alertList) {
    var alerts = Object.create([])
    if (acknowledgementType === PROCEED_WITH_TRAY) {
        alerts = alertList
        alerts.shift();
    } else if (acknowledgementType === SEND_TO_HOLD || acknowledgementType === NOT_EATEN) {
        alerts = []
    }
    return alerts;
}