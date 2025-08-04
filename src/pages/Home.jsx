import Calendar from "../components/Calendar";

const Home = () => {
    return (
        <>
        <header>
            <div className="py-9 px-30 flex flex-col justify-center items-start ">
                <h1 className="text-4xl py-8 font-semibold">My Habits</h1>
                <p>Track your daily progress and build long lasting habits</p>
            </div>
            
            <div>
                <Calendar />
            </div>
        </header>
        </>
    )
}

export default Home;