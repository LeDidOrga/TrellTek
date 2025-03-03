import trelloClient from './trelloClient';

// Read: Get lists on a board
export async function getListsOnBoard(boardId) {
    try {
        const response = await trelloClient.get(`/boards/${boardId}/lists`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching lists: ${error.message}`);
    }
}

// Create: Create a list
export async function createList(boardId, name) {
    try {
        const response = await trelloClient.post('/lists', {
            name,
            idBoard: boardId
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating list: ${error.message}`);
    }
}

// Update: Update a list
export async function updateList(listId, name) {
    try {
        const response = await trelloClient.put(`/lists/${listId}`, {
            name
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating list: ${error.message}`);
    }
}

// Delete: Delete a list
export async function deleteList(listId) {
    try {
        const response = await trelloClient.delete(`/lists/${listId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting list: ${error.message}`);
    }
}
