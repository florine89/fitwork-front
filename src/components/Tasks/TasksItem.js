import React from 'react';
import PropTypes from 'prop-types';

function TasksItem({ label, done }) {
  return (
    <li>
      <label
        className={done ? 'tasks-item tasks-item--done' : 'tasks-item'}
        htmlFor={label}
      >
        <input
          className="tasks-checkbox"
          type="checkbox"
          checked={done}
        />
        {label}
      </label>
    </li>
  );
}

TasksItem.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
};

export default TasksItem;
