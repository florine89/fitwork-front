import PropTypes from 'prop-types';
import { useState } from 'react';

function Counter({ number }) {
  let text = `${number} tâches en cours`;

  if (number === 0) {
    text = 'Commencez votre programme';
  }
  else if (number === 1) {
    text = '1 activité en cours';
  }

  return (
    <p className="counter">{text}</p>
  );
}

Counter.propTypes = {
  number: PropTypes.number.isRequired,
};

export default Counter;
