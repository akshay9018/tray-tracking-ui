import React from "react";

const PatientProfileChangePopup = (props) => {
  return (
         <div className="content">

      <p> Changes were made to patient profile for ticket #{props.ticketNumber}. Please review the changes for this patient.</p>
          <h2 className="heading-text"> Previous Patient Details</h2>
          <h2 className="heading-text">Current Patient Details</h2>

<div  className="table-outer">
      <table className="table-alert-box border"  >

      <tr>
              <td>Diet:  <span> {props.oldDetails.diet}</span> </td>
              <td>Diet:  <span> {props.newDetails.diet}</span>  </td>
            </tr>


      <tr>
              <td>Allergies <span> {props.oldDetails.allergies}</span> </td>
              <td>Allergies <span> {props.newDetails.allergies}</span></td>
            </tr>

            <tr>
              <td>Supplements: <span> {props.oldDetails.supplements} </span>  </td>
              <td>Supplements: <span> {props.newDetails.supplements}</span></td>
            </tr>

            <tr>
              <td>Tube Feeding: <span> {props.oldDetails.tubeFeeding}</span> </td>
              <td>Tube Feeding: <span> {props.newDetails.tubeFeeding}</span></td>
            </tr>

            <tr>
              <td>Patient Notes: <span> {props.oldDetails.instructions}</span> </td>
              <td>Patient Notes:<span> {props.newDetails.instructions}</span></td>
            </tr>

          </table>
          </div>

      </div>

  );
}
PatientProfileChangePopup.defaultProps = {
};
export default PatientProfileChangePopup;