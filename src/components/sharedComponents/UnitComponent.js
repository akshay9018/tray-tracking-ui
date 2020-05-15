import React from "react";

const UnitComponent = (props) => {
  return (
    <div id={props.unit.id} onClick={() => props.handleClick(props.unit, props.isUndoEnable)}
      className={props.active ? 'unit-list order-detail-list active' : 'unit-list order-detail-list'}>
      {
        props.isUndoEnable ?
          <div className="tray-delivered">
            <button onClick={() => props.onUndo(props.unit)} className="unit-list-undo undo-bttn">Undo	</button>
          </div> : null
      }
      <div className={props.isUndoEnable ? "unit_tile_text" : ""}>
        <div className={props.isUndoEnable ? "undo-unit-name" : "unit_tile_text"}>
        <div className="text-ellipsis" style={{ maxWidth: '90%' }}>
          {props.unit.name}
          <br/>
          {props.unit.mealName}
        </div>
        </div>
      </div>

    </div>
  );
}
UnitComponent.defaultProps = {
  active: false,
  isUndoEnable: false,
};
export default UnitComponent;