document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);

function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("categorySelect").value;
  const dueDate = document.getElementById("dueDate").value;
  const task = input.value.trim();

  if (task === "") return alert("Please enter a task!");

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task} <small>[${category}]</small> <small>${dueDate || ""}</small></span>
    <div>
      <button class="complete-btn" onclick="toggleComplete(this)">✔</button>
      <button class="delete-btn" onclick="deleteTask(this)">✖</button>
    </div>
  `;

  if (dueDate && new Date(dueDate) < new Date()) {
    li.classList.add("overdue");
  }

  document.getElementById("taskList").appendChild(li);

  saveTasks();
  input.value = "";
  document.getElementById("dueDate").value = "";
}

function toggleComplete(button) {
  const li = button.parentElement.parentElement;
  li.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  const li = button.parentElement.parentElement;
  li.remove();
  saveTasks();
}

function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    document.getElementById("taskList").innerHTML = "";
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    document.getElementById("taskList").innerHTML = savedTasks;
  }
}

function filterTasks() {
  const category = document.getElementById("filterCategory").value;
  const status = document.getElementById("filterStatus").value;
  const search = document.getElementById("searchTask").value.toLowerCase();

  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(task => {
    const text = task.textContent.toLowerCase();
    const isCompleted = task.classList.contains("completed");
    let show = true;

    if (category !== "All" && !text.includes(category.toLowerCase())) {
      show = false;
    }

    if (status === "Completed" && !isCompleted) {
      show = false;
    }

    if (status === "Pending" && isCompleted) {
      show = false;
    }

    if (search && !text.includes(search)) {
      show = false;
    }

    task.style.display = show ? "flex" : "none";
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
