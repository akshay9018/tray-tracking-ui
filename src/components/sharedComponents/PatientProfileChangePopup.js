import React from "react";

const PatientProfileChangePopup = (props) => {
  return (
    <div >
      <div>Changes were made to patient profile for ticket #{props.ticketNumber}. Please review the changes for this patient.</div>
    </div>
  );
}
PatientProfileChangePopup.defaultProps = {
  active: false,
  isUndoEnable: false,
};
export default PatientProfileChangePopup;