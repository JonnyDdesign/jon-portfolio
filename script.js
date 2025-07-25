// === CHORE CHOMPER LOGIC ===
if (document.getElementById("add-task")) {
    const addBtn = document.getElementById("add-task");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    let tasks = [];

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => renderTask(task));
        }
    }

    function renderTask(task) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");
        if (task.completed) {
            span.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t !== task);
            li.remove();
            saveTasksToLocalStorage();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            if (checkbox.checked) {
                li.classList.add("completed");

                // Add gator animation
                const gator = document.createElement("span");
                gator.classList.add("gator");
                gator.innerHTML = `
                    <svg class="gator-svg" viewBox="0 0 100 50">
                        <g class="jaw-group">
                            <path d="M10,20 Q50,0 90,20" fill="green" class="jaw upper"/>
                            <path d="M10,20 Q50,40 90,20" fill="green" class="jaw lower"/>
                            <polygon points="20,18 23,10 26,18" fill="white"/>
                            <polygon points="40,18 43,10 46,18" fill="white"/>
                            <polygon points="60,18 63,10 66,18" fill="white"/>
                        </g>
                    </svg>
                `;
                li.insertBefore(gator, li.firstChild);

                // Chomp animation
                setTimeout(() => {
                    li.classList.add("chomped");
                    setTimeout(() => {
                        tasks = tasks.filter(t => t !== task);
                        li.remove();
                        saveTasksToLocalStorage();
                    }, 1000);
                }, 1000);
            } else {
                span.classList.remove("completed");
            }
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        renderTask(newTask);
        saveTasksToLocalStorage();

        taskInput.value = "";
        taskInput.focus();
    }

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasksFromLocalStorage();
}


// === LUNCHBOX NOTE GENERATOR LOGIC ===
if (document.getElementById("generateBtn")) {
    const notes = [
        "You’re one in a melon 🍉",
        "You’ve got this! 💪",
        "Don’t forget to smile today 😄",
        "You are beary awesome 🐻",
        "Knock knock… Who’s there? Lunch! 🍱",
        "You make the sun jealous 🌞",
        "Go out and taco 'bout your awesomeness 🌮",
        "You're dino-mite! 🦖",
        "Keep being brilliant 💡",
        "You’re the cheese to my cracker 🧀"
    ];

    const btn = document.getElementById("generateBtn");
    const noteText = document.getElementById("noteText");

    btn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * notes.length);
        noteText.textContent = notes[randomIndex];
    });
}
