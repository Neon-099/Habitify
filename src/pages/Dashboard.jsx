import {StreakCard, CompletionRateCard, ActiveTasks, AchievementsCard} from '../components/Cards.jsx'
import {HabitProgress} from '../components/HabitProgress.jsx'

const Dashboard = () => {
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-responsive">
                <header className="py-6 sm:py-9">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Your Habit Dashboard</h1>
                        <p className="text-gray-600">Track your progress and build consistency</p>
                    </div>
                </header>

                {/* Stats Cards Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
                    <StreakCard />
                    <CompletionRateCard />
                    <ActiveTasks />
                    <AchievementsCard />
                </div>

                {/* Habit Progress Chart */}
                <div className="mb-8">
                    <HabitProgress />
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;