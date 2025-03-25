import trelloClient from './trelloClient';

const handleResponse = async (response: any) => {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
  }
  return response.data;
};

// Organizations
export const getOrganizations = async () => {
  const response = await trelloClient.get('/members/me/organizations');
  return handleResponse(response);
};

export const createOrganization = async (name: string, displayName: string, desc: string) => {
  const response = await trelloClient.post('/organizations', {
    displayName,
    name,
    desc
  });
  return handleResponse(response);
};

export const updateOrganization = async (orgId: string, updates: Partial<{ displayName: string, desc: string }>) => {
  const response = await trelloClient.put(`/organizations/${orgId}`, updates);
  return handleResponse(response);
};

export const deleteOrganization = async (orgId: string) => {
  const response = await trelloClient.delete(`/organizations/${orgId}`);
  return handleResponse(response);
};

// Boards
export const getBoards = async (orgId: string) => {
  const response = await trelloClient.get(`/organizations/${orgId}/boards`);
  return handleResponse(response);
};

export const createBoard = async (name: string, orgId: string, desc: string = '') => {
  const response = await trelloClient.post('/boards', {
    name,
    idOrganization: orgId,
    desc
  });
  return handleResponse(response);
};

export const updateBoard = async (boardId: string, updates: Partial<{ name: string, desc: string }>) => {
  const response = await trelloClient.put(`/boards/${boardId}`, updates);
  return handleResponse(response);
};

export const deleteBoard = async (boardId: string) => {
  const response = await trelloClient.delete(`/boards/${boardId}`);
  return handleResponse(response);
};

// Lists
export const getLists = async (boardId: string) => {
  const response = await trelloClient.get(`/boards/${boardId}/lists`);
  return handleResponse(response);
};

export const createList = async (name: string, boardId: string) => {
  const response = await trelloClient.post('/lists', {
    name,
    idBoard: boardId
  });
  return handleResponse(response);
};

export const updateList = async (listId: string, name: string) => {
  const response = await trelloClient.put(`/lists/${listId}/name`, { value: name });
  return handleResponse(response);
};

export const archiveList = async (listId: string) => {
  const response = await trelloClient.put(`/lists/${listId}/closed`, { value: 'true' });
  return handleResponse(response);
};

// Cards
export const getCards = async (listId: string) => {
  const response = await trelloClient.get(`/lists/${listId}/cards`);
  return handleResponse(response);
};

export const createCard = async (name: string, listId: string, desc: string = '') => {
  const response = await trelloClient.post('/cards', {
    name,
    idList: listId,
    desc
  });
  return handleResponse(response);
};

export const updateCard = async (cardId: string, updates: Partial<{ name: string, desc: string, idList: string }>) => {
  const response = await trelloClient.put(`/cards/${cardId}`, updates);
  return handleResponse(response);
};

export const deleteCard = async (cardId: string) => {
  const response = await trelloClient.delete(`/cards/${cardId}`);
  return handleResponse(response);
};
