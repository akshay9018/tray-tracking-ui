import React from "react";

const PatientProfileChangePopup = (props) => {
  return (
    <div className="content" >
      <p> Changes were made to patient profile for ticket #{props.ticketNumber}. Please review the changes for this patient.</p>
      
      <div  className="patient-details-50">
      <h2> Previous Patient Details</h2>
        <div className="border pull-left">
     <h2 style={{'padding-left':'10px'}}> Diet: <span>{props.oldDetails.diet}</span></h2>  
          <ul>
            <li>Allergies: <span>{props.oldDetails.allergies}</span></li>
            <li>Supplements: <span>{props.oldDetails.supplements}</span></li>
            <li>Tube Feeding: <span>{props.oldDetails.tubeFeeding}</span></li>
            <li>Patient Notes:</li>
            <li style={{'padding-left':'10px'}}>Special Instructions: <span>{props.oldDetails.instructions}</span></li>
            <li style={{'padding-left':'10px'}}>Preferences: <span>{props.oldDetails.preferences}</span></li>
            </ul>
          </div> </div>
      <div  className="patient-details-50">
      <h2>Current Patient Details</h2>
      <div className="border pull-right">
      <h2 style={{'padding-left':'10px'}}>  Diet: <span>{props.newDetails.diet}</span></h2>  
      <ul>
            <li>Allergies: <span>{props.newDetails.allergies}</span></li>
            <li>Supplements: <span>{props.newDetails.supplements}</span></li>
            <li>Tube Feeding: <span>{props.newDetails.tubeFeeding}</span></li>
            <li>Patient Notes:</li>
            <li style={{'padding-left':'10px'}}>Special Instructions: <span>{props.newDetails.instructions}</span></li>
            <li style={{'padding-left':'10px'}}>Preferences: <span>{props.newDetails.preferences}</span></li>
            </ul>
       </div> 
       </div>
      </div>
 
  );
}
PatientProfileChangePopup.defaultProps = {
};
export default PatientProfileChangePopup;