import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Add = () => {
    const [users, setUsers] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [resMsg, setResMsg] = useState('None');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUsers({...users, [name]: value});
        // setUsers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    console.log(users);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://nodejs-api-user.onrender.com/api/create", users);
            console.log("Response from server:" + res.data);
            // alert(res.data);
            setResMsg(res.data);
            setTimeout(() => {
                setResMsg('None');
                navigate("/");
            }, 2000);

            

        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='container'>
        <h2 className="w-100 d-flex justify-content-center p-3">Add New User</h2>
        <div className="row">
            <div className="col-md-12">
                <h3>Add your detail</h3>
                <form action="">
                    <div className='mb-3 mt-3'>
                        <label htmlFor="" className="form-label">Full Name:</label>
                        <input type="text" className='form-control' id='name' placeholder='Enter your full name' name='name' onChange={handleChange} required />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor="" className="form-label">Email:</label>
                        <input type="text" className='form-control' id='email' placeholder='Enter your email' name='email' onChange={handleChange} required />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor="" className="form-label">Password:</label>
                        <input type="text" className='form-control' id='password' placeholder='Enter your password' name='password' onChange={handleChange} required />
                    </div>
                    
                    <button type='submit' className='btn btn-primary' onClick={handleClick}>Add user</button>
                    <Link to='/'>See all users</Link>
                </form>
                { resMsg && <div>Response: {resMsg}</div> }
            </div>
        </div>
    </div>
  )
}

export default Add