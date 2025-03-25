import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';
import { getLists, createList, updateList, archiveList, getCards, createCard, updateCard, deleteCard } from '../services/trelloApi';
import type { TrelloList, TrelloCard } from '../types/trello';
import toast from 'react-hot-toast';

interface Props {
  boardId: string;
  onBack: () => void;
}

export default function Board({ boardId, onBack }: Props) {
  const [lists, setLists] = useState<TrelloList[]>([]);
  const [cards, setCards] = useState<Record<string, TrelloCard[]>>({});
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [editingList, setEditingList] = useState<string | null>(null);
  const [isCreatingCard, setIsCreatingCard] = useState<string | null>(null);
  const [newCardName, setNewCardName] = useState('');

  useEffect(() => {
    loadLists();
  }, [boardId]);

  const loadLists = async () => {
    try {
      const listData = await getLists(boardId);
      setLists(listData);
      
      // Load cards for each list
      const cardData: Record<string, TrelloCard[]> = {};
      await Promise.all(
        listData.map(async (list) => {
          const listCards = await getCards(list.id);
          cardData[list.id] = listCards;
        })
      );
      setCards(cardData);
    } catch (error) {
      toast.error('Failed to load board data');
    }
  };

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createList(newListName, boardId);
      setNewListName('');
      setIsCreatingList(false);
      loadLists();
      toast.success('List created successfully');
    } catch (error) {
      toast.error('Failed to create list');
    }
  };

  const handleUpdateList = async (listId: string, newName: string) => {
    try {
      await updateList(listId, newName);
      setEditingList(null);
      loadLists();
      toast.success('List updated successfully');
    } catch (error) {
      toast.error('Failed to update list');
    }
  };

  const handleArchiveList = async (listId: string) => {
    if (!confirm('Are you sure you want to archive this list?')) return;
    try {
      await archiveList(listId);
      loadLists();
      toast.success('List archived successfully');
    } catch (error) {
      toast.error('Failed to archive list');
    }
  };

  const handleCreateCard = async (e: React.FormEvent, listId: string) => {
    e.preventDefault();
    try {
      await createCard(newCardName, listId);
      setNewCardName('');
      setIsCreatingCard(null);
      loadLists();
      toast.success('Card created successfully');
    } catch (error) {
      toast.error('Failed to create card');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;
    try {
      await deleteCard(cardId);
      loadLists();
      toast.success('Card deleted successfully');
    } catch (error) {
      toast.error('Failed to delete card');
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same list
      const listCards = [...cards[source.droppableId]];
      const [removed] = listCards.splice(source.index, 1);
      listCards.splice(destination.index, 0, removed);

      setCards({
        ...cards,
        [source.droppableId]: listCards
      });

      try {
        await updateCard(draggableId, {
          idList: destination.droppableId,
        });
      } catch (error) {
        toast.error('Failed to update card position');
        loadLists(); // Reload to restore original state
      }
    } else {
      // Move to different list
      const sourceCards = [...cards[source.droppableId]];
      const destCards = [...cards[destination.droppableId]];
      const [removed] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, removed);

      setCards({
        ...cards,
        [source.droppableId]: sourceCards,
        [destination.droppableId]: destCards
      });

      try {
        await updateCard(draggableId, {
          idList: destination.droppableId,
        });
      } catch (error) {
        toast.error('Failed to move card');
        loadLists(); // Reload to restore original state
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-emerald-800">Board View</h2>
        <button
          onClick={() => setIsCreatingList(true)}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus size={20} /> New List
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {isCreatingList && (
            <div className="w-80 shrink-0">
              <form onSubmit={handleCreateList} className="p-4 bg-white rounded-lg shadow">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="List name"
                  className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingList(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {lists.map((list) => (
            <Droppable key={list.id} droppableId={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-80 shrink-0"
                >
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-200">
                      {editingList === list.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            defaultValue={list.name}
                            className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateList(list.id, e.currentTarget.value);
                              }
                            }}
                          />
                          <button
                            onClick={() => setEditingList(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-800">{list.name}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingList(list.id)}
                              className="p-1 text-gray-500 hover:text-emerald-600 transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleArchiveList(list.id)}
                              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      {cards[list.id]?.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-white border border-gray-200 rounded shadow-sm hover:shadow transition-shadow"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-700">{card.name}</span>
                                <button
                                  onClick={() => handleDeleteCard(card.id)}
                                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {isCreatingCard === list.id ? (
                        <form onSubmit={(e) => handleCreateCard(e, list.id)}>
                          <input
                            type="text"
                            value={newCardName}
                            onChange={(e) => setNewCardName(e.target.value)}
                            placeholder="Card name"
                            className="w-full px-3 py-2 border border-emerald-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                            required
                          />
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="flex-1 px-3 py-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors text-sm"
                            >
                              Add
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsCreatingCard(null)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button
                          onClick={() => setIsCreatingCard(list.id)}
                          className="w-full px-3 py-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors text-sm flex items-center justify-center gap-1"
                        >
                          <Plus size={16} /> Add Card
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}