import React,{useEffect,Fragment,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom'; // Importa el hook useParams
import MetaData from '../layout/MetaData'
import { getProductDetail,clearErros,newReview } from '../../actions/productActions'
import ImageGallery from "react-image-gallery";
import { addItemToCart } from '../../actions/cartActions';
import 'react-image-gallery/styles/css/image-gallery.css';
import { NEW_REVIEW_RESET} from '../../constans/productConstans';
import ListReviews from '../reviews/ListReviews';
const ProductDetails = () => {
    const disptach = useDispatch();
    const [quantity,setQuantity] = useState(1);
    const alert = useAlert();
    const { id } = useParams();
    const {loading,error,product} = useSelector(state=>state.productDetails)
    const {user} = useSelector(state=>state.auth)
    const [rango,setRango] = useState(0);
    const [comentario,setComentario] = useState('')
    const {error: reviewError,success} = useSelector(state=> state.newReview)
    useEffect(()=>{
        console.log(id); // Muestra el ID del producto en la consola
        disptach(getProductDetail(id));
        if(error){
            alert.error(error)
            disptach(clearErros())
        }

        if(reviewError){
            alert.error(reviewError)
            disptach(clearErros())
        }

        if(success){
            alert.success('review añadido con exito')
            disptach({
                type: NEW_REVIEW_RESET
            })
        }
    },[disptach,alert,error,reviewError,id,success])

    const incrementarQty  = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber +1;

        setQuantity(qty)
    }

    const decrecerQty  = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;

        setQuantity(qty)

    }

    const addToCart = () =>{
        disptach(addItemToCart(id,quantity))
        alert.success('agregado con exito al carrito')
    }

    function setUserRatings() {
        const starts = document.querySelectorAll('.star')
        starts.forEach((star,index) =>{
            star.starValue = index + 1;
            ['click','mouseover','mouseout'].forEach(function(e) {
                star.addEventListener(e,showRatings);
            })
        })
        function showRatings(e) {
            starts.forEach((star,index)=>{
                if(e.type === 'click'){
                    if(index < this.starValue){
                        star.classList.add('orange')

                        setRango(this.starValue)
                    }else{
                        star.classList.remove('orange')
                    }
                }

                if(e.type === 'mouseover'){
                    if(index < this.starValue){
                        star.classList.add('yellow')
                    }else{
                        star.classList.remove('yellow')
                    }
                    
                }

                if(e.type === 'mouseout'){
                    star.classList.remove('yellow')
                }
            }) 
        }
    }

    const images = product.imagenes ? product.imagenes.map(imagen => ({
        original: imagen.url,
        thumbnail: imagen.url,
    })) : [];

    const reviewHandler = () => {
            const formData = new FormData();
            formData.set('rango_resena', Number(rango));
            formData.set('comentario', comentario);
            formData.set('productId', id); 
            disptach(newReview(formData));

    }
  return (
    <Fragment>
    {
        loading ? <Loader />:(
            <Fragment>
                <MetaData title={product.nombre}/>
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <ImageGallery 
                                    items={images} 
                                    showThumbnails={true} 
                                    showFullscreenButton={true}
                                    showPlayButton={true}
                                    autoPlay={true}
                                    slideInterval={3000}
                                    showBullets={true}
                                />
        </div>
        
            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.nombre}</h3>
                <p id="product_id">en bodega: {product.stock} unidades</p>
        
                <hr />
        
                <div className="rating-outer">
                    <div className="rating-inner" style={{width: `${(product.rango /5)*100}%`}}></div>
                </div>
                <span id="no_of_reviews">(({product.numero_resenas}))</span>
        
                <hr />
        
                <p id="product_price">${product.precio}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus"onClick={decrecerQty} >-</span>
        
                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />
        
                    <span className="btn btn-primary plus" onClick={incrementarQty} >+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4"
                 
                   disabled={product.stock === 0} onClick={addToCart} >Add to Cart</button>
        
                <hr />
        
                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor': 'redColor'}>
                {product.stock >0 ? 'en inventario' : 'fuera de inventario'}
                </span></p>
        
                <hr />
        
                <h4 className="mt-2">Description:</h4>
                <p>{product.descripcion}</p>
                <hr />
                <p id="product_seller mb-3">vendido por : <strong>{product.vendedor}</strong></p>
                {user ?   <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal"
                    onClick={setUserRatings}
                >
                            Submit Your Review
                </button> :
                <div className='alert alert-danger mt-5' type ="alert">primero logueate</div>
                }
              
                
                <div className="row mt-2 mb-5">
                    <div className="rating w-50">
        
                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
        
                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>
        
                                        <textarea name="review" id="review" value={comentario} onChange={(e)=> setComentario(e.target.value)} className="form-control mt-3">
        
                                        </textarea>
        
                                        <button className={"btn my-3 float-right review-btn px-4 text-white"} data-dismiss="modal" onClick={reviewHandler} aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                    </div>
                        
            </div>
        </div>
        </div>
        {product.resenas && product.resenas.length > 0 && (
    <ListReviews resenas={product.resenas} />
)}

            </Fragment>
        )
    }
    </Fragment>
  )
}

export default ProductDetails
