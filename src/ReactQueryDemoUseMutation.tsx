import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';

type NewUser = {
  name: string;
  email: string;
};

const queryClient = new QueryClient();


async function createUser(user: NewUser) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );

  if (!response.ok) {
    throw new Error('Ошибка создания пользователя');
  }

  return response.json();
}

 const Users = () => {
  const mutation = useMutation({
    mutationFn: createUser,
  });

  const handleCreate = () => {
    mutation.mutate({
      name: 'Alex',
      email: 'alex@example.com',
    });
  };

  return (
    <div>
      <button
        onClick={handleCreate}
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? 'Создание...'
          : 'Создать пользователя'}
      </button>

      {mutation.isSuccess && (
        <div>Пользователь создан!</div>
      )}

      {mutation.isError && (
        <div>{mutation.error.message}</div>
      )}
    </div>
  );
}



export const ReactQueryDemoUseMutation = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}