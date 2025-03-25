import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { getOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../services/trelloApi';
import type { TrelloOrganization } from '../types/trello';
import toast from 'react-hot-toast';

interface Props {
  onSelectOrg: (orgId: string) => void;
}

export default function OrganizationList({ onSelectOrg }: Props) {
  const [organizations, setOrganizations] = useState<TrelloOrganization[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [editingOrg, setEditingOrg] = useState<string | null>(null);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const orgs = await getOrganizations();
      setOrganizations(orgs);
    } catch (error) {
      toast.error('Failed to load organizations');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrganization(
        newOrgName.toLowerCase().replace(/\s+/g, '-'),
        newOrgName,
        'Created via Trello App'
      );
      setNewOrgName('');
      setIsCreating(false);
      loadOrganizations();
      toast.success('Organization created successfully');
    } catch (error) {
      toast.error('Failed to create organization');
    }
  };

  const handleUpdate = async (orgId: string, newName: string) => {
    try {
      await updateOrganization(orgId, { displayName: newName });
      setEditingOrg(null);
      loadOrganizations();
      toast.success('Organization updated successfully');
    } catch (error) {
      toast.error('Failed to update organization');
    }
  };

  const handleDelete = async (orgId: string) => {
    if (!confirm('Are you sure you want to delete this organization?')) return;
    try {
      await deleteOrganization(orgId);
      loadOrganizations();
      toast.success('Organization deleted successfully');
    } catch (error) {
      toast.error('Failed to delete organization');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800">Organizations</h2>
        <button
          data-cy="new-org-button"
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus size={20} /> New Organization
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="mb-6" data-cy="create-org-form">
          <div className="flex gap-2">
            <input
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Organization name"
              className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              data-cy="org-name-input"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              data-cy="create-org-submit"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              data-cy="create-org-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4" data-cy="org-list">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="p-4 border border-emerald-100 rounded-lg hover:border-emerald-200 transition-colors"
            data-cy="org-item"
          >
            {editingOrg === org.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  defaultValue={org.displayName}
                  className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  data-cy="edit-org-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdate(org.id, e.currentTarget.value);
                    }
                  }}
                />
                <button
                  onClick={() => setEditingOrg(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  data-cy="edit-org-cancel"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onSelectOrg(org.id)}
                  className="text-lg font-medium text-emerald-700 hover:text-emerald-800"
                  data-cy="select-org-button"
                >
                  {org.displayName}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingOrg(org.id)}
                    className="p-2 text-gray-500 hover:text-emerald-600 transition-colors"
                    data-cy="edit-org-button"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(org.id)}
                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    data-cy="delete-org-button"
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