export interface User {
  ID: number;
  Name: string;
  AccessLevel: number;
  IsActive: boolean;
}

const users: User[] = [
  { ID: 1, Name: "John Doe", AccessLevel: 1, IsActive: true },
  { ID: 2, Name: "Jane Smith", AccessLevel: 2, IsActive: false },
  { ID: 3, Name: "Bob Johnson", AccessLevel: 3, IsActive: true },
];

export default users;
