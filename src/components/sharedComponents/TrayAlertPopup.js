import React from "react";
import { ALERT_LABEL, PROCEED_WITH_TRAY_LABEL, SEND_TO_HOLD_LABEL, NOT_EATEN_LABEL } from "../../redux/actions/Constants";
import CustomizedDialogs from "./CustomizedDialogs";
import PatientProfileChangePopup from "./PatientProfileChangePopup";

const TrayAlertPopup = (props) => {
  var dialogContent = "";
  var onAccept;
  var onReject;
  var showButtons = true;
  var acceptBtnText;
  var rejectBtnText;
  var displayOptionThree = false;
  var onOptionThree;
  var optionThreeText;
  var customClassName
  if (props.trayAlert && props.trayAlert.patientAlert) {
    dialogContent = 
    <PatientProfileChangePopup 
     ticketNumber = {props.ticketNumber}
     oldDetails = {props.trayAlert.oldDetails}
     newDetails = {props.trayAlert.newDetails}
     />
    onAccept = props.proceedWithTray;
    acceptBtnText = PROCEED_WITH_TRAY_LABEL;
    onReject = props.notEaten;
    rejectBtnText = NOT_EATEN_LABEL;
    onOptionThree = props.sendToHold;
    optionThreeText = SEND_TO_HOLD_LABEL;
    displayOptionThree = true;
    customClassName = "popup-patient-alert-width"
  }

  return (
    <CustomizedDialogs dialogTitle={ALERT_LABEL}
      dialogContent={dialogContent}
      open={true} fullScreen={false}
      showButtons={showButtons}
      acceptBtn={acceptBtnText}
      rejectBtn={rejectBtnText}
      actionOnReject={true}
      onAccept={onAccept}
      onReject={onReject}
      displayOptionThree={displayOptionThree}
      optionThree={optionThreeText}
      onOptionThree={onOptionThree}
      handleClose={props.handleClose}
      customClassName={customClassName} />
  );
}
TrayAlertPopup.defaultProps = {
  active: false,
  showDeliveryTime: true,
  isUndoEnable: false,
};
export default TrayAlertPopup;