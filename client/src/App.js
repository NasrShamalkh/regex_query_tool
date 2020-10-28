import React from 'react';
import UserDisplay from './components/userDisplay/userDisplay';
import SavedQueries from './components/queries/queries';
import QueryTool from './components/queryTool/queryTool';
import './App.css';

const App = function(porps) {
  return (
    <div className='App'>
      <div id='queryToolDiv'>
        <QueryTool />
      </div>
      <div id='sideBarDiv'>
        <div id='userDisplayDiv'>
          <UserDisplay />
        </div>
        <div id='savedQueriesDiv'>
          <SavedQueries />
        </div>
      </div>
    </div>
  );
};

export default App;
