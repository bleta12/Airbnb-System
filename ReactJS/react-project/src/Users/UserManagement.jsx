import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-light p-3 vh-100" style={{ width: "250px" }}>
                <h5 className="mb-4">Settings</h5>
                <ul className="nav flex-column">
                    <li className="nav-item"><a href="#" className="nav-link">My Details</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Profile</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Password</a></li>
                    <li className="nav-item"><a href="#" className="nav-link active fw-bold">Team</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Billing</a></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="container-fluid p-4">
                <h2 className="mb-3">Team Members</h2>
                <p>Manage your team members and their account permissions here.</p>

                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-primary">+ Add Team Member</button>
                </div>

                {/* Admin Users */}
                <h5>Admin Users</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Added</th>
                            <th>Last Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(user => user.role === "Admin").map(user => (
                            <tr key={user.id}>
                                <td className="d-flex align-items-center">
                                    <img src={user.avatar} alt="avatar" className="rounded-circle me-2" width="40" height="40" />
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.dateAdded}</td>
                                <td>{user.lastActive}</td>
                                <td>
                                    <button className="btn btn-outline-secondary btn-sm mx-1">✏️</button>
                                    <button className="btn btn-outline-danger btn-sm mx-1">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Account Users */}
                <h5>Account Users</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Added</th>
                            <th>Last Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(user => user.role === "User").map(user => (
                            <tr key={user.id}>
                                <td className="d-flex align-items-center">
                                    <img src={user.avatar} alt="avatar" className="rounded-circle me-2" width="40" height="40" />
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.dateAdded}</td>
                                <td>{user.lastActive}</td>
                                <td>
                                    <button className="btn btn-outline-secondary btn-sm mx-1">✏️</button>
                                    <button className="btn btn-outline-danger btn-sm mx-1">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
