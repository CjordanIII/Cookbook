import { useState } from "react";
import * as userApi from "../utils/users-api";

export default function UpdateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    delete formData.confirm;
    userApi.updateduser(formData);
  };
  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  // disables password if the confirm and the password does not match
  const disable = formData.password !== formData.confirm;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          name="name"
          defaultValue={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          required
          type="text"
          name="email"
          defaultValue={formData.Email}
          onChange={handleChange}
        />
        <label htmlFor="password">New password</label>
        <input required type="text" name="password" onChange={handleChange} />

        <label required htmlFor="confirm">
          Confirm password
        </label>
        <input type="text" name="confirm" onChange={handleChange} />
        <button type="submit" value="Update" disabled={disable}>
          Submit
        </button>
      </form>
    </div>
  );
}
