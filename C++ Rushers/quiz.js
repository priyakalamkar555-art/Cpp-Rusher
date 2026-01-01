const quizzes = {
    basics: [
        {q:"C++ is a ____ language?", o:["Procedural","Object Oriented","Scripting","Markup"], a:1},
        {q:"Which symbol ends a statement?", o:[";"," .",":",","], a:0},
        {q:"C++ was developed by?", o:["Bjarne Stroustrup","Dennis Ritchie","James Gosling","Linus Torvalds"], a:0},
        {q:"C++ is extension of?", o:["C","Java","Python","C#"], a:0},
        {q:"C++ supports ____ programming?", o:["Object Oriented","Procedural","Both","Functional"], a:2}
    ],
    datatypes: [
        {q:"Which is valid data type?", o:["number","int","real","string"], a:1},
        {q:"Size of int?", o:["2 bytes","4 bytes","8 bytes","Depends on compiler"], a:3},
        {q:"Floating point type?", o:["int","char","float","bool"], a:2},
        {q:"Boolean type?", o:["true/false","1/0","yes/no","on/off"], a:0},
        {q:"char stores?", o:["Single character","String","Integer","Float"], a:0}
    ],
    loops: [
        {q:"Which loop is entry controlled?", o:["do-while","while","repeat","none"], a:1},
        {q:"for loop syntax?", o:["Init;Cond;Inc","Cond only","Inc only","None"], a:0},
        {q:"do-while executes?", o:["At least once","Zero times","Infinite","Only once"], a:0},
        {q:"Loop may run infinite?", o:["while","for","both","none"], a:2},
        {q:"Exit controlled loop?", o:["do-while","while","for","none"], a:0}
    ],
    functions: [
        {q:"Function is used for?", o:["Reusability","Memory leak","Error","Looping"], a:0},
        {q:"Return type of main()?", o:["void","int","float","char"], a:1},
        {q:"Function prototype ends with?", o:[";","{}"," :",","], a:0},
        {q:"Local variable scope?", o:["Inside function","Global","Class","All"], a:0},
        {q:"Function overloading?", o:["Same name, diff params","Diff name same params","Same name same params","None"], a:0}
    ],
    arrays: [
        {q:"Array stores elements in?", o:["Random memory","Contiguous memory","Heap only","Stack only"], a:1},
        {q:"Index of first element?", o:["0","1","-1","Depends"], a:0},
        {q:"Array size must be?", o:["Constant","Variable","Negative","None"], a:0},
        {q:"Arrays store?", o:["Multiple same type","Different types","Only char","Only int"], a:0},
        {q:"2D array has?", o:["Rows & Cols","Single row","Single col","None"], a:0}
    ],
    pointers: [
        {q:"Pointer stores?", o:["Value","Address","Function","Array"], a:1},
        {q:"Dereference operator?", o:["&","*","%","$"], a:1},
        {q:"NULL pointer points to?", o:["Nothing","Some value","Memory","Array"], a:0},
        {q:"Pointer type must match?", o:["Yes","No","Sometimes","None"], a:0},
        {q:"Pointer arithmetic allowed?", o:["Yes","No","Sometimes","Only int"], a:0}
    ],
    oops: [
        {q:"Not an OOPS concept?", o:["Encapsulation","Inheritance","Compilation","Polymorphism"], a:2},
        {q:"Keyword for inheritance?", o:["inherit","extends",":","base"], a:2},
        {q:"Encapsulation means?", o:["Data hiding","Multiple inheritance","Polymorphism","Overloading"], a:0},
        {q:"Polymorphism allows?", o:["Same interface, diff implementation","Diff interface same impl","No interface","None"], a:0},
        {q:"Constructor purpose?", o:["Initialize object","Delete object","Function overloading","None"], a:0}
    ]
};

let userAnswers = [];
let currentQuestions = [];

const topicSelect = document.getElementById("topicSelect");
const generateBtn = document.getElementById("generateBtn");
const quizBox = document.getElementById("quizBox");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

// Generate Quiz
generateBtn.addEventListener("click", () => {
    const topic = topicSelect.value;
    quizBox.innerHTML = "";
    resultDiv.innerHTML = "";
    userAnswers = [];
    currentQuestions = [];

    if (!topic) {
        quizBox.innerHTML = "<p style='color:red'>Please select a topic!</p>";
        submitBtn.style.display = "none";
        return;
    }

    const shuffled = [...quizzes[topic]].sort(() => 0.5 - Math.random());
    currentQuestions = shuffled.slice(0,5);

    currentQuestions.forEach((quizObj, qIndex) => {
        const qBlock = document.createElement("div");
        qBlock.classList.add("question-block");

        const qEl = document.createElement("h3");
        qEl.textContent = `${qIndex+1}. ${quizObj.q}`;
        qBlock.appendChild(qEl);

        quizObj.o.forEach((opt, i) => {
            const optEl = document.createElement("div");
            optEl.classList.add("option");
            optEl.textContent = opt;

            optEl.addEventListener("click", () => {
                userAnswers[qIndex] = i;
                const allOpts = qBlock.querySelectorAll(".option");
                allOpts.forEach(o => o.classList.remove("selected"));
                optEl.classList.add("selected");
            });

            qBlock.appendChild(optEl);
        });

        // placeholder for feedback per question
        const feedbackEl = document.createElement("div");
        feedbackEl.classList.add("feedback");
        qBlock.appendChild(feedbackEl);

        quizBox.appendChild(qBlock);
    });

    submitBtn.style.display = "inline-block";
    resultDiv.textContent = "";
});

// Submit Quiz
submitBtn.addEventListener("click", () => {
    if (currentQuestions.length === 0) return;
    let score = 0;
    currentQuestions.forEach((quizObj, qIndex) => {
        const selected = userAnswers[qIndex];
        const qBlock = quizBox.children[qIndex];
        const optionsEls = qBlock.querySelectorAll(".option");
        const feedbackEl = qBlock.querySelector(".feedback");

        optionsEls.forEach((optEl, i) => {
            optEl.style.pointerEvents = "none"; // disable clicks
            optEl.classList.remove("correct", "wrong");
            if(i === quizObj.a) optEl.classList.add("correct");
            if(selected === i && selected !== quizObj.a) optEl.classList.add("wrong");
        });

        if(selected === quizObj.a) {
            score++;
            feedbackEl.textContent = "Correct";
            feedbackEl.style.color = "green";
        } else {
            const correctText = quizObj.o[quizObj.a];
            feedbackEl.textContent = `Wrong — correct: ${correctText}`;
            feedbackEl.style.color = "red";
        }
    });

    resultDiv.textContent = `Your Score: ${score} / ${currentQuestions.length}`;
});
function goBack(){
    window.history.back();
}