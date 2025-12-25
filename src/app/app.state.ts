import { Book } from "./models/book";
import { UserEntityState } from "./users/user.reducer";

export interface AppState {
    readonly book: Book[],
    readonly users: UserEntityState
}
