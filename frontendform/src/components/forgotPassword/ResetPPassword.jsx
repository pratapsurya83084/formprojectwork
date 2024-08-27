import React, { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  async function handelRegister(e) {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = response.json();
    console.log(response);
  }

  return (
    <form 
       action="{{route('password.update')}}"
    onSubmit={handelRegister} className="w-1/2 mx-auto space-y-6 mt-40">
      <h1 className="text-center  text-3xl font-bold">Reset your Password</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <input
          type="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="Confirm Password" placeholder="confirm password"
          value={formData.password_confirmation}
          onChange={(e) =>
            setFormData({ ...formData, password_confirmation: e.target.value })
          }
        />
      </div>

      <button className="primary-btn">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
