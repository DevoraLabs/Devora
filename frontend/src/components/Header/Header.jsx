import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import "./Header.css"
import CreateStartupModal from "../CreateStartupModal/CreateStartupModal"
import LeftNavbar from "../LeftNavbar/LeftNavbar"

function Header() {
    const [createStartup, setCreateStartup] = useState(false)

    return (
        <div className='header'>
            <Navbar />
            <LeftNavbar />
            <div className="header-top-divider"></div>
            <div className="header-left-divider"></div>

            <button 
                className="create-startup-button" 
                onClick={() => setCreateStartup(true)}
            >
                Создать стартап
            </button>

            {createStartup && (
                <CreateStartupModal onClose={() => {
                    setCreateStartup(false)
                }} />
            )}
        </div>
    )
}

export default Header