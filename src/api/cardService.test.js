import { getCardsOnList, createCard, updateCard, deleteCard } from './cardService';
import trelloClient from './trelloClient';

// Mock the trelloClient module
jest.mock('./trelloClient');

describe('cardService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCardsOnList', () => {
        it('should fetch cards on a list', async () => {
            const listId = 'list123';
            const mockData = [{ id: 'card1', name: 'Card 1' }];

            trelloClient.get.mockResolvedValue({ data: mockData });

            const cards = await getCardsOnList(listId);

            expect(trelloClient.get).toHaveBeenCalledWith(`/lists/${listId}/cards`);
            expect(cards).toEqual(mockData);
        });

        it('should throw an error if fetching cards fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.get.mockRejectedValue(new Error(errorMessage));

            await expect(getCardsOnList('list123')).rejects.toThrow(`Error fetching cards: ${errorMessage}`);
        });
    });

    describe('createCard', () => {
        it('should create a new card', async () => {
            const listId = 'list123';
            const name = 'New Card';
            const desc = 'Card description';
            const mockData = { id: 'card1', name: 'New Card', desc: 'Card description' };

            trelloClient.post.mockResolvedValue({ data: mockData });

            const card = await createCard(listId, name, desc);

            expect(trelloClient.post).toHaveBeenCalledWith('/cards', {
                name,
                desc,
                idList: listId
            });
            expect(card).toEqual(mockData);
        });

        it('should throw an error if creating a card fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.post.mockRejectedValue(new Error(errorMessage));

            await expect(createCard('list123', 'New Card')).rejects.toThrow(`Error creating card: ${errorMessage}`);
        });
    });

    describe('updateCard', () => {
        it('should update a card', async () => {
            const cardId = 'card123';
            const name = 'Updated Card';
            const desc = 'Updated description';
            const mockData = { id: 'card123', name: 'Updated Card', desc: 'Updated description' };

            trelloClient.put.mockResolvedValue({ data: mockData });

            const card = await updateCard(cardId, name, desc);

            expect(trelloClient.put).toHaveBeenCalledWith(`/cards/${cardId}`, { name, desc });
            expect(card).toEqual(mockData);
        });

        it('should throw an error if updating a card fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.put.mockRejectedValue(new Error(errorMessage));

            await expect(updateCard('card123', 'Updated Card', 'Updated description')).rejects.toThrow(`Error updating card: ${errorMessage}`);
        });
    });

    describe('deleteCard', () => {
        it('should delete a card', async () => {
            const cardId = 'card123';
            const mockData = { success: true };

            trelloClient.delete.mockResolvedValue({ data: mockData });

            const result = await deleteCard(cardId);

            expect(trelloClient.delete).toHaveBeenCalledWith(`/cards/${cardId}`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if deleting a card fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.delete.mockRejectedValue(new Error(errorMessage));

            await expect(deleteCard('card123')).rejects.toThrow(`Error deleting card: ${errorMessage}`);
        });
    });
});
