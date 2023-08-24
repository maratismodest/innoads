import fetchUsers from '@/utils/api/fetchUsers';
import Link from 'next/link';

export const revalidate = 86400

export default async function UsersPage() {
  const users = await fetchUsers();
  return (
    <>
      <h1>Пользователи</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
