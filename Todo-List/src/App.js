import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import ImportExportModal from "./components/ImportExportModal";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load tasks and dark mode preference from localStorage on mount
  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks && Array.isArray(storedTasks)) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
    }

    try {
      const storedTheme = localStorage.getItem("darkMode");
      if (storedTheme === "true") {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch (error) {
      console.error(
        "Error loading dark mode preference from localStorage:",
        error
      );
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  // Toggle dark/light mode and persist preference
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      try {
        localStorage.setItem("darkMode", newMode.toString());
      } catch (error) {
        console.error(
          "Error saving dark mode preference to localStorage:",
          error
        );
      }
      return newMode;
    });
  };

  // Add a new task
  const addTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask = {
      id: Date.now().toString(),
      text: newTaskText,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  // Edit an existing task
  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  // Toggle a task’s completed status
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Clear all tasks (Trash Button)
  const clearTasks = () => {
    setTasks([]);
  };

  // Handle drag and drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    setTasks(reorderedTasks);
  };

  // Import tasks from text (each new line is a task, max 100 tasks)
  const handleImport = (importText) => {
    const importedTasks = importText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .slice(0, 100)
      .map((text) => ({
        id: Date.now().toString() + Math.random(),
        text,
        isCompleted: false,
      }));
    setTasks([...tasks, ...importedTasks]);
    setIsModalOpen(false);
  };

  // Export tasks to a plain TXT file
  const handleExport = () => {
    const exportText = tasks.map((task) => task.text).join("\n");
    const element = document.createElement("a");
    const file = new Blob([exportText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "tasks.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="max-w-2xl mx-auto mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          To-Do List
        </h1>
        <div className="flex items-center space-x-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
          >
            <span className="material-icons text-gray-800 dark:text-gray-100">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
          {/* Import/Export Popup */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded bg-blue-500 text-white flex items-center justify-center"
          >
            <span className="material-icons">folder</span>
          </button>
          {/* Trash Button */}
          <button
            onClick={clearTasks}
            className="p-2 rounded bg-red-500 text-white flex items-center justify-center"
          >
            <span className="material-icons">delete</span>
          </button>
        </div>
      </header>
      <main className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="mb-4 flex">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add new task..."
            className="flex-grow p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
          <button
            onClick={addTask}
            className="ml-2 p-2 bg-green-500 text-white rounded flex items-center justify-center"
          >
            <span className="material-icons">add</span>
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList
            tasks={tasks}
            editTask={editTask}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        </DragDropContext>
      </main>
      {isModalOpen && (
        <ImportExportModal
          onClose={() => setIsModalOpen(false)}
          onImport={handleImport}
          onExport={handleExport}
          tasks={tasks}
        />
      )}
    </div>
  );
}

export default App;
