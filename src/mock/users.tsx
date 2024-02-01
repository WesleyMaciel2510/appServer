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
  { ID: 4, Name: "Maria Pereira", AccessLevel: 2, IsActive: true },
  { ID: 5, Name: "João Almeida", AccessLevel: 1, IsActive: false },
  { ID: 6, Name: "Ana Costa", AccessLevel: 3, IsActive: true },
  { ID: 7, Name: "Pedro Souza", AccessLevel: 2, IsActive: false },
  { ID: 8, Name: "Beatriz Martins", AccessLevel: 1, IsActive: true },
  { ID: 9, Name: "Gabriel Rodrigues", AccessLevel: 3, IsActive: true },
  { ID: 10, Name: "Camila Lima", AccessLevel: 2, IsActive: false },
];

export default users;
