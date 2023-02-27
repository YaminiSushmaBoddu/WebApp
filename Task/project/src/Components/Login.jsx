import axios from "axios";
import { object } from "prop-types";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/login.css"
export const Login=()=>{
    const [userName,setUserName]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("")
    const usenavigate=useNavigate()

  useEffect(()=>{
    sessionStorage.clear()
  },[])
  
    const ProceedLogin=(e)=>{
        e.preventDefault();
        if(validate()){

            ///implentation
           console.log("proceed") 
        fetch("http://localhost:3031/user").then((res)=>{
            return res.json();
        }).then((resp)=>{
            console.log(resp)
            if(Object.keys(resp).length===0){
                toast.error('Please Enter valid username');
            }
            else{
                if(resp.password===password && resp.userName===userName ){
                    toast.success('Success');
                        sessionStorage.setItem('userName',userName);
                        usenavigate('/')
                }
                else{
                    toast.error('Please Enter valid credentials');
                
            }
       } }).catch((err)=>{
            toast.error("error"+err.message)
        })

        }
    }

    const validate=()=>{
        let result =true;
        if(userName === ""  || userName === null){
            result= false;
            toast.warning("Please Enter User Name")
        }
        if(password === "" || password === null){
            result=false;
            toast.warning("Please Enter Password")
        }if(email==="" || email===null){
            result=false;
            toast.warning("please Enter Email")
        }
       return result
    }
    return(
        
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form className="container1" onSubmit={ProceedLogin}>
                    <div className="card">
                        <div className="card-header"><h2>User Login</h2></div>
                        <div className="card-body">
                            <div className="form-group">
                                <label >UserName <span className="errMsg">*</span></label>
                                <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label >First Name<span className="errMsg">*</span></label>
                                <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="form-control"  />
                            </div>
                            <div className="form-group">
                                <label >Last Name<span className="errMsg">*</span></label>
                                <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className="form-control"  />
                            </div>
                            <div className="form-group">
                                <label >Password<span className="errMsg">*</span></label>
                                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label >Email<span className="errMsg">*</span></label>
                                <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" >Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        
    )
}