import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import './Chat.css'
import { useParams } from 'react-router-dom';
import UserContext from '../contexts/UserProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getSender, getSenderImage, isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../configs/ChatLogics';
import { ClipLoader } from "react-spinners";
import ScrollableFeed from 'react-scrollable-feed'
import io from 'socket.io-client'
import Lottie from 'react-lottie'
import animationData from '../animations/typing.json'
import Loading from '../components/Loading';

// endpoint เปลี่ยนตอน deploy
const ENDPOINT = "http://localhost:5500"
var socket, selectedChatCompare;

const Chat = () => {

    // เอา id คน login มาจาก params
    const params = useParams()

    // คนที่ login
    const [loginUser, setLoginUser] = useState(params.userId)

    // context api
    const {selectedChat, setSelectedChat, chats, setChats} = useContext(UserContext)

    // ข้อความทั้งหมดของแชทนั้น
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState()

    // ขนาดของหน้าจอ
    const [size, setSize] = useState(0);

    // load api
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)

    // socket
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    // ตั้งค่า animation พิมพ์ข้อความ
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio : "xMidYMid slice"
        }
    }

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        setPageLoading(true)
        setLoginUser(params.userId)
        fetchChats()
    },[])

    // ต่อ realtime
    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", loginUser)
        socket.on('connected', () => setSocketConnected(true))
        socket.on('typing', () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))

        return () => {
            socket.disconnect();
        };
    },[])

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            // if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){

            // }
            setMessages([...messages, newMessageRecieved])
            fetchChats()
        })
    })

    const fetchChats = async () => {
        try {
            console.log(loginUser)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/fetch-chats`,{loginUser})
            console.log(data)
            setChats(data)
            setPageLoading(false)
        } catch(error) {
            setPageLoading(false)
            Swal.fire('แจ้งเตือน', error.response.data.err, "error")
        }
    }

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true)

            const { data } = await axios.get(`${process.env.REACT_APP_API}/get-message/${selectedChat._id}`)
            // console.log(messages)
            setMessages(data)
            setLoading(false)

            socket.emit('join chat', selectedChat._id)
        }catch (error) {
            Swal.fire('แจ้งเตือน', 'ไม่สามารถโหลดแชทได้', 'error')
        }
    }

    // เมื่อเลือกแชท
    useEffect(() => {
        fetchMessages()

        // selectedChatCompare = selectedChat
    },[selectedChat])

    // ขนาดของหน้าจอ
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleToMyChat = () => {
        setSelectedChat("")
    }

    const dummyArray = [
        {
            name: "สายฝน ล่องทิพย์",
            chat: "สวัสดีจ้า",
        },
        {
            name: "ชินาธิป ไชยถาวร",
            chat: "ควยไรน้อง"
        },
        {
            name: "ผมชื่อโต ควยไรอะ",
            chat: "ควยไรครับพี่"
        },
        {
            name: "โทมัส เชลบี้",
            chat: "มึงตายแน่"
        },
        {
            name: "ซอล กู้ดแมน",
            chat: "เจอกูแน่ไอสัส"
        },
        {
            name: "ซอล กู้ดแมน",
            chat: "เจอกูแน่ไอสัส"
        },
        {
            name: "ซอล กู้ดแมน",
            chat: "เจอกูแน่ไอสัส"
        },
        {
            name: "ซอล กู้ดแมน",
            chat: "เจอกูแน่ไอสัส"
        },
        {
            name: "ซอล กู้ดแมน",
            chat: "เจอกูแน่ไอสัส"
        },
    ]

    // ส่งข้อความ แบบ กด enter
    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit('stop typing', selectedChat._id)
            try {
                setNewMessage("")
                const { data } = await axios.post(`${process.env.REACT_APP_API}/send-message`,{
                    loginUser: loginUser,
                    content: newMessage,
                    chatId: selectedChat._id
                })
                console.log(data)

                socket.emit('new message', data)
                setMessages([...messages, data])
                fetchChats()
            }catch (error) {
                Swal.fire("แจ้งเตือน", "ส่งข้อความไม่สำเร็จ", "error")
            }
        }
    }

    // ส่งข้อความแบบ กดปุ่มส่ง
    const sendMessageByClick = async () => {
        if (newMessage) {
            socket.emit('stop typing', selectedChat._id)
                try {
                    setNewMessage("")
                    const { data } = await axios.post(`${process.env.REACT_APP_API}/send-message`,{
                        loginUser: loginUser,
                        content: newMessage,
                        chatId: selectedChat._id
                    })
                    console.log(data)
    
                    socket.emit('new message', data)
                    setMessages([...messages, data])
                    fetchChats()
                }catch (error) {
                    Swal.fire("แจ้งเตือน", "ส่งข้อความไม่สำเร็จ", "error")
                }
        }
    }

    // จัดการการพิมพ์ข้อความ
    const typingHandler = (event) => {
        setNewMessage(event.target.value)

        if (!socketConnected) return

        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id)
        }

        let lastTypingTime = new Date().getTime()
        var timerLength = 3000
        setTimeout(() => {
            var timeNow = new Date().getTime()
            var timeDiff = timeNow - lastTypingTime
            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id)
                setTyping(false)
            }
        }, timerLength)
    }

    return (
        <div>
            {pageLoading && <Loading/>}
            <div className='chat-container'>
                <div className={size > 1079 ? 'chat-myChat-box' : selectedChat ? 'chat-myChat-box-mobile-none' : 'chat-myChat-box-mobile'}>
                    <div className='chat-myChat-header'>
                        <img src={require('../images/chatPage/chatIcon.png')}/>
                        <label>การสนทนาของฉัน</label>
                    </div>
                    <div className='chat-myChat-scroll-box'>
                        {chats.map((chat) => (
                            <div className={selectedChat === chat ? 'chat-myChat-profile-selected' : 'chat-myChat-profile'} 
                            key={chat._id} onClick={() => setSelectedChat(chat)}>
                                <img src={getSenderImage(loginUser, chat.users)}/>
                                <div className='chat-myChat-profile-text-box'>
                                    <label>{getSender(loginUser, chat.users)}</label>
                                    <div className='chat-myChat-profile-latest'>
                                        {chat.latestMessage && (
                                            <div>
                                                <label className={selectedChat === chat ?'chat-myChat-profile-latest-bold-selected':'chat-myChat-profile-latest-bold'}>{chat.latestMessage.sender.mem_name}</label>
                                                <label> : </label>
                                                {chat.latestMessage.content.length > 20 ?
                                                chat.latestMessage.content.substring(0, 21) + "..." : chat.latestMessage.content}
                                            </div>
                                        )}
                                        {/* <label className='chat-myChat-profile-latest-bold'>{item.name} </label> */}
                                        {/* <label>: {chat.chat}</label> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={size > 1079 ? 'chat-chat-box' : selectedChat ? "chat-chat-box-mobile" : 'chat-chat-box-mobile-none'}>
                    {selectedChat ? (
                        <>
                            <div className='chat-chat-header'>
                                { size < 1080 && 
                                <div className='chat-chat-back' onClick={handleToMyChat}>
                                    <BiArrowBack size={30} color='#A7727D'/>
                                </div> }
                                <div className='chat-chat-name-display'>
                                    <img src={getSenderImage(loginUser, selectedChat.users)}/>
                                    <label>{getSender(loginUser, selectedChat.users)}</label>
                                </div>
                            </div>
                            <div className='chat-chat-display-box'>
                                <div className='chat-chat-display'>
                                    {loading ? (
                                        <div className='chat-chat-display-loading'>
                                            <ClipLoader size={100} color={"#A7727D"} loading={true} />
                                        </div>
                                    ) :
                                    (
                                        <div className='chat-chat-messages'>
                                            <ScrollableFeed className="scrollable-feed">
                                                {messages && messages.map((m,i) => (
                                                    <div>
                                                        <div style={{display: "flex"}} key={m._id}>
                                                            {/* <div className='chat-chat-message-one'> */}
                                                                {(isSameSender(messages,m,i,loginUser) || isLastMessage(messages,i,loginUser))
                                                                && (
                                                                    <div>
                                                                        <img className='chat-chat-avatar' src={m.sender.mem_profileImage} />
                                                                    </div>
                                                                )}
                                                                <span style={{backgroundColor: `${m.sender._id === loginUser ? '#f0c7d0' : '#B9F5D0'}`,
                                                                    borderRadius: '20px', padding: '5px 15px', maxWidth: '75%',
                                                                    marginLeft: isSameSenderMargin(messages, m, i, loginUser),
                                                                    marginTop: isSameUser(messages, m, i , loginUser) ? 3 : 10}}>
                                                                        {m.content}
                                                                </span>
                                                            {/* </div> */}
                                                        </div>
                                                    </div>
                                                ))}
                                                {isTyping ? 
                                                <div>
                                                    <Lottie width={100} style={{marginBottom: 0, marginLeft: 0}} options={defaultOptions}/>
                                                </div> : <></>}
                                            </ScrollableFeed>
                                        </div>
                                    )}
                                </div>
                                <div className='chat-chat-input-box'>
                                    <img src={require("../images/chatPage/galleryIcon.png")}/>
                                    <input type="text" placeholder='กรอกข้อความ...' onKeyDown={sendMessage} 
                                    value={newMessage} onChange={typingHandler}/>
                                    <img src={require("../images/chatPage/sendChatIcon.png")} onClick={sendMessageByClick}/>
                                </div>
                            </div>
                        </>
                    ) : (<div className='chat-chat-not-selected'>คลิกที่ผู้ให้บริการ เพื่อเริ่มการสนทนา</div>)}
                </div>
            </div>
        </div>
    )
}

export default Chat
