import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { auth, db } from "../services/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getTodo = useCallback(async () => {
    if (user) {
      const todoCollectionRef = collection(db, "todos");
      const querySnapshot = await getDocs(todoCollectionRef);
      const tasks = querySnapshot.docs
        .filter(doc => doc.data().userId === user.uid) 
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setTodoList(tasks);
    }
  }, [user]);


  const addTodo = async (newTask) => {
    if (user) {
      const docRef = await addDoc(collection(db, "todos"), {
        ...newTask,
        userId: user.uid,
      });
      const taskWithId = { ...newTask, id: docRef.id };
      setTodoList((prev) => [...prev, taskWithId]);
      return taskWithId;
    }
  };

  const updateTodo = async (id, updatedFields) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, updatedFields);
    setTodoList((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    setTodoList((prev) => prev.filter((task) => task.id !== id));
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        todoList,
        addTodo,
        getTodo,
        updateTodo,
        deleteTodo,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
