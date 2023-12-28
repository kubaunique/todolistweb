function fetchTasks() {
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks`)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear previous tasks

            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task.title; // Assuming the task object has a 'title' property

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteTask(task.id)); // Implement delete functionality

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editTask(task.id, task.title)); // Implement edit functionality

                taskItem.appendChild(deleteButton);
                taskItem.appendChild(editButton); // Append edit button to task

                taskList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}


// Function to add a new task
function addTask(taskText) {
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskText }),
    })
    .then(response => {
        if (response.ok) {
            fetchTasks(); // Refresh task list after adding a task
        } else {
            throw new Error('Failed to add task');
        }
    })
    .catch(error => console.error('Error adding task:', error));
}

function editTask(taskId, taskTitle) {
    const newTitle = prompt('Enter new task title', taskTitle);
    if (newTitle !== null && newTitle.trim() !== '') {
        fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle }),
        })
            .then(response => {
                if (response.ok) {
                    fetchTasks(); // Refresh task list after editing a task
                } else {
                    throw new Error('Failed to edit task');
                }
            })
            .catch(error => console.error('Error editing task:', error));
    }
}



// Function to delete a task
function deleteTask(taskId) {
    fetch(`https://658bea59859b3491d3f50db8.mockapi.io/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            fetchTasks(); // Refresh task list after deleting a task
        } else {
            throw new Error('Failed to delete task');
        }
    })
    .catch(error => console.error('Error deleting task:', error));
}

document.getElementById('logoutButton').addEventListener('click', function() {
    // Perform logout actions here (e.g., clearing user session, redirecting to login page)

    // For demonstration purposes, clearing local storage (replace with your logout logic)
    localStorage.removeItem('userLoggedIn'); // Assuming a flag 'userLoggedIn' is stored upon successful login

    // Redirect to the login page after logout
    window.location.replace('login.html');
});

// Event listener for form submission to add task
document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = document.getElementById('taskInput').value;
    if (taskText.trim() !== '') {
        addTask(taskText);
        document.getElementById('taskInput').value = '';
    }
});

// Call the fetchTasks function when the page loads
window.addEventListener('load', function () {
    fetchTasks();
});



tasks.forEach(task => {
    // ... existing code for delete button creation

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(task.id, task.title)); // Implement edit functionality

    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton); // Append edit button to task

    taskList.appendChild(taskItem);
});

