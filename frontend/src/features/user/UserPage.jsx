import React from 'react'
import { useSelector } from 'react-redux'

import { selectUsername, selectUserId, selectToken } from '../../redux/userSlice'

const UserPage = () => {
    // From Redux
    const user = useSelector(selectUsername)
    const userId = useSelector(selectUserId)
    const token = useSelector(selectToken)

    return (
        <div>
            <h2>User Page</h2>
            <h3>Welcome <i>{user ? user : 'Anon User'}</i></h3>
            <h3>Your UserId is: {userId}</h3>
            <h3>Your Token is: {token}</h3>
        </div>
    )
    
}

export default UserPage