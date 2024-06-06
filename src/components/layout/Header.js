import React, { Fragment } from 'react'
import '../../App.css'
import Search from './Search'
import { useAlert } from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import { logout } from '../../actions/userActions'
import { Link } from 'react-router-dom'
const Header = () => {
  const alert = useAlert();
  const disptach = useDispatch();
  const {user,loading} = useSelector(state=>state.auth)
  const {cartItems} = useSelector(state => state.cart)

  const logoutHandler = () => {
    disptach(logout());
    alert.success('salio')
  }
  return (
    <Fragment>
          <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
          <img src="/images/logo.png" />
          </Link>
          <p className="parrafo">maicao libre</p>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{textDecoration:"none"}}> 
      <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
        </Link>
        {user ?(
          <div className='ml-4 dropdown d-inline'>
            <Link to="#!" className='btn dropdown-toggle text-white mr-4' type='button'
            id='dropdownMenuButton' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img src={user.avatar && user.avatar.url} alt={user && user.nombre } className='rounden-circle'/>
              </figure>
              <span>{user && user.nombre}</span>
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> 

              {user && user.role === 'admin' && (
                      <Link className="dropdown-item" to="/dashboard">dashboard</Link>
              )}
              <Link className="dropdown-item" to="/orders/me">ordenes</Link>
              <Link className="dropdown-item" to="/profile">perfil</Link>
              <Link className='dropdown-item text-danger' to="/" onClick={logoutHandler}>
                salir
              </Link>
            </div>

          </div>
        ): !loading &&  <Link to="/login" className="btn ml-4" id="login_btn">Login</Link> }
       
      </div>
    </nav>

    </Fragment>
  )
}

export default Header
