export interface Song {
  name: string;
  type: 'song';
  updateDate: string;
  isVisible?: boolean;
}

export interface Folder {
  name: string;
  type: 'folder';
  children: (Folder | Song)[];
  isVisible?: boolean;
}

export type Collection = (Song | Folder)[];
