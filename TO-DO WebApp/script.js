class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
    }

    bindEvents() {
        // Task form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Modal events
        const modal = document.getElementById('editModal');
        const closeBtn = document.querySelector('.close');
        const cancelBtn = document.querySelector('.cancel-btn');

        closeBtn.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Edit form submission
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        };

        this.tasks.push(task);
        this.saveToLocalStorage();
        this.renderTasks();
        this.updateStats();
        
        taskInput.value = '';
        taskInput.focus();

        // Show success animation
        this.showNotification('Task added successfully!', 'success');
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.currentEditId = taskId;
        document.getElementById('editTaskInput').value = task.text;
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('editTaskInput').focus();
    }

    saveEdit() {
        const newText = document.getElementById('editTaskInput').value.trim();
        
        if (newText === '') return;

        const taskIndex = this.tasks.findIndex(t => t.id === this.currentEditId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].text = newText;
            this.saveToLocalStorage();
            this.renderTasks();
            this.closeModal();
            this.showNotification('Task updated successfully!', 'success');
        }
    }

    closeModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditId = null;
        document.getElementById('editTaskInput').value = '';
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        task.completed = !task.completed;
        task.completedAt = task.completed ? new Date().toISOString() : null;

        this.saveToLocalStorage();
        this.renderTasks();
        this.updateStats();

        const message = task.completed ? 'Task completed!' : 'Task marked as pending!';
        this.showNotification(message, 'info');
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveToLocalStorage();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'warning');
        }
    }

    renderTasks() {
        const pendingTasks = this.tasks.filter(task => !task.completed);
        const completedTasks = this.tasks.filter(task => task.completed);

        this.renderTaskList('pendingTasks', pendingTasks, false);
        this.renderTaskList('completedTasks', completedTasks, true);
    }

    renderTaskList(containerId, tasks, isCompleted) {
        const container = document.getElementById(containerId);
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-clock'}"></i>
                    <p>${isCompleted ? 'No completed tasks yet' : 'No pending tasks'}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = tasks.map(task => this.createTaskElement(task)).join('');
    }

    createTaskElement(task) {
        const createdAt = new Date(task.createdAt).toLocaleString();
        const completedAt = task.completedAt ? new Date(task.completedAt).toLocaleString() : '';
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" 
                       class="task-checkbox" 
                       ${task.completed ? 'checked' : ''} 
                       onchange="taskManager.toggleTask(${task.id})">
                
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-timestamp">
                        Created: ${createdAt}
                        ${task.completed ? `<br>Completed: ${completedAt}` : ''}
                    </div>
                </div>
                
                <div class="task-actions">
                    ${!task.completed ? `
                        <button class="task-btn complete-btn" onclick="taskManager.toggleTask(${task.id})" title="Mark as complete">
                            <i class="fas fa-check"></i>
                        </button>
                    ` : ''}
                    <button class="task-btn edit-btn" onclick="taskManager.editTask(${task.id})" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete-btn" onclick="taskManager.deleteTask(${task.id})" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const pendingCount = this.tasks.filter(task => !task.completed).length;
        const completedCount = this.tasks.filter(task => task.completed).length;
        const totalCount = this.tasks.length;

        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('completedCount').textContent = completedCount;
        document.getElementById('totalCount').textContent = totalCount;
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545',
            info: '#17a2b8'
        };
        return colors[type] || colors.info;
    }

    // Additional utility methods
    clearCompletedTasks() {
        if (confirm('Are you sure you want to clear all completed tasks?')) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveToLocalStorage();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Completed tasks cleared!', 'info');
        }
    }

    clearAllTasks() {
        if (confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
            this.tasks = [];
            this.saveToLocalStorage();
            this.renderTasks();
            this.updateStats();
            this.showNotification('All tasks cleared!', 'warning');
        }
    }

    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Tasks exported successfully!', 'success');
    }

    importTasks() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedTasks = JSON.parse(e.target.result);
                    if (Array.isArray(importedTasks)) {
                        this.tasks = importedTasks;
                        this.saveToLocalStorage();
                        this.renderTasks();
                        this.updateStats();
                        this.showNotification('Tasks imported successfully!', 'success');
                    } else {
                        throw new Error('Invalid file format');
                    }
                } catch (error) {
                    this.showNotification('Error importing tasks. Please check the file format.', 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
}

// Initialize the task manager when the page loads
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'n':
                e.preventDefault();
                document.getElementById('taskInput').focus();
                break;
            case 's':
                e.preventDefault();
                if (taskManager) {
                    taskManager.exportTasks();
                }
                break;
        }
    }
    
    // Escape key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('editModal');
        if (modal.style.display === 'block') {
            taskManager.closeModal();
        }
    }
});

// Add some sample tasks on first visit
window.addEventListener('load', () => {
    if (!localStorage.getItem('tasks') || JSON.parse(localStorage.getItem('tasks')).length === 0) {
        const sampleTasks = [
            {
                id: Date.now() - 3000,
                text: 'Welcome to TaskMaster! Click the checkbox to mark this task as complete.',
                completed: false,
                createdAt: new Date(Date.now() - 3000).toISOString(),
                completedAt: null
            },
            {
                id: Date.now() - 2000,
                text: 'Try editing this task by clicking the edit button.',
                completed: false,
                createdAt: new Date(Date.now() - 2000).toISOString(),
                completedAt: null
            },
            {
                id: Date.now() - 1000,
                text: 'This is a completed task example.',
                completed: true,
                createdAt: new Date(Date.now() - 1000).toISOString(),
                completedAt: new Date().toISOString()
            }
        ];
        
        localStorage.setItem('tasks', JSON.stringify(sampleTasks));
        if (taskManager) {
            taskManager.tasks = sampleTasks;
            taskManager.renderTasks();
            taskManager.updateStats();
        }
    }
}); 