import Item from "./Item";
import { Plus, Check, X } from "lucide-react";
import { useState } from "react";

export default function ItemBoard({
  title,
  span,
  items,
  onUpdate,
  onDelete,
  onAdd,
  onSelect
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleCreate = () => {
    if (newItemName.trim()) {
      onAdd(newItemName);
      setNewItemName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full justify-center flex flex-col mt-8 text-center">
      
      <div>
        <h1 className="text-5xl">{title}</h1>
        <span className="text-xl">{span}</span>
      </div>
      <div className="flex justify-end mr-8">

      {isCreating ? (
        <div className="flex items-center mt-6 self-center">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="p-2 border rounded-lg text-black"
            autoFocus
            />
          <button
            onClick={handleCreate}
            className="ml-2 text-green-500 hover:text-green-700"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => setIsCreating(false)}
            className="ml-2 text-gray-500 hover:text-gray-700"
            >
            <X size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="mt-6 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors self-center"
        >
          <Plus size={20} className="inline-block mr-2" /> Add Item
        </button>
      )}
      </div>
      <div className=" grid grid-cols-3 gap-12 p-8">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
