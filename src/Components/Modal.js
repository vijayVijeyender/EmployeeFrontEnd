import React, { Component } from "react";

class Modal extends Component {

 
  render() {
    return (
      <div>
        <div className="modalBg"></div>
        <div className="pop">
      <h2>Confirm</h2>
      <hr />
      <p>Are you sure you ? do you want to delete the employee details with id:{this.props.deleteId} </p>
      <button className="ConfrimButton" onClick={()=>{
        this.props.handleDeleteEmployee(this.props.deleteId)
      
      }}>ok</button>
      <button className="ConfrimButton" onClick={()=>{
        this.props.closeModel()
      }}>cancel</button>
        </div>
      </div>
    );
  }
}

export default Modal;
