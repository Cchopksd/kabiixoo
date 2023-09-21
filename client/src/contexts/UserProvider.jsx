import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const UserProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [haveService, setHaveService] = useState(false)

    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"))
        setUser(userInfo)

        // if(!userInfo){
        //     navigate('/signin');
        // }
    },[navigate])

    return (
        <UserContext.Provider value={{username: user, haveService, setHaveService, selectedChat, setSelectedChat, chats, setChats, isAdmin, setIsAdmin}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContext;