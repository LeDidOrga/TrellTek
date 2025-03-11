import { useState, useEffect } from 'react';
import { getOrganizations } from './api/workspaceService.js';

function Organizations({ onSelectOrganization }) {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    async function fetchOrganizations() {
      const orgs = await getOrganizations();
      setOrganizations(orgs);
    }
    fetchOrganizations();
  }, []);

  return (
    <div className="panel">
      <h2>Organizations</h2>
      <ul>
        {organizations.map((org) => (
          <li key={org.id} onClick={() => onSelectOrganization(org)}>
            {org.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Organizations;