import React from "react";

const PatientProfileChangePopup = (props) => {
  return (
    <div className="content" >
      <p> Changes were made to patient profile for ticket #{props.ticketNumber}. Please review the changes for this patient.</p>
      
      <h2 className="heading-text"> Previous Patient Details</h2>
      <h2 className="heading-text heading-2">Current Patient Details</h2>
       <div className="table-outer">
        <table className="table-alert-box border">
        	<tr>
        	 	<td>Diet:  <span> {props.oldDetails.diet}</span> </td>
        	 	<td>Diet:  <span> {props.newDetails.diet}</span> </td>
            </tr>
            <tr>
       	 		<td>Allergies:  <span>{putEmptyStringIfEmpty(props.oldDetails.allergies)}</span> </td>
       	 		<td>Allergies:  <span>{putEmptyStringIfEmpty(props.newDetails.allergies)}</span> </td>
            </tr>
            <tr>
   	 			<td>Supplements:  <span>{putEmptyStringIfEmpty(props.oldDetails.supplements)}</span> </td>
   	 			<td>Supplements:  <span>{putEmptyStringIfEmpty(props.newDetails.supplements)}</span> </td>
   	 		</tr>
   	 		<tr>
   	 			<td>Tube Feeding:  <span>{putEmptyStringIfEmpty(props.oldDetails.tubeFeedings)}</span> </td>
   	 			<td>Tube Feeding:  <span>{putEmptyStringIfEmpty(props.newDetails.tubeFeedings)}</span> </td>
			</tr>
			<tr>
	 			<td>Patient Notes:  <span>{putEmptyStringIfEmpty(props.oldDetails.notes)}</span> </td>
	 			<td>Patient Notes:  <span>{putEmptyStringIfEmpty(props.newDetails.notes)}</span> </td>
	 		</tr>
	 		<tr>
 				<td>Special Instructions:  <span>{putEmptyStringIfEmpty(props.oldDetails.instructions)}</span> </td>
 				<td>Special Instructions:  <span>{putEmptyStringIfEmpty(props.newDetails.instructions)}</span> </td>
 			</tr>
 			<tr>
				<td>Preferences:  <span>{putEmptyStringIfEmpty(props.oldDetails.preferences)}</span> </td>
				<td>Preferences:  <span>{putEmptyStringIfEmpty(props.newDetails.preferences)}</span> </td>
			</tr>
			</table>
          </div> 
        </div>
 
  );
}
PatientProfileChangePopup.defaultProps = {
};

function putEmptyStringIfEmpty(detailString){
  return detailString && detailString.trim() !== '' ?
      detailString : '--';
}
export default PatientProfileChangePopup;