export interface User {
  ID: number;
  Name: string;
  AccessLevel: number;
  IsActive: boolean;
  username: string;
  password: string;
}

const users: User[] = [
  {
    ID: 1,
    Name: "Carlos Silva",
    AccessLevel: 1,
    IsActive: true,
    username: "carlos.silva",
    password: "change@1",
  },
  {
    ID: 2,
    Name: "Fernanda Oliveira",
    AccessLevel: 2,
    IsActive: false,
    username: "fernanda.oliveira",
    password: "change@2",
  },
  {
    ID: 3,
    Name: "Ricardo Santos",
    AccessLevel: 3,
    IsActive: true,
    username: "ricardo.santos",
    password: "change@3",
  },
  {
    ID: 4,
    Name: "Maria Pereira",
    AccessLevel: 2,
    IsActive: true,
    username: "maria.pereira",
    password: "change@4",
  },
  {
    ID: 5,
    Name: "João Almeida",
    AccessLevel: 1,
    IsActive: false,
    username: "joao.almeida",
    password: "change@5",
  },
  {
    ID: 6,
    Name: "Ana Costa",
    AccessLevel: 3,
    IsActive: true,
    username: "ana.costa",
    password: "change@6",
  },
  {
    ID: 7,
    Name: "Pedro Souza",
    AccessLevel: 2,
    IsActive: false,
    username: "pedro.souza",
    password: "change@7",
  },
  {
    ID: 8,
    Name: "Beatriz Martins",
    AccessLevel: 1,
    IsActive: true,
    username: "beatriz.martins",
    password: "change@8",
  },
  {
    ID: 9,
    Name: "Gabriel Rodrigues",
    AccessLevel: 3,
    IsActive: true,
    username: "gabriel.rodrigues",
    password: "change@9",
  },
  {
    ID: 10,
    Name: "Camila Lima",
    AccessLevel: 2,
    IsActive: false,
    username: "camila.lima",
    password: "change@10",
  },
];

export default users;
