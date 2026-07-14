import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Btn from '../../components/Btn';
import API from '../../components/API';

const SignUp = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [form, setForm] = useState({
      fullName: "" ,
      userEmail : "",
      pwd : "",
    })

    const [error, setError] = useState({
      fullName: "" ,
      userEmail : "",
      pwd : "",
    })

    const [apiSucess, setApiSucess] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
      setForm({...form,[e.target.name]: e.target.value});
      setError({...error,[e.target.value]: ""});
      setApiSucess(false);
      setApiError("");
    };

    const handleSubmit = async(e) => {
      e.preventDefault();

      setApiError("");
      setApiSucess(false);
      setError({...error, [e.target.value]: ""});

      const checker = ({
        fullName: "",
        userEmail: "",
        pwd: "",
      });

      if(!form.fullName || form.fullName.length === 0){
        checker.fullName = "Name Is Required";
      }

      if(form.fullName && form.fullName.length < 3){
        checker.fullName = "Name Should Be Atleast 3 Letter";
      }

      if(!form.userEmail || form.userEmail.length === 0){
        checker.userEmail ="Email Is Required";
      }

      if(!form.pwd || form.pwd === 0){
        checker.pwd = "Password Is Required";
      }

      if(form.pwd && form.pwd.length < 8){
        checker.pwd = "Password Should Be Atleast 8 Letter";
      }

      if(checker.fullName !== "" || checker.userEmail !== "" || checker.pwd !== ""){
        setError(checker);
        return
      }

      try {
        setisLoading(true);
        const response = await API("POST", "auth/Signup", form);
        setApiSucess(true);
        
      } catch (error) {
        console.log(error.response?.data?.message);
        setApiError(error.response?.data?.message);
      } finally {
        setisLoading(false);
      };
    }
  return (
    <form className='AuthForm' onSubmit={handleSubmit}>
    <h2 className='heading'>Welcome</h2>
    <p>Sign up to Start Taskiqo</p>

    <div className='field'>
      <label htmlFor="fullName">Name: </label>
      <input type="text" placeholder='User Name' name='fullName' id='fullName' value={form.fullName} onChange={handleChange}/>
      {error.fullName && <p className='error'>{error.fullName}</p>}
    </div>

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
    <Btn type={"submit"} text={isLoading ? "Authenticating...": "Sign Up"} className={"auth-btn"} disabled={isLoading}/>
    {isLoading && <div className='loader'></div>}
    </div>

    {apiError && <p className='apiError'>{apiError}</p> }
    {apiSucess && <p className='apiSucess'>{"Signed Up Sucessfully"}</p>}

    <div>Signed Up Sucessfully? <br />
    <span className="link-text" onClick={() => navigate("/")}>Log in</span></div>
    </form>
  )
}

export default SignUp
