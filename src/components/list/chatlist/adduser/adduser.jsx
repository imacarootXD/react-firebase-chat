import { arrayUnion, collection, doc, getDoc, getDocs, query, QuerySnapshot, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import'./adduser.css'
import { db } from '../../../../lib/firebase'
import { useState } from 'react'
import { useUserStore } from '../../../../lib/userStore'

const AddUser = () =>{
    const[user,setUser] = useState(null)
    const {currentUser} = useUserStore()
    const handlesearch = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
    

        try{
            const userRef = collection(db,"users");
            const q = query(userRef,where("username","==",username));
            const querysnapshot = await getDocs(q);
            if(!querysnapshot.empty){
                setUser(querysnapshot.docs[0].data());
            }
        }catch(error){
            console.log(error);
        }
    };

    const handleadd = async ()=>{
        const chatRef = collection(db,"chats")
        const userchatref = collection(db,"userchats")

        try{
            const newchatref = doc(chatRef);
            await setDoc(newchatref,{
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userchatref,user.id),{
                chats:arrayUnion({
                    chatId : newchatref.id,
                    lastmessage:"",
                    recieverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });
            
            await updateDoc(doc(userchatref,currentUser.id),{
                chats:arrayUnion({
                    chatId : newchatref.id,
                    lastmessage:"",
                    recieverId: user.id,
                    updatedAt: Date.now(),
                }),
            });
      }catch(error){
        console.log(error)
      }
    };
    return(
        <div className='adduser'>
            <form onSubmit={handlesearch}>
                <input type="text" placeholder='Username' name='username' />
                <button>search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleadd}>add user</button>

            </div>}
        </div>
    )
}

export default AddUser