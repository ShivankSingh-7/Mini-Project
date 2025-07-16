flatpickr("#calendar", {
    inline: true
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



function renderBox(title, description, index) {
    let el = document.createElement("li");
    el.innerHTML = `<div class="box">
                            <div class="writtenContent">
                                <h2>${title}</h2>
                                <p>${description}</p>
                            </div>
                            <div class="icons">
                                <img src="edit.svg" alt="edit icon">
                                <img class="bin" src="bin.svg" alt="bin icon" data-index="${index}">
                            </div>
                        </div>`

    let box = el.querySelector(".box");
    box.addEventListener("click", () => {
        document.getElementById("ftitle").value = title;
        document.getElementById("description").value = description;
        document.querySelector(".task-detail-panel").classList.remove("display");

        eIndex = index;
    });

    el.querySelector(".bin").addEventListener("click", (e) => {
        e.stopPropagation();
        let deleteIndex = parseInt(e.target.dataset.index);
        notes.splice(deleteIndex, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        document.querySelector("ul").innerHTML = "";
        if (notes.length != 0) {
            notes.forEach((n, i) => {
                renderBox(n.title, n.description, i);
            })
        }
        else{
            document.querySelector(".plus").style.display = "block";
        }
    });

    document.querySelector("ul").appendChild(el);
    document.querySelector(".plus").style.display = "none";
}

if (notes.length != 0) {
    notes.forEach((note, index) => {
        renderBox(note.title, note.description, index);
    });
}

document.querySelector(".done").addEventListener("click", () => {
    let title = document.getElementById("ftitle").value;
    let description = document.getElementById("description").value;
    let note = { title, description };
    if (eIndex == null) {
        notes.push(note);
    }
    else {
        notes[eIndex] = note;
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    let a = document.querySelector(".task-detail-panel");
    document.getElementById("ftitle").value = "";
    document.getElementById("description").value = "";
    eIndex = null;
    a.classList.toggle("display");
    document.querySelector("ul").innerHTML = "";
    notes.forEach((note, index) => {
        renderBox(note.title, note.description, index);
    })

    console.log("clicked done");
})


function clock(hour, min, sec) {
    if(hour>12){
        hour = hour - 12;
    }
    let box = document.querySelector(".clock-box");
    box.innerHTML = `<p>${hour} : ${min} : ${sec}</p>`
}


setInterval(() => {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    clock(hour, min, sec)
}, 1000);

