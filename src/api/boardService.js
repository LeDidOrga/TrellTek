import trelloClient from './trelloClient';

// Read: Get boards
export async function getBoards(organizationId = '') {
    try {
        const url = organizationId
            ? `/organizations/${organizationId}/boards`
            : '/members/me/boards';

        const response = await trelloClient.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching boards: ${error.message}`);
    }
}

// Create: Create a board
export async function createBoard(organizationId, name, defaultLists = true) {
    try {
        const response = await trelloClient.post('/boards', {
            name,
            idOrganization: organizationId,
            defaultLists: defaultLists
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating board: ${error.message}`);
    }
}

// Update: Update a board
export async function updateBoard(boardId, name) {
    try {
        const response = await trelloClient.put(`/boards/${boardId}`, {
            name
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating board: ${error.message}`);
    }
}

// Delete: Delete a board
export async function deleteBoard(boardId) {
    try {
        const response = await trelloClient.delete(`/boards/${boardId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting board: ${error.message}`);
    }
}
