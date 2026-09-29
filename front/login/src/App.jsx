import { useCallback, useState } from 'react'
import './App.css'

const buscarUsuarios = useCallback(async () => {
  try{
    const response = await fetch("http://localhost:3000/user");
    const dados = await response.json();
    setUsuarios(dados);
  } catch (error){
    console.error("Erro ao buscar usúarios da API", error);
  }
})

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <button></button>
    </>
  )
}

export default App
