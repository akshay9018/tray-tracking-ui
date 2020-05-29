import { sortOn } from "./sort";

export function addTrayAlertToExistingTray(mealOrderLists, alertedMealOrders, carts) {
    mealOrderLists.map((mealOrderList) => {
        return addAlertsToExistingData(mealOrderList, alertedMealOrders)
    })
    if (carts) {
        carts.map((cart) => {
            if (cart.id) {
                cart.mealOrders = addAlertsToExistingData(cart.mealOrders, alertedMealOrders)
                cart.containsTrayAlert = cart.mealOrders.find((mo)=> {
                    return mo.trayAlert === true
                }) && true;
            }
            return cart
        });
        return [mealOrderLists, carts]
    } else {
        return mealOrderLists;
    }
}
export function proceedWithTray(mealOrderLists, mealOrderId, totalAlerts) {
    if (totalAlerts === 0) {
        return modifyAlert(mealOrderLists, mealOrderId, false)
    } else {
        return mealOrderLists;
    }
}

export function notEaten(mealOrderLists, mealOrderId) {
    mealOrderLists = popMealOrder(mealOrderLists, mealOrderId)
    return mealOrderLists;
}

export function sendToHold(mealOrderLists, onHoldLists, mealOrder, trayAlertId,
    sortByParam, isRecovered, isIncart) {
    mealOrderLists = popMealOrder(mealOrderLists, mealOrder.id)
    var mo = Object.create({});
    mo = mealOrder
    mo.isUndoEnable = true
    mo.trayAlert = false
    mo.trayAlertId = trayAlertId
    onHoldLists = pushAndSortMealOrder(onHoldLists, mo, sortByParam, isRecovered, isIncart)
    return [mealOrderLists, onHoldLists];
}

export function undoOnHoldAlert(mealOrderLists, onHoldLists, mealOrder,
    sortByParam, isRecovered, isIncart) {
    onHoldLists = popMealOrder(onHoldLists, mealOrder.id)
    mealOrder.isUndoEnable = false
    mealOrder.trayAlert = true
    mealOrder.trayAlertId = undefined
    mealOrderLists = pushAndSortMealOrder(mealOrderLists, mealOrder, sortByParam, isRecovered, isIncart)
    return [mealOrderLists, onHoldLists];
}


function popMealOrder(mealOrderLists, mealOrderId) {
    return mealOrderLists.map((mealOrderList) => {
        return mealOrderList.filter((mo) => {
            return mo.id !== mealOrderId
        })
    })
}

function pushAndSortMealOrder(mealOrderLists, mealOrder, sortByParam, isRecovered, isIncart) {
    return mealOrderLists.map((mealOrderList, index) => {
        mealOrderList.push(mealOrder)
        if (index === mealOrderLists.length - 1) {
            return mealOrderList.sort(sortOn(sortByParam, isRecovered, isIncart));
        } else {
            return mealOrderList
        }
    })
}

function modifyAlert(mealOrderLists, mealOrderId, trayAlert) {
    return mealOrderLists.map((mealOrderList) => {
        mealOrderList.map((mo) => {
            if (mealOrderId.toString() === mo.id.toString()) {
                mo.trayAlert = trayAlert
            }
            return mo;

        })
        return mealOrderList
    })
}

function addAlertsToExistingData(mealOrders, alertedMealOrders) {
    return mealOrders.map((mo) => {
        if (alertedMealOrders.includes(mo.id)) {
            mo.trayAlert = true
        }
        return mo
    })
}