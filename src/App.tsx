import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import OrganizationList from './components/OrganizationList'
import BoardList from './components/BoardList'
import Board from './components/Board'

function App() {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null)

  return (
      <div className="min-h-screen bg-[#F2F2F2]">
          <nav className="flex justify-between items-center p-4">
              <div className="flex items-center">
                  <img className="h-8" src={"src/public/nuage.png"}/>
                  <img className="h-8 pl-4" src={"src/public/Breathe.png"}/>
              </div>
              <button className="">profil</button>
          </nav>

          <Toaster position="top-right"/>
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
                  <OrganizationList onSelectOrg={setSelectedOrg}/>
              )}
          </div>
      </div>
  )
}

export default App
