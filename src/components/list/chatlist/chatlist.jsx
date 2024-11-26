import { useEffect, useState } from "react"
import "./chatlist.css"
import AddUser from "./adduser/adduser"
import { useUserStore } from "../../../lib/userStore"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../../../lib/firebase"

const ChatList = () => {
    const[chats,setChats] = useState([]);
    const[addMode,setAddMode] = useState(false);
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
            <div className="item" key={chat.chatId}>
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>
                        person
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