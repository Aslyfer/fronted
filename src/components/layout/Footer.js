import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
          <footer className="pie-pagina">
        <div className="grupo-1">
            <div className="box">
                <figure>
                    <a href="#">
                          <img src=""  alt="Logo de SLee Dw"/>
                    </a>
                </figure>
            </div>
            <div className="box">
                <h2>SOBRE NOSOTROS</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
            </div>
            <div className="box">
                <h2>SIGUENOS</h2>
                <div className="red-social">
                    <a href="#" className="fa fa-facebook"></a>
                    <a href="#" className="fa fa-instagram"></a>
                    <a href="#" className="fa fa-twitter"></a>
                    <a href="#" className="fa fa-youtube"></a>
                </div>
            </div>
        </div>
        <div className="grupo-2">
            <small>&copy; 2021 <b>SLee Dw</b> - Todos los Derechos Reservados.</small>
        </div>
    </footer>
    </Fragment>
  )
}

export default Footer
