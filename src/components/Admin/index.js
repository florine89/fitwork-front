/* eslint-disable react/jsx-no-bind */
import './style.scss';

import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ModifyArticles from './AdminArticles/ModifyArticles';
import AddArticles from './AdminArticles/AddArticles';

function Admin() {
  const [key, setKey] = useState('home');
  const [articles, setArticles] = useState([]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 tabs"
    >
      <Tab eventKey="ajouter un article" title="ajouter un article">
        <AddArticles setArticles={setArticles} articles={articles} />
      </Tab>
      <Tab eventKey="modifier un article" title="modifier un article">
        <ModifyArticles setArticles={setArticles} articles={articles} />

      </Tab>
      {/* <Tab eventKey="supprimer un article" title="supprimer un article">
        <ModifyArticles />

      </Tab> */}
    </Tabs>
  );
}

export default Admin;
