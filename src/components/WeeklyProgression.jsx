
const WeeklyProgress = ( {tasks} ) => {
    
    const allDays = tasks.flatMap(task => task.days || []);
    const completedCount = allDays.filter(task => task.checked).length;
    const total = allDays.length
    const rawProgress = total === 0 ? 0 : (completedCount / total ) * 100
    const progress = Math.min(rawProgress, 100); 
    console.log(rawProgress)
    return (
        <div className="w-full mx-auto mt-10 p-4 bg-white">
            <div className="flex justify-between space-x-97 ">
                <h2 className="text-xl font-bold mb-4 ">Weekly Progress</h2>
                <p>{Math.round(rawProgress)}%</p>
            </div>
         
            {/*PROGRESS BAR*/}
            <div className="w-full bg-gray-300 rounded-full h-4 mb-6">
                <div className="bg-blue-300 h-4 rounded-full transition-all duration-300"
                    style={{width: `${progress}%`}}>
                </div>
            </div>
        </div>
    )
}

export default WeeklyProgress;