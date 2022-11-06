import {Book} from "./Book";
import {Filters} from "./Filters";

export interface FilteredBooks {
  filters : Filters,
  books : {
    entities : Book[]
  }
}
