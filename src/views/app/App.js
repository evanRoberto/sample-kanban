import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col"><div className="board"><div className="board-header">To-do</div></div></div>
        <div className="col"><div className="board"><div className="board-header">Doing</div></div></div>
        <div className="col"><div className="board"><div className="board-header">Completed</div></div></div>
        <div className="col"><div className="board"><div className="board-header">QA</div></div></div>
        <div className="col"><div className="board"><div className="board-header">Closed</div></div></div>
      </div>er
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

export default App;
