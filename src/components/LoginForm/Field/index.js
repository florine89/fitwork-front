import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

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
      <input
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
        name={name}
      />
      <label
        htmlFor={inputId}
        className="field-label"
      >
        {placeholder}
      </label>
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
