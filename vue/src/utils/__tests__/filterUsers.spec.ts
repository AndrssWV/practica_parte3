import { describe, it, expect } from 'vitest'
import { filterUsers } from '../filterUsers'
import type { User } from '@/types/user'

const users: User[] = [
  { id: 1, name: 'Leanne Graham', email: 'a@a.com', address: { city: 'Gwenborough' } },
  { id: 2, name: 'Ervin Howell', email: 'b@b.com', address: { city: 'Wisokyburgh' } },
]

describe('filterUsers', () => {
  it('filtra por nombre sin importar mayúsculas', () => {
    expect(filterUsers(users, 'ERV').map((u) => u.id)).toEqual([2])
  })
})
