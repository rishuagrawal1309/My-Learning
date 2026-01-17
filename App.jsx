import React, { useState, useEffect } from "react";

/**
 * App.jsx
 * Minimal, self-contained React component with:
 * - Counter
 * - Simple todo list (persisted to localStorage)
 * - Light/Dark theme toggle (persisted)
 *
 * Drop this file into a Create React App / Vite React project and import <App /> in index.jsx.
 */

export default function App() {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("todos") || "[]");
        } catch {
            return [];
        }
    });
    const [text, setText] = useState("");
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const addTodo = (e) => {
        e?.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((t) => [{ id: Date.now(), text: trimmed, done: false }, ...t]);
        setText("");
    };

    const toggleTodo = (id) => {
        setTodos((t) => t.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
    };

    const removeTodo = (id) => {
        setTodos((t) => t.filter((item) => item.id !== id));
    };

    const styles = {
        app: {
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            minHeight: "100vh",
            padding: 24,
            background: theme === "dark" ? "#0f1724" : "#f7fafc",
            color: theme === "dark" ? "#e6eef8" : "#0b1220",
            transition: "background .2s, color .2s",
        },
        container: {
            maxWidth: 720,
            margin: "0 auto",
            background: theme === "dark" ? "#071021" : "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: theme === "dark" ? "0 6px 20px rgba(2,6,23,0.6)" : "0 6px 20px rgba(15,23,42,0.08)",
        },
        header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
        button: {
            padding: "8px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: theme === "dark" ? "#1f2937" : "#eef2ff",
            color: theme === "dark" ? "#e6eef8" : "#1f2937",
        },
        counterRow: { display: "flex", gap: 12, alignItems: "center", marginBottom: 16 },
        todoForm: { display: "flex", gap: 8, marginBottom: 12 },
        todoInput: { flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid #cbd5e1" },
        todoList: { listStyle: "none", padding: 0, margin: 0 },
        todoItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.04)" },
        todoText: (done) => ({ textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1 }),
    };

    return (
        <div style={styles.app}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={{ margin: 0, fontSize: 20 }}>Demo App</h1>
                    <div>
                        <button
                            style={{ ...styles.button, marginRight: 8 }}
                            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                        >
                            Toggle {theme === "dark" ? "Light" : "Dark"}
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => {
                                setTodos([]);
                                setCount(0);
                                setText("");
                                localStorage.removeItem("todos");
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <section style={{ marginBottom: 18 }}>
                    <h2 style={{ margin: "0 0 8px 0", fontSize: 16 }}>Counter</h2>
                    <div style={styles.counterRow}>
                        <button style={styles.button} onClick={() => setCount((c) => c - 1)}>
                            -1
                        </button>
                        <div style={{ fontSize: 18, minWidth: 48, textAlign: "center" }}>{count}</div>
                        <button style={styles.button} onClick={() => setCount((c) => c + 1)}>
                            +1
                        </button>
                        <button style={styles.button} onClick={() => setCount(0)}>
                            Reset
                        </button>
                    </div>
                </section>

                <section>
                    <h2 style={{ margin: "0 0 8px 0", fontSize: 16 }}>Todos</h2>
                    <form style={styles.todoForm} onSubmit={addTodo}>
                        <input
                            style={styles.todoInput}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Add a todo..."
                        />
                        <button style={styles.button} type="submit">
                            Add
                        </button>
                    </form>

                    <ul style={styles.todoList}>
                        {todos.length === 0 && <li style={{ color: "#94a3b8" }}>No todos yet.</li>}
                        {todos.map((t) => (
                            <li key={t.id} style={styles.todoItem}>
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
                                    <span style={styles.todoText(t.done)}>{t.text}</span>
                                </div>
                                <div>
                                    <button style={styles.button} onClick={() => removeTodo(t.id)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}