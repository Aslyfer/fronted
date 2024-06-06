import React,{useEffect,useState,Fragment} from 'react'
import MetaData from '../layout/MetaData'
import { register,clearErros } from '../../actions/userActions'
import {useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [user ,setUser] = useState({
        nombre: '',
        email: '',
        password: '',

    });

    const {nombre,email,password} = user;
    const [avatar,setAvatar]= useState('');
    const [avatarPreview,setAvatarPreview]= useState('/images/logo.png');
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {isAuthenticated,error,loading} = useSelector(state=>state.auth)
    useEffect(()=>{
        if(isAuthenticated){
          navigate('/')
        }
        if(error){
            alert.error(error);
            console.log(error);
            dispatch(clearErros());
        }
    },[dispatch,alert,isAuthenticated,error,navigate])

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("Nombre:", nombre);
        console.log("Email:", email);
        console.log("Contraseña:", password);
        console.log("Avatar:", avatar);
        const formData = new FormData();
        formData.set('nombre',nombre)
        formData.set('email',email)
        formData.set('password',password)
        formData.set('avatar',avatar)
        console.log("Datos del formulario:", formData);
        dispatch(register(formData))
    }
    

    const onChange = e =>{
        if(e.target.name === 'avatar'){
            console.log("Imagen seleccionada:", e.target.files[0]);
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);

        }
        else{
            setUser({...user,[e.target.name]: e.target.value})
        }
    }

  return (
   <Fragment>
    <MetaData title={'registro de usuario'} />
    <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label for="email_field">Name</label>
            <input 
            type="name" id="name_field" 
            className="form-control" 
            name='nombre'
            value={nombre} 
            onChange={onChange}
            required
            />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
                value={email} 
                onChange={onChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name='password'
                value={password} 
                onChange={onChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='avatar preview'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept='images/*'
                          onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true:false}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>

   </Fragment>
  )
}

export default Register
