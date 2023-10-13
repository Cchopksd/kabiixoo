import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineRateReview } from "react-icons/md"
import './Chat.css'
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getSender, getSenderImage, isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../configs/ChatLogics';
import { ClipLoader } from "react-spinners";
import ScrollableFeed from 'react-scrollable-feed'
import io from 'socket.io-client'
import LottieAnimation from '../animations/LottieAnimation';
import animationData from '../animations/typing.json'
import Loading from '../components/Loading';
import { getToken } from '../services/authorize';
import AnimatedPage from "../AnimatedPage";

// endpoint เปลี่ยนตอน deploy
// const ENDPOINT = "http://localhost:5500"

// endpoint ตอน deploy
// const ENDPOINT = "https://kabiixoo-server.onrender.com"
// endpoint ตอน deploy vercel
const ENDPOINT = "https://kabiixoo.vercel.app"

var socket;

const Chat = () => {

    // redirect หน้า
    const navigate = useNavigate()

    // เอา id คน login มาจาก params
    const params = useParams()

    // คนที่ login
    const [loginUser, setLoginUser] = useState(params.userId)

    // context api
    const {selectedChat, setSelectedChat, chats, setChats, dropdownClicked, setDropdownClicked, haveService} = useContext(UserContext)

    // ข้อความทั้งหมดของแชทนั้น
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState()

    // ข้อความรูปภาพ
    const [imageFile, setImageFile] = useState()
    const [image, setImage] = useState("")

    // ขนาดของหน้าจอ
    const [size, setSize] = useState(0);

    // load api
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)

    // socket
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    // useEffect(() => {
    //     document.body.classList.add('chat-page');
    //     return () => {
    //         document.body.classList.remove('chat-page');
    //     };
    // }, []);

    // เมื่อเข้าสู่หน้า
    useEffect(() => {
        setDropdownClicked(false)
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
            setMessages([...messages, newMessageRecieved])
            fetchChats()
        })
    })

    const fetchChats = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/fetch-chats`,{loginUser},
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            console.log(data)
            setChats(data)
            setPageLoading(false)
            if (!haveService) {
                await Swal.fire("แจ้งเตือน",'สามารถรายงานผู้ให้บริการได้ <br> ถ้าผู้ให้บริการไม่อนุญาติให้รีวิวหลังบริการ','warning')
            }
        } catch(error) {
            setPageLoading(false)
            Swal.fire('แจ้งเตือน', error.response.data.err, "error")
        }
    }

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true)

            const { data } = await axios.get(`${process.env.REACT_APP_API}/get-message/${selectedChat._id}`,
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
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
                },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
                )
                console.log(data)

                socket.emit('new message', data)
                setMessages([...messages, data])
                fetchChats()
            }catch (error) {
                Swal.fire("แจ้งเตือน", "ส่งข้อความไม่สำเร็จ", "error")
            }
        }
        // else if (event.key === 'Tab' && event.shiftKey) {
        //     e.preventDefault(); // ป้องกันเกิดการเลื่อนไปยังคอลัมน์ถัดไป
        //     const textarea = e.target;
        //     const start = textarea.selectionStart;
        //     const end = textarea.selectionEnd;
        //     const newText = `${text.substring(0, start)}\n${text.substring(end)}`;
        //     setText(newText);
        //     // ตั้งค่าตำแหน่งเลือกข้อความใหม่ให้ตรงกับบรรทัดใหม่
        //     textarea.selectionStart = textarea.selectionEnd = start + 1;
        // }
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
                    },
                    {
                        headers: {
                            authorization: `Bearer ${getToken()}`
                        }
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

    // ส่งข้อความที่เป็นรูปภาพ
    const setFile = async () => {
        // ตรวจสอบสกุลไฟล์
        if(imageFile){
            if (imageFile.type === "image/jpeg" || imageFile.type === "image/png"){
                const data = new FormData()
                data.append("file", imageFile)
                data.append("upload_preset", "kabiixoo")
                data.append("cloud_name", "dmz2wct31")

                // api upload รูป ไปยัง Cloudinary
                await axios.post("https://api.cloudinary.com/v1_1/dmz2wct31/image/upload/", data)
                .then((response) => {
                    setImage(response.data.url.toString())
                    setImageFile("")
                }).catch((error) => {
                    setImageFile("")
                    Swal.fire(
                        'แจ้งเตือน',
                        error,
                        'error'
                    )
                })
            }else{
                setImageFile("")
                Swal.fire(
                    'แจ้งเตือน',
                    'ประเภทไฟล์รูปภาพไม่รองรับ',
                    'error'
                )
            }
        }
    }

    const sendImageMessage = async () => {
        if(image) {
            socket.emit('stop typing', selectedChat._id)
            try {
                setImage("")
                const { data } = await axios.post(`${process.env.REACT_APP_API}/send-message`,{
                    loginUser: loginUser,
                    content: image,
                    chatId: selectedChat._id
                },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
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

    // เมื่อเลือกไฟล์ให้มา set file
    useEffect(() => {
        setFile()
    },[imageFile])

    // เมื่อเลือกรูปแล้ว
    useEffect(() => {
        sendImageMessage()
    },[image])

    const newPageImage = (imagePath) => {
        if (!imagePath.includes("res.cloudinary")) return
        // window.open(imagePath, '_blank');
        // Swal.fire({
        //     imageUrl: 'https://placeholder.pics/svg/300x1500',
        //     imageHeight: 1500,
        //     imageAlt: 'A tall image'
        // })
    }

    // จัดการการพิมพ์ข้อความ
    const typingHandler = (event) => {
        // setNewMessage(event.target.value)

        const inputValue = event.target.value;
        const lines = inputValue.split('\n');

        if (size > 1234){
            const formattedLines = lines.map((line) => {
            if (line.length > 50) {
                const parts = [];
                while (line.length > 50) {
                    parts.push(line.substring(0, 50));
                    line = line.substring(50);
                }
                parts.push(line);
                return parts.join('\n');
            }
            return line;
            });
            setNewMessage(formattedLines.join('\n'));
        } else {
            const formattedLines = lines.map((line) => {
                if (line.length > 20) {
                    const parts = [];
                    while (line.length > 20) {
                        parts.push(line.substring(0, 20));
                        line = line.substring(20);
                    }
                    parts.push(line);
                    return parts.join('\n');
                }
                return line;
                });
            setNewMessage(formattedLines.join('\n'));
        }

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

    // ย้อนกลับหน้า
    const handleGoBack = () => {
        navigate(-1);
    }

    // อนุญาติรีวิว
    const handleReview = async () => {
        await Swal.fire({
            title: 'อนุญาติให้ผู้ใช้บริการรีวิวได้',
            icon: 'warning',
            showCancelButton: true
        }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.post(`${process.env.REACT_APP_API}/enable-review/${selectedChat._id}`,{loginUser}).then((response) => {
                    Swal.fire(
                        'แจ้งเตือน',
                        response.data.message,
                        'success'
                    )
                }).catch((error) => {
                    Swal.fire(
                        "แจ้งเตือน",
                        error.response.data.err,
                        'error'
                    )
                })
            }
        })
    }

    return (
        <AnimatedPage>
            {pageLoading && <Loading/>}
            <div className='chat-container'>
                <div className={size > 1079 ? 'chat-myChat-box' : selectedChat ? 'chat-myChat-box-mobile-none' : 'chat-myChat-box-mobile'}>
                    <div className='chat-myChat-back-btn'>
                        <button className='chat-myChat-step-back' onClick={handleGoBack}><BiArrowBack size={25} color='#A7727D' />
                        &ensp;ย้อนกลับ
                        </button>
                    </div>
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
                                                {!chat.latestMessage.content.includes("res.cloudinary") ? chat.latestMessage.content.length > 20  
                                                ? chat.latestMessage.content.substring(0, 21) + "..." : chat.latestMessage.content : "รูปภาพ" }
                                            </div>
                                        )}
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
                                {
                                    haveService &&
                                    <div className='chat-chat-review' role='button' onClick={handleReview}>
                                        <MdOutlineRateReview size={30} color='#A7727D'/>
                                        {/* รีวิว */}
                                    </div>
                                }
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
                                                    <div key={m._id}>
                                                        <div style={{display: "flex"}}>
                                                                {(isSameSender(messages,m,i,loginUser) || isLastMessage(messages,i,loginUser))
                                                                && (
                                                                    <div>
                                                                        <img className='chat-chat-avatar' src={m.sender.mem_profileImage} />
                                                                    </div>
                                                                )}
                                                                <span style={size > 1234 ? {backgroundColor: `${m.sender._id === loginUser ? !m.content.includes("res.cloudinary") ? '#f0c7d0' : "transparent" : 
                                                                    !m.content.includes("res.cloudinary") ? '#B9F5D0' : "transparent"}`,
                                                                    borderRadius: '20px', padding: '5px 15px', maxWidth: '65%',
                                                                    marginLeft: isSameSenderMargin(messages, m, i, loginUser),
                                                                    marginTop: isSameUser(messages, m, i , loginUser) ? 3 : 10,
                                                                    whiteSpace: 'pre-line'} : 
                                                                    {backgroundColor: `${m.sender._id === loginUser ? !m.content.includes("res.cloudinary") ? '#f0c7d0' : "transparent" : 
                                                                    !m.content.includes("res.cloudinary") ? '#B9F5D0' : "transparent"}`,
                                                                    borderRadius: '20px', padding: '5px 15px', maxWidth: '45%',
                                                                    marginLeft: isSameSenderMargin(messages, m, i, loginUser),
                                                                    marginTop: isSameUser(messages, m, i , loginUser) ? 3 : 10,
                                                                    whiteSpace: 'pre-line'}}
                                                                    >
                                                                        <p 
                                                                        style={{margin: '0px'}}
                                                                        >
                                                                            {m.content.includes("res.cloudinary") ? 
                                                                            <img src={m.content} className='chat-chat-img-display'></img> 
                                                                            : m.content}
                                                                        </p>
                                                                </span>
                                                        </div>
                                                    </div>
                                                ))}
                                                {isTyping ? 
                                                <div>
                                                    <LottieAnimation animationData={animationData} width={100}></LottieAnimation>
                                                </div> : <></>}
                                            </ScrollableFeed>
                                        </div>
                                    )}
                                </div>
                                <div className='chat-chat-input-box'>
                                    <input type="file" id='chat-chat-file-display-none' onChange={(e) => {setImageFile(e.target.files[0])}}/>
                                    <label htmlFor="chat-chat-file-display-none" id="chat-chat-customFileLabel">
                                        <img src={require("../images/chatPage/galleryIcon.png")} 
                                        />
                                    </label>
                                    <textarea type="text" placeholder='กรอกข้อความ...' onKeyDown={sendMessage} 
                                    value={newMessage} onChange={typingHandler} className='chat-textarea-style-remove'/>
                                    <img src={require("../images/chatPage/sendChatIcon.png")} onClick={sendMessageByClick}/>
                                </div>
                            </div>
                        </>
                    ) : (<div className='chat-chat-not-selected'>คลิกที่ผู้ให้บริการ เพื่อเริ่มการสนทนา</div>)}
                </div>
            </div>
        </AnimatedPage>
    )
}

export default Chat
