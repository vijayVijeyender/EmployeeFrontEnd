import React, { useState,useEffect } from "react";



function LeftBanner(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState()
  const [department, setDepartment] = useState()
  const [salary, setSalary] = useState()
  const [sort,setSort]=useState("none")
  const [filter,setFilter]=useState("none")

  useEffect(() => {
    console.log(props.updateobj);
    if (props.updateobj.firstName) {
      setFirstName(props.updateobj.firstName)
    }
    if (props.updateobj.lastName) {
      setLastName(props.updateobj.lastName)
    }
    if (props.updateobj.department) {
      setDepartment(props.updateobj.department)
    }
    if (props.updateobj.salary) {
      setSalary(props.updateobj.salary)
    }
  }, [props.updateobj]);

  const handleclear =()=>{
       setFirstName("")
          setLastName("")
          setDepartment("Select Department")
          setSalary("")
  }
  return (
    <div className="LeftBanner">
   
      <div className="AsideDiv">
      { props.mode===true ? <div className="AsideTitle">update &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={()=>{
          setFirstName("")
          setLastName("")
          setDepartment("Select Department")
          setSalary("")
          props.handleResetState()
      }} className="ClearButton">clear</button></div>:
        <div className="AsideTitle">Add &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  onClick={()=>{
          setFirstName("")
          setLastName("")
          setDepartment("Select Department")
          setSalary("")
          
      }} className="ClearButton">clear</button></div>

  }
        <hr />
        <input className="InputFields" value={firstName} onChange={(e) => {
          setFirstName(e.target.value)
        }} placeholder="FirstName" ></input>
        <input className="InputFields" value={lastName} onChange={(e) => {
          setLastName(e.target.value)
        }} placeholder="LastName" ></input>
        <select value={department} onChange={(e) => {
          setDepartment(e.target.value)
        }}>
          <option default value="Select Department">Select Department</option>
          <option value="Full-stack">Full-stack</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="Testing">Testing</option>
        </select>
        <input className="InputFields" value={salary} onChange={(e) => {
          setSalary(e.target.value)
        }} placeholder="salary" ></input>
          { props.mode===true ?
        <button className="AddButton" onClick={() => {
          const newobj = {
            firstName: firstName,
            lastName: lastName,
            department: department,
            salary: salary
          }
          props.handleAdd(newobj)
          handleclear()
        }}>Update Employee</button>:<button className="AddButton" onClick={() => {
          const newobj = {
            firstName: firstName,
            lastName: lastName,
            department: department,
            salary: salary
          }
          props.handleAdd(newobj)
          handleclear()
        }}>Add Employee</button>}
      </div>

      <div className="AsideDiv">
        <div className="AsideTitle">Filter&Sort &nbsp; <button  onClick={()=>{
          setSort("Full-stack")
          setFilter("none") 
      }} className="ClearButton">clear</button></div>


        <hr />

        <select value={filter} onChange={(e)=>{
         setFilter(e.target.value)
        }}>
          <option default value="none">-No Filter-</option>
          <option value="Full-stack">Full-stack</option>
          <option value="Front-end">Front-End</option>
          <option value="Back-end">Back-End</option>
          <option value="Testing">Testing</option>
        </select>
        <select value={sort} onChange={(e)=>{
          setSort(e.target.value)
        }}>
          <option default value="none">-No Sorting-</option>
          <option value="asc">Low-high</option> 
          <option value="desc">high-low</option>
        </select>
        <button onClick={
          ()=>{

            
            const request={
              sort:sort,
              filter:filter
            }
           
            if(request.sort !=="No Sorting" || request.filter!=="No Filter")
            props.handleFilter(request)
          }
        } className="AddButton">Filter</button>

      </div>
    </div>
  );
}

export default LeftBanner;
