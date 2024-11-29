import { useEffect, useState, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
    const [chat,setChat] = useState()
    const [open,setOpen] = useState(false);
    const [text,settext] = useState("");
    const{chatId, user} = useChatStore();
    const{ currentUser } = useUserStore();
    const handleemoji = e => {settext((prev) => prev + e.emoji); setOpen(false)};
    const endRef = useRef(null)
    const handlesend = async() =>{
      if (text === "") return;
      try{
         await updateDoc(doc(db,"chats", chatId),{
            messages:arrayUnion({
               senderId: currentUser.id,
               text,
               createdAt: new Date()
            }),
         });
         const userIDs = [currentUser.id, user.id]
         userIDs.forEach(async (id)=>{
             const userchatsref = doc(db,"userchats",id)
             const userchatssnap = await getDoc(userchatsref)
             if(userchatssnap.exists()){
                const userChatsData = userchatssnap.data()
                const chatindex = userChatsData.chats.findIndex(c=> c.chatId === chatId)
                userChatsData,chats[chatindex].lastmessage = text
                userChatsData.chats[chatindex].isSeen = id === currentUser.id ? true : false;
                userChatsData.chats[chatindex].updatedAt = Date.now()

                await updateDoc(userchatsref, {
                   chats:userChatsData.chats,
                });
             };
          });
      }catch(error){
         console.log(error)
      }
    }
    useEffect(()=>{
      endRef.current?.scrollIntoView({behaviour:"smooth"})
   },[chatId])

   useEffect(()=>{
      const unSub = onSnapshot(doc(db,"chats",chatId),(res)=>{
         setChat(res.data())
      })
      return() =>{
         unSub
      }
   },[]);
    return (
      <div className='chat'>
         <div className="top">
            <div className="user">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                  <span>person</span>
                  <p>lorem ipsum dimsum</p>
               </div>
            </div>
            <div className="icons">
               <img src="./phone.png" alt="" />
               <img src="./video.png" alt="" />
               <img src="./info.png" alt="" />
            </div>
         </div>
         <div className="center">
            {chat?.messages?.map((message)=>(
            <div className="message own" key={message?.createAt}>
               <div className="texts">
                  {message.img && <img
                     src={message.img}
                     alt=""
                     />
                  }
                  <p> {message.text}</p>
                  <span>{message.createAt}</span>
               </div>
            </div>
            ))}
            <div ref={endRef}></div>
         </div>
         <div className="bottom">
             <div className="icons">
               <img src="./img.png" alt="" />
               <img src="./camera.png" alt="" />
               <img src="./mic.png" alt="" />
             </div>
             <input type="text" placeholder="Type a message..." value={text} onChange={e=>settext(e.target.value)}/>
             <div className="emoji">
                <img src="./emoji.png" alt="" onClick={() =>setOpen((prev => !prev))} />
                <div className="picker">
                  <EmojiPicker open={open} onEmojiClick={handleemoji} />
                </div>
             </div>
             <button className="sendButton" onClick={handlesend}>send</button>
         </div>
      </div>
   )
}
  
export default Chat