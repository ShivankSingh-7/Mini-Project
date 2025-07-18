import express from "express";
import cors from "cors";
const app = express()
const port = 3000

app.use(express.json());
app.use(cors()); 

let notes = [];

app.get("/notes", (req, res) => {
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

    if(note)
    notes.push(note);

    res.status(201).json({message: "notes added", notes});
})

app.delete("/notes/:id",(req,res)=>{
    const idToDelete = Number(req.params.id);
    const index = notes.findIndex(note=> note.id === idToDelete);

    if(index == -1){
        return res.status(404).json({message: "Note not found"});
    }

    notes.splice(index,1);
    res.status(200).json({message: "notes deleted"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})