# TO-DO WebApp - Your Daily Task Manager

A modern, responsive to-do web application built with HTML, CSS, and JavaScript that helps you organize and manage your daily tasks efficiently.

## ✨ Features

### Core Functionality
- **Add Tasks**: Easily add new tasks with a clean, intuitive interface
- **Task Management**: Organize tasks into Pending and Completed sections
- **Mark as Complete**: Toggle task completion status with visual feedback
- **Edit Tasks**: Modify existing tasks using a modal interface
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Real-time Statistics**: View pending, completed, and total task counts

### Advanced Features
- **Date & Time Tracking**: Automatic timestamps for task creation and completion
- **Local Storage**: Tasks persist between browser sessions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations


### User Experience
- **Visual Feedback**: Hover effects and smooth transitions
- **Notifications**: Toast notifications for all actions
- **Empty States**: Helpful messages when no tasks exist
- **Sample Data**: Pre-loaded example tasks for first-time users

## 🚀 Getting Started

### Installation
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

### File Structure
```
TO DO WebApp/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 📱 Usage Guide

### Adding a Task
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. The task will appear in the Pending Tasks section

### Managing Tasks
- **Complete a Task**: Click the checkbox or the check button
- **Edit a Task**: Click the edit (pencil) icon
- **Delete a Task**: Click the delete (trash) icon
- **View Details**: Each task shows creation and completion timestamps

### Task Organization
- **Pending Tasks**: Tasks that need to be completed
- **Completed Tasks**: Finished tasks with completion timestamps
- **Statistics**: Real-time counters for task management overview


### Responsive Design
- **Desktop**: Two-column layout with side-by-side task sections
- **Tablet**: Responsive grid that adapts to screen size
- **Mobile**: Single-column layout optimized for touch interaction


## 💾 Data Persistence

The application uses browser localStorage to save your tasks automatically. Your data will persist between browser sessions and page refreshes.

### Data Structure
Each task contains:
- **id**: Unique identifier
- **text**: Task description
- **completed**: Boolean completion status
- **createdAt**: ISO timestamp of creation
- **completedAt**: ISO timestamp of completion (null if pending)

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: ES6+ features and classes
- **Font Awesome**: Icon library for UI elements



## 🤝 Contributing

This is a simple, self-contained application. Feel free to:
- Fork the repository
- Add new features
- Improve the design
- Fix bugs
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

