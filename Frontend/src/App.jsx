import React,{useState,useEffect} from 'react'
import axios from 'axios'

const App = () => {

  console.log("Integretion")

  const [note, setNote] = useState([
    {
      title : "test title 1",
      description : "test decription 1"
    },
    {
      title : "test title 2",
      description : "test decription 2"
    },
  ])
  
  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
      .then((res)=>{
        setNote(res.data.note)
      })
  }
  
  useEffect(()=>{
    fetchNotes
  },[])

  function submitHandler(e){
    e.preventDefault()

    const { title,description } = e.target.elements
    console.log( title.value,description.value )

    axios.post("http://localhost:3000/api/notes",{
      title : title.value,
      description : description.value
    })
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })
  }

  function deleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })
  }

  function updateNote(noteId){
    const newDesciption = prompt("Enter new description")

    axios.patch("http://localhost:3000/api/notes/"+noteId,{ description:newDesciption})
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })
  }
  return (
    <>
    <div className="notes">
      <form className='note-form' onSubmit={submitHandler}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button>create note</button>
      </form>

      {
        note.map((note,idx)=>{
          return <div key={idx} className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button className='dl' onClick={()=>{deleteNote(note._id)}}>delete</button>
            <button className='up' onClick={()=>{updateNote(note._id)}}>update</button>
          </div>
        })
      }
    </div>
    </>
  )
}

export default App
