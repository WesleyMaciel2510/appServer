export interface User {
  ID: number;
  Name: string;
  AccessLevel: number;
  IsActive: boolean;
}

const users: User[] = [
  { ID: 1, Name: "Carlos Silva", AccessLevel: 1, IsActive: true },
  { ID: 2, Name: "Fernanda Oliveira", AccessLevel: 2, IsActive: false },
  { ID: 3, Name: "Ricardo Santos", AccessLevel: 3, IsActive: true },
];

export default users;
