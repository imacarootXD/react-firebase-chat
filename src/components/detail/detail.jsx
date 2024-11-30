import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css"

const Detail = () => {
   const{ chatId ,user,isCurrentUserBlocked, isReceivingUserBlocked,changeBlock,resetChat } = useChatStore()
   const{ currentUser } = useUserStore()
   const handleBlock = async() => {
      if(!user) return;

      const userDocRef = doc(db,"users",currentUser.id)
      try{
         await updateDoc(userDocRef,{
            blocked: isReceivingUserBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
         })
         changeBlock()
      }catch(error){
         console.log(error)
      }
   }
    return (
      <div className='detail'>
         <div className="user">
            <img src={user?.avatar || "./avatar.png"} alt="" />
            <h2>{user?.username}</h2>
            <p>description description description description description</p>
         </div>
         <div className="info">
            <div className="option">
               <div className="title">
                  <span>chat settings</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <div className="option">
               <div className="title">
                  <span>chat settings</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <div className="option">
               <div className="title">
                  <span>privacy and help</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <div className="option">
               <div className="title">
                  <span>shared photos</span>
                  <img src="./arrowDown.png" alt="" />
               </div>
               <div className="photos">
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>

               <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>
                  <div className="photoItem">
                     <div className="photoDetail">
                        <img src="https://th.bing.com/th/id/R.1f845bd1a8aab9436352c02e2289ddaf?rik=XE2G8WrgIRrElA&pid=ImgRaw&r=0" alt="" />
                        <span>date of image</span>
                     </div>
                     <img src="./download.png" alt="" className="icon" />
                  </div>  
               </div>             
            </div>
            <div className="option">
               <div className="title">
                  <span>shared files</span>
                  <img src="./arrowUp.png" alt="" />
               </div>
            </div>
            <button onClick={handleBlock}>
               {
                  isCurrentUserBlocked
                  ? "you are blocked!"
                  : isReceivingUserBlocked
                  ? "user blocked"
                  : "block user"
               }</button>
            <button className="logout" onClick={()=>auth.signOut()}>logout</button>
         </div>
      </div>
   );
};
  
export default Detail