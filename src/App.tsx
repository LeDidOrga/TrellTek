import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import OrganizationList from './components/OrganizationList'
import BoardList from './components/BoardList'
import Board from './components/Board'

function App() {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <div className="container mx-auto py-8 justify-center flex">
        {selectedBoard ? (
          <Board
            boardId={selectedBoard}
            onBack={() => setSelectedBoard(null)}
          />
        ) : selectedOrg ? (
          <BoardList
            orgId={selectedOrg}
            onSelectBoard={setSelectedBoard}
            onBack={() => setSelectedOrg(null)}
          />
        ) : (
          <OrganizationList onSelectOrg={setSelectedOrg} />
        )}
      </div>
    </div>
  )
}

export default App
