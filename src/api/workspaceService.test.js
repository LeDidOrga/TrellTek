import { createOrganization, getOrganizations, updateOrganization, deleteOrganization } from './workspaceService';
import trelloClient from './trelloClient';

// Mock the trelloClient module
jest.mock('./trelloClient');

describe('organizationService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createOrganization', () => {
        it('should create a new organization', async () => {
            const displayName = 'New Org';
            const desc = 'Organization description';
            const name = 'orgname';
            const mockData = { id: 'org123', displayName, desc, name };

            trelloClient.post.mockResolvedValue({ data: mockData });

            const organization = await createOrganization(displayName, desc, name);

            expect(trelloClient.post).toHaveBeenCalledWith('/organizations', {}, {
                params: {
                    displayName,
                    desc,
                    name
                }
            });
            expect(organization).toEqual(mockData);
        });

        it('should throw an error if creating an organization fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.post.mockRejectedValue(new Error(errorMessage));

            await expect(createOrganization('New Org')).rejects.toThrow(`Error creating organization: ${errorMessage}`);
        });
    });

    describe('getOrganizations', () => {
        it('should fetch organizations', async () => {
            const mockData = [{ id: 'org123', displayName: 'Org 1' }];

            trelloClient.get.mockResolvedValue({ data: mockData });

            const organizations = await getOrganizations();

            expect(trelloClient.get).toHaveBeenCalledWith('/members/me/organizations');
            expect(organizations).toEqual(mockData);
        });

        it('should throw an error if fetching organizations fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.get.mockRejectedValue(new Error(errorMessage));

            await expect(getOrganizations()).rejects.toThrow(`Error fetching organizations: ${errorMessage}`);
        });
    });

    describe('updateOrganization', () => {
        it('should update an organization', async () => {
            const organizationId = 'org123';
            const displayName = 'Updated Org';
            const desc = 'Updated description';
            const name = 'updatedname';
            const mockData = { id: 'org123', displayName, desc, name };

            trelloClient.put.mockResolvedValue({ data: mockData });

            const organization = await updateOrganization(organizationId, displayName, desc, name);

            expect(trelloClient.put).toHaveBeenCalledWith(`/organizations/${organizationId}`, {}, {
                params: {
                    displayName,
                    desc,
                    name
                }
            });
            expect(organization).toEqual(mockData);
        });

        it('should throw an error if updating an organization fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.put.mockRejectedValue(new Error(errorMessage));

            await expect(updateOrganization('org123', 'Updated Org')).rejects.toThrow(`Error updating organization: ${errorMessage}`);
        });
    });

    describe('deleteOrganization', () => {
        it('should delete an organization', async () => {
            const organizationId = 'org123';
            const mockData = { success: true };

            trelloClient.delete.mockResolvedValue({ data: mockData });

            const result = await deleteOrganization(organizationId);

            expect(trelloClient.delete).toHaveBeenCalledWith(`/organizations/${organizationId}`);
            expect(result).toEqual(mockData);
        });

        it('should throw an error if deleting an organization fails', async () => {
            const errorMessage = 'Network Error';
            trelloClient.delete.mockRejectedValue(new Error(errorMessage));

            await expect(deleteOrganization('org123')).rejects.toThrow(`Error deleting organization: ${errorMessage}`);
        });
    });
});
