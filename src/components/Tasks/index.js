import React from 'react';
import PropTypes from 'prop-types';

import TasksItem from './TasksItem';

import './style.scss';

function Tasks({
  list,
}) {
  const tasksList = list.map((task) => (
    <TasksItem
      key={task.id}
      {...task}
    />
  ));

  return (
    <ul className="tasks">
      {tasksList}
    </ul>
  );
}

Tasks.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Tasks;
