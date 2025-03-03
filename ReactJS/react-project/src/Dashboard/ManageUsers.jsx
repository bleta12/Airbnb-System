import { useState } from "react";
import Dashboard from "./Dashboard";
import { Link } from 'react-router-dom';



const ManageUsers = () => {

    const[user,setUser] = useState([]);

    return (
        <>
         
            <div className="container d-flex p-0" style={{ margin: 0, padding: 0 }}>
              {/* Sidebar */}
              <div
                className="navbar-nav sidebar sidebar-dark accordion"
                style={{ margin: 0, padding: 0 }}
              >
                <Dashboard />
              </div>
              <div
                className="main-body flex-grow-1 ms-lg-5 mt-5"
                style={{
                  marginLeft: '150',
                 
                }}
                
              >
        
        
        <div className="col-md-9 col-lg-10 offset-md-3 offset-lg-2 mt-5 ms-5">
          <div className="container "  style={{
                  marginLeft: '80px',
                }}>
            {/* Header Section */}
            <div className="row mb-5">
              <div className="col">
                <h1 className="h3 mb-4 text-dark font-weight-bold">Manage Users</h1>
              </div>
            </div>
        
            {/* Property Listings Card */}
            <div className="card shadow-lg border-0 rounded-lg mb-4">
              <div className="card-header py-4 rounded-top">
                <h6 className="m-0 font-weight-bold">User Listings</h6>
              </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered" width="100%" cellspacing="0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Last Name</th> 
                          <th>Username</th>    
                          <th>Email</th>  
                          <th>Phone Number</th>             
                        </tr>
                      </thead>
                      <tbody>
                        {user.map((row, index) => (
                          <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.price}€</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm ml-2 mt-1"
                               
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))} 
                      </tbody>
                    </table>
        
                  </div>
                </div>
              </div>
              </div>
              </div>
            </div>
            </div>
            </>
          );
     
};

export default ManageUsers;