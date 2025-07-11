


let currentIndex = 0;
let score = 0;
let selectedIndex = null;


const questions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["int", "var", "define", "dim"],
    answer: 1
  },
  {
    question: "What is the output of: typeof null?",
    options: ["null", "object", "undefined", "number"],
    answer: 1
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!--", "//", "/*", "#"],
    answer: 1
  },
  {
    question: "Which method converts a JSON string into an object?",
    options: ["JSON.stringify()", "JSON.objectify()", "JSON.parse()", "JSON.toObject()"],
    answer: 2
  },
  {
    question: "What will `2 + '2'` return?",
    options: ["4", "NaN", "'4'", "'22'"],
    answer: 3
  },
  {
    question: "What does `isNaN()` check?",
    options: ["If a value is null", "If a value is not a number", "If a value is undefined", "If a value is a string"],
    answer: 1
  },
  {
    question: "Which method adds a new item to the end of an array?",
    options: ["push()", "add()", "insert()", "append()"],
    answer: 0
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["float", "integer", "boolean", "decimal"],
    answer: 2
  },
  {
    question: "What is the default value of an uninitialized variable?",
    options: ["0", "null", "undefined", "false"],
    answer: 2
  },
  {
    question: "Which of these is used to define a function?",
    options: ["def", "function", "func", "define"],
    answer: 1
  }
];

let submitted = new Array(questions.length).fill(false);

document.querySelectorAll(".opt-btn").forEach((b, index)=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll(".opt-btn").forEach((btn)=>{
      btn.style.backgroundColor = "";
      btn.style.color = "";
      btn.style.fontWeight = "";
    })

    b.style.backgroundColor = "#1478FF";
    b.style.color = "white";
    b.style.fontWeight = "bolder"
    selectedIndex = index;
  })
})

document.querySelector(".submit").addEventListener("click",()=>{
  if(submitted[currentIndex]) return;
  if(selectedIndex==null){
    alert("please select an option")
  }
  else{
    submitted[currentIndex] = true;
    if(selectedIndex==questions[currentIndex].answer){
    score++;
    document.querySelector(".submit").style.backgroundColor = "green";
    document.querySelector(".submit").style.color = "white";
  }
  else{
    document.querySelector(".submit").style.backgroundColor = "red";
    document.querySelector(".submit").style.color = "White";
  }

  document.querySelector(".submit").disabled = true;
  document.querySelector(".reset").disabled = true;
  }
  
})

function loadQuestion(){
  const question = questions[currentIndex]
  document.querySelector(".question").textContent = questions[currentIndex].question;

  const buttons = document.querySelectorAll(".opt-btn");
  buttons.forEach((btn, index) => {
    btn.textContent = question.options[index];
    btn.style.backgroundColor = "";
    btn.style.color = "";
    btn.style.fontWeight = "";
  });

  selectedIndex = null;

  const subbtn = document.querySelector(".submit");
  const res = document.querySelector(".reset");
  if(submitted[currentIndex]){
    subbtn.disabled = true;
    res.disabled = true;
    res.style.backgroundColor = "gray";
    res.style.color = "white";

    subbtn.style.backgroundColor = "gray";
    subbtn.style.color = "white";
  }
  else{
    subbtn.disabled = false;
    res.disabled = false;
    subbtn.style.backgroundColor = "";
    subbtn.style.color = "";
    res.style.backgroundColor = "";
    res.style.color = "";
  }
}

document.querySelector(".next").addEventListener("click",()=>{
  if(currentIndex<questions.length-1){
    currentIndex++;
    loadQuestion();
    selectedIndex=null;
  }
  else{
    alert(`you completed the quiz \n your final score ${score}/${questions.length}`);
  }
})


document.querySelector(".prev").addEventListener("click",()=>{
  if(currentIndex>0){
    currentIndex--;
    loadQuestion()
    selectedIndex = null;
  }
  else{
    alert("you are on the first question.")
  }
})

const res = document.querySelector(".reset");
res.addEventListener("click",()=>{
    selectedIndex = null;
    const optbtn = document.querySelectorAll(".opt-btn");
    optbtn.forEach((b)=>{
      b.style.backgroundColor=""
      b.style.color=""
      b.style.fontWeight=""
    })
})

loadQuestion()