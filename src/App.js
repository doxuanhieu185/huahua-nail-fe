import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider } from './services/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="container mx-auto flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { FaPlay, FaPause, FaRedo, FaPlus, FaCheck } from "react-icons/fa";
// import huahua from "./assets/huahua.png"; // Import Huahua image
// const App = () => {
//   const modes = {
//     pomodoro: 25 * 60,
//     shortBreak: 5 * 60,
//     longBreak: 15 * 60,
//   };

//   const [time, setTime] = useState(modes.pomodoro);
//   const [isActive, setIsActive] = useState(false);
//   const [mode, setMode] = useState("pomodoro");
//   const [tasks, setTasks] = useState([]);

//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editTag, setEditTag] = useState("");
//   useEffect(() => {
//     let interval;
//     if (isActive && time > 0) {
//       interval = setInterval(() => setTime((prev) => prev - 1), 1000);
//     } else if (time === 0 && isActive) {
//       setIsActive(false);
//       alert("⏰ Time's up! Take a break or switch session.");
//     }
//     return () => clearInterval(interval);
//   }, [isActive, time]);

//   const toggleTimer = () => setIsActive((prev) => !prev);
//   const resetTimer = () => {
//     setIsActive(false);
//     setTime(modes[mode]);
//   };

//   const switchMode = (newMode) => {
//     setIsActive(false);
//     setMode(newMode);
//     setTime(modes[newMode]);
//   };

//   const addTask = () => {
//     const newTask = {
//       id: tasks.length + 1,
//       title: "New Task",
//       completed: false,
//       tag: "work",
//     };
//     setTasks((prev) => [...prev, newTask]);
//   };

//   const toggleTask = (id) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };
//   const handleEdit = (task) => {
//     setEditingTaskId(task.id);
//     setEditTitle(task.title);
//     setEditTag(task.tag);
//   };

//   const saveEdit = (id) => {
//     setTasks((prev) =>
//       prev.map((task) =>
//         task.id === id ? { ...task, title: editTitle, tag: editTag } : task
//       )
//     );
//     setEditingTaskId(null);
//   };

//   const deleteTask = (id) => {
//     setTasks((prev) => prev.filter((task) => task.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-50 flex flex-col md:flex-row p-4 font-poppins transition-all duration-300 ease-in-out">
//       {/* Tasks */}
//       {/* Tasks */}
//       <div className="md:w-1/3 bg-white rounded-xl p-6 shadow-lg mb-4 md:mb-0 md:mr-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-cyan-800">Tasks</h2>
//           <button
//             onClick={addTask}
//             className="p-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors"
//           >
//             <FaPlus />
//           </button>
//         </div>
//         <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200">
//           {tasks.length === 0 ? (
//             <div className="text-center text-gray-500 italic">
//               No tasks yet. Click the{" "}
//               <span className="text-cyan-500 font-medium">+</span> button above
//               to add your first task and start tracking your study progress!
//             </div>
//           ) : (
//             tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className={`p-4 rounded-lg transition-all hover:shadow-md ${
//                   task.completed ? "bg-green-50" : "bg-blue-50"
//                 }`}
//               >
//                 <div className="flex items-start">
//                   <button
//                     onClick={() => toggleTask(task.id)}
//                     className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center mt-1 ${
//                       task.completed
//                         ? "bg-green-500"
//                         : "bg-white border-2 border-gray-300"
//                     }`}
//                   >
//                     {task.completed && (
//                       <FaCheck className="text-white text-sm" />
//                     )}
//                   </button>

//                   <div className="flex-1">
//                     {editingTaskId === task.id ? (
//                       <div className="space-y-1">
//                         <input
//                           className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                           value={editTitle}
//                           onChange={(e) => setEditTitle(e.target.value)}
//                         />
//                         <input
//                           className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                           value={editTag}
//                           onChange={(e) => setEditTag(e.target.value)}
//                         />
//                         <button
//                           onClick={() => saveEdit(task.id)}
//                           className="mt-1 text-sm text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600"
//                         >
//                           Save
//                         </button>
//                       </div>
//                     ) : (
//                       <>
//                         <p
//                           className={`text-gray-800 ${
//                             task.completed ? "line-through opacity-60" : ""
//                           }`}
//                         >
//                           {task.title}
//                         </p>
//                         <span className="text-sm text-gray-500 px-2 py-1 rounded-full bg-white mt-1 inline-block">
//                           {task.tag}
//                         </span>
//                       </>
//                     )}
//                   </div>

//                   <div className="flex flex-col ml-2 space-y-1">
//                     {!task.completed && editingTaskId !== task.id && (
//                       <button
//                         onClick={() => handleEdit(task)}
//                         className="text-xs text-blue-500 hover:underline"
//                       >
//                         Edit
//                       </button>
//                     )}
//                     {task.completed && (
//                       <button
//                         onClick={() => deleteTask(task.id)}
//                         className="text-xs text-red-500 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Timer */}
//       <div className="md:w-1/3 bg-white rounded-xl p-6 shadow-lg mb-4 md:mb-0 md:mx-4 flex flex-col justify-between">
//         <div className="flex justify-center mb-8">
//           <div className="flex space-x-4">
//             {["pomodoro", "shortBreak", "longBreak"].map((tabMode) => (
//               <button
//                 key={tabMode}
//                 onClick={() => switchMode(tabMode)}
//                 className={`px-4 py-2 rounded-lg transition-all capitalize ${
//                   mode === tabMode
//                     ? "bg-cyan-500 text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 {tabMode.replace(/([A-Z])/g, " $1")}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Countdown timer */}
//         <div className="flex justify-center items-center mt-12 mb-12">
//           <div className="w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-inner">
//             <div className="text-4xl font-bold text-white animate-pulse">
//               {formatTime(time)}
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center space-x-6 mt-6">
//           <button
//             onClick={toggleTimer}
//             className="p-5 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition text-2xl"
//           >
//             {isActive ? <FaPause /> : <FaPlay />}
//           </button>
//           <button
//             onClick={resetTimer}
//             className="p-5 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition text-2xl"
//           >
//             <FaRedo />
//           </button>
//         </div>
//       </div>

//       {/* Mascot */}
//       <div className="md:w-1/3 bg-white rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
//         <div className="w-72 h-72 bg-blue-100 rounded-full flex items-center justify-center mb-4 overflow-hidden shadow-md">
//           <img
//             src={huahua}
//             alt="Huahua"
//             className="w-64 h-64 object-cover "
//           />
//         </div>
//         <p className="text-center text-cyan-700 text-lg font-medium">
//           {isActive
//             ? "Huahua is cheering you on! 🐾"
//             : "Let's study together with Huahua!"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default App;
