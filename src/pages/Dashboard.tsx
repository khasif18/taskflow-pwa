import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  // FETCH TASKS FROM FIREBASE - REAL-TIME
  useEffect(() => {
    const fetchTasks = () => {
      try {
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
          const tasksData = snapshot.docs.map(docSnapshot => ({
            id: docSnapshot.id,
            ...docSnapshot.data()
          })) as Task[];
          setTasks(tasksData);
          setLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // ADD TASK TO FIREBASE
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await addDoc(collection(db, 'tasks'), {
          title: newTask,
          completed: false,
          category: 'personal',
          createdAt: new Date()
        });
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // TOGGLE TASK COMPLETION
  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const taskRef = doc(db, 'tasks', id);
        await updateDoc(taskRef, {
          completed: !task.completed
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // DELETE TASK FROM FIRESTORE
  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading tasks from cloud...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskFlow</h1>
              <p className="text-xl text-gray-600">Cloud synced productivity</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">{completedCount}/{totalTasks}</div>
              <div className="text-lg text-gray-500">tasks completed</div>
            </div>
          </div>
        </div>

        {/* ADD NEW TASK */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done today?"
              className="flex-1 px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-lg"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              disabled={!newTask.trim()}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* TASKS LIST */}
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 shadow-lg border border-gray-100 text-center">
            <div className="text-4xl text-gray-300 mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-600 mb-8">Add your first task above to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all font-bold text-sm shadow-md ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-emerald-300'
                        : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 text-gray-400 hover:text-emerald-600'
                    }`}
                  >
                    {task.completed ? '✓' : '○'}
                  </button>
                  
                  <div className="flex-1">
                    <p className={`font-semibold text-lg ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </p>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mt-1">
                      {task.category}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-2 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 ml-auto text-red-500 hover:text-red-600 hover:shadow-md"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
