import {BookCopy} from "./BookCopy";

export interface User {
  email: string;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date;
  id: number;
  isActive: boolean;
  profilePicture: string;
  currentBooks: BookCopy[];
}
