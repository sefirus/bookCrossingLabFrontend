export interface User {
  email: string;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date;
  id: number;
  isActive: boolean;
  profilePictureId: string;
  profilePicture: string;
  currentBooks: string[] | null;
  createdAt: Date;
}
