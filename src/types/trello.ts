export interface TrelloOrganization {
  id: string;
  name: string;
  displayName: string;
  desc: string;
}

export interface TrelloBoard {
  id: string;
  name: string;
  desc: string;
  idOrganization: string;
  closed: boolean;
}

export interface TrelloList {
  id: string;
  name: string;
  idBoard: string;
  closed: boolean;
  pos: number;
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  idList: string;
  pos: number;
  closed: boolean;
  due: string | null;
  labels: TrelloLabel[];
  idMembers: string[];

  members?: {
    id: string;
    username: string;
    initials: string;
  }[];
}
export interface TrelloMember {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

export interface TrelloLabel {
  id: string;
  name: string;
  color: string;
}