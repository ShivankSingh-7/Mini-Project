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

// let notes = JSON.parse(localStorage.getItem("notes")) || [];



function renderBox(title, description, index) {
    let el = document.createElement("li");
    el.innerHTML = `<div class="box">
                            <div class="writtenContent">
                                <h2>${title}</h2>
                                <p>${description}</p>
                            </div>
                            <div class="icons">
                                <img src="edit.svg" alt="edit icon">
                                <img class="bin" type="button" src="bin.svg" alt="bin icon" data-index="${index}">
                            </div>
                        </div>`

    let box = el.querySelector(".box");
    box.addEventListener("click", () => {
        document.getElementById("ftitle").value = title;
        document.getElementById("description").value = description;
        document.querySelector(".task-detail-panel").classList.remove("display");

        eIndex = index;
    });

    el.querySelector(".bin").addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            let id = parseInt(e.target.dataset.index);
            let response = await fetch(`http://localhost:3000/notes/${id}`, {
                method: "DELETE",
            });
            let result = await response.json();
            if (response.ok) {
                document.getElementById("ftitle").value = "";
                document.getElementById("description").value = "";
                eIndex = null
                // document.querySelector("ul").innerHTML = "";
                await fetchNotes();

                const list = document.querySelector("ul");
                if (list.children.length === 0) {
                    document.querySelector(".plus").style.display = "block";
                }
            }
            else {
                alert(result);
            }
        } catch (error) {
            alert(error.message);
        }
    });

    document.querySelector("ul").appendChild(el);
    document.querySelector(".plus").style.display = "none";
}


async function fetchNotes() {
    try {
        const response = await fetch("http://localhost:3000/notes");
        const data = await response.json();

        document.querySelector("ul").innerHTML = "";
        data.forEach((note) => {
            renderBox(note.title, note.description, note.id);
        });
    } catch (error) {
        alert(error.message);
    }
}

fetchNotes();


document.querySelector(".done").addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation()
    let title = document.getElementById("ftitle").value;
    let description = document.getElementById("description").value;

    if (!title || !description) {
        alert("both title and decsription are requierd.")
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description })
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("ftitle").value = "";
            document.getElementById("description").value = "";
            document.querySelector(".task-detail-panel").classList.toggle("display");
            fetchNotes();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("caught error", error);
    }
});


function clock(hour, min, sec) {
    if (hour > 12) {
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

