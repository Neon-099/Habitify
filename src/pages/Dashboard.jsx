import {StreakCard, CompletionRateCard, TasksCard, AchievementsCard, TaskCard} from '../components/Cards.jsx'
import {HabitProgress} from '../components/HabitProgress.jsx'
import { useStreakStore } from '../stores/cardStore.js'

const Dashboard = () => {
    
    const {cards} = useStreakStore();

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
                    <TasksCard />
                    <AchievementsCard />
                </div>

                {/* Habit Progress Chart */}
                <div className="mb-8">
                    <HabitProgress />
                </div>

                {/* Tasks Section */}
                <div className='mb-8'>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Tasks</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {cards.map((card) => (
                            <TaskCard 
                                key={card.id}
                                title={card.title}
                                description={card.description}
                                color={card.color}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;