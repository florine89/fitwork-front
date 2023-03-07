import { useEffect, useState } from 'react';

import axios from 'axios';

import './style.scss';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div className="Categories">
      <h1 className="presentation-title">{categories.name}</h1>
    </div>
  );
}

export default Categories;
