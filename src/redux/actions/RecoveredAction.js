import {
    FETCH_TRAYS_TO_RECOVER,
    UNSELECT_MEAL_ORDER,
    LOADING_SCREEN,
    FETCH_SERVICE_STYLES_AND_UNITS,
    FILTER_UNITS_FOR_SELECTED_SERVICE_STYLE,
    FILTER_TRAYS_ON_RECOVERED,
} from './Types';
import { get, post } from '../../services/httpService';
import { RECOVERED_STATUS, DELIVERED_STATUS } from './Constants';

export const fetchTraysToRecover = (serviceStyle, unitId, sortBy, isOffline, searchText) => {
    return (dispatch) => {
        dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: true })
        var originalServiceStyle, originalUnitId, originalSortBy
        if (isOffline) {
            originalUnitId = unitId
            originalSortBy = sortBy
            originalServiceStyle = serviceStyle
            unitId = -1
            sortBy = ''
            serviceStyle = -1
        }
        return get({
            url: '/traytracking/fetchDeliveredMealOrders/?serviceStyle='+serviceStyle+'&unitId=' + unitId,
        }).then((response) => {
            if (isOffline)
                dispatch({ type: FETCH_TRAYS_TO_RECOVER, traysToBeRecovered: response.data, serviceStyle: originalServiceStyle, unitId: originalUnitId, sortBy: originalSortBy, isOffline })
            else
                dispatch({ type: FETCH_TRAYS_TO_RECOVER, traysToBeRecovered: response.data, serviceStyle, unitId, sortBy, isOffline })
            if(searchText !== undefined & searchText.trim() !== ''){
            dispatch({type:FILTER_TRAYS_ON_RECOVERED, searchText})}
            dispatch({ type: UNSELECT_MEAL_ORDER })
            dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: false })
        }).catch((e) => {
            console.log("Error while fetching recovered trays: " + e)
            dispatch({ type: UNSELECT_MEAL_ORDER })
            dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: false })
        })
    }
}

export const recoverTray = (isOffline, mealOrderId, unitId, sortBy, serviceStyle, searchText) => {
    return (dispatch) => {
        dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: true })
        return post({
            url: '/traytracking/recoverMealOrder',
            data: { id: mealOrderId },
        }).then((response) => {

            dispatch(fetchTraysToRecover(serviceStyle, unitId, sortBy, isOffline, searchText))
            dispatch({ type: UNSELECT_MEAL_ORDER })
            dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: false })
        }).catch((e) => {
            console.log("Error while recovering tray: " + e)
            dispatch({ type: UNSELECT_MEAL_ORDER })
            dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: false })
        })
    }
}

export const undoRecoveredTray = (isOffline, mealOrderId, unitId, sortBy, serviceStyle, searchText) => {
    return (dispatch) => {
        dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: true })
        return post({
            url: '/traytracking/undoRecoveredMealOrder',
            data: { id: mealOrderId },
        }).then((response) => {
            dispatch(fetchTraysToRecover(serviceStyle, unitId, sortBy, isOffline, searchText))
            dispatch({ type: UNSELECT_MEAL_ORDER })
            dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: false })
        }).catch((e) => {
            console.log("Error while trying to undo recovered tray: " + e)
            dispatch({ type: LOADING_SCREEN, loadingRecoveredScreenMealOrders: false })
        })
    }
}

export const fetchAllServiceStylesAndUnits = () => ((dispatch) => {
    dispatch({type:LOADING_SCREEN, loadingServiceStyles:true})
    return get({
        url : '/traytracking/fetchAllServiceStylesAndUnits'
    }).then((res) => {
    	dispatch({type:LOADING_SCREEN, loadingServiceStyles:false})
    	dispatch({type:FETCH_SERVICE_STYLES_AND_UNITS, unitList: res.data});
      }).catch((e) => {
    	  dispatch({type:LOADING_SCREEN, loadingServiceStyles:false})
          console.log("Error while fetching service styles and units for recovered trays.")
    })
})

export const filterUnitBySelectedServiceStyle = (selectedServiceStyle) => ((dispatch) => {
    dispatch({type: FILTER_UNITS_FOR_SELECTED_SERVICE_STYLE, selectedServiceStyle})
})
export const filterTraysOnRecovered = (searchText) => ((dispatch) => {
    dispatch({type:FILTER_TRAYS_ON_RECOVERED, searchText})
})
