import {
  FETCH_TRAYS_TO_RECOVER,
  FETCH_SERVICE_STYLES_AND_UNITS,
  FILTER_UNITS_FOR_SELECTED_SERVICE_STYLE,
  FILTER_TRAYS_ON_RECOVERED,
} from "../actions/Types";
import { DELIVERED_STATUS} from "../actions/Constants";
import { sortOn } from '../../utils/sort'
export const initialState = {
  traysToBeRecovered: [],
  recoveredTrays: [],
  units: [],
  filteredUnits: [],
  serviceStyles: [],
  trays: [],
  traysToBeRecoveredMasterList: [],
  recoveredTraysMasterList: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRAYS_TO_RECOVER:  {
      var trays = action.traysToBeRecovered
      var combinedList = createRecoveredAndUndoLists(trays)
      var traysToBeRecovered = combinedList[0]
      var recoveredTrays = combinedList[1]
      if (action.isOffline) {
        if (action.unitId !== -1) {
          traysToBeRecovered = traysToBeRecovered.filter(item => item.unitId === action.unitId)
          recoveredTrays = recoveredTrays.filter(item => item.unitId === action.unitId)
        }
        if(action.serviceStyle !== '-1') {
        	traysToBeRecovered = traysToBeRecovered.filter(item => item.serviceStyle === action.serviceStyle)
            recoveredTrays = recoveredTrays.filter(item => item.serviceStyle === action.serviceStyle)
        }
      }
      traysToBeRecovered.sort(sortOn(action.sortBy, true))
      recoveredTrays.sort(sortOn(action.sortBy, true))
      return {
        ...state,
        traysToBeRecovered,
        recoveredTrays,
        traysToBeRecoveredMasterList: traysToBeRecovered,
        recoveredTraysMasterList: recoveredTrays,
      };
    }
    case FETCH_SERVICE_STYLES_AND_UNITS:
        var unitList = action.unitList;
        var units = [];
        var serviceStyles = [];
        unitList.forEach((u) => {
            units.push({ id: u.id, name: u.name, serviceStyle: u.serviceStyleId })
            serviceStyles.push({ id: u.serviceStyleId, name: u.serviceStyleName })
        })
        serviceStyles = serviceStyles.filter((set => a => !set.has(a.id) && set.add(a.id))(new Set));
        serviceStyles = serviceStyles.sort(function (a, b) { return b.id.localeCompare(a.id) })
        return {
            ...state,
            serviceStyles,
            units,
            filteredUnits: units,
        }
    case FILTER_UNITS_FOR_SELECTED_SERVICE_STYLE:
        var filteredUnits = state.units.filter((u) => {
            return action.selectedServiceStyle === '-1' || action.selectedServiceStyle === u.serviceStyle
        })
        return {
            ...state,
            filteredUnits,
        }
    case FILTER_TRAYS_ON_RECOVERED: {
    	 var searchText = action.searchText;
         if (searchText !== '') {
           searchText = searchText.toLowerCase().trim();
        	traysToBeRecovered = state.traysToBeRecoveredMasterList.filter((mo) => {
            return (mo.ticketNumber.toString().includes(searchText)
              || mo.unitName.toLowerCase().includes(searchText)
              || mo.roomName.toLowerCase().includes(searchText)
              || mo.bedName.toLowerCase().includes(searchText))
          });
        	recoveredTrays = state.recoveredTraysMasterList.filter((mo) => {
                return (mo.ticketNumber.toString().includes(searchText)
                  || mo.unitName.toLowerCase().includes(searchText)
                  || mo.roomName.toLowerCase().includes(searchText)
                  || mo.bedName.toLowerCase().includes(searchText))
              });
        } else {
        	traysToBeRecovered = state.traysToBeRecoveredMasterList
        	recoveredTrays = state.recoveredTraysMasterList
        }
        return {
          ...state,
          traysToBeRecovered,
          recoveredTrays,
        };
      }
    default:
      return state;
  }
}

function getTimeFromDelivery(deliveredDateTime) {

  var diffMs = (new Date() - Date.parse(deliveredDateTime)); // milliseconds between now & Christmas
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  return diffMins
}

function createRecoveredAndUndoLists(trays) {
  var recoveredTrays = []
  var traysToBeRecovered = []
  if (trays && trays.length > 0) {
    trays.forEach(tray => {
      if (tray != null) {
        if (tray.trackingStatus === DELIVERED_STATUS) {
          if (tray.deliveredDateTime) {
            tray.timeFromDelivery = getTimeFromDelivery(tray.deliveredDateTime)
          }
          traysToBeRecovered.push(tray)
        }
        else {
          tray.isUndoEnable = true;
          recoveredTrays.push(tray)
        }
      }
    });
  }
  return [traysToBeRecovered, recoveredTrays];
}