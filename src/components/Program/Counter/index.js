import PropTypes from 'prop-types';

function Counter({ number }) {
  let text = `${number} tâches en cours`;

  if (number === 0) {
    text = 'Aucune tâche en cours';
  }
  else if (number === 1) {
    text = '1 tâche en cours';
  }

  return (
    <p className="counter">{text}</p>
  );
}

Counter.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Counter;
