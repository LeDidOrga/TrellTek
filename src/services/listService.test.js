import { getListsOnBoard, createList, updateList, deleteList } from './listService';
import trelloClient from './trelloClient';

// Mock the trelloClient module
jest.mock('./trelloClient');

describe('listService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getListsOnBoard', () => {
        it('should fetch lists on a board', async () => {
            const boardId = 'board123';
            const mockData = [{ id: 'list1', name: 'List 1' }];

            trelloClient.get.mockResolvedValue({ data: mockData });

            const lists = await getListsOnBoard(boardId);

            expect(trelloClient.get).toHaveBeenCalledWith(`/boards/${boardId}/lists`);
            expect(lists).toEqual(mockData);
        });

        it('should throw an error if fetching lists fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.get.mockRejectedValue(new Error(errorMessage));

            await expect(getListsOnBoard('board123')).rejects.toThrow(`Error fetching lists: ${errorMessage}`);
        });
    });

    describe('createList', () => {
        it('should create a new list', async () => {
            const boardId = 'board123';
            const name = 'New List';
            const mockData = { id: 'list1', name: 'New List' };

            trelloClient.post.mockResolvedValue({ data: mockData });

            const list = await createList(boardId, name);

            expect(trelloClient.post).toHaveBeenCalledWith('/lists', {
                name,
                idBoard: boardId
            });
            expect(list).toEqual(mockData);
        });

        it('should throw an error if creating a list fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.post.mockRejectedValue(new Error(errorMessage));

            await expect(createList('board123', 'New List')).rejects.toThrow(`Error creating list: ${errorMessage}`);
        });
    });

    describe('updateList', () => {
        it('should update a list', async () => {
            const listId = 'list123';
            const name = 'Updated List';
            const mockData = { id: 'list123', name: 'Updated List' };

            trelloClient.put.mockResolvedValue({ data: mockData });

            const list = await updateList(listId, name);

            expect(trelloClient.put).toHaveBeenCalledWith(`/lists/${listId}`, { name });
            expect(list).toEqual(mockData);
        });

        it('should throw an error if updating a list fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.put.mockRejectedValue(new Error(errorMessage));

            await expect(updateList('list123', 'Updated List')).rejects.toThrow(`Error updating list: ${errorMessage}`);
        });
    });

    describe('deleteList', () => {
        it('should delete a list', async () => {
            const listId = 'list123';
            const mockData = { success: true };

            trelloClient.delete.mockResolvedValue({ data: mockData });

            const result = await deleteList(listId);

            expect(trelloClient.delete).toHaveBeenCalledWith(`/lists/${listId}`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if deleting a list fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.delete.mockRejectedValue(new Error(errorMessage));

            await expect(deleteList('list123')).rejects.toThrow(`Error deleting list: ${errorMessage}`);
        });
    });
});
