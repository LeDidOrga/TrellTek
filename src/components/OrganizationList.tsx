import React, { useState, useEffect } from 'react';
import { getOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../services/trelloApi';
import type { TrelloOrganization } from '../types/trello';
import toast from 'react-hot-toast';
import ItemBoard from './ItemBoard';

interface Props {
  onSelectOrg: (orgId: string) => void;
}

export default function OrganizationList({ onSelectOrg }: Props) {
  const [organizations, setOrganizations] = useState<TrelloOrganization[]>([]);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const orgs = await getOrganizations();
      setOrganizations(orgs);
    } catch (error) {
      toast.error('Failed to load workspaces');
    }
  };

  const handleCreate = async (name: string) => {
    try {
      await createOrganization(
        name.toLowerCase().replace(/\s+/g, '-'),
        name,
        'Created via Trello App'
      );
      loadOrganizations();
      toast.success('Workspace created successfully');
    } catch (error) {
      toast.error('Failed to create workspace');
    }
  };

  const handleUpdate = async (orgId: string, newName: string) => {
    try {
      await updateOrganization(orgId, { displayName: newName });
      loadOrganizations();
      toast.success('Workspace updated successfully');
    } catch (error) {
      toast.error('Failed to update workspace');
    }
  };

  const handleDelete = async (orgId: string) => {
    if (!confirm('Are you sure you want to delete this workspace?')) return;
    try {
      await deleteOrganization(orgId);
      loadOrganizations();
      toast.success('Workspace deleted successfully');
    } catch (error) {
      toast.error('Failed to delete workspace');
    }
  };

console.log(organizations)

  return (
    <ItemBoard 
      title="Workspaces" 
      span="Your workspace is where you organize your projects and boards" 
      items={organizations} 
      onUpdate={handleUpdate} 
      onDelete={handleDelete} 
      onAdd={handleCreate} 
      onSelect={onSelectOrg}
    />
  );
}