
import { useState } from "react";

function ToDoList(){

    const [tasks,setTasks]= useState([ 
        { text: "Eat breakfast", completed: false },
        { text: "Do homework", completed: false },
        { text: "Learn about React", completed: false }]);
    const [newTask,setNewTask]=useState("");

    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");


   function handelInputChange(event){
       setNewTask(event.target.value)
   }

   function addTask(){
  if (newTask.trim() !== ""){
    setTasks(t => [...t, {text: newTask, completed: false}]);
    setNewTask("");
  }

   }

   function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  }
  
  function handleEditChange(event) {
    setEditText(event.target.value);
  }
  
  function saveEdit(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  }
  

   function deleteTask(index){
      const updatedTasks= tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
   }

   function moveTaskUp(index){
     if(index > 0){
        const updatedTasks = [...tasks];
        [updatedTasks[index],updatedTasks[index - 1]] = 
        [updatedTasks[index - 1],updatedTasks[index]];
        setTasks(updatedTasks);
     }
   }

   function moveTaskDown(index){
    if(index < tasks.length - 1){
        const updatedTasks = [...tasks];
        [updatedTasks[index],updatedTasks[index + 1]] = 
        [updatedTasks[index + 1],updatedTasks[index]];
        setTasks(updatedTasks);
     }
   }
    return(
    <div className="to-do-list">
    <h1>To-Do-List 📋</h1>
    
    <div>
      <input
          type="text"
          placeholder="Enter your task..."
          value={newTask}
          onChange={handelInputChange}/>

        <button
        className="add-button"
        onClick={addTask}>
        Add
        </button>
    </div>

    <ol>
       {tasks.map((task, index)=>
           <li key={index}>
                 {editingIndex === index ? (
                 <>
                   <input className="edit-input-save" value={editText} onChange={handleEditChange} />
                   <button 
                   className="save-button"
                   onClick={() => saveEdit(index)}>Save</button>
                </>
                     ) : (
                        <> 
                    <span
                      className="text"
                      onClick={() => toggleComplete(index)}
                      style={{ textDecoration: task.completed ? "line-through" : "none" ,
                        cursor: "pointer"
                      }}
                     >
                      {task.text}
                    </span>
                    <button
                    className="Edit-button"
                     onClick={() => startEditing(index)}>✏️ </button>
        </>
      )}

                

            
             <button
                className="delet-button"
                onClick={()=> deleteTask(index)}>
                 🗑️
                </button>



                <button
                className="move-button"
                onClick={()=> moveTaskUp(index)}>
                 ⬆️
                </button>


                <button
                className="move-button"
                onClick={()=> moveTaskDown(index)}>
                 ⬇️
                </button>
             </li>
    
       )} 
    </ol>



    </div>)
}

export default ToDoList;