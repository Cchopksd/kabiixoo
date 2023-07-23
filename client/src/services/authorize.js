import axios from "axios"


// เก็บข้อมูลหรือเก็บ token / username => session storage
export const authenticate = (response,next) => {
    if(window !== "undefined"){
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.mem_username))
    }
    next()
}

//ดึงข้อมูล token
export const getToken = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }
        else {
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }
        else {
            return false
        }
    }
}

// logout หรือ clear session

export const logout = (next) => {
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}

export const getUserId = async () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            const username = JSON.parse(sessionStorage.getItem("user"))
            try {
                const id = await axios.post(`${process.env.REACT_APP_API}/get-userId`,{username})
                return id
            }catch (error) {
                throw error;
            }
        }
        else {
            return false
        }
    }
}