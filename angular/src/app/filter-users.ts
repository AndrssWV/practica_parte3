import { User } from './user.model';

export function filterUsers(users: User[], query: string): User[] {
  const q = query.trim().toLowerCase();
  return q ? users.filter(u => u.name.toLowerCase().includes(q)) : users;
}
