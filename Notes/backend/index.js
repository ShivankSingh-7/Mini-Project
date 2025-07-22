import express from "express";
import cors from "cors";
import { readNotes, addNote, deleteNote } from './notesController.js';

const app = express()
const port = 3000

app.use(express.json());
app.use(cors()); 

app.get("/notes", (req, res) => {
    const notes = readNotes();
    res.json(notes);
})

app.post("/notes", (req,res)=>{
    const {title, description} = req.body;
    if(!title || !description){
        return res.status(400).json({message: "Title and description required"})
    }

    const note = {
        id: Date.now(),
        title,
        description
    };

    addNote(note);

    res.status(201).json({message: "notes added",note});
})

app.delete("/notes/:id",(req,res)=>{
    const idToDelete = Number(req.params.id);
    deleteNote(idToDelete);
    res.status(200).json({message: "Note deleted sucessfully"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})