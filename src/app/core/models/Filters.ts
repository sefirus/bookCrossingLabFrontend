export interface Filters{
  categories : {
    id : number,
    name : string
  }[],
  writers : {
    id : number,
    fullName : string,
  }[],
  publishers : {
    id : number,
    name : string
  }[],
  languages : string[],
  minPageCount : number,
  maxPageCount : number
}
