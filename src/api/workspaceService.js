import trelloClient from './trelloClient'

// Create: Create a new organization
export async function createOrganization(displayName, desc = '', name = '') {
  try {
    const response = await trelloClient.post(
      '/organizations',
      {},
      {
        params: {
          displayName,
          desc,
          name,
        },
      },
    )
    return response.data
  } catch (error) {
    throw new Error(`Error creating organization: ${error.message}`)
  }
}

// Read: Get organizations
export async function getOrganizations() {
  try {
    const response = await trelloClient.get('/members/me/organizations')
    return response.data
  } catch (error) {
    throw new Error(`Error fetching organizations: ${error.message}`)
  }
}

export async function getOrganizationsBoards(id) {
  try {
    const response = await trelloClient.get(`/organizations/${id}/boards`)
    return response.data
  } catch (error) {
    throw new Error(`Error fetching organizations boards: ${error.message}`)
  }
}

// Update: Update an organization's details
export async function updateOrganization(
  organizationId,
  displayName,
  desc,
  name,
) {
  try {
    const response = await trelloClient.put(
      `/organizations/${organizationId}`,
      {},
      {
        params: {
          displayName,
          desc,
          name,
        },
      },
    )
    return response.data
  } catch (error) {
    throw new Error(`Error updating organization: ${error.message}`)
  }
}

// Delete: Delete an organization
export async function deleteOrganization(organizationId) {
  try {
    const response = await trelloClient.delete(
      `/organizations/${organizationId}`,
    )
    return response.data
  } catch (error) {
    throw new Error(`Error deleting organization: ${error.message}`)
  }
}
