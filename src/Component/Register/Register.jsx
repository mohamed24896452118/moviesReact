import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import joi from 'joi';

export default function Register() {
  const [user, setUser] = useState({
'first_name':'',
'last_name':'',
'age':'',
'email':'',
'password':''
  });

  let validateFormData=()=>{
    const schema =joi.object({
      first_name:joi.string().alphanum().required().min(2).max(20),
      last_name:joi.string().alphanum().required().min(2).max(20),
      age:joi.number().required().min(20).max(80),
      email:joi.string().required().email({ tlds: {allow:['com','net']}}),
      password: joi.string().required().pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return schema.validate(user , {abortEarly:false});
  };

const [errorMsg, setErrorMsg] = useState('');
const [errorsList, setErrorsList] = useState([]);
let navigate=useNavigate();
let validationResponse= validateFormData();
console.log(validationResponse);

let submitFormData= async(e)=>{
e.preventDefault();
if(validationResponse.error){
setErrorsList(validationResponse.error.details);
}
else{
 let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup',user);
 if(data.message== 'success'){
  goToLogin();
 }
 else{
setErrorMsg(data.message);
 }
}
};


let goToLogin=()=>{
navigate('/login');
}

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
    <h2>Registertion Form</h2>
    <form onSubmit={submitFormData}>
      <div className="input-data my-2">
        <label htmlFor="first_name">First Name</label>
        <input onChange={getInputValue} type="text" className='form-control my-2 ' name='first_name' />
      </div>
      <div className="input-data my-2">
        <label htmlFor="last_name">Last Name</label>
        <input onChange={getInputValue} type="text" className='form-control my-2' name='last_name' />
      </div>
      <div className="input-data my-2">
        <label htmlFor="age">Age</label>
        <input onChange={getInputValue} type="number" className='form-control my-2' name='age' />
      </div>
      <div className="input-data my-2">
        <label htmlFor="email">Email</label>
        <input onChange={getInputValue} type="email" className='form-control my-2' name='email' />
      </div>
      <div className="input-data my-2">
        <label htmlFor="password">Password</label>
        <input onChange={getInputValue} type="password" className='form-control my-2' name='password' />
      </div>
      <button className='btn btn-info my-3 float-end'>Register</button>
      <div className="clear-fix"></div>
    </form>
    </div>
    </>
  )
}
