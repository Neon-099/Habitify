import { NavLink } from 'react-router-dom';
import logo from '../assets/logoHabitify.png'

const Header = () => {
    
    return (
    <header className="w-full  bg-white py-4 px-6 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">  
            <img src={logo} alt="" className='' />
            <span className='text-2xl text-black font-bold'>Habitify</span>
        </div>
        
        {/*RIGHT SIDE*/}
        <nav className='space-x-6  text-black px-6'>
            <NavLink to="/"
                end
                className={({isActive}) => 
                    isActive ? `text-gray-300 hover:text-gray-100` : `text-black hover:text-gray-100`}>Habit</NavLink>
            <NavLink to="/dashboard"
                end 
                className={({isActive}) => 
                    isActive ? `text-gray-300 hover:text-gray-100` : `text-black hover:text-gray-100`}>Dashboard</NavLink>
            <NavLink to="" className='hover:text-gray-100'>Settings</NavLink>
        </nav>
    </header>
    )
}

export default Header;