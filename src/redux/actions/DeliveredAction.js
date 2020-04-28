import {get, post} from '../../services/httpService';
import { READY_TO_DELIVER_CARTS,
    UPDATE_DELIVERED_SUCCESS,
    UPDATE_UNDO_DELIVERED_SUCCESS, 
    LOADING
 } from './Types';

export const fetchReadyToDeliverCarts = () => ((dispatch) => {
    dispatch({type:LOADING, flag:true})
    return get({
        url : '/traytracking/fetchReadyToDeliverCarts',
    }).then((res) => {       
        dispatch({type:READY_TO_DELIVER_CARTS, data: [{"id":1650,"status":"DEPARTED","zone":1,"mealOrders":[{"id":175478,"patientId":null,"ticketNumber":7,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175483,"patientId":null,"ticketNumber":12,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"5:37 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:37","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":true,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175481,"patientId":null,"ticketNumber":10,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"5:37 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:37","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":true,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175476,"patientId":null,"ticketNumber":5,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175479,"patientId":null,"ticketNumber":8,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175480,"patientId":null,"ticketNumber":9,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175482,"patientId":null,"ticketNumber":11,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"5:37 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:37","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175484,"patientId":null,"ticketNumber":13,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:48 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:48","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175485,"patientId":null,"ticketNumber":14,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:48 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:48","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175486,"patientId":null,"ticketNumber":15,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175487,"patientId":null,"ticketNumber":16,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175488,"patientId":null,"ticketNumber":17,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175489,"patientId":null,"ticketNumber":18,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"}],"mealOrderId":null,"firstMealOrderTime":"121","minimumDeliveryTime":"5:35 PM"},{"id":1645,"status":"DEPARTED","zone":4,"mealOrders":[{"id":175444,"patientId":null,"ticketNumber":1,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"7:00 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 19:00","statusDate":1588048932000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 17:42","eventTime":null,"serviceStyle":"BEDSIDE"}],"mealOrderId":null,"firstMealOrderTime":"154","minimumDeliveryTime":"7:00 PM"},{"id":1644,"status":"DEPARTED","zone":3,"mealOrders":[{"id":175472,"patientId":null,"ticketNumber":2,"kitchenId":57,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":788,"unitName":"TEST UNIT 1","bedId":11157,"bedName":"A","roomId":6579,"roomName":"02","zone":3,"deliveryTime":"5:23 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:23","statusDate":1588047550000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 17:19","eventTime":null,"serviceStyle":"ROOM_SERVICE"}],"mealOrderId":null,"firstMealOrderTime":"177","minimumDeliveryTime":"5:23 PM"}]});
        dispatch({type:LOADING, flag:false})
    }).catch((e) => {
       dispatch({type:READY_TO_DELIVER_CARTS, data: [{"id":1650,"status":"DEPARTED","zone":1,"mealOrders":[{"id":175478,"patientId":null,"ticketNumber":7,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175483,"patientId":null,"ticketNumber":12,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"5:37 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:37","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":true,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175481,"patientId":null,"ticketNumber":10,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"5:37 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:37","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":true,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175476,"patientId":null,"ticketNumber":5,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175479,"patientId":null,"ticketNumber":8,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175480,"patientId":null,"ticketNumber":9,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14669,"bedName":"A","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:35 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:35","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175482,"patientId":null,"ticketNumber":11,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"5:37 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:37","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175484,"patientId":null,"ticketNumber":13,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:48 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:48","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175485,"patientId":null,"ticketNumber":14,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"5:48 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:48","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175486,"patientId":null,"ticketNumber":15,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175487,"patientId":null,"ticketNumber":16,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175488,"patientId":null,"ticketNumber":17,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"},{"id":175489,"patientId":null,"ticketNumber":18,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1373,"unitName":"Emily's Test Unit","bedId":14668,"bedName":"B","roomId":9128,"roomName":"101","zone":2,"deliveryTime":"6:28 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 18:28","statusDate":1588052098000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 18:34","eventTime":null,"serviceStyle":"BEDSIDE"}],"mealOrderId":null,"firstMealOrderTime":"121","minimumDeliveryTime":"5:35 PM"},{"id":1645,"status":"DEPARTED","zone":4,"mealOrders":[{"id":175444,"patientId":null,"ticketNumber":1,"kitchenId":56,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":1770,"unitName":"!!Unit name !!Unit name !!Unit name !!Unit test !!","bedId":24357,"bedName":"Bed name","roomId":12872,"roomName":"Room Name","zone":1,"deliveryTime":"7:00 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 19:00","statusDate":1588048932000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 17:42","eventTime":null,"serviceStyle":"BEDSIDE"}],"mealOrderId":null,"firstMealOrderTime":"154","minimumDeliveryTime":"7:00 PM"},{"id":1644,"status":"DEPARTED","zone":3,"mealOrders":[{"id":175472,"patientId":null,"ticketNumber":2,"kitchenId":57,"firstName":null,"lastName":null,"mealPeriodName":null,"unitId":788,"unitName":"TEST UNIT 1","bedId":11157,"bedName":"A","roomId":6579,"roomName":"02","zone":3,"deliveryTime":"5:23 PM","trackingStatus":"DEPARTED","timeFromDelivery":null,"deliveryDateTime":"2020/04/27 17:23","statusDate":1588047550000,"delivered":false,"nowTray":false,"rushOrder":false,"statusDateInString":"2020/04/27 17:19","eventTime":null,"serviceStyle":"ROOM_SERVICE"}],"mealOrderId":null,"firstMealOrderTime":"177","minimumDeliveryTime":"5:23 PM"}]});
        dispatch({type:LOADING, flag:false})
    })
})

export const markTrayDelivered = (selectedMealOrder, selectedCart, unitId, sortBy) => ((dispatch) => {
    dispatch({type:LOADING, flag:true})
    return post({
        url:'/traytracking/markTrayAsDelivered',
        data:{id: selectedMealOrder.id}
    }).then((res) => {
        dispatch({type:LOADING, flag:false})
        dispatch({type:UPDATE_DELIVERED_SUCCESS, selectedMealOrder, selectedCart, unitId, sortBy });
    }).catch((err) => {
        dispatch({type:LOADING, flag:false})
        console.log('Error while marking tray delivered.')
    })
})

export const undoDeliveredTray =(selectedCart, selectedMealOrder, unitId, sortBy) => {
    return (dispatch) => {
        dispatch({type:LOADING, flag:true})
    return post({
            url:'/traytracking/undoDeliveredMealOrder',
            data: {id:selectedMealOrder.id},
        }).then((response) => {
            dispatch({type:LOADING, flag:false})
            dispatch({type:UPDATE_UNDO_DELIVERED_SUCCESS, selectedMealOrder, selectedCart, unitId, sortBy});
        }).catch((e) => {
            console.log("Error while trying to undo recovered tray: "+e)
            dispatch({type:LOADING, flag:false})
        })
    }
}
