import {Book} from "./Book";
import {BookCopyState} from "./BookCopyState";

export interface BookCopy{
  id: number;
  bookCopyPictures: string[];
  book: Book;
  state: BookCopyState;
  currentUserId: number;
  currentUserName: string;
  currentUserProfilePicture: string;
  currentShelfId: number;
  currentShelfAddress: string;
  currentShelfLatitude: number;
  currentShelfLongitude: number;
  createdAt: Date;
}
