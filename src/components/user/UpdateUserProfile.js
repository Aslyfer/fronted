import React,{useEffect,useState,Fragment} from 'react'
import MetaData from '../layout/MetaData'
import { updatePassword,loadUser,clearErros } from '../../actions/userActions'
import {useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET} from '../../constans/userConstans'

const UpdateUserProfile = () => {
    const [oldPassword,setoldPassword]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error,isUpdated,loading} = useSelector(state=>state.user)
    useEffect(()=>{
      
        if(error){
            alert.error(error);
            console.log(error);
            dispatch(clearErros());
        }
        if(isUpdated){
            alert.success('datos modificados con exito')
            dispatch(loadUser())
            navigate('/profile')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    },[dispatch,alert,error,navigate,isUpdated])

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log('oldPassword',oldPassword);
        console.log('newPassword',password);


        const formData = new FormData();
        formData.set('oldPassword',oldPassword)
        formData.set('password',password)
        console.log("Datos del formulario:", formData);
        dispatch(updatePassword(formData))
    }
    

  return (
   <Fragment>
    <MetaData title={'cambiar contraseña'} />
    <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label for="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e)=>setoldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                          disabled={loading ? true:false} >Update Password</button>
                    </form>
                </div>
            </div>
   </Fragment>
  )
}

export default UpdateUserProfile
