import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            name
            email
        }
    }
`

const CREATE_USER = gql`
    mutation CreateUser($name: String!, $email: String!) {
        createUser(input: { name: $name, email: $email }) {
            id
            name
            email
        }
    }
`

function App() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ variables: { name, email } });
    setName("");
    setEmail("");
    refetch();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Users</h1>
      <ul>
        {data?.users.map((user: any) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;