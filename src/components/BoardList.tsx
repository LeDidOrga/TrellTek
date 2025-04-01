import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../services/trelloApi';
import type { TrelloBoard } from '../types/trello';
import toast from 'react-hot-toast';
import ItemBoard from './ItemBoard';

interface Props {
  orgId: string;
  onSelectBoard: (boardId: string) => void;
  onBack: () => void;
}

export default function BoardList({ orgId, onSelectBoard, onBack }: Props) {
  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

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

  const handleCreate = async (boardName: string, defaultLists: boolean, desc: string) => {
    try {
      await createBoard(boardName, orgId, desc, defaultLists);
      loadBoards();
      toast.success('Board created successfully');
    } catch (error) {
      toast.error('Failed to create board');
    }
  };

  const handleUpdate = async (boardId: string, newName: string) => {
    try {
      await updateBoard(boardId, { name: newName });
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
    <ItemBoard 
      title="Boards" 
      span="Your board is where you manage your project with lists and cards" 
      items={boards} 
      onUpdate={handleUpdate} 
      onDelete={handleDelete} 
      onAdd={handleCreate} 
      onSelect={onSelectBoard}
    />
  );
}