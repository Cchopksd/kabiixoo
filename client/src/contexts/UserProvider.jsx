const { useState, useEffect } = require("react")
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const UserProvider = ({children}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [haveService, setHaveService] = useState(false)

    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("user"))
        console.log(userInfo)
        setUser(userInfo)

        // if(!userInfo){
        //     navigate('/signin');
        // }
    },[navigate])

    return (
        <UserContext.Provider value={{username: user, haveService, setHaveService, selectedChat, setSelectedChat, chats, setChats}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserContext;