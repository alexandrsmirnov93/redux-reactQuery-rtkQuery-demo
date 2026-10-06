import { useGetUsersQuery } from "./api";

export const RTKquery = () => {
  const {
    data: users,
    isLoading,
    isError,
    // error,
  } = useGetUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>
          {user.name} — {user.email}
        </li>
      ))}
    </ul>
  );
}