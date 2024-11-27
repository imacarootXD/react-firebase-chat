import { useEffect, useState, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";

const Chat = () => {
   const [chat,setChat] = useState()
    const [open,setOpen] = useState(false);
    const [text,settext] = useState("");
    const handleemoji = e => {settext((prev) => prev + e.emoji); setOpen(false)};
    const endRef = useRef(null)
    useEffect(()=>{
      endRef.current?.scrollIntoView({behaviour:"smooth"})
   },[])

   useEffect(()=>{
      const unSub = onSnapshot(doc(db,"chats",..),(Response)=>{
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
            <div className="message">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                  <p> this is the message this is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the message</p>
                  <span>x time ago</span>
               </div>
            </div>
            <div className="message own">
               <div className="texts">
                  <p> this is the message this is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the message</p>
                  <span>x time ago</span>
               </div>
            </div>
            <div className="message">
               <img src="./avatar.png" alt="" />
               <div className="texts">
                  <p> this is the message this is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the message</p>
                  <span>x time ago</span>
               </div>
            </div>
            <div className="message own">
               <div className="texts">
                  <p> this is the message this is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the message</p>
                  <span>x time ago</span>
               </div>
            </div>
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
             <button className="sendButton">send</button>
         </div>
      </div>
   )
}
  
export default Chat