import PropTypes from 'prop-types';

// création des champs
function Field({
  type,
  name,
  placeholder,

}) {
  return (
    <div>
      <input
        type={type}
        className="field-input"
        placeholder={placeholder}
        name={name}
      />
      <label
        htmlFor="1"
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
