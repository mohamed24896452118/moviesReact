import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import joi from 'joi';

export default function Login({saveUserData}) {


  let validateFormData=()=>{
    const schema =joi.object({
      email:joi.string().required().email({ tlds: {allow:['com','net']}}),
      password: joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(user , {abortEarly:false});
  };


  const [user, setUser] = useState({
    'email':'',
    'password':''
      });
      const [errorMsg, setErrorMsg] = useState('');
      const [errorsList, seterrorsList] = useState([]);
      let navigate=useNavigate();
      let validationResponse= validateFormData();
      
      let goToHome=()=>{
        navigate('/');
        }
        
     
      let submitFormData= async(e)=>{
        e.preventDefault();
        if(validationResponse.error){
        seterrorsList(validationResponse.error.details);
        }
        else{
         let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin',user);
         if(data.message== 'success'){
          localStorage.setItem('token' , data.token);
          saveUserData();
          
          goToHome();
         }
         else{
        setErrorMsg(data.message);
         }
        }
        };
        

  let getInputValue=(e)=>{
    let myUser= {...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser);
    console.log(myUser);
    }

  return (
    <>
    <div className=' w-75 m-auto py-5'>
      {errorsList.map((error , index)=>
      <div key={index} className='alert alert-danger p-2'>{error.message}</div>
      )}
      {errorMsg? <div className='alert alert-danger p-2'>{errorMsg}</div>: '' }
    <h2>Login Form</h2>
    <form onSubmit={submitFormData}>
      <div className="input-data my-2">
        <label htmlFor="email">Email</label>
        <input onChange={getInputValue} type="email" className='form-control my-2' name='email' />
      </div>
      <div className="input-data my-2">
        <label htmlFor="password">Password</label>
        <input onChange={getInputValue} type="password" className='form-control my-2' name='password' />
      </div>
      <button className='btn btn-info my-3 float-end'>Login</button>
      <div className="clear-fix"></div>
    </form>
    </div>
    </>
  )
}
