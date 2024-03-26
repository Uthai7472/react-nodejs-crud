import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const {id} = useParams();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    }); 

    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        console.log(user);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/api/users/${id}`, user);
        console.log("ID :", id);
        navigate("/");
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/userdetail/" + id)
        .then(res => {
            console.log(res.data[0]);
            setUser(res.data[0]);
        })
        .catch(err => console.log(err))
    }, []);


  return (
    <div className='container'>
        <h2 className="w-100 d-flex justify-content-center p-3">Update User</h2>
        <div className="row">
            <div className="col-md-12"> 
                <h3>Update your detail</h3>
                <form action="">
                    <div className='mb-3 mt-3'>
                        <label htmlFor="" className="form-label">ID:</label>
                        <input type="text" className='form-control' onChange={handleChange} id='id' name='id' value={id} disabled />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor="" className="form-label">Full Name:</label>
                        <input type="text" className='form-control' onChange={handleChange} id='name' value={user.name} placeholder='Enter your full name' name='name'  />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor="" className="form-label">Email:</label>
                        <input type="text" className='form-control' onChange={handleChange} id='email' value={user.email} placeholder='Enter your email' name='email'  />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor="" className="form-label">Password:</label>
                        <input type="text" className='form-control' onChange={handleChange} id='password' value={user.password} placeholder='Enter your password' name='password' />
                    </div>
                    
                    <button type='submit' onClick={handleClick} className='btn btn-primary' >Update user</button>
                    <Link to='/'>See all users</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Update