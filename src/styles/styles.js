import { makeStyles } from "@mui/styles";

  const useStyles = makeStyles({
    navbar: {
      color:"#333",
      boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
    },
    navbarTitle: {
      fontWeight: "bold",
      flexGrow: 1,
      color: "#fff", 
    },
    navbarButton: {
      fontWeight: "bold",
      textTransform: "none",
      color: "#fff", 
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
      },
    },

  taskManagerTitle: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    color: "#333",
  },
  todoInputBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    marginTop: "32px",
  },
  todoButton: {
    fontWeight: "bold",
    textTransform: "none",
    color: "#FFFFFF",
    backgroundColor: "#333",
    "&:hover": {
      backgroundColor: "#555",
    },
  },
  todoContainer: {
    backgroundColor: "background.paper",
    width: "60%",
    margin: "32px auto",
    borderRadius: "8px",
    boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
  },
  tabBar: {
    borderRadius: "10px 10px 0 0",
    backgroundColor: "#333", 
  },

  todoItemBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    marginBottom: "8px",
    borderRadius: "8px",
    boxShadow: "1px 1px 5px rgba(0,0,0,0.2)",
  },
  todoItemCheckbox: {
    "& .MuiSvgIcon-root": { fontSize: "28px" },
  },
  todoItemName: {
    wordBreak: "break-word",
  },
});

export default useStyles;
