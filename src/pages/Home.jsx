import Calendar from "../components/Calendar";
import WeeklyOverview from "../components/WeeklyOverview";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-responsive">
                <header className="py-6 sm:py-9">
                    <div className="flex flex-col justify-center items-start space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">My Habits</h1>
                        <p className="text-lg text-[#639154]">Track your daily progress and build long lasting habits</p>
                    </div>
                </header>
                
                <div className="pb-8 sm:pb-20">
                    <Calendar />
                </div>
                
                <div className="pb-8">
                    <WeeklyOverview />
                </div>
            </div>
        </div>
    )
}

export default Home;