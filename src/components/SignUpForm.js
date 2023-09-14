import { useState } from "react";
import { signup } from "../utils/users-service";
function SignUpForm({setUser}){
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirm:"",
        error:"",
    })
    const disable = formData.password !== formData.confirm
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            error: ''
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
  
          const userFormData = {...formData}
          // delete extra props
          delete userFormData.confirm
          delete userFormData.error
          //sends obj (userdata ) to user functions
          const user = await signup(userFormData)
          setUser(user)
        }catch(e){
          console.log(e)
          setFormData({
            ...formData,
            error:'Sign up Failed - Try again'
          })
        }
    }
return (
  <div>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" required onChange={handleChange} />

        <label>Email</label>
        <input type="text" name="email" required onChange={handleChange} />

        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
        />

        <label>Confirm password</label>
        <input
          type="password"
          name="confirm"
          required
          onChange={handleChange}
        />

        <button type="submit" disabled={disable}>Sign up</button>
      </form>
    </div>
    <p className="error-message">{formData.error}</p>
  </div>
);
}

export default SignUpForm