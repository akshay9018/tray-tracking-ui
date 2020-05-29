import {
  FETCH_OUT_CART_ORDERS,
  SELECT_MEAL_ORDER,
  FETCH_SERVICE_STYLES,
  FETCH_KITCHENS,
  FETCH_UNITS,
  ADD_TO_CART,
  FETCH_CARTS,
  REMOVE_TRAY_FROM_CART,
  DELETE_CART,
  UNSELECT_MEAL_ORDER,
  REMOVE_ADDED_OUT_CART_ORDERS,
  OPEN_INCART_SUMMARY,
  SHOW_CART_ALREADY_EXISTS_MESSAGE,
  CLOSE_ALERT_MESSAGE,
  REMOVE_FROM_OUT_CART_ORDERS,
  UPDATE_PRINTED_TICKETS,
  SET_SELECTED_SERVICE_STYLE_KITCHEN_UNIT,
  UPDATE_SELECTED_SORT_BY,
  FETCH_FACILITY_MEAL_NAMES,
  CLEAR_INCART_FILTERS,
  UPDATE_SELECTED_MEAL_NAME,
  UPDATE_SELECTED_UNIT,
  UPDATE_SELECTED_KITCHEN,
  UPDATE_SELECTED_SERVICE_STYLE,
  FILTER_OUT_CART_ORDERS,
  FILTER_TRANSITIONAL_TRAYS,
  FILTER_TRAYS_BY_SEARCH,
  ADD_ALERT_TO_EXISTING_TICKET,
  PROCEED_WITH_TRAY,
  NOT_EATEN,
  SEND_TO_HOLD,
  UNDO_ON_HOLD,
  CLEAR_ON_HOLD_PRINTED_TRAYS,
} from "../actions/Types";
import { MEAL_ORDER_ALREADY_ADDED, CART_FOR_ZONE_ALREADY_EXISTS, BEDSIDE, UNIT_ROOM_BED_SORT, DELIVERY_DATE_TIME_SORT, SHOW_ALL_MEALS, TRANSITIONAL, INCART, } from "../actions/Constants";
import { sortOn } from '../../utils/sort'
import { proceedWithTray, sendToHold, undoOnHoldAlert, notEaten, addTrayAlertToExistingTray } from '../../utils/TrayAlertUtil'
export const initialState = {
  serviceStyles: [],
  kitchens: [],
  units: [],
  outOfCartOrders: [],
  outCartOrderMasterList: [],
  carts: [],
  addToCart: false,
  selectedOrderTicket: '',
  showCartSummary: true,
  showAlertMessage: false,
  selectedServiceStyle: -1,
  selectedKitchen: '-1',
  selectedUnit: '-1',
  selectedSortBy: DELIVERY_DATE_TIME_SORT,
  selectedMealName: -1,
  selectedUnit: -1,
  selectedServiceStyle: -1,
  selectedKitchen: -1,
  facilityMealNameArray: [],

  cartMealOrders: [],
  masterMealOrdersList: [],

  cartsList: [],
  onHoldMasterTrays: [],
  onHoldTrays: [],
  searchText: '',

};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICE_STYLES: {
      let serviceStyles = action.serviceStyles;
      return {
        ...state,
        serviceStyles,
      };
    }
    case FETCH_KITCHENS: {
      let kitchens = action.kitchens;
      return {
        ...state,
        kitchens,
      };
    }
    case FETCH_UNITS: {
      let units = action.units;
      var onHoldTrays = filterAndSortHoldTrays(state.onHoldMasterTrays, state.searchText, state.selectedSortBy,
        state.selectedUnit, action.units, state.selectedMealName)
      return {
        ...state,
        units,
        onHoldTrays
      };
    }
    case FETCH_FACILITY_MEAL_NAMES: {
      let facilityMealNames = action.facilityMealNameArray
      let facilityMealNameArray = []
      facilityMealNameArray.push({id:-1, name: SHOW_ALL_MEALS})
      facilityMealNames.forEach((meal)=> {
        facilityMealNameArray.push({id:meal.mealNameId, name: meal.name})
      })
      return {
        ...state,
        facilityMealNameArray: facilityMealNameArray,
      }
    }
    case CLEAR_INCART_FILTERS: {
      return {
        ...state,
        facilityMealNameArray: undefined,
        selectedServiceStyle: -1,
        selectedKitchen: -1,
        selectedUnit: -1,
        selectedSortBy: DELIVERY_DATE_TIME_SORT,
        selectedMealName: -1,
      }
    }
    case UPDATE_SELECTED_SORT_BY: {
      onHoldTrays = filterAndSortHoldTrays(state.onHoldMasterTrays, state.searchText, action.sortByParam, 
        state.selectedUnit, state.units, state.selectedMealName)
      return {
        ...state,
        selectedSortBy: action.sortByParam,
        onHoldTrays
      };
    }
    case UPDATE_SELECTED_MEAL_NAME: {
      onHoldTrays = filterAndSortHoldTrays(state.onHoldMasterTrays, state.searchText, state.selectedSortBy, 
        state.selectedUnit, state.units, action.selectedMealName)
      return {
        ...state,
        selectedMealName: action.selectedMealName,
        onHoldTrays,
      };
    }
    case UPDATE_SELECTED_SERVICE_STYLE: {
      return {
        ...state,
        selectedServiceStyle: action.selectedServiceStyle,
      };
    }
    case UPDATE_SELECTED_KITCHEN: {
      return {
        ...state,
        selectedKitchen: action.selectedKitchen,
      };
    }
    case UPDATE_SELECTED_UNIT: {
      onHoldTrays = filterAndSortHoldTrays(state.onHoldMasterTrays, state.searchText, state.selectedSortBy,
        action.selectedUnit, state.units, state.selectedMealName)
      return {
        ...state,
        selectedUnit: action.selectedUnit,
        onHoldTrays
      };
    }
    case FETCH_OUT_CART_ORDERS: {
      var outOfCartOrders = action.outOfCartOrders ? action.outOfCartOrders : state.outOfCartOrders;
      let selectedMealOrder = undefined;
var onHoldTrays=[]
      if (outOfCartOrders !== []) {
        outOfCartOrders = outOfCartOrders.sort(sortOn(state.selectedSortBy, false, true));
var mo = outOfCartOrders[0]
mo.trayAlertId=1      
onHoldTrays.push(mo)
}
      return {
        ...state,
onHoldTrays,
        selectedMealOrder,
        outOfCartOrders,
        outCartOrderMasterList: outOfCartOrders,
      };
    }
    case SET_SELECTED_SERVICE_STYLE_KITCHEN_UNIT:
      return {
        ...state,
        selectedServiceStyle: action.selectedServiceStyle,
        selectedKitchen: action.selectedKitchen,
        selectedUnit: action.selectedUnit,
      }
    case ADD_ALERT_TO_EXISTING_TICKET+INCART: {
      var outCartOrderMasterList = [...state.outCartOrderMasterList];
      outOfCartOrders = [...state.outOfCartOrders];
      var updatedLists = addTrayAlertToExistingTray([outCartOrderMasterList, outOfCartOrders], action.alertMealOrders, state.carts)
      var outOfCartOrderLists = updatedLists[0]
      return {
        ...state,
        carts : updatedLists[1],
        outCartOrderMasterList : outOfCartOrderLists[0],
        outOfCartOrders : outOfCartOrderLists[1],
      }
    }
    case CLEAR_ON_HOLD_PRINTED_TRAYS: {
      return {
        ...state,
        onHoldMasterTrays:[],
        onHoldTrays:[],
      }
    }
    case PROCEED_WITH_TRAY+INCART: {
      outCartOrderMasterList = [...state.outCartOrderMasterList];
      outOfCartOrders = [...state.outOfCartOrders];
      updatedLists = proceedWithTray([outCartOrderMasterList, outOfCartOrders], action.mealOrder.id, action.totalAlerts)
      return {
        ...state,
        outOfCartOrders: updatedLists[1],
        outCartOrderMasterList: updatedLists[0],
        selectedMealOrder: action.totalAlerts > 0 ? state.selectedMealOrder : undefined,
      }
    }
    case NOT_EATEN+INCART: {
      outCartOrderMasterList = [...state.outCartOrderMasterList];
      outOfCartOrders = [...state.outOfCartOrders];
      updatedLists = notEaten([outCartOrderMasterList, outOfCartOrders], action.mealOrder.id)
      return {
        ...state,
        outOfCartOrders: updatedLists[1],
        outCartOrderMasterList: updatedLists[0],
        selectedMealOrder: undefined,
      }
    }
    case SEND_TO_HOLD+INCART: {
      outCartOrderMasterList = [...state.outCartOrderMasterList];
      outOfCartOrders = [...state.outOfCartOrders];
      var outOfCartOrderLists = [outCartOrderMasterList, outOfCartOrders]
      var onHoldMasterTrays = [...state.onHoldMasterTrays]
      onHoldTrays = [...state.onHoldTrays]
      var onHoldLists = [onHoldMasterTrays, onHoldTrays]
      updatedLists = sendToHold(outOfCartOrderLists, onHoldLists, action.mealOrder, action.trayAlertId,
        state.selectedSortBy, false, true)
      outOfCartOrderLists = updatedLists[0]
      onHoldLists = updatedLists[1]
      return {
        ...state,
        outCartOrderMasterList : outOfCartOrderLists[0],
        outOfCartOrders : outOfCartOrderLists[1],
        onHoldMasterTrays : onHoldLists[0],
        onHoldTrays : onHoldLists[1],
        selectedMealOrder: undefined,
      }
    }
    case UNDO_ON_HOLD+INCART: {
      outCartOrderMasterList = [...state.outCartOrderMasterList];
      outOfCartOrders = [...state.outOfCartOrders];
      outOfCartOrderLists = [outCartOrderMasterList, outOfCartOrders]
      onHoldMasterTrays = [...state.onHoldMasterTrays]
      onHoldTrays = [...state.onHoldTrays]
      onHoldLists = [onHoldMasterTrays, onHoldTrays]
      updatedLists = undoOnHoldAlert(outOfCartOrderLists, onHoldLists, action.mealOrder,
        state.selectedSortBy, false, true)
      outOfCartOrderLists = updatedLists[0]
      onHoldLists = updatedLists[1]
      return {
        ...state,
        outCartOrderMasterList : outOfCartOrderLists[0],
        outOfCartOrders : outOfCartOrderLists[1],
        onHoldMasterTrays : onHoldLists[0],
        onHoldTrays : onHoldLists[1],
      }
    }
    case UPDATE_PRINTED_TICKETS: {
    var a  =  [...state.outOfCartOrders];
    if(action.mealOrder){
    a.push(action.mealOrder)
    }
    if (a !== []) {
        if (state.selectedServiceStyle === -1) {
          a = a.sort(sortOn(state.serviceStyles[0] === BEDSIDE ? UNIT_ROOM_BED_SORT : DELIVERY_DATE_TIME_SORT));
        }
        else if (state.selectedServiceStyle === BEDSIDE) {
          a = a.sort(sortOn(UNIT_ROOM_BED_SORT));
        }
        else {
          a = a.sort(sortOn(DELIVERY_DATE_TIME_SORT));
        }
      }
      return {
        ...state,
        outOfCartOrders:a
      };
    }
    case FILTER_OUT_CART_ORDERS: {
      let selectedMealOrder = undefined;
      var searchText = action.searchText;
      if (searchText !== '') {
        outOfCartOrders = searchTrays(searchText, state.outCartOrderMasterList)
      } else {
        outOfCartOrders = state.outCartOrderMasterList
      }
      onHoldTrays = filterAndSortHoldTrays(state.onHoldMasterTrays, action.searchText, state.selectedSortBy, 
        state.selectedUnit, state.units, state.selectedMealName)
      return {
        ...state,
        selectedMealOrder,
        outOfCartOrders,
        onHoldTrays,
        searchText
      };
    }
    case SHOW_CART_ALREADY_EXISTS_MESSAGE: {
      return {
        ...state,
        showAlertMessage: true,
        alertMessage: CART_FOR_ZONE_ALREADY_EXISTS,
      }
    }
    case CLOSE_ALERT_MESSAGE: {
      return {
        ...state,
        showAlertMessage: false,
      }
    }
    case FETCH_CARTS:{
      var responseCarts = action.responseCarts;
      let noOfZones = 21;
      let carts = [];
      carts.length = noOfZones;
      for (var i = 0; i < noOfZones; i++) {
        if (responseCarts[i] !== undefined) {
			responseCarts[i].containsTrayAlert = checkIfCartContainsTrayAlert(responseCarts[i].mealOrders)
          carts[responseCarts[i].zone ] = responseCarts[i];
          if (i !== responseCarts[i].zone && carts[i] === undefined) {

            var cart = {
              zone: (i).toString(),
            }
            carts[i] = cart
          }
        }
        else {
          if (carts[i] === undefined) {
        	  if(i === 0){
        		  cart = {
        	             zone: (i).toString(),
        	              status: TRANSITIONAL,
        	            } 
        	  }
        	  else{
            cart = {
              zone: (i).toString(),
            }
        	  }
            carts[i] = cart
          }
        }
      }
      return {
        ...state,
        carts,
        cartsList: carts,
      };
    }
    
    case FILTER_TRANSITIONAL_TRAYS: {
        var carts = state.selectedCart.mealOrders.filter((cart) => {
        
            return (action.selectedKitchenId !== '-1' || parseInt(cart.kitchenId) === parseInt(action.selectedKitchenId) ) }
        );
    if(action.searchText !== ''){
        carts = carts.filter((cart) => {
            return cart.mealOrders.filter((mo) => { return mo.ticketNumber.toString().includes(action.searchText) }
        )});
    }
        return {
            ...state,
            carts,
        }
    }

    case FILTER_TRAYS_BY_SEARCH: {
      let selectedMealOrder = undefined;
      searchText = action.searchText;
      if (searchText !== '') {
        carts = searchTrays(searchText, state.carts.selectedCart)
      } else {
        carts = state.cartsList
      }
      return {
        ...state,
        selectedMealOrder,
        carts,
      };
    }


    case FILTER_TRANSITIONAL_TRAYS: {
    	var mealOrdersList = [...state.masterMealOrdersList]
    	cartMealOrders = mealOrdersList.filter((mo) => {
            return (action.selectedKitchenId !== '-1' ? parseInt(mo.kitchenId) === parseInt(action.selectedKitchenId) : true ) }
    	);
    	if(action.searchText !== ''){
	    	var searchText = action.searchText.toLowerCase().trim();
	    	cartMealOrders = cartMealOrders.filter((mo) => {
	                return (mo.ticketNumber.toString().includes(searchText)
	                        || mo.unitName.toLowerCase().includes(searchText)
	                        || mo.roomName.toLowerCase().includes(searchText)
	                        || mo.bedName.toLowerCase().includes(searchText))
	        });
	    }
        return {
            ...state,
            cartMealOrders,
        }
    }

    case SELECT_MEAL_ORDER: {
      var selectedMealOrder = action.mealOrder;
      return {
        ...state,
        selectedMealOrder,
      };
    }
    case REMOVE_FROM_OUT_CART_ORDERS: {
      outOfCartOrders = state.outOfCartOrders.filter(item => item.id !== action.mealOrderId)
      selectedMealOrder = undefined;
      return {
        ...state,
        outOfCartOrders,
        selectedMealOrder,
        showAlertMessage: true,
        alertMessage: MEAL_ORDER_ALREADY_ADDED,
      };
    }
    case ADD_TO_CART: {
      if (action.hasMealOrders) {
        cart = state.carts.filter(item => item.id === action.cartId)[0]
        cart.mealOrders = [state.selectedMealOrder, ...cart.mealOrders];
      } else {
        cart = state.carts.filter(item => item.zone === action.zone)[0]
        cart.id = action.cartId;
        cart.mealOrders = [];
        cart.mealOrders.push(state.selectedMealOrder);
      }
      state.carts.splice(action.zone , 1, cart);
      let outOfCartOrders = state.outOfCartOrders;
      outOfCartOrders = outOfCartOrders.filter(item => item.id !== state.selectedMealOrder.id)
      selectedMealOrder = undefined;
      return {
        ...state,
        outOfCartOrders,
        selectedMealOrder,
        outCartOrderMasterList: outOfCartOrders,
      };
    }
    case UNSELECT_MEAL_ORDER: {
      selectedMealOrder = undefined;
      return {
        ...state,
        selectedMealOrder,
      };
    }
    case REMOVE_TRAY_FROM_CART: {
      var selectedCart = Object.assign({}, state.selectedCart);
      var showCartSummary = state.showCartSummary
      selectedCart.mealOrders = selectedCart.mealOrders.filter(item => item.id !== action.mealOrderId)
      if (selectedCart.mealOrders.length < 1) {
        selectedCart = undefined;
        showCartSummary = false;
      }
      return {
        ...state,
        selectedCart,
        showCartSummary
      };
    }
    case OPEN_INCART_SUMMARY:
      selectedCart = action.selectedCart
      var cartMealOrders = selectedCart.mealOrders
      return {
        ...state,
        selectedCart,
        showCartSummary: true,
        selectedScreen: action.selectedScreen,
        cartMealOrders,
        masterMealOrdersList: cartMealOrders,
      }
    case DELETE_CART: {
      selectedCart = undefined
      return {
        ...state,
        selectedCart,
        showCartSummary: false,
      };
    }
    case REMOVE_ADDED_OUT_CART_ORDERS: {
      outOfCartOrders = state.outOfCartOrders.filter(item => item.id !== action.mealOrderId)
      let selectedMealOrder = undefined;
      return {
        ...state,
        outOfCartOrders,
        selectedMealOrder,
      };
    }
    default:
      return state;
  }
};

function searchTrays(searchText, mealOrders){
  searchText = searchText.toLowerCase().trim();
  return mealOrders.filter((mo) => {
    return (mo.ticketNumber.toString().includes(searchText)
      || mo.unitName.toLowerCase().includes(searchText)
      || mo.roomName.toLowerCase().includes(searchText)
      || mo.bedName.toLowerCase().includes(searchText))
  })
}

function checkIfCartContainsTrayAlert(mealOrders){
  var containsTrayAlert = false;
  if(mealOrders){
  mealOrders.forEach((mo)=>{
    if(!containsTrayAlert){
      if(mo.trayAlert){
        containsTrayAlert = true
      }
    }
  })
}
  return containsTrayAlert;
}
function filterAndSortHoldTrays(onHoldMasterTrays, searchText, selectedSortBy,
  selectedUnit, units, selectedMealName){
    var onHoldTrays = Object.create({})
    onHoldTrays = onHoldMasterTrays.filter((mo) => {
      return  (mo.unitId.toString() === selectedUnit.toString() ||
      (selectedUnit.toString() === (-1).toString() 
        && units.find((u) => { return u && mo.unitId === u.id})))
    })
    onHoldTrays = onHoldTrays.filter((mo) => {
      return  selectedMealName.toString() === (-1).toString() ||
        mo.mealNameId.toString() === selectedMealName.toString()})
   
  if(searchText.trim() !== ''){ 
    onHoldTrays = searchTrays(searchText, onHoldTrays)
  }
    onHoldTrays = onHoldTrays.sort(sortOn(selectedSortBy, false, true)); 
  return onHoldTrays; 
  
}