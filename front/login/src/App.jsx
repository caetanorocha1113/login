import { useEffect, useState } from 'react'
import './App.css'


function App() {

const [user, setUser] = useState([]);
const [nome, setNome] = useState("");
const [idade, setIdade] = useState("");
const [editingId, setEditingId] = useState(null);

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


useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchUser();
}, []);

function handleEdit(user) {
  setEditingId(user.id);
  setNome(user.nome);
  setIdade(user.idade);
}

const usuariosExistentes = user.map((user) =>(
  <li key={user.id} className='user-item'>
    <span>{user.nome}  /  {user.idade} anos </span>
    <div>
      <button>editar</button>
      <button>excluir</button>
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
