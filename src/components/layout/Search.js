import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ initialKeyword = '' }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialKeyword); // Usa un estado local para el campo de búsqueda

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(222);
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword} // Usa el valor del estado local para el campo de búsqueda
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button type="submit" id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
