import React from "react";
import editIcon from "../images/edit.png";
import deleteIcon from "../images/delete.png";

function Table(props) {
  return (
    <div className="TableContainer">

      <table className="Table">

        <thead>
          <tr>
            <th>id</th>
            <th>Employee name</th>
            <th>Department</th>
            <th>Salary</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            props.data.length === 0 ? <td align="float-left">No Employee found</td> :
              props.data.map((item, index) => (
                <tr key={index}>
                  <td >{item.id}</td>
                  <td >{item.firstName + item.lastName}</td>
                  <td >{item.department}</td>
                  <td >{item.salary}</td>
                   <td> <img onClick={() => {
                    console.log("on edit exeuted")
                    const updateobj = {
                      id: item.id,
                      firstName: item.firstName,
                      lastName: item.lastName,
                      department: item.department,
                      salary: item.salary,
                    }
                    props.handleGetData(updateobj)

                  }} src={editIcon} alt={"vijay"} width="15px"></img></td>
                  <td> <img alt={"vijay"} onClick={() => { props.handleDelete(item.id) }} src={deleteIcon} width="15px"></img></td>
                </tr>
              ))}
        </tbody>

      </table>

    </div>
  );
}

export default Table;
