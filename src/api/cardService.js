import trelloClient from './trelloClient';

// Read: Get cards on a list
export async function getCardsOnList(listId) {
    try {
        const response = await trelloClient.get(`/lists/${listId}/cards`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching cards: ${error.message}`);
    }
}

// Create: Create a card
export async function createCard(listId, name, desc = '') {
    try {
        const response = await trelloClient.post('/cards', {
            name,
            desc,
            idList: listId
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error creating card: ${error.message}`);
    }
}

// Update: Update a card
export async function updateCard(cardId, name, desc) {
    try {
        const response = await trelloClient.put(`/cards/${cardId}`, {
            name,
            desc
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating card: ${error.message}`);
    }
}

// Update: Update a card's list
export async function updateCardList(cardId, listId) {
    try {
        const response = await trelloClient.put(`/cards/${cardId}`, {
            idList: listId
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating card's list: ${error.message}`);
    }
}

// Delete: Remove a label from a card
export async function resetCardLabel(cardId, labelId) {
    try {
        const response = await trelloClient.delete(`/cards/${cardId}/idLabels/${labelId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error removing label from card: ${error.message}`);
    }
}

// Delete: Delete a card
export async function deleteCard(cardId) {
    try {
        const response = await trelloClient.delete(`/cards/${cardId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting card: ${error.message}`);
    }
}
