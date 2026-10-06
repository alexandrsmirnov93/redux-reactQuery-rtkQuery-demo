import { useState } from 'react';

import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from './api';

export const InvalidationUsers = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useGetUsersQuery();

  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserMutation();

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [name, setName] = useState('');

  const startEditing = (userId: number, userName: string) => {
    setEditingId(userId);
    setName(userName);
  };

  const saveUser = async (userId: number) => {
    const user = users.find(
      (user) => user.id === userId
    );

    if (!user) {
      return;
    }

    await updateUser({
      ...user,
      name,
    });

    setEditingId(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          {editingId === user.id ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <button
                onClick={() => saveUser(user.id)}
                disabled={isUpdating}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span>{user.name}</span>

              <button
                onClick={() =>
                  startEditing(user.id, user.name)
                }
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};