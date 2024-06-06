import React,{useEffect,useState,Fragment} from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { login,clearErros } from '../../actions/userActions'
import { useLocation } from "react-router-dom";
import {useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const location = useLocation()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {isAuthenticated,error,loading} = useSelector(state=>state.auth)
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
        if(isAuthenticated){
          navigate('/')
        }
        if(error){
            alert.error(error);
            dispatch(clearErros());
        }
    },[dispatch,alert,isAuthenticated,error,navigate,redirect])

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }

  return (
   <Fragment>
    {loading ? <Loader/>:(
        <Fragment>
            <MetaData title={'login'} />
            <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <Link to="/forgot/password" className="float-right mb-4">OLVIDASTES LA CONTRASEÑA?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">Nuevo User?</Link>
          </form>
		  </div>
    </div>
        </Fragment>
    )}
   </Fragment>
  )
}

export default Login
