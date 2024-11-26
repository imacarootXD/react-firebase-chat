import { collection, getDoc, getDocs, query, QuerySnapshot, where } from 'firebase/firestore'
import'./adduser.css'
import { db } from '../../../../lib/firebase'
import { useState } from 'react'

const AddUser = () =>{
    const[user,setUser] = useState(null)
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
    }
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
                <button>add user</button>

            </div>}
        </div>
    )
}

export default AddUser