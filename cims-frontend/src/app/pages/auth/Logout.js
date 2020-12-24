import React, { useEffect } from 'react'
import { AuthContext } from './AuthProvider';

export default function Logout() {

    const { dispatch } = React.useContext(AuthContext);

    useEffect(() => {
        dispatch({type:"LOGOUT"})
    }, [dispatch])

    return (
        <>
            
        </>
    )
}
