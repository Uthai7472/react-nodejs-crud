import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


const Read = () => {

    const {id} = useParams();
    const [user, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/userdetail/" + id)
        .then(res => {
            
            setUsers(res.data[0]);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, []);

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12">
                <h1>User Details</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Full Name</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ user.id }</td>
                            <td>{ user.name }</td>
                            <td>{ user.email }</td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Read