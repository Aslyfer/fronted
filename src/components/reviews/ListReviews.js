import React from 'react';

const ListReviews = ({ resenas }) => {
  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {resenas && resenas.map(resena => (
        <div key={resena.user} className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner" style={{width: `${(resena.rango_resena /5)*100}%`}}></div>
          </div>
          <p className="review_user">{resena.nombre_resenor}</p>
          <p className="review_comment">{resena.comentario}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
