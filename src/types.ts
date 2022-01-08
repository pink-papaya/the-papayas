export interface Song {
  name: string;
  type: "song";
  updateDate: string;
}

export interface Folder {
  name: string;
  type: "folder";
  children: (Folder | Song)[];
}
