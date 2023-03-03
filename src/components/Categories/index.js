import { useEffect, useState } from 'react';

import axios from 'axios';

import './style.scss';

const API_BASE_URL = 'http://barrealexandre-server.eddi.cloud:8080/api';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories`).then((response) => {
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
