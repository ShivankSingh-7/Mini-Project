flatpickr("#calendar", {
    inline: true // makes calendar always visible
});

let eIndex = null;

document.querySelectorAll(".plus, .addbox").forEach(el => {
    el.addEventListener("click", () => {
        let a = document.querySelector(".task-detail-panel");
        a.classList.toggle("display");
        a.style.backgroundColor = "black";
    })
})

let notes = JSON.parse(localStorage.getItem("notes")) || [];



function renderBox(title, description, index){
    let el = document.createElement("li");
    el.innerHTML = `<div class="box">
                            <div class="writtenContent">
                                <h2>${title}</h2>
                                <p>${description}</p>
                            </div>
                            <div class="icons">
                                <img src="edit.svg" alt="edit icon">
                                <img src="bin.svg" alt="bin icon">
                            </div>
                        </div>`

    let box = el.querySelector(".box");
    box.addEventListener("click",()=>{
        document.getElementById("ftitle").value = title;
        document.getElementById("description").value = description;
        document.querySelector(".task-detail-panel").classList.remove("display");

        eIndex = index;
    });

    document.querySelector("ul").appendChild(el);
    document.querySelector(".plus").style.display = "none";
}

notes.forEach((note, index) => {
    renderBox(note.title, note.description, index);
});

document.querySelector(".done").addEventListener("click", ()=>{
    let title = document.getElementById("ftitle").value;
    let description = document.getElementById("description").value;

    let note = {title, description};

    notes.push(note);

    localStorage.setItem("notes",JSON.stringify(notes));

    let a = document.querySelector(".task-detail-panel");
    document.getElementById("ftitle").value = "";
    document.getElementById("description").value = "";
    a.classList.toggle("display");
    renderBox(title,description);
})


function clock(hour, min, sec){
    let box = document.querySelector(".clock-box");
    box.innerHTML = `<p>${hour}: ${min}: ${sec}</p>`
}


setInterval(() => {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    hour = hour <10 ? "0"+hour : hour;
    min = min <10 ? "0"+min : min;
    sec = sec <10 ? "0"+sec : sec;

    clock(hour,min,sec)
}, 1000);