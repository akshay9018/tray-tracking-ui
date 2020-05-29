import React from "react";

const PatientProfileChangePopup = (props) => {
  return (
    <div className="content" >
      <p> Changes were made to patient profile for ticket #{props.ticketNumber}. Please review the changes for this patient.</p>
      
      <div  className="patient-details-50">
      <h2> Previous Patient Details</h2>
        <div className="border pull-left">
     <h2 style={{'padding-left':'10px'}}> Diet:</h2>  
          <ul>
            <li>Allergies:</li>
            <li>Supplements:</li>
            <li>Tube Feeding:</li>
            <li>Patient Notes:</li>
            </ul>
          </div> </div>
      <div  className="patient-details-50">
      <h2>Current Patient Details</h2>
      <div className="border pull-right">
      <h2 style={{'padding-left':'10px'}}>  Diet: </h2>  
      <ul>
            <li>Allergies:</li>
            <li>Supplements:</li>
            <li>Tube Feeding:</li>
            <li>Patient Notes:</li>
            </ul>
       </div> 
       </div>
      </div>
 
  );
}
PatientProfileChangePopup.defaultProps = {
  active: false,
  isUndoEnable: false,
};
export default PatientProfileChangePopup;