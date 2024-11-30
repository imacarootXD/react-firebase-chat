import { useEffect, useState, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";
import { format } from "timeago.js";

const Chat = () => {
    const [chat,setChat] = useState()
    const [open,setOpen] = useState(false);
    const [text,settext] = useState("");
    const{chatId, user, isCurrentUserBlocked,isReceivingUserBlocked} = useChatStore();
    const{ currentUser } = useUserStore();
    const handleemoji = e => {settext((prev) => prev + e.emoji); setOpen(false)};
    const endRef = useRef(null)
    const[img,setimg] = useState({
      file: null,
      url: "",
    })
    const handlesend = async() =>{
      if (text === "") return;
      let imgUrl = null

      try{
         if(img.file){
            imgUrl = await upload(img.file)
         }
         await updateDoc(doc(db,"chats", chatId),{
            messages:arrayUnion({
               senderId: currentUser.id,
               text,
               createdAt: new Date(),
               ...(imgUrl && {img: imgUrl}),
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
      setimg({
         file:null,
         url:"",
      })

      settext("")
    }
    useEffect(()=>{
      endRef.current?.scrollIntoView({behaviour:"smooth"})
   },[chatId])
   const handleimg = e =>{
      if(e.target.files[0]){
           setimg({
           file:e.target.files[0],
           url: URL.createObjectURL(e.target.files[0])
           })
      }
  } 
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
               <img src={user?.avatar || "./avatar.png"} alt="" />
               <div className="texts">
                  <span>{user?.username}</span>
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
            <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createAt}>
               <div className="texts">
                  {message.img && <img
                     src={message.img}
                     alt=""
                     />
                  }
                  <p> {message.text}</p>
                  <span>{format(message.createdAt.toDate())}</span>
               </div>
            </div>
            ))}
            {img.url && ( <div className="message own">
               <div className="texts">
                  <img src={img.url} alt="" />
               </div>
            </div>)}
            <div ref={endRef}></div>
         </div>
         <div className="bottom">
             <div className="icons">
               <label htmlFor="file">
                   <img src="./img.png" alt="" />
               </label>
               <input type="file" id ="file" style={{display: "none"}} onChange={handleimg} disabled={isCurrentUserBlocked || isReceivingUserBlocked} />
               <img src="./camera.png" alt="" />
               <img src="./mic.png" alt="" />
             </div>
             <input type="text" placeholder={ isCurrentUserBlocked || isReceivingUserBlocked ? "you can't send a message" : "enter your message..."} value={text} onChange={(e)=>settext(e.target.value)} disabled={isCurrentUserBlocked || isReceivingUserBlocked} />
             <div className="emoji">
                <img src="./emoji.png" alt="" onClick={() =>setOpen((prev => !prev))} />
                <div className="picker">
                  <EmojiPicker open={open} onEmojiClick={handleemoji} />
                </div>
             </div>
             <button className="sendButton" onClick={handlesend} disabled={isCurrentUserBlocked || isReceivingUserBlocked}>send</button>
         </div>
      </div>
   )
}
  
export default Chat