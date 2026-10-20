import React, { useState } from "react";
// ... dots purani values ko copy karta hai, taake baaki data na delete ho

function App() {
    const [newTask, setNewTask] = useState({
        todo: "",
        // task ka text hai.
        isCompleted: false,
        // batata hai task complete hua ya nahi
    });

    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState("all");

    

    // useState is React me data ko store aur update karne ke liye use hota hai.
    // [] → shuru me koi task nahi hai, isliye empty array.

    // Kaunsa task edit ho raha hai uska index store karega.
   // null matlab koi task edit nahi ho raha.

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Input ka name aur value nikal rahe hain.

        setNewTask({
            ...newTask,
            [name]: value,
        });

        // Purani object copy karo.
        // Jis field ka name aya hai uski value update karo.
    };

    const handleAddTask = () => {
        if (!newTask.todo.trim()) return;
        // Agar input khali ho to function band kar do.

        if (editIndex !== null) {
            // Agar edit chal rahi hai to naya task add nahi hoga.
            const updatedTasks = [...tasks];
            // Tasks ki copy bana lo.
            updatedTasks[editIndex] = newTask;
            // Jis task ko edit kar rahe hain, uski jagah naya updated task rakh do.

            setTasks(updatedTasks);
            // Updated array me save karo.task ko
            setEditIndex(null);
            // Edit mode khatam
        } else {
            setTasks([...tasks, newTask]);
        }
        // Purane tasks copy karo.
        // Naya task end me add karo.

        setNewTask({
            todo: "",
            isCompleted: false,
        });
        // Input ko khali kar do.
        // hamnay isko isliya khali kia ha taa ka purana text input ma na rahe
    };

    const deleteTask = (idx) => {
        // Delete button par chalega.   
        const updatedTasks = tasks.filter((_, i) => i !== idx);
        // Jis index ko delete karna hai usko hata do.
        setTasks(updatedTasks);
        // Naya array save karo.
    };

    const handleEdit = (idx) => {
        setNewTask(tasks[idx]);
        setEditIndex(idx);
    };
    // Edit button click hone par.
    // Task ki value input me daal do.
    // Yaad rakho kaunsa task edit ho raha hai.

    const handleCheck = (idx) => {
        // Checkbox click hone par.
        const updatedTasks = [...tasks];
        // Array copy.
        updatedTasks[idx] = {
            // Usi task ko update karna hai.
            ...updatedTasks[idx]    ,
            // Purani values copy karo.
            isCompleted: !updatedTasks[idx].isCompleted,
            // True ko false aur false ko true bana do
        };

        setTasks(updatedTasks);
        // state ka update
        // kyun ke React ko batana hota hai ke tasks ki value change ho gayi hai.
    };

    const filteredTasks = tasks.filter((task) => {  
        // Tasks ko filter kar rahe hain.
        if (filter === "completed") {
            return task.isCompleted;
        }
        // Sirf completed tasks.
        if (filter === "uncompleted") {
            return !task.isCompleted;
        }
        // Sirf incomplete tasks.

        return true;
        // sab task show karo
    });

    return (

        <div className="container">
            <h1>My Tasks</h1>

            <div className="inputBar">
                <input className="taskInp" type="text" name="todo" value={newTask.todo} onChange={handleChange} placeholder="What needs to be done?" />
                {/* Input ki value state se aa rahi hai.(value={newTask.todo}) Type karne par state update hogi. */}

                <button className="btn" onClick={handleAddTask}>
                    {editIndex !== null ? "Update" : "Add"}
                    {/* Edit ho rahi ho to Update.Warna Add. */}
                </button>
                    </div>

            <hr className="hr" />

            <div className="button-group">
                <button className="all" onClick={() => setFilter("all")}>All</button>

                <button className="uncompleted" onClick={() => setFilter("uncompleted")}>
                    Uncompleted
                </button>

                <button className="completed" onClick={() => setFilter("completed")}>
                    Completed
                    {/* filter ki value change kar do taake sirf completed tasks show hon. */}
                </button>
            </div>

            <hr className="hr" />

            <div className="taskBox">
                {filteredTasks.length === 0 ? (
                    <p>No task yet.</p>
                ) : (
                    filteredTasks.map((task, idx) => (
                        <div className="taskItem" key={idx}>
                            <div className="content">
                                <input type="checkbox" checked={task.isCompleted} onClick={() => handleCheck(tasks.indexOf(task))} />
                                {/* ham na yaha par indexOf is liya rakha ha ku ka is ma uski array ka hisab sa uska index find karay */}

                                <h5 className="h-five">
                                    {task.todo}
                                    {/* task object ke andar todo naam ki property hai. */}
                                </h5>
                            </div>

                            <div className="actions">
                                <button className="remove" onClick={() => deleteTask(tasks.indexOf(task))}>
                                    Delete
                                </button>

                                <button className="add" onClick={() => handleEdit(tasks.indexOf(task))} >
                                     Edit
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;