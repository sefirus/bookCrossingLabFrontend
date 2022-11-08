export interface Shelf {
  id: number
  createdAt: Date;
  //PagedViewModel<ReadBookCopyViewModel> PagedBookCopies
  pictures: string[];
  title: string;
  formattedAddress: string;
  latitude: number
  longitude: number;
}
