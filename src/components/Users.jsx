import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = async (id) => {
        try {
            await axios.delete("https://nodejs-api-user.onrender.com/api/users/" + id);
            console.log("delete completed");
            window.location.reload();
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get("https://nodejs-api-user.onrender.com/api/users");
                console.log(res);
                setUsers(res.data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUsers();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const filterUsers = Array.isArray(users) ? users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="container">
            <h2 className="w-100 d-flex jsutify-content-center p-3">React JS Node Express JS CRUD</h2>
            <div className="row">
                <div className="col-md-12">
                    <p><Link to='/add' className="btn btn-success">Add new users</Link></p>
                    {/* <input type="text" value={searchQuery} onChange={handleSearch} /> */}
                    <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by name" />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>ID:</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                filterUsers.map((user, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Link to={`/read/${user.id}`} className="btn btn-success mx-2">Read</Link>
                                                <Link to={`/update/${user.id}`} className="btn btn-warning mx-2">Edit</Link>
                                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger mx-2">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })) : (
                                    <tr>
                                        <td colSpan="5">Not found users data</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users;