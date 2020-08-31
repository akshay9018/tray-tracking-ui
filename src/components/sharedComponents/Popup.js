import React from "react";

const Popup = (props) => {
  return (
    <div className="custum-popup">
    <div className="right-text-popup"> Minutes passed since first tray was added to the cart</div>

    <div className="left-text-popup"  >
   <div>Cart's zone number   </div>   
    <div style={{paddingTop: '20px'}}>  The earliest delivery time of a tray in the cart
        if this font is red, the cart contains a RUSH tray </div> 
        
    </div>
    <div className="bg-tray-img"> </div>

    <div className="width-100"> Tray ticket numbers of trays inside the cart<br/>
        Only 12 numbers can display at a time, even if more
        <br/> than 12 trays are in the cart        <br/> <br/>
        The search bar in the top right corner of the screen will filter carts based on matching criteria 
        even if the tray ticket number in not displayed on the cart
    </div>

    
</div>
  );
}
Popup.defaultProps = {
};
export default Popup;