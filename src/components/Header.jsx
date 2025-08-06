import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logoHabitify.png'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
    <header className="w-full bg-white py-4 px-4 sm:px-6 text-white flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-3">  
            <img src={logo} alt="Habitify Logo" className="h-8 w-auto" />
            <span className='text-xl sm:text-2xl text-black font-bold'>Habitify</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-6 text-black'>
            <NavLink to="/"
                end
                className={({isActive}) => 
                    isActive ? `text-indigo-600 font-medium` : `text-black hover:text-indigo-600 transition-colors`}>
                Habit
            </NavLink>
            <NavLink to="/dashboard"
                end 
                className={({isActive}) => 
                    isActive ? `text-indigo-600 font-medium` : `text-black hover:text-indigo-600 transition-colors`}>
                Dashboard
            </NavLink>
            <NavLink to="" className='text-black hover:text-indigo-600 transition-colors'>Settings</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
            className="md:hidden p-2 text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
                <nav className="flex flex-col py-4">
                    <NavLink 
                        to="/"
                        end
                        className={({isActive}) => 
                            `px-4 py-3 text-black hover:bg-gray-50 transition-colors ${isActive ? 'text-indigo-600 font-medium bg-indigo-50' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Habit
                    </NavLink>
                    <NavLink 
                        to="/dashboard"
                        end 
                        className={({isActive}) => 
                            `px-4 py-3 text-black hover:bg-gray-50 transition-colors ${isActive ? 'text-indigo-600 font-medium bg-indigo-50' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="" 
                        className="px-4 py-3 text-black hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Settings
                    </NavLink>
                </nav>
            </div>
        )}
    </header>
    )
}

export default Header;