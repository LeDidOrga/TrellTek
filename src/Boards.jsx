import { useState, useEffect } from 'react';
import { getBoards, createBoard } from './api/boardService.js';

function Boards({ organization, onSelectBoard }) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      if (!organization) return;
      const boards = await getBoards(organization.id);
      setBoards(boards);
    }
    fetchBoards();
  }, [organization]);

  const handleCreateBoard = async () => {
    const newBoard = await createBoard(organization.id, 'New Board', true);
    setBoards((prev) => [...prev, newBoard]);
  };

  return (
    <div className="panel">
      <h2>Boards</h2>
      <button onClick={handleCreateBoard}>Create New Board</button>
      <ul>
        {boards.map((board) => (
          <li key={board.id} onClick={() => onSelectBoard(board)}>
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Boards;