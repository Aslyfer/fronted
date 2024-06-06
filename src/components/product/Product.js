import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product,col}) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
           <div className="card p-3 rounded">
           <Link to={`/product/${product._id}`}>
             <img
               className="card-img-top mx-auto"
               src={product.imagenes[0].url}
             />
             </Link>
             <div className="card-body d-flex flex-column">
               <h5 className="card-title">
                 <a href="">{product.nombre}</a>
               </h5>
               <div className="ratings mt-auto">
                 <div className="rating-outer">
                   <div className="rating-inner" style={{width: `${(product.rango /5)*100}%`}}></div>
                 </div>
                 <span id="no_of_reviews">({product.numero_resenas})</span>
               </div>
               <p className="card-text">${product.precio}</p>
               <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">Ver detalles</Link>
             </div>
           </div>
         </div>
  )
}

export default Product
