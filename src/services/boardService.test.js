import { getBoards, createBoard, updateBoard, deleteBoard } from './boardService';
import trelloClient from './trelloClient';


// Mock the trelloClient module
jest.mock('./trelloClient');

describe('boardService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getBoards', () => {
        it('should fetch boards for a specific organization', async () => {
            const organizationId = 'org123';
            const mockData = [{ id: 'board1', name: 'Board 1' }];

            trelloClient.get.mockResolvedValue({ data: mockData });

            const boards = await getBoards(organizationId);

            expect(trelloClient.get).toHaveBeenCalledWith(`/organizations/${organizationId}/boards`);
            expect(boards).toEqual(mockData);
        });

        it('should fetch boards for the authenticated member', async () => {
            const mockData = [{ id: 'board1', name: 'Board 1' }];

            trelloClient.get.mockResolvedValue({ data: mockData });

            const boards = await getBoards();

            expect(trelloClient.get).toHaveBeenCalledWith('/members/me/boards');
            expect(boards).toEqual(mockData);
        });

        it('should throw an error if fetching boards fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.get.mockRejectedValue(new Error(errorMessage));

            await expect(getBoards()).rejects.toThrow(`Error fetching boards: ${errorMessage}`);
        });
    });

    describe('createBoard', () => {
        it('should create a new board', async () => {
            const organizationId = 'org123';
            const name = 'New Board';
            const mockData = { id: 'board1', name: 'New Board' };

            trelloClient.post.mockResolvedValue({ data: mockData });

            const board = await createBoard(organizationId, name);

            expect(trelloClient.post).toHaveBeenCalledWith('/boards', {
                name,
                idOrganization: organizationId
            });
            expect(board).toEqual(mockData);
        });

        it('should throw an error if creating a board fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.post.mockRejectedValue(new Error(errorMessage));

            await expect(createBoard('org123', 'New Board')).rejects.toThrow(`Error creating board: ${errorMessage}`);
        });
    });

    describe('updateBoard', () => {
        it('should update a board', async () => {
            const boardId = 'board123';
            const name = 'Updated Board';
            const mockData = { id: 'board123', name: 'Updated Board' };

            trelloClient.put.mockResolvedValue({ data: mockData });

            const board = await updateBoard(boardId, name);

            expect(trelloClient.put).toHaveBeenCalledWith(`/boards/${boardId}`, { name });
            expect(board).toEqual(mockData);
        });

        it('should throw an error if updating a board fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.put.mockRejectedValue(new Error(errorMessage));

            await expect(updateBoard('board123', 'Updated Board')).rejects.toThrow(`Error updating board: ${errorMessage}`);
        });
    });

    describe('deleteBoard', () => {
        it('should delete a board', async () => {
            const boardId = 'board123';
            const mockData = { success: true };

            trelloClient.delete.mockResolvedValue({ data: mockData });

            const result = await deleteBoard(boardId);

            expect(trelloClient.delete).toHaveBeenCalledWith(`/boards/${boardId}`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if deleting a board fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.delete.mockRejectedValue(new Error(errorMessage));

            await expect(deleteBoard('board123')).rejects.toThrow(`Error deleting board: ${errorMessage}`);
        });
    });
});
