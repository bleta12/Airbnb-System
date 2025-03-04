import { useState,useEffect } from "react";
import Dashboard from "./Dashboard";
import  axiosInstance  from '../axiosInstance';




const ManageUsers = () => {

    const[user,setUser] = useState([]);
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
          try {
            
              const response = await axiosInstance.get(`/user/getAllUserDto`);
              if (response.data) {
                setUser(response.data); 
                console.log(response.data);
              }
            
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
    
        fetchUser();
      }, []);



      
  const deleteUser = (id) => {

      axiosInstance
        .delete(`/user/delete/${id}`) 
        .then((response) => {
          
          setUser(user.filter((user) => user.id !== id));
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 2700);
          
        })
        .catch((error) => {
          console.error("There was an error deleting the user:", error);
          alert("An error occurred while deleting the user.");
        });
    
  };



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



            {showNotification && (
                <div
                    className="position-fixed bottom-0 end-0 p-3"
                    style={{
                        zIndex: 1050,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                >
                    <div className="toast show align-items-center text-white bg-success border-0">
                        <div className="d-flex">
                            <div className="toast-body">Deleted User!</div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setShowNotification(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                    </div>
                </div>
            )}


        
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
                            <td>{row.lastname}</td>
                            <td>{row.username}</td>
                            <td>{row.email}</td>
                            <td>{row.phoneNumber?row.phoneNumber:"---/---/---"}</td>

                            <td className="bg-light pe-0">
                              <button
                                className="btn btn-danger btn-sm ml-1 mt-1"
                                onClick={() => deleteUser(row.id)} 
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