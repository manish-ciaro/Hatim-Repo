import React, { useState } from "react";
import { Box, Checkbox, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import useStyles from "../styles/styles"

const TodoItem = ({ data, handleDelete, handleToggleCompletion }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  return (
    <Box className={classes.todoItemBox} sx={{ bgcolor: data.completed ? "#e8f5e9" : "#fff3e0" }}>
      <Checkbox
        checked={data.completed}
        onChange={() => handleToggleCompletion(data.id)}
        color="success"
        className={classes.todoItemCheckbox}
      />
      <Box sx={{ flex: 1, ml: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: data.completed ? "bold" : "normal",
            textDecoration: data.completed ? "line-through" : "none",
            wordBreak: "break-word",
          }}
        >
          {data.name.length > 15 && !expanded
            ? `${data.name.substring(0, 15)}...`
            : data.name}
        </Typography>
        {data.name.length > 15 && (
          <Typography
            variant="body2"
            color="primary"
            onClick={() => setExpanded(!expanded)}
            sx={{ cursor: "pointer", mt: 0.5 }}
          >
            {expanded ? "Show less" : "Show more"}
          </Typography>
        )}
      </Box>
      <IconButton onClick={() => handleDelete(data.id)} sx={{ color: "#f44336" }}>
        <DeleteOutlineIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default TodoItem;
