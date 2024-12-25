import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TodoItem from "../components/TodoItems";
import Loader from "../components/Loader";

import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import useStyles from "../styles/styles";

import Navbar from "../components/Navbar";

const Todo = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]); // Tracks selected tasks
  const { addTodo, getTodo, user, todoList, updateTodo, deleteTodo } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchTodos = async () => {
      setLoading(true);
      await getTodo();
      setLoading(false);
    };
    fetchTodos();
  }, [getTodo, user]);

  const handleAddTodo = async () => {
    if (task.trim()) {
      setLoading(true);
      const newTask = { name: task.trim(), completed: false };
      try {
        await addTodo(newTask);
        setTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleToggleCompletion = async (id) => {
    const task = todoList.find((task) => task.id === id);
    if (task) {
      await updateTodo(id, { completed: !task.completed });
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  const handleDeleteAll = async () => {
    for (const taskId of selectedTasks) {
      await deleteTodo(taskId);
    }
    setSelectedTasks([]); // Clear selection after deletion
  };

  const toggleSelectAll = () => {
    const currentTabTasks = filteredTodos[tabIndex].map((task) => task.id);

    // If all tasks are selected, deselect them
    if (currentTabTasks.every((taskId) => selectedTasks.includes(taskId))) {
      setSelectedTasks((prev) =>
        prev.filter((taskId) => !currentTabTasks.includes(taskId))
      );
    } else {
      // Otherwise, select all tasks
      setSelectedTasks((prev) => [
        ...new Set([...prev, ...currentTabTasks]),
      ]);
    }
  };

  const handleTaskSelection = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id)
        ? prev.filter((taskId) => taskId !== id)
        : [...prev, id]
    );
  };

  const filteredTodos = {
    0: todoList,
    1: todoList.filter((task) => task.completed),
    2: todoList.filter((task) => !task.completed),
  };

  // Determine whether all tasks in the current tab are selected
  const isAllSelected = filteredTodos[tabIndex].every((task) =>
    selectedTasks.includes(task.id)
  );

  return (
    <Box>
      <Navbar />

      <Typography variant="h3" textAlign="center" className={classes.taskManagerTitle}>
        Task Manager
      </Typography>

      <Box className={classes.todoInputBox}>
        <TextField
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
          variant="outlined"
          placeholder="Enter a new task"
        />
        <Button className={classes.todoButton} onClick={handleAddTodo}>
          Add Task
        </Button>
      </Box>

      <Box className={classes.todoContainer}>
        <AppBar position="static" className={classes.tabBar}>
          <Tabs
            value={tabIndex}
            onChange={(e, newIndex) => setTabIndex(newIndex)}
            indicatorColor="secondary"
            textColor="inherit"
            centered
          >
            <Tab icon={<ListIcon />} label="All Tasks" />
            <Tab icon={<CheckCircleOutlineIcon />} label="Completed" />
            <Tab icon={<HourglassEmptyIcon />} label="Pending" />
          </Tabs>
        </AppBar>

        {loading ? (
          <Loader />
        ) : (
          <Box>
            {filteredTodos[tabIndex].length === 0 ? (
              <Typography variant="h6" textAlign="center" sx={{ color: "#757575", mt: 4 }}>
                No tasks available!
              </Typography>
            ) : (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", padding: "0 16px" }}>
                  <Checkbox
                    checked={isAllSelected} // Set checkbox to checked if all tasks in the tab are selected
                    onChange={toggleSelectAll} // Toggle select all
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteAll}
                    disabled={selectedTasks.length === 0}
                  >
                    Delete Selected
                  </Button>
                </Box>
                {filteredTodos[tabIndex].map((task) => (
                  <TodoItem
                    key={task.id}
                    data={task}
                    isSelected={selectedTasks.includes(task.id)} // Pass selected state
                    onToggleSelection={() => handleTaskSelection(task.id)} // Handle task selection toggle
                    handleDelete={handleDelete}
                    handleToggleCompletion={handleToggleCompletion}
                  />
                ))}
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Todo;
