// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { changeInputValue } from '../../../actions/user';

function Field({
  type,
  name,
  placeholder,

}) {
  // On récupère du composant parent les élements renseignés dans les inputs
  // La value du champ permet de récupérer le name du user
  const value = useSelector((state) => state.user[name]);

  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeInputValue(name, evt.target.value));
  };

  // permet de donner une valeur unique à chaque input
  const inputId = `field-${name}`;

  return (
    <div>
      <Form.Group
        className="mb-3"
        controlId={inputId}
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
      >
        <Form.Label>{placeholder}</Form.Label>
        <Form.Control type={type} placeholder={placeholder} />
      </Form.Group>

    </div>
  );
}

Field.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,

};

Field.defaultProps = {
  type: 'text',
};

export default Field;
