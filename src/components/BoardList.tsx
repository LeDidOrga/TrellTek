import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../services/trelloApi';
import type { TrelloBoard } from '../types/trello';
import toast from 'react-hot-toast';

interface Props {
  orgId: string;
  onSelectBoard: (boardId: string) => void;
  onBack: () => void;
}

export default function BoardList({ orgId, onSelectBoard, onBack }: Props) {
  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [editingBoard, setEditingBoard] = useState<string | null>(null);

  useEffect(() => {
    loadBoards();
  }, [orgId]);

  const loadBoards = async () => {
    try {
      const boardList = await getBoards(orgId);
      setBoards(boardList);
    } catch (error) {
      toast.error('Failed to load boards');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBoard(newBoardName, orgId);
      setNewBoardName('');
      setIsCreating(false);
      loadBoards();
      toast.success('Board created successfully');
    } catch (error) {
      toast.error('Failed to create board');
    }
  };

  const handleUpdate = async (boardId: string, newName: string) => {
    try {
      await updateBoard(boardId, { name: newName });
      setEditingBoard(null);
      loadBoards();
      toast.success('Board updated successfully');
    } catch (error) {
      toast.error('Failed to update board');
    }
  };

  const handleDelete = async (boardId: string) => {
    if (!confirm('Are you sure you want to delete this board?')) return;
    try {
      await deleteBoard(boardId);
      loadBoards();
      toast.success('Board deleted successfully');
    } catch (error) {
      toast.error('Failed to delete board');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-emerald-800">Boards</h2>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus size={20} /> New Board
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Board name"
              className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="p-4 border border-emerald-100 rounded-lg hover:border-emerald-200 transition-colors"
          >
            {editingBoard === board.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={board.name}
                  className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(board.id, e.currentTarget.value);
                    }
                  }}
                />
                <button
                  onClick={() => setEditingBoard(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSelectBoard(board.id)}
                  className="text-lg font-medium text-emerald-700 hover:text-emerald-800"
                >
                  {board.name}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingBoard(board.id)}
                    className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(board.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}