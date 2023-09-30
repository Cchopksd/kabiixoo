// เอาข้อมูลคนส่งไปแสดง
export const getSender = (loginUser, users) => {
    return users[0]._id === loginUser ? users[1].mem_name + " " + users[1].mem_surname: users[0].mem_name + " " + users[0].mem_surname
}
// เอารูปของคนส่ง
export const getSenderImage = (loginUser, users) => {
    return users[0]._id === loginUser ? users[1].mem_profileImage : users[0].mem_profileImage
}

export const isSameSender = (messages, m, i, loginUser) => {
    return (
        i < messages.length - 1 &&
        (messages[i+1].sender._id !== m.sender._id ||
            messages[i+1].sender._id === undefined) &&
            messages[i].sender._id !== loginUser
    )
}

export const isLastMessage = (messages, i, loginUser) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== loginUser &&
        messages[messages.length - 1].sender._id
    )
}

export const isSameSenderMargin = (messages, m, i, loginUser) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== loginUser
    )
    return 40;
    else if (
    (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== loginUser) ||
    (i === messages.length - 1 && messages[i].sender._id !== loginUser)
    )
    return 0;
    else return "auto";
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};