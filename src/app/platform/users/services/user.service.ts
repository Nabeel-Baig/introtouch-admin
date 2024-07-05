import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { debounceTime, delay, map, switchMap, tap } from "rxjs/operators";
import { SearchResult, User } from "../models/user.model";
import { SortDirection } from "./advanced-sortable.directive";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string, v2: string) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

/**
 * Sort the table data
 * @param tables Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(tables: User[], column: string, direction: string): User[] {
  if (direction === "" || column === "") {
    return tables;
  } else {
    return [...tables].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === "asc" ? res : -res;
    });
  }
}

/**
 * Table Data Match with Search input
 * @param tables Table field value fetch
 * @param term Search the value
 */
function matches(tables: User, term: string = "") {
  return (
    tables.userFirstName.toLowerCase().includes(term) ||
    tables.userEmail.toLowerCase().includes(term)
  );
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  private url: string = environment.apiUrl;
  private users: User[];
  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0,
  };

  private lastSearchState: Partial<State> = {};

  constructor(private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._tables$.next(result.tables);
        this._total$.next(result.total);
      });
    this._search$.next();
  }

  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);

  get loading$() {
    return this._loading$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _tables$ = new BehaviorSubject<User[]>([]);

  /**
   * Returns the value
   */
  get tables$() {
    return this._tables$.asObservable();
  }

  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);

  get total$() {
    return this._total$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  /**
   * set the value
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) {
    this._set({ page });
  }

  get pageSize() {
    return this._state.pageSize;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  get startIndex() {
    return this._state.startIndex;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }

  get endIndex() {
    return this._state.endIndex;
  }

  // tslint:disable-next-line: adjacent-overload-signatures

  // tslint:disable-next-line: adjacent-overload-signatures
  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }

  get totalRecords() {
    return this._state.totalRecords;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }

  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    // Take a snapshot of the state before updating
    const prevStateSnapshot = { ...this._state };

    // Update the state
    Object.assign(this._state, patch);

    // Determine if a search should be triggered
    const shouldTriggerSearch = [
      "page",
      "pageSize",
      "searchTerm",
      "sortColumn",
      "sortDirection",
    ].some((key) => prevStateSnapshot[key] !== this._state[key]);

    if (shouldTriggerSearch) {
      this._search$.next();
    }
  }

  /**
   * Search Method
   */
  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    return this.http
      .get<{ data: { users: User[] } }>("https://mt8nqfp7n2.execute-api.us-east-2.amazonaws.com/user/list")
      .pipe(
        map(response => {
          const usersData = response.data.users; // Correctly access the nested structure

          // 1. sort
          let users: User[] = sort(usersData, sortColumn, sortDirection);

          // 2. filter
          users = users.filter(user => matches(user, searchTerm));
          const total: number = users.length;

          // 3. paginate
          this.totalRecords = users.length;
          this._state.startIndex = (page - 1) * pageSize + 1;
          this._state.endIndex = (page - 1) * pageSize + pageSize;
          if (this._state.endIndex > this.totalRecords) {
            this._state.endIndex = this.totalRecords;
          }
          users = users.slice(this._state.startIndex - 1, this._state.endIndex);

          // Assuming SearchResult expects a property named 'tables'
          // and you've mapped User[] to Table[] appropriately elsewhere
          return { tables: users, total }; // Adjust to match SearchResult structure
        })
      );
  }

  public updateUser(userId: string ,user:User) {
    this.http.patch(this.url + "/user/update/" + userId, user).subscribe((data) => {
      console.log(data["data"].user);
      const userList = this._tables$.getValue();
      userList[userList.findIndex(el => el.userUuid === userId)] = data["data"].user;
      this._tables$.next(userList); // Subject is updating
      console.log(userList);
      console.log(this._tables$)
    })
  }

  public deleteUser(userId: string) {
    return this.http.delete(this.url + "/user/delete/" + userId).pipe(map(() => {
      const userList = this._tables$.getValue();
      const updatedList = userList.filter(x => x.userUuid != userId);
      this._tables$.next(updatedList);
    })); 
  }
}
