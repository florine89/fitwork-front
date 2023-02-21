import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import { changeInputValue } from '../../../actions/user';

// création des champs
function Field({
  type,
  name,
  placeholder,

}) {
  const value = useSelector((state) => state.user[name]);

  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeInputValue(name, evt.target.value));
    console.log(value);
  };

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
