import { Edit2, Trash2, Check, X } from "lucide-react";
import { useState } from "react";

export default function Item({ item, onUpdate, onDelete, onSelect }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const handleSave = () => {
    if (newName.trim()) {
      onUpdate(item.id, newName);
    }
    setIsEditing(false);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent the click event from triggering onSelect
  };

  return (
    <div
      key={item.id}
      className="w-full h-96 p-8 bg-secondary-900 flex flex-col rounded-[2vw] relative item"
      onClick={() => onSelect(item.id)}
    >
      <div className="flex justify-center items-center w-full relative mb-4">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded-lg text-black text-center"
            autoFocus
          />
        ) : (
          <p className="text-lg text-center w-full">{item.name}</p>
        )}
        <div className="absolute right-0 flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={(e) => {
                  handleButtonClick(e); // Stop propagation
                  handleSave();
                }}
                className="text-green-500 hover:text-green-700 check-button"
              >
                <Check size={20} />
              </button>
              <button
                onClick={(e) => {
                  handleButtonClick(e); // Stop propagation
                  setIsEditing(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  handleButtonClick(e); // Stop propagation
                  setIsEditing(true);
                }}
                className="text-gray-500 hover:text-emerald-600 edit-button"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={(e) => {
                  handleButtonClick(e); // Stop propagation
                  onDelete(item.id);
                }}
                className="text-gray-500 hover:text-red-600 delete-button"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="w-full h-full bg-white rounded-[2vw]"></div>
    </div>
  );
}
