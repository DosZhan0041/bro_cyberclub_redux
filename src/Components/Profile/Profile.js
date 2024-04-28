import { FaLocationDot } from "react-icons/fa6";
import "./../../App.css"

let Profile = ({authUser})=>{
    let userData = authUser
    return(
        <div className="profile">
            {
                userData ?
                (
                    <div className="container">
                        <div className="wrapper-profile">
                            <div className="profile-up"></div>
                            <div className="profile-down">
                                <div className="first-side">
                                    <div className="image-profile">
                                        <img src={userData.urlImg ? (userData.urlImg) : ("https://i1.wp.com/www.iconspng.com/uploads/abstract-user-icon-3/abstract-user-icon-3.png")}></img>
                                    </div>
                                    <div className="name-profile">
                                        <p>{userData.name}</p>
                                        <p>{userData.surname}</p>
                                    </div>
                                    <div className="location-profile">
                                        <div className="location-dev">
                                            <FaLocationDot /> {userData.country} 
                                        </div>   
                                    </div>
                                    <div className="number-profile">
                                    {userData.phone}
                                    </div>
                                    <div className="email-profile">
                                    {userData.email}
                                    </div>
                                </div>
                                <div className="button-profile">
                                    <button>Change the Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div></div>
                )
            }
        </div>
    )
}
export default Profile