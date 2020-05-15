import { FETCH_FACILITY_SUCCESS, CLOSE_FACILITY_POPUP,
    SAVE_FACILITY_SUCCESS, 
    OFFLINE_SWITCH_FACILITY,
    SWITCH_THEME
} from '../actions/Types';
import { LIGHT_MODE, LIGHT_MODE_TEXT, DARK_MODE_TEXT } from '../actions/Constants';

export const initialState = {
    allFacilities :[],
    showFacilityPopup:false,
    selectedFacilityId: -1,
    selectedFacilityName: '',
    showOfflineFacilityPopup:false,
    theme: sessionStorage.getItem('theme') === null ? LIGHT_MODE : sessionStorage.getItem('theme'),
    themeName: sessionStorage.getItem('theme') === null || sessionStorage.getItem('theme') === LIGHT_MODE ?DARK_MODE_TEXT : LIGHT_MODE_TEXT
}

export default (state = initialState, action) => {
    switch(action.type) {

        case FETCH_FACILITY_SUCCESS:

        let facilityId = -1;
        let facilityName = '';
        action.data.forEach((item, index)=> {
            if(item.selected)
            {
                facilityId = item.id;
                facilityName = item.name
            }
        })


            return {
                ...state,
                allFacilities: action.data,
                selectedFacilityId: facilityId,
                showFacilityPopup: true,
                selectedFacilityName: facilityName
            }

        case SAVE_FACILITY_SUCCESS:
            return {
                ...state,
                showFacilityPopup: false,
                selectedFacilityId: action.facility.id,
                selectedFacilityName:action.facility.name
            }    

        case CLOSE_FACILITY_POPUP:
        return {
            ...state,            
            showFacilityPopup: false,
            showOfflineFacilityPopup: false
        }
        case OFFLINE_SWITCH_FACILITY:
            return {
                ...state,
                showFacilityPopup: false,
                showOfflineFacilityPopup: false
            }
        case SWITCH_THEME:
            return {
                ...state,
                theme: action.theme,
                themeName: action.theme === LIGHT_MODE ?DARK_MODE_TEXT : LIGHT_MODE_TEXT
            }
        default:
            return initialState;

    }
}