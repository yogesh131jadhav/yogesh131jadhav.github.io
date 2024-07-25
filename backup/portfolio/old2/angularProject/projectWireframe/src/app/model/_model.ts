export interface Common {
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface User extends Common {
  username?: string;
  password?: string;
  fname?: string;
  lname?: string;
}

export interface userGetRequest {
  
}

export interface userGetResponse {
  
}
