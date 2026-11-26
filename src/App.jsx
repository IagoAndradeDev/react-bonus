import { createElement, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

function App() {
  const [list, setList] = useState([])

  function addTarefas() {
    const input = document.getElementById('input-tarefa').value
    if (!input.trim()) return
    const itemValidos = list.some(item => item.tarefa.toLowerCase() === input.trim().toLowerCase())
    if (itemValidos) {
      alert("Essa tarefa já existe!")
      return
    }
    setList([...list, {id: uuidv4(), tarefa: input, concluido: false}])
  }
  
  function addConcluido(id) {
    const newList = list.map(item => (
      item.id == id ? {...item, concluido: !item.concluido} : item
    ))
    setList(newList)
  }

  function removeItem(id) {
    const newList = list.filter(item => (item.id !== id))
    setList(newList)
  }

  return (
    <>
     <div className="w-100 max-h-100 overflow-auto bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)] rounded-sm flex flex-col">
        <div className="h-15 flex justify-between items-center bg-[#ffffff] m-2 gap-1 rounded-md">
          <input className="w-65 h-10 border p-2 border-gray-500 text-sm rounded-sm" id="input-tarefa" type="text" placeholder="Adicione sua tarefa..." />
          <button className="w-30 h-10 bg-[#533fc5]  text-white text-sm rounded-md cursor-pointer hover:opacity-80 active:opacity-50" onClick={addTarefas}>Adicionar</button>
        </div>


        <ul className="flex flex-col gap-3 m-2" id='minha-lista'>
          
        {list.length > 0 ? 
        (list.map( item => (
            <div key={item.id} className={`w-full h-15 flex justify-between items-center ${item.concluido ? "bg-[#76c076]" : "bg-[#ffffff]"} shadow-[1px_4px_10px_rgba(0,0,0,0.35)] rounded-md`}>
              <FaCheck onClick={() => addConcluido(item.id)} className="w-12 h-5 pl-5 cursor-pointer text-[#606060] hover:text-[#1fa10e] active:opacity-60" />
              <li className="w-full pl-5 text-[15px] text-center">{item.tarefa}</li>
              <FaTrashAlt onClick={()=> removeItem(item.id)} className="w-12 h-5 pr-5 cursor-pointer text-[#606060] hover:text-[#533fc5] active:opacity-60">Apagar</FaTrashAlt>
            </div>
          ))
        ) : (
          <h2>Não há tarefas no momento!</h2>
        )
        }
        </ul>
     </div>
    </>
  )
}

export default App
