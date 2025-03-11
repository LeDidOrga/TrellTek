import { useState } from 'react';
import Organizations from './Organizations';
import Boards from './Boards';
import Lists from './Lists';
import './App.css';

function App() {
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);

  return (
    <div className="app-container">
      <h1>Pas Trello</h1>
      <div className="workspace">
        <Organizations onSelectOrganization={setSelectedOrganization} />
        {selectedOrganization && (
          <Boards
            organization={selectedOrganization}
            onSelectBoard={setSelectedBoard}
          />
        )}
        {selectedBoard && <Lists board={selectedBoard} />}
      </div>
    </div>
  );
}

export default App;
