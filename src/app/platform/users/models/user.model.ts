// Table data
export class User {
  userUuid?: string = null;
  userFirstName?: string = null;
  userLastName?: string = null;
  userPicture?: string = null;
  userEmail?: string = null;
  userUsername?: string = null;
  userIsActive?: string = null;
  userCreatedAt?: string = null;
  userUpdatedAt?: string = null;
  userDeletedAt?: string = null;
}

// Search Data
export class SearchResult {
  tables: User[];
  total: number;
}
