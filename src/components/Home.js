import React, { Fragment,useState,useEffect } from 'react'
import MetaData from './layout/MetaData'
import {useDispatch,useSelector} from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import { getProducts } from '../actions/productActions'
import Loader from './layout/Loader'
import Product from './product/Product'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'; // Importa el hook useParams
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const alert = useAlert();
  const disptach = useDispatch()
  const [currenPage,setCurrentPage] = useState(1);
  const [precio,setPrice] = useState([1,1000]) 
  const {loading,products,error,productCount,resPerPage,filteredProductCount} = useSelector(state=>state.products)
  const { keyword } = useParams();
  const [categoria,setCategoria] = useState('')
  const categorias=[
    'computadores',
    'portatiles',
    'comida',
    'accesorios',
    'celular',
    'ropa',
    'lobros',
    'motos',
    'carros',
    'bicicletas',
    'colonias'
  ]

  useEffect(()=>{
    if(error){
      return alert.success(error)
   }

    disptach(getProducts(keyword,currenPage,precio,categoria));
  },[disptach,alert,error,keyword,currenPage,precio,categoria])

  function setCurrentPageNo(pagNumber){
    setCurrentPage(pagNumber)
    console.log(resPerPage)
    console.log(productCount);
    console.log(categoria);
  }
  let count = productCount;
  if(keyword){
    count = filteredProductCount;
  }

  const images = [
    {
      original: 'https://http2.mlstatic.com/D_NQ_971122-MLA76611471326_062024-OO.webp',
      thumbnail: 'https://http2.mlstatic.com/D_NQ_971122-MLA76611471326_062024-OO.webp',
    },
    {
      original: 'https://http2.mlstatic.com/D_NQ_640321-MLA76552072804_052024-OO.webp',
      thumbnail: 'https://http2.mlstatic.com/D_NQ_640321-MLA76552072804_052024-OO.webp',
    },
    {
      original: 'https://http2.mlstatic.com/D_NQ_803684-MLA76618106762_062024-OO.webp',
      thumbnail: 'https://http2.mlstatic.com/D_NQ_803684-MLA76618106762_062024-OO.webp',
    },
  ];
  return (
    <Fragment>
      {loading ? <Loader />: (
        <Fragment>
           <MetaData title={'los mejores precios '}/>
      
      <h1 id="products_heading">Ultimos Productos</h1>
      <div className="container container-fluid">
      <ImageGallery items={images} autoPlay 
      showThumbnails={false} 
      showFullscreenButton={true}
      showPlayButton={true}
      slideInterval={3000}
      showBullets={true}
      />
      <section id="products" className="container mt-5">
    <div className="row">
      {keyword ? (
        <Fragment>
          <div className="col-6 col-md-3 mt-5 mb-5">
          <div className="px-5">
          <Range
          marks={{
                1: `$1`,
                1000: `$1000`
                }}
                min={1}
                max={1000}
                defaultValue={[1, 1000]}
                tipFormatter={value => `$${value}`}
                tipProps={{
                 placement: "top",
                visible: true
                }}
                value={precio}
                 onChange={precio => setPrice(precio)}
                 />
             <hr className="my-5" />    
             <div className='mt-5'>
              <h4 className="mb-3">Categorias</h4>
                <ul className="pl-0">
                  {categorias.map(categoria=>(
                    <li
                    style={{cursor:'pointer',
                              listStyleType: 'none'}}
                              key={categoria}
                              onClick={()=>setCategoria(categoria)}
                    >
                      {categoria}

                    </li>
                  ))}
                </ul>

             </div>
          </div>
          </div>
          <div className="col-6 col-md-9">
            <div className="row">
            {products.map(product => (
      <Product key={product._id} product={product} col={4} />
      ))} 
            </div>
          </div>
        </Fragment>
    
      ):(
        

    products && products.map(product=>(
    <Product key={product._id} product={product} col={3} />
 ))
      )}
     

      <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      </div>
    </div>
  </section>
    </div>
    {resPerPage <= count &&(
      <div className="d-flex justify-content-center mt-5">
      <Pagination 
      activePage={currenPage}
      itemsCountPerPage={resPerPage}
      totalItemsCount={productCount}
      onChange={setCurrentPageNo}
      nextPageText={'siguiente'}
      prevPageText={'anterior'}
      firstPageText={'primero'}
      lastPageText={'ultima'}
      itemClass='page-item'
      linkClass='page-link'
      />
    </div>
    )}
        </Fragment>
      )}
     
    </Fragment>
  )
}



export default Home
