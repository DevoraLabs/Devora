import Navbar from "../../components/Navbar/Navbar"
import UserFollowing from "../../components/User/UserFollowing/UserFollowing"
import UserHeader from "../../components/User/UserHeader/UserHeader"
import UserPortfolio from "../../components/User/UserPortfolio/UserPortfolio"
import UserStartups from "../../components/User/UserStartups/UserStartups"
import "./UserPage.css"

function UserPage() {
    return (
        <div className="user-page">
            <Navbar />
            <UserHeader />
            <div className="main-part">
                <UserPortfolio />
                <UserStartups />
                <UserFollowing />
            </div>
        </div>
    )
}

export default UserPage