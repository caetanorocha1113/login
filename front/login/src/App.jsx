import { useEffect, useState } from 'react'
import './App.css'


function App() {

const [user, setUser] = useState([]);
const [nome, setNome] = useState("");
const [idade, setIdade] = useState("");
const [editingId, setEditingId] = useState(null);
const [deletingId, setDeletingId] = useState(null);

async function fetchUser() {
  const res = await fetch(`http://localhost:3000/user`);
  const data = await res.json();
  setUser(data);
}

async function handleSubmit(e) {
  e.preventDefault();
  if (editingId) {
    await fetch(`http://localhost:3000/user/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade: Number(idade) }),
    });
    setEditingId(null);
  } else {
    await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade: Number(idade) }),
    });
  };

  setNome("");
  setIdade("");
  fetchUser();
}

async function handleDelete(user) {
  const confirmar = window.confirm(`Excluir ${user.nome}?`);
  if (!confirmar) return;

  setDeletingId(user.id);

  try {
    const res = await fetch(`http://localhost:3000/user/${user.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      alert("Não foi possível excluir");
      return;
    }

    if (editingId === user.id) {
      setEditingId(null);
      setNome("");
      setIdade("");
    }
    await fetchUser();
  } catch {
    alert("Não foi possível excluir");
  } finally {
    setDeletingId(null);
  }
}

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchUser();
}, []);

function handleEdit(user) {
  setEditingId(user.id);
  setNome(user.nome);
  setIdade(user.idade);
}

const usuariosExistentes = user.map((u) =>(
  <li key={u.id} className='user-item'>
    <span>{u.nome}  /  {u.idade} anos </span>
    <div>
      <button type="button" onClick={() => handleEdit(u)}>editar</button>
      <button type="button" onClick={() => handleDelete(u)}>excluir</button>
    </div>
  </li>
))

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder='Nome' value={nome}
        onChange={(e) => setNome(e.target.value)} 
        required  
      />
      <input 
        type="number" 
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        required
      />
      <button type="submit">{editingId ? "Atualizar" : "Criar"}</button>
    </form>
    <h1>Olá</h1>
    <ul className="lista-usuarios">{usuariosExistentes}</ul>
    

  </>


  )
}

export default App
