import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>

        <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>
             
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Productos</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/products"><i className="fa fa-clipboard"></i> ver todos los productos</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/product"><i className="fa fa-plus"></i> Crear producto</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="admin/orders"><i className="fa fa-shopping-basket"></i> Ordenes</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Usuarios</Link>
                    </li>

                    
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Usuarios</Link>
                    </li>
            
                </ul>
                </nav>
            </div>
            </div>
  )
}

export default Sidebar
