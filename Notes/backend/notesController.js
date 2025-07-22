import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "notes.json");

function readNotes(){
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

function addNote(note){
    const notes = readNotes();
    notes.push(note);
    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

function deleteNote(id){
    let notes = readNotes();
    notes = notes.filter(note => note.id !==id);
    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

export {readNotes, addNote, deleteNote};