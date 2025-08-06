
const WeeklyProgress = ( {tasks} ) => {
    
    const allDays = tasks.flatMap(task => task.days || []);
    const completedCount = allDays.filter(task => task.checked).length;
    const total = allDays.length
    const rawProgress = total === 0 ? 0 : (completedCount / total ) * 100
    const progress = Math.min(rawProgress, 100); 
    console.log(rawProgress)
    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-0">Weekly Progress</h2>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{Math.round(rawProgress)}%</p>
            </div>
         
            {/*PROGRESS BAR*/}
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-4">
                <div 
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 sm:h-4 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{width: `${progress}%`}}
                >
                </div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
                <span>Completed: {completedCount}</span>
                <span>Total: {total}</span>
            </div>
        </div>
    )
}

export default WeeklyProgress;