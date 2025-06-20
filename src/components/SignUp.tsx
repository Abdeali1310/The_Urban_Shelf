import { useState } from "react";
import "../index.css";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });

  const [role,setRole] = useState("role");

  const isValidForm = ()=>{
    return (
        firstName && lastName && email && password.value.length >= 8 && 
        role !== "role" 
    )
  }

  const PasswordErrorMessage = ()=>{
    return <p className="errorMsg">Password must be atleast 8 characters long</p>
  }
  
  const clearForm = ()=>{
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword({value:"",isTouched:false});
    setRole("role");
  }

  const handleSubmit = (e: { preventDefault: () => void; })=>{
    e.preventDefault();
    if(isValidForm()){
        console.log("Form is valid");
        clearForm();
    }
  }
  return (
    <div className="signUpForm">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstname"
              id="firstname"
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              name="lastName"
              id="lastName"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password.value}
              onChange={(e) =>
                setPassword({ ...password, value: e.target.value })
              }
              onBlur={() => { 
                setPassword({ ...password, isTouched: true }); 
              }} 
              name="password"
              id="password"
            />
            {password.isTouched && password.value.length < 8 ? ( 
             <PasswordErrorMessage /> 
           ) : null} 
          </div>
          <div className="field">
            <label htmlFor="role">Role</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>

          <input type="submit" disabled={!isValidForm()} value="Submit" />
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
