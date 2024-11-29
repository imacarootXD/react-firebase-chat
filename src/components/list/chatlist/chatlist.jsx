import { useEffect, useState } from "react"
import "./chatlist.css"
import AddUser from "./adduser/adduser"
import { useUserStore } from "../../../lib/userStore"
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { useChatStore } from "../../../lib/chatStore"

const ChatList = () => {
    const[chats,setChats] = useState([]);
    const[addMode,setAddMode] = useState(false);
    const{ changeChat,chatId } = useChatStore()
    const{currentUser} = useUserStore();
    useEffect(()=>{
        const unSub = onSnapshot(doc(db,"userchats",currentUser.id), async (response)=>{
            const items = response.data().chats;
            const promises = items.map(async(item) => {
                const userDocRef = doc(db,"users",item.recieverId) ;
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data()
                return{...item,user}

            });
            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt ));
        });

        return () =>
            unSub()
    },[currentUser.id])

    const handleSelect = async (chat)=>{
        const userChats = chats.map(item=>{
            const{user,...rest} = item
            return rest
        })

        const chatindex = userChats.findIndex(item=>item.chatId === chat.chatId)
        userChats[chatindex].isSeen = true;
        const userchatref = doc(db,"userchats",currentUser.id);
        try{
            await updateDoc(userchatref,{
                chats:userChats,

            })
            changeChat(chat.chatId,chat.user)
        }catch(error){
            console.log(error)
        }

    }
    return(
        <div className='chatlist'>
            <div className="search">
                <div className="SearchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add" onClick={() => setAddMode((prev) => !prev)} />
            </div>
            {chats.map((chat)=> (
            <div className="item" key={chat.chatId} onClick={()=> handleSelect(chat)}
            style={{backgroundColor: chat?.isSeen ? "transparent": "blue"}}>
                <img src={chat.user.avatar|| "./avatar.png"} alt="" />
                <div className="texts">
                    <span>
                        {chat.user.username}
                    </span>
                    <p>
                        {chat.lastmessage}
                    </p>
                </div>
            </div>
            ))}
            
            {addMode && <AddUser /> }
        </div>
    )
}

export default ChatList