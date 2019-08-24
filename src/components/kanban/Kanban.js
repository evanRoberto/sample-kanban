import React from "react";
import './Kanban.css';

const categories = ['todo', 'doing', 'completed', 'qa', 'closed'];
const categoryLabels = {
  todo: 'To-do',
  doing: 'Doing',
  completed: 'Completed',
  qa: 'QA',
  closed: 'Closed'
};

const tasks = [
  { id: 1, content: 'A feature requested from user to improve overall efficiency.', status: 'backlog' },
  { id: 2, content: 'Enhancement requested from product owner to improve overall design.', status: 'backlog' }
];

class Kanban extends React.Component {
  render() {
    return (
      <div className="kanban">
        <div className="row">
          {
            categories.map(category => (
              <div className="col">
                <div className="board">
                  <div className="board-header">
                    {categoryLabels[category]}
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <div className="row">
          <div className="col">
            <div className="issue-board">
              <div className="board-header">Backlog</div>
              {
                tasks
                  .filter(task => task.status === 'backlog')
                  .map(task => (
                  <div className="issue" draggable="true">
                    {task.content}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Kanban;