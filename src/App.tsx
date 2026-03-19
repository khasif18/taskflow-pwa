import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks] = useState<Task[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Modern Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 p-8 rounded-3xl border border-white/20 cursor-pointer">
            <div className="text-4xl font-black text-white mb-2">{tasks.length}</div>
            <div className="text-white/80 font-medium tracking-wide">Active Tasks</div>
          </div>
          <div className="group bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 p-8 rounded-3xl border border-white/20 cursor-pointer">
            <div className="text-4xl font-black text-emerald-400 mb-2">
              {tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
            </div>
            <div className="text-white/80 font-medium tracking-wide">Completion</div>
          </div>
          <div className="group bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 p-8 rounded-3xl border border-white/20 cursor-pointer">
            <div className="text-4xl font-black text-blue-400 mb-2">0</div>
            <div className="text-white/80 font-medium tracking-wide">Today</div>
          </div>
        </div>

        {/* TaskFlow Header */}
        <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20">
          <h1 className="text-5xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-8">
            TaskFlow
          </h1>
          
          {tasks.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-2">No tasks yet</h2>
              <p className="text-white/60 text-lg">Add your first task above to start</p>
            </div>
          ) : (
            <div>YOUR TASKS HERE</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
