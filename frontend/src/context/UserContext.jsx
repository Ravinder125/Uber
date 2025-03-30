import React, { createContext } from 'react'

export const userContext = createContext();

const UserContext = ({ children }) => {

    const userData = {
        username: '',
        email: '',
        fullname: {
            firstname: '',
            middlename: '',
            lastname: '',
        },
        telCode: '',
        tel: '',
        password: '',
    };

    return (
        <userContext.Provider value={userData}>
            {children}
        </userContext.Provider>

    )
}

export default UserContext