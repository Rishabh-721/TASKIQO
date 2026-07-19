import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import API from '../../components/API';
import { AuthContext } from '../../utils/AuthContext';


const Login = () => {
    const navigate = useNavigate();
    const {checkAuth} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
      email: "",
      password: ""
    });
    const [error, setError] = useState({
    email: "",
    password: ""
  });
    const [apiSuccess, setapiSuccess] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
      setForm({...form,[e.target.name]: e.target.value});
      setError({...error,[e.target.name]: ""});
      setapiSuccess(false);
      setApiError("");
    };
    
    const handleSubmit = async(e) => {
      e.preventDefault();

      const checker = ({
        email: "",
        password: ""
      });

      if(!form.email){
        checker.email = "Email is required";
      }

      if(!form.password){
        checker.password = "Password is required";
      }

      if(form.password && form.password.length < 8){
        checker.password = "Password should be atleast 8 character";
      }

      if(checker.email !== "" || checker.password !== ""){
        setError(checker);
        return
      }


      try {
        setIsLoading(true);
        const response = await API("POST", "auth/login", form);
        setapiSuccess(true);
        localStorage.setItem("token", response?.data?.token);
        const success = await checkAuth();
        success ? navigate("/home") : navigate("/");
      } catch (error) {
        setApiError(error.response?.data?.message);
      }finally{
        setIsLoading(false);
      }

    };

  return (
    <>
    <form className='AuthForm' onSubmit={handleSubmit}>

    <h2 className='heading'>Hi, Login Here</h2>
    <p>Log in to continue Taskiqo</p>

    <div className='field'>
    <label htmlFor="email">Email: </label>
    <input type='email' placeholder='User Email' name='email' id='email' value={form.email} onChange={handleChange}/>
    {error.email && <p className='error'>{error.email}</p>}
    </div>

    <div className='field'>
    <label htmlFor="password">Password: </label>
    <input type='password' placeholder='User Password' name='password' id='password' value={form.password} onChange={handleChange}/>
    {error.password && <p className='error'>{error.password}</p>} 
    </div>

    <div className='ApiWaitingBtn'>
    <Btn type='submit' text={isLoading ? "Logging you in...": "Login"} className={"auth-btn"} disabled={isLoading}/>
    {isLoading && <div className='loader'></div>}
    </div>

    {apiError && <p className='apiError'>{apiError}</p> }
    {apiSuccess && <p className='apiSuccess'>Login Successfully</p> }

    <div>New to Taskiqo? <br />
    <span className='link-text' onClick={() => navigate("/signup")}>Sign Up</span></div>
    </form>
    </>
  )
}

export default Login
