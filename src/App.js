import React, { Component } from "react";
import "./App.css";
import LeftBanner from "./Components/LeftBanner";
import Table from "./Components/Table";
import Modal from "./Components/Modal";

class App extends Component {
  
  state = {
    data: [],
    updateobj: {},
    firstName: undefined,
    lastName: undefined,
    department: undefined,
    salary: undefined,
    showModal: false,
    editId: undefined,
    mode: false,
    deleteId: undefined,
    sort: "none",
    filter: "none",
    errorMsg: "",
  };
  componentDidMount = async () => {
    const response = await fetch('https://employee--springboot.herokuapp.com/employees')
    const data = await response.json()
    this.setState({ data: data })
  }
  handleGetData = async (newobj) => {
    await this.setState({
      updateobj: newobj
    })
    this.setState({ mode: true })
    console.log(this.state.mode)
  };
  handleChange = (e) => {
  };
  handleResetState = () => {
    this.setState({ mode: false })
  };
  handleClearFilter = () => {
  };
  //filter and sorting
  handleFilter = async (obj) => {
    var response = {}
    if (obj.sort !== "none" && obj.filter === "none") {
      response = await fetch('https://employee--springboot.herokuapp.com/employees/?salary=' + obj.sort)

    } else if (obj.filter !== "none" && obj.sort === "none") {
      response = await fetch('https://employee--springboot.herokuapp.com/employees/?dept=' + obj.filter)
    }
    else if (obj.filter !== "none" && obj.sort !== "none") {
      response = await fetch('https://employee--springboot.herokuapp.com/employees/?dept=' + obj.filter + '&salary=' + obj.sort)
    }
    else {
      response = await fetch('https://employee--springboot.herokuapp.com/employees')
    }
    const data = await response.json()
    this.setState({ data: data })
  };
  handleDelete = (i) => {
    console.log("handle delete called")
    this.setState({
      showModal: true,
      deleteId: i
    })
  };
  closeModal = () => {
    this.setState({ showModal: !this.state.showModal })
  };
  handleEdit = (i) => {
  };
  handleDeleteEmployee = async (i) => {
    const request = {
      method: 'Delete',
      headers: { 'Content-type': 'application/json' }
    }
    const url = "https://employee--springboot.herokuapp.com/employees/" + i
    const response = await fetch(url, request)
    console.log(response)
    if (response.ok) {
      console.log("deleted successfully")
    }
    this.componentDidMount()
    this.closeModal()
  };
  handleValidation = () => {
  };
  handleAdd = async (newobj) => {
    console.log(this.state.updateobj.id)
    var request = {}
    var response = {}
    if (this.state.mode) {
      request = {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newobj)
      }
      response = await fetch("https://employee--springboot.herokuapp.com/employees/" + this.state.updateobj.id, request)
    } else {
      request = {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newobj)
      }
      response = await fetch("https://employee--springboot.herokuapp.com/employees", request)
    }
    //const response = await fetch("https://employee--springboot.herokuapp.com/employees",request)
    if (response.ok) {
      console.log("saved ")
    }
    this.componentDidMount()
  };
  render() {
    return (
      <div>
        <header className="Header">
          Vechile Management
        </header>
        <div className="Body">
          <LeftBanner handleAdd={this.handleAdd} updateobj={this.state.updateobj} mode={this.state.mode} handleResetState={this.handleResetState} handleFilter={this.handleFilter} />
          <Table data={this.state.data} handleDelete={this.handleDelete} handleGetData={this.handleGetData} />
         
          {this.state.showModal &&
            <Modal closeModel={this.closeModal} deleteId={this.state.deleteId} handleDeleteEmployee={this.handleDeleteEmployee} />
          }
        </div>
      </div>
    );
  }
}

export default App;
