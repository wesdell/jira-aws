import { Project, Task, User } from "./";

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
};
