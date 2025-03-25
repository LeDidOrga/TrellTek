const TRELLO_API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TRELLO_TOKEN = import.meta.env.VITE_TRELLO_TOKEN;
const BASE_URL = 'https://api.trello.com/1';

const createQueryString = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams({
    key: TRELLO_API_KEY,
    token: TRELLO_TOKEN,
    ...params
  });
  return searchParams.toString();
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
  }
  return response.json();
};

// Organizations
export const getOrganizations = async () => {
  const response = await fetch(`${BASE_URL}/members/me/organizations?${createQueryString({})}`);
  return handleResponse(response);
};

export const createOrganization = async (name: string, displayName: string, desc: string) => {
  const response = await fetch(`${BASE_URL}/organizations?${createQueryString({
    displayName,
    name,
    desc
  })}`, {
    method: 'POST'
  });
  return handleResponse(response);
};

export const updateOrganization = async (orgId: string, updates: Partial<{ displayName: string, desc: string }>) => {
  const response = await fetch(`${BASE_URL}/organizations/${orgId}?${createQueryString(updates as Record<string, string>)}`, {
    method: 'PUT'
  });
  return handleResponse(response);
};

export const deleteOrganization = async (orgId: string) => {
  const response = await fetch(`${BASE_URL}/organizations/${orgId}?${createQueryString({})}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

// Boards
export const getBoards = async (orgId: string) => {
  const response = await fetch(`${BASE_URL}/organizations/${orgId}/boards?${createQueryString({})}`);
  return handleResponse(response);
};

export const createBoard = async (name: string, orgId: string, desc: string = '') => {
  const response = await fetch(`${BASE_URL}/boards?${createQueryString({
    name,
    idOrganization: orgId,
    desc
  })}`, {
    method: 'POST'
  });
  return handleResponse(response);
};

export const updateBoard = async (boardId: string, updates: Partial<{ name: string, desc: string }>) => {
  const response = await fetch(`${BASE_URL}/boards/${boardId}?${createQueryString(updates as Record<string, string>)}`, {
    method: 'PUT'
  });
  return handleResponse(response);
};

export const deleteBoard = async (boardId: string) => {
  const response = await fetch(`${BASE_URL}/boards/${boardId}?${createQueryString({})}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

// Lists
export const getLists = async (boardId: string) => {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/lists?${createQueryString({})}`);
  return handleResponse(response);
};

export const createList = async (name: string, boardId: string) => {
  const response = await fetch(`${BASE_URL}/lists?${createQueryString({
    name,
    idBoard: boardId
  })}`, {
    method: 'POST'
  });
  return handleResponse(response);
};

export const updateList = async (listId: string, name: string) => {
  const response = await fetch(`${BASE_URL}/lists/${listId}/name?${createQueryString({ value: name })}`, {
    method: 'PUT'
  });
  return handleResponse(response);
};

export const archiveList = async (listId: string) => {
  const response = await fetch(`${BASE_URL}/lists/${listId}/closed?${createQueryString({ value: 'true' })}`, {
    method: 'PUT'
  });
  return handleResponse(response);
};

// Cards
export const getCards = async (listId: string) => {
  const response = await fetch(`${BASE_URL}/lists/${listId}/cards?${createQueryString({})}`);
  return handleResponse(response);
};

export const createCard = async (name: string, listId: string, desc: string = '') => {
  const response = await fetch(`${BASE_URL}/cards?${createQueryString({
    name,
    idList: listId,
    desc
  })}`, {
    method: 'POST'
  });
  return handleResponse(response);
};

export const updateCard = async (cardId: string, updates: Partial<{ name: string, desc: string, idList: string }>) => {
  const response = await fetch(`${BASE_URL}/cards/${cardId}?${createQueryString(updates as Record<string, string>)}`, {
    method: 'PUT'
  });
  return handleResponse(response);
};

export const deleteCard = async (cardId: string) => {
  const response = await fetch(`${BASE_URL}/cards/${cardId}?${createQueryString({})}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};