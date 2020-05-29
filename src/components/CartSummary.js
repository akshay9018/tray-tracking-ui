import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import OrderTicketList from "./sharedComponents/OrderTicketList";
import { EMPTY_CART_DELETE_MESSAGE, CART_SUMMARY, REVIEW_ALERT_MEAL_ORDERS, ERROR_WHILE_ADDING_MEAL_ORDERS, CART_READY_FOR_NEXT_STEP,TRANSITIONAL_SUMMARY, MARK_DEPARTED_FOR_TRANSITIONAL, BUILD_AREA, SHOW_ALL_BUILD_AREAS, SEARCH, SEARCH_LABEL, TRANSITIONAL  } from "../redux/actions/Constants";
import { goToInCart } from '../redux/actions/TrayEventsAction'
import { selectMealOrder, markCartAsComplete, removeTrayFromCart, unselectMealOrder, fetchAllKitchensForSelectedFacility,filterTransitionalTrays }  from '../redux/actions/InCartAction';
import {  fetchTrayAlertDetails,
  acknowledgeAlert,
  closeAlertedTicketMessage,
  undoAlert } from '../redux/actions/TrayAlertAction';
import AppHeader from  "./sharedComponents/AppHeader";
import TrayAlertPopup from "./sharedComponents/TrayAlertPopup";
import { SEND_TO_HOLD, PROCEED_WITH_TRAY } from "../redux/actions/Types";
import CustomizedDialogs from "./sharedComponents/CustomizedDialogs";
import FiltersComponent from "./sharedComponents/FiltersComponent";
import CustomSearchBar from "./sharedComponents/CustomSearchBar";
class CartSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMealOrder: -1,
      selectedKitchenId: '-1',
      search:'',
      showClear: false
    }
    this.handleActionClick = this.handleActionClick.bind(this)
    this.returnSelectedOrder = this.returnSelectedOrder.bind(this)
    this.removeTray = this.removeTray.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
	this.sendToHold = this.sendToHold.bind(this);
    this.proceedWithTray = this.proceedWithTray.bind(this);
    this.closeAlertedTicketMessage = this.closeAlertedTicketMessage.bind(this);
    this.undoAlert = this.undoAlert.bind(this);

  }
	componentWillMount() {
	  this.props.fetchAllKitchensForSelectedFacility('-1');
}
  componentWillReceiveProps(nextProps) {
    if (this.props.showCartSummary !== nextProps.showCartSummary)
      this.props.goToInCart(this.props.history);
  }
  handleActionClick() {
    if (this.props.selectedCart.mealOrders !== undefined && this.props.selectedCart.mealOrders.length !== 0 && !this.props.selectedCart.containsTrayAlert )
      this.props.markCartAsComplete(this.props.selectedCart.id, this.props.selectedCart.zone);
  };
  returnSelectedOrder(mealOrder) {
    if (this.state.selectedMealOrder.id === mealOrder.id)
      this.setState({ selectedMealOrder: -1 })
    else{
      this.setState({ selectedMealOrder: mealOrder })
      if (mealOrder.trayAlert) {
        this.props.fetchTrayAlertDetails(mealOrder)
      }
    }
  }
  removeTray() {
    if (this.state.selectedMealOrder === -1 || this.state.selectedMealOrder.trayAlert)
      console.log("Please select a tray to remove");
    else {
      this.props.removeTrayFromCart(this.props.selectedCart.id, this.props.selectedCart.zone, this.state.selectedMealOrder.id);
      this.setState({ selectedMealOrder: -1 })
    }
  }

  clearSearch(){
    this.setState({showClear: false, search: ''})
    this.props.filterTransitionalTrays(this.state.selectedKitchenId,'');
  }
onChange(event){
   if (event.target.name === BUILD_AREA) {
   this.setState({selectedKitchenId: event.target.value})
     this.props.filterTransitionalTrays(event.target.value, this.state.search)
   }
   else if (event.target.name === SEARCH){
   this.setState({ [event.target.name] : event.target.value, showClear: event.target.value !== ''});
   this.props.filterTransitionalTrays(this.state.selectedKitchenId,event.target.value);
   }
}
  sendToHold() {
    this.props.acknowledgeAlert(this.state.alertedMealOrder, this.props.alertList, SEND_TO_HOLD ,  this.state.search)
  }

  proceedWithTray() {
    this.props.acknowledgeAlert(this.state.alertedMealOrder, this.props.alertList, PROCEED_WITH_TRAY)
  }

  closeAlertedTicketMessage() {
    this.setState({ alertedMealOrder: -1 })
    this.props.closeAlertedTicketMessage()
  }

  undoAlert(mealOrder) {
    this.props.undoAlert(mealOrder, this.state.searchText)
  }
  render() {
    var isTransitional = this.props.selectedCart && this.props.selectedCart.status === TRANSITIONAL;
    var CartBtnClassName = this.props.selectedCart && (this.props.selectedCart.mealOrders === undefined || this.props.selectedCart.mealOrders.length === 0) ? "cart-departed" : "cart-departed active";
    var filters = [
        { name: BUILD_AREA, value: this.state.selectedKitchenId, default: SHOW_ALL_BUILD_AREAS, optionArray: this.props.kitchens, class: 'service-style-filter' },
       ]
    const dialogContent = <div style={{margin: '27px'}}>{this.props.alertMessage}</div>
    var CartBtnClassName = this.props.selectedCart 
    && (this.props.selectedCart.mealOrders === undefined || this.props.selectedCart.mealOrders.length === 0 || this.props.selectedCart.containsTrayAlert) ? "cart-departed" : "cart-departed active";

    return (

      <div>
        {this.props.selectedCart && <div className="container">
        {this.props.loading && <div className="loader"><img alt="Loading. Please wait..." className="loading-gif" src={require("../images/loading.gif")}/></div>}

          <AppHeader props={this.props} showBack={true} title={isTransitional ? TRANSITIONAL_SUMMARY : CART_SUMMARY} />
          <div>
          {isTransitional ?  <span className="cart-box">
              <h4 className="pull-left">{MARK_DEPARTED_FOR_TRANSITIONAL}</h4>
            </span> :
             <Button style={{left : '175px'}} variant="contained" color="primary" className={CartBtnClassName} onClick={this.handleActionClick} >Cart Ready for Next Step</Button>}
           {isTransitional&& <div className = "margin-filter"><FiltersComponent menuClass="select-menu-incart" filters={filters} onChange={(e) => this.onChange(e)} />
           <div style={{float:'left'}}>
    <CustomSearchBar 
      placeholder = {SEARCH_LABEL}
      class = "search-custom-bar-depart search-custom-bar-transitional"
      display = {this.state.showClear}
      onChange = {this.onChange}
      clearSearch = {this.clearSearch}
      name = {SEARCH}
      value={this.state.search}
      />
    </div> 
    </div>
  }   </div>
          <div className="width-auto text-center" >
            
    


            <div className="outer-style less-255">
              <div className="scroll">
                <OrderTicketList
                  emptyListMessage={EMPTY_CART_DELETE_MESSAGE}
                  mealOrders={this.props.cartMealOrders}
                  selectedMealOrder={this.state.selectedMealOrder}
                  handleClick={this.returnSelectedOrder}
                />
              </div>
            </div>
          </div>
          <div className="width-330" >
            <div className={isTransitional ? "cart-details middle less-255 " : "cart-details middle less-255 margin-top-20"} >
              <div style={{ margin:'auto' }}>
                <div className={this.state.selectedMealOrder === -1 || this.state.selectedMealOrder.trayAlert ? "btn-tray disabled" : "btn-tray "}
                  color="primary" onClick={this.removeTray}>Remove Tray</div>
              </div>
            </div>
          </div>
        </div>
        
        }
        { this.props.showAlertMessage &&
                    <CustomizedDialogs dialogTitle={ERROR_WHILE_ADDING_MEAL_ORDERS}
                        dialogContent={dialogContent}
                        open={this.props.showAlertMessage} fullScreen={false}
                        handleClose={this.closeAlertMessage} />
                }
                {this.props.showAlertedTrayMessage &&
          <TrayAlertPopup
            open={this.props.showAlertedTrayMessage}
            sendToHold={this.sendToHold}
            proceedWithTray={this.proceedWithTray}
            handleClose={this.closeAlertedTicketMessage}
            trayAlert={this.props.alertList.length > 0 ? this.props.alertList[0] : undefined}
            ticketNumber={this.state.selectedMealOrder.ticketNumber} />
        }

        </div>

    );
  }
}
const mapStateToProps = state => {
  return {
    selectedCart: state.inCartReducer.selectedCart,
    showCartSummary: state.inCartReducer.showCartSummary,
    selectedScreen: state.inCartReducer.selectedScreen,
    loading: state.loader.loading,
    isOffline: state.offlineIndicator.isOffline,
    kitchens: state.inCartReducer.kitchens,
    cartMealOrders: state.inCartReducer.cartMealOrders,
    alertList: state.inCartReducer.alertList,
    showAlertedTrayMessage: state.inCartReducer.showAlertedTrayMessage,
    onHoldTrays: state.inCartReducer.onHoldTrays,
    errorOnAcknowledgment: state.inCartReducer.errorOnAcknowledgment,
  }
}
const mapDispatchToProps = {
  selectMealOrder,
  markCartAsComplete,
  removeTrayFromCart,
  unselectMealOrder,
  goToInCart,
  fetchAllKitchensForSelectedFacility,
  filterTransitionalTrays,
  fetchTrayAlertDetails,
  acknowledgeAlert,
  closeAlertedTicketMessage,
  undoAlert
}
CartSummary.defaultProps = {
  showAddTrayBtn: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);