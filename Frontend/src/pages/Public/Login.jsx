import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import API from '../../components/API';


const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [form, setForm] = useState({
      userEmail: "",
      pwd: ""
    });
    const [error, setError] = useState({
    userEmail: "",
    pwd: ""
  });
    const [apiSucess, setApiSucess] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
      setForm({...form,[e.target.name]: e.target.value});
      setError({...error,[e.target.name]: ""});
      setApiSucess(false);
      setApiError("");
    };
    
    const handleSubmit = async(e) => {
      e.preventDefault();

      const checker = ({
        userEmail: "",
        pwd: ""
      });

      if(!form.userEmail || form.userEmail.length === 0){
        checker.userEmail = "Email is required";
      }

      if(!form.pwd || form.pwd === 0){
        checker.pwd = "Password is required";
      }

      if(form.pwd && form.pwd.length < 8){
        checker.pwd = "Password should be atleast 8 letter";
      }

      if(checker.userEmail !== "" || checker.pwd !== ""){
        setError(checker);
        return
      }


      try {
        setisLoading(true);
        const response = await API("POST", "auth/login", form);
        setApiSucess(true);
        localStorage.setItem("token", response?.data?.token);
        navigate("/dashboard")
      } catch (error) {
        setApiError(error.response?.data?.message);
      }finally{
        setisLoading(false);
      }

    };

  return (
    <>
    <form className='AuthForm' onSubmit={handleSubmit}>

    <h2 className='heading'>Hi, Login Here</h2>
    <p>Log in to continue Taskiqo</p>

    <div className='field'>
    <label htmlFor="userEmail">Email: </label>
    <input type='email' placeholder='User Email' name='userEmail' id='userEmail' value={form.userEmail} onChange={handleChange}/>
    {error.userEmail && <p className='error'>{error.userEmail}</p>}
    </div>

    <div className='field'>
    <label htmlFor="pwd">Password: </label>
    <input type='password' placeholder='User Password' name='pwd' id='pwd' value={form.pwd} onChange={handleChange}/>
    {error.pwd && <p className='error'>{error.pwd}</p>} 
    </div>

    <div className='ApiWaitingBtn'>
    <Btn type='submit' text={isLoading ? "Logging you in...": "Login"} className={"auth-btn"} disabled={isLoading}/>
    {isLoading && <div className='loader'></div>}
    </div>

    {apiError && <p className='apiError'>{apiError}</p> }
    {apiSucess && <p className='apiSucess'>Login Successfully</p> }

    <div>New to Taskiqo? <br />
    <span className='link-text' onClick={() => navigate("/signup")}>Sign Up</span></div>
    </form>
    </>
  )
}

export default Login
