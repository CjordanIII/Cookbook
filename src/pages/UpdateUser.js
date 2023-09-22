import { useEffect, useState } from "react";
import * as userApi from '../utils/users-api';
import { getUser } from "../utils/users-service";


export default function UpdateUser(){
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    newPassword:'',
    confirm:'',
  })
   useEffect(()=>{
    const user = getUser()
    
   },[])
  const handleSubmit = (e) =>{
    e.preventDefault();
    userApi.updateduser(formData);
  }
const handleChange = (e) =>
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            defaultValue={formData.Email}
            onChange={handleChange}
          />
          <label htmlFor="newPassword">New password</label>
          <input type="text" name="newPassword" onChange={handleChange} />

          <label htmlFor="confirm">Confirm password</label>
          <input type="text" name="confirm" onChange={handleChange} />
          <button type="submit" value="Update">
            Submit
          </button>
        </form>
      </div>
    );
}
