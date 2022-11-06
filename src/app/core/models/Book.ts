export interface Book {
  id: number;
  title: string;
  description: string;
  publisher:
    {
      id : number,
      name : string
    };
  writers:
    {
      id : number,
      fullName : string
    }[];
  isbn: string;
  language: string;
  pageCount: number;
  rate: number;
  pictureLink: string;
}
