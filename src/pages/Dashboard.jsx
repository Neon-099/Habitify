import {StreakCard} from '../components/Cards.jsx'


const Dashboard = () => {
    return (
        <div>
            <header className="flex flex-col px-19 py-9">
                <h1 className="text-3xl  font-semibold">Your Habit Dashboard</h1>
                <p className="">Track you progress and build consistency</p>
            </header>

            <div>
                <StreakCard />
            </div>
        </div>
    )
}

export default Dashboard;