import React, { Component } from "react";
import { connect } from 'react-redux';
import { removeTrayFromCart, fetchAllUnitsForSelectedKitchen, unselectMealOrder, selectMealOrder } from '../../redux/actions/InCartAction';
import { markCartDeparted, openDepartedCartSummary, hideConfirmationPopup, markTrayAsDeparted, undoDepartedTray } from '../../redux/actions/DepartureAction';
import { openReadyToDepart } from '../../redux/actions/TrayEventsAction'
import CustomizedDialogs from './CustomizedDialogs';
import Button from '@material-ui/core/Button';
import AppHeader from "./AppHeader";
import InCart from "../InCart";
import OrderTicketList from "./OrderTicketList";
import {
    DEPARTED_SCREEN_NAME, DELIVERED,
    NEXT_ACTION_CONFIRMATION, EMPTY_CART_DELETE_MESSAGE, ADD_TRAYS_SCREEN_NAME,
    START_DELIVERING_TRAYS, RETURN_TO_DEPARTED,
    ERROR_WHILE_DEPARTING_CART, ERROR_WHILE_DEPARTING_CART_MESSAGE, MARK_AS_DEPARTED, TRANSITIONAL_TRAYS, NO_MORE_TRANSITIONAL_TRAYS_TO_BE_DEPARTED
} from "../../redux/actions/Constants";
import {
    MARK_CART_DEPARTED,
    MARK_TRAY_CHECKED
} from '../../utils/ConstantsWithStyle';
import { Grid } from "@material-ui/core";

class TransitionalTrays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMealOrder: -1,
            isOpen: true,
            showConfirm: false,
            selectedUnit: -1,
            openAddTrayPopup: false,
            isDeparted: this.props.screenName === DEPARTED_SCREEN_NAME,
            showTrayDepartedConfirm: false,
            departedTrays: [],
        }
        this.removeTray = this.removeTray.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.markCartDeparted = this.markCartDeparted.bind(this);
        this.onAccept = this.onAccept.bind(this);
        this.hideConfirmation = this.hideConfirmation.bind(this);
        this.onAddTrays = this.onAddTrays.bind(this);
        this.returnSelectedOrder = this.returnSelectedOrder.bind(this);
        this.onUndo = this.onUndo.bind(this);
        this.goToDeliveredSummary = this.goToDeliveredSummary.bind(this)
        this.goToDepartedScreen = this.goToDepartedScreen.bind(this)
        this.showConfirmDeparted = this.showConfirmDeparted.bind(this)
        this.markTrayAsDeparted = this.markTrayAsDeparted.bind(this)
    }
    handleClose() {
        this.props.closeDepartedSummary()
    };

    markTrayAsDeparted() {
        if (this.state.selectedMealOrder === -1)
            console.log("Please select a tray to depart");
        else {
            this.props.markTrayAsDeparted(this.state.selectedMealOrder, this.props.selectedCart.mealOrders.length - 1);
            this.setState({ showTrayDepartedConfirm: false, selectMealOrder: -1 })
        }
    }

    showConfirmDeparted() {
        this.setState({ showTrayDepartedConfirm: true })
    }

    returnSelectedOrder(mealOrder, isUndoEnable) {
        if (!isUndoEnable) {
            if (this.state.selectedMealOrder.id === mealOrder.id) {
                this.setState({ selectedMealOrder: -1 });
            }
            else {
                this.setState({ selectedMealOrder: mealOrder });
            }
        }
    }

    removeTray() {
        if (this.state.selectedMealOrder === -1)
            console.log("Please select a tray to remove");
        else {
            this.props.removeTrayFromCart(this.props.selectedCart.id, this.props.selectedCart.zone,
                this.state.selectedMealOrder.id, this.props.parentProps.history, this.state.isDeparted, false);
            this.setState({ selectedMealOrder: -1 })
        }
    }

    onAccept() {
        this.setState({ showConfirm: false, selectedMealOrder: -1 })
        this.props.markCartDeparted(this.props.selectedCart);
    }

    goToDeliveredSummary() {
        this.props.hideConfirmationPopup();
        this.setState({ selectedMealOrder: -1 })
        this.props.openDepartedCartSummary(this.props.selectedCart, this.props.parentProps.history, DELIVERED, this.props.isTransitional);
    }

    goToDepartedScreen() {
        this.props.hideConfirmationPopup();
        this.props.openReadyToDepart(this.props.parentProps.history)
    }

    hideConfirmation() {
        this.setState({ showTrayDepartedConfirm: false, showErrorWhileDeparting: false, selectedMealOrder: -1 });
    }

    markCartDeparted() {
        if (this.props.selectedCart.mealOrders && this.props.selectedCart.mealOrders.length > 0) {
            this.setState({ showConfirm: true });
        }
    }

    onAddTrays() {
        this.setState({ selectedMealOrder: -1, openAddTrayPopup: !this.state.openAddTrayPopup })
    }

    onUndo(mealOrder) {
        this.props.undoDepartedTray(mealOrder)
        this.setState({ selectedMealOrder: -1 })
    }

    render() {
        var addTraysPopupScreen = <InCart screenName={ADD_TRAYS_SCREEN_NAME} cart={this.props.selectedCart} handleClose={this.onAddTrays} />
        var selectedMealOrder = this.state.selectedMealOrder;
        const dialogContent = <div style={{ margin: '27px', fontWeight: '500' }}>{ERROR_WHILE_DEPARTING_CART_MESSAGE}</div>
        const dialogTitle = <div style={{ color: 'transparent' }}>{ERROR_WHILE_DEPARTING_CART}</div>
        return (
            <div className="container">
                {this.props.loading
                    && <div className="loader"><img alt="Loading. Please wait..." className="loading-gif" src={require("../../images/loading.gif")} /></div>}
                <AppHeader props={this.props.parentProps} showBack={this.props.showBack} title={this.props.screenName} />
                <Grid className={this.props.isTransitional ? "transitional-depart-top" : "depart-top"}>
                    <h4>Cart Summary<br />{this.props.isTransitional ? TRANSITIONAL_TRAYS : "Zone " + this.props.selectedCart.zone}</h4>
                    {!this.props.isTransitional && <div className="depart-button">
                        <Button variant="contained" color="primary"
                            className={this.props.selectedCart && this.props.selectedCart.mealOrders.length > 0 ? "cart-departed active" : "cart-departed"}
                            onClick={this.markCartDeparted}
                        >Mark Cart as Departed </Button>
                    </div>}
                </Grid>
    }
                <div className="width-auto text-center">
                    <div className={"outer-style less-255"}>
                        <div className="scroll">
                            {this.props.loading ?
                                null :
                                <OrderTicketList
                                    emptyListMessage={this.props.isTransitional ? NO_MORE_TRANSITIONAL_TRAYS_TO_BE_DEPARTED : EMPTY_CART_DELETE_MESSAGE}
                                    handleClick={this.returnSelectedOrder}
                                    mealOrders={this.props.selectedCart.mealOrders}
                                    selectedMealOrder={this.state.selectedMealOrder}
                                    showDeliveryTime={true}
                                    isRecovered={false} />
                            }
                            {
                                this.props.isTransitional &&
                                <div> {this.props.loading ?
                                    null : <OrderTicketList
                                        emptyListMessage=""
                                        handleClick={this.returnSelectedOrder}
                                        mealOrders={this.props.departedTrays}
                                        showDeliveryTime={true}
                                        isRecovered={false}
                                        onUndo={this.onUndo} />
                                }
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="width-330">
                    <div className="cart-details less-255">
                        <div className={this.props.isTransitional ? "middle transitional-depart" : "middle nontransitional-depart"}>
                            {this.props.isTransitional &&
                                <div className={this.props.selectedCart.mealOrders
                                    && selectedMealOrder !== -1
                                    ? "btn-tray" : "btn-tray disabled"} color="primary"
                                    onClick={this.showConfirmDeparted}><span>{MARK_AS_DEPARTED}</span></div>
                            }
                            <div className={this.props.selectedCart.mealOrders
                                && selectedMealOrder !== -1
                                ? "btn-tray" : "btn-tray disabled"} color="primary"
                                onClick={this.removeTray}>Remove Tray</div>
                            <div className={this.props.selectedCart && this.props.selectedCart.mealOrders && this.props.selectedCart.mealOrders.length > 0 ? "btn-tray" : "btn-tray disabled"}
                                color="primary"
                                onClick={this.onAddTrays}>Add Trays</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.showConfirm &&
                    <CustomizedDialogs dialogTitle="Confirm"
                        dialogContent={MARK_CART_DEPARTED}
                        open={this.state.showConfirm} showButtons={true}
                        onAccept={this.onAccept} handleClose={this.hideConfirmation}
                        showInfoMessage={false} />
                }
                {
                    !this.props.isTransitional && this.props.cartMarkedDepartedSuccessMessage &&
                    <CustomizedDialogs dialogTitle="Confirm"
                        dialogContent={NEXT_ACTION_CONFIRMATION}
                        open={this.props.cartMarkedDepartedSuccessMessage}
                        showButtons={true}
                        acceptBtn={START_DELIVERING_TRAYS}
                        rejectBtn={RETURN_TO_DEPARTED}
                        onAccept={this.goToDeliveredSummary}
                        handleClose={this.goToDepartedScreen} />
                }
                {
                    this.props.trayMarkedDepartedSuccessMessage &&
                    <CustomizedDialogs dialogTitle="Confirm"
                        dialogContent={NEXT_ACTION_CONFIRMATION}
                        open={this.props.trayMarkedDepartedSuccessMessage}
                        showButtons={true}
                        acceptBtn={START_DELIVERING_TRAYS}
                        rejectBtn={RETURN_TO_DEPARTED}
                        onAccept={this.goToDeliveredSummary}
                        handleClose={this.props.hideConfirmationPopup} />
                }
                {
                    this.props.errorWhileDepartingTrayMessage &&
                    <CustomizedDialogs dialogTitle={dialogTitle}
                        customClassName="popup-xsm-width"
                        dialogContent={dialogContent}
                        open={this.props.errorWhileDepartingTrayMessage}
                        showButtons={false}
                        showOnlyOkButton={true}
                        handleClose={this.props.hideConfirmationPopup} />
                }
                {
                    this.props.errorWhileDepartingMessage &&
                    <CustomizedDialogs dialogTitle={dialogTitle}
                        customClassName="popup-xsm-width"
                        dialogContent={dialogContent}
                        open={this.props.errorWhileDepartingMessage}
                        showButtons={false}
                        showOnlyOkButton={true}
                        handleClose={this.props.hideConfirmationPopup} />
                }
                {
                    this.state.showTrayDepartedConfirm &&
                    <CustomizedDialogs dialogTitle="Confirm"
                        dialogContent={MARK_TRAY_CHECKED}
                        open={this.state.showTrayDepartedConfirm} showButtons={true}
                        onAccept={this.markTrayAsDeparted} handleClose={this.hideConfirmation}
                        showInfoMessage={false} />
                }
                {
                    this.state.openAddTrayPopup &&
                    <CustomizedDialogs dialogTitle="Add Trays"
                        fullScreen={true}
                        dialogContent={addTraysPopupScreen}
                        handleClose={this.onAddTrays}
                        open={this.state.openAddTrayPopup}
                        showBackButton={true} />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedMealOrder: state.inCartReducer.selectedMealOrder,
        departedTrays: state.departReducer.departedTrays,
        cartMarkedDepartedSuccessMessage: state.departReducer.cartMarkedDepartedSuccessMessage,
        errorWhileDepartingMessage: state.departReducer.errorWhileDepartingMessage,
        trayMarkedDepartedSuccessMessage: state.departReducer.trayMarkedDepartedSuccessMessage,
        errorWhileDepartingTrayMessage: state.departReducer.errorWhileDepartingTrayMessage,
        loading: state.loader.loading
    }
}
const mapDispatchToProps = {
    removeTrayFromCart,
    markCartDeparted,
    fetchAllUnitsForSelectedKitchen,
    selectMealOrder,
    unselectMealOrder,
    openDepartedCartSummary,
    openReadyToDepart,
    hideConfirmationPopup,
    markTrayAsDeparted,
    undoDepartedTray,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionalTrays);