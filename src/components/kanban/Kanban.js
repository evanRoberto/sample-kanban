import React from "react";
import './Kanban.css';

class Kanban extends React.Component {
  render() {
    return (
      <div className="kanban">
        <div className="row">
          <div className="col"><div className="board"><div className="board-header">To-do</div></div></div>
          <div className="col"><div className="board"><div className="board-header">Doing</div></div></div>
          <div className="col"><div className="board"><div className="board-header">Completed</div></div></div>
          <div className="col"><div className="board"><div className="board-header">QA</div></div></div>
          <div className="col"><div className="board"><div className="board-header">Closed</div></div></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="issue-board">
              <div className="board-header">Backlog</div>
              <div className="issue" draggable="true">A feature requested from user to improve overall efficiency.</div>
              <div className="issue" draggable="true">Enhancement requested from product owner to improve overall design.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Kanban;