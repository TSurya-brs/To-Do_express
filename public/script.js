// script.js
document.getElementById("submit-btn").addEventListener("click", async () => {
  const taskInput = document.getElementById("task");
  const task = taskInput.value;

  if (!task) {
    alert("Enter a task");
    return;
  }

  // Send task to backend to add it
  const response1 = await fetch(`/add/${task}`);
  if (!response1.ok) {
    alert("Data not received from backend");
    return;
  }

  try {
    const data1 = await response1.text();
    console.log("Task added:", data1);

    const newTask = `
        <div class="task" data-task="${data1}">
          <input type="checkbox" class="task-checkbox"/>
          <p>${data1}</p>
        </div>`;
    document.getElementById("task-box").innerHTML += newTask;

    // Clear the input field after adding the task
    taskInput.value = "";
  } catch (error) {
    console.error("Error:", error);
  }
});

// Remove completed tasks
document.getElementById("remove-btn").addEventListener("click", async () => {
  const tasks = document.querySelectorAll(".task-checkbox:checked");
  tasks.forEach(async (checkbox) => {
    const taskDiv = checkbox.closest(".task");
    const taskText = taskDiv.getAttribute("data-task");

    // Send the completed task to the backend
    const response2 = await fetch(`/remove/${taskText}`);
    if (!response2.ok) {
      alert("Failed to remove task");
    } else {
      // Move the task to the completed tasks box without checkbox
      const completedTaskHtml = `<div class="completed-task"><p>${taskText}</p></div>`;
      document.getElementById("completion-box").innerHTML += completedTaskHtml;
      taskDiv.remove(); // Remove from task-box
    }
  });
});
