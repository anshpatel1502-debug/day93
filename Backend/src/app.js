const express = require("express")

const cors = require("cors")
const path = require("path")
const noteModel = require("./models/note.model")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))  // this middleware available seleted folder's file in publicly

app.post("/api/notes", async (req,res)=>{
  const { title,description } = req.body
  
  const note = await noteModel.create({
    title,description
  })

  res.status(201).json({
    message : "note created succussfully",
    note
  })
})

app.get("/api/notes", async (req,res)=>{

  const note = await noteModel.find()

  res.status(200).json({
    message : "note fetched succussfully",
    note
  })
})

app.delete("/api/notes/:id", async (req,res)=>{
  const id = req.params.id

  console.log(id)

  const note = await noteModel.findByIdAndDelete(id)

  res.status(200).json({  // for deleting note code is 204 but postman cannot recognize this code that's why we use 200 code.
    message : "note deleted successfully",
    note
  })
})

app.patch("/api/notes/:id", async (req,res)=>{
  const id = req.params.id
  const { description } = req.body
  console.log(id)

  const note = await noteModel.findByIdAndUpdate(id, {description} )

  res.status(200).json({  
    message : "note updated successfully",
    note
  })
})


app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname, ".." ,"/public/index.html"))
})

module.exports = app