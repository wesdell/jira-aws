export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
};

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}