import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

const Profile = () => {

    const {User} = useContext(UserContext)

    if(!User) return <div>Please login</div>

    return <div>Welcome {User.username}</div>
}

export default Profile
