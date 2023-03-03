/* eslint-disable react/jsx-no-bind */
import './style.scss';

import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ModifierArticles from './ModifierArticles';

function ControlledTabsExample() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 tabs"
    >
      <Tab eventKey="ajouter un article" title="ajouter un article">
        <ModifierArticles />
      </Tab>
      <Tab eventKey="modifier un article" title="modifier un article">
        <ModifierArticles />

      </Tab>
      <Tab eventKey="supprimer un article" title="supprimer un article">
        <ModifierArticles />

      </Tab>
    </Tabs>
  );
}

export default ControlledTabsExample;
