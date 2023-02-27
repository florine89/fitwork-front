import Tasks from '../Tasks';

import './style.scss';
import tasks from '../../data/tasks';

function Program() {
  return (
    <div className="program">
      <h1 className="program-title">Mon Programme</h1>
      <Tasks
        list={tasks}
      />
    </div>
  );
}

export default Program;
