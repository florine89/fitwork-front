/* eslint-disable react/jsx-no-bind */
import './style.scss';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import { getCategoriesList } from '../../selectors/categories';

function Admin() {
  // const id = useSelector((state) => state.user.id))
  const categories = useSelector(getCategoriesList);

  return (
    <Form className="Admin">

      <Form.Group
        className="mb-3"
        controlId="exampleForm.ControlSelect"
      >
        <Form.Label>Choisi ta catégorie</Form.Label>
        <Form.Select aria-label="Liste des catégories">
          {categories.map((category) => (
            <option
              key={category.name}
            >
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button className="Profil-button" type="submit">Modifier mes informations</Button>

    </Form>
  );
}

export default Admin;
