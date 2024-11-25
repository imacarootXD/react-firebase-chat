
import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";


const Login = () => {
    const[avatar,setavatar] = useState({
        file:null,
        url:""
    })

    const handleavatar = e =>{
        if(e.target.files[0]){
             setavatar({
             file:e.target.files[0],
             url: URL.createObjectURL(e.target.files[0])
             })
        }
    } 

    const handlelogin = e =>{
        e.preventDefault()
        toast.error("hello")
    }

    const handleregister = async (e) =>{
        e.preventDefault()
        const fromData = new FormData(e.target)
        const {username,email,password} = Object.fromEntries(fromData);
        try{
            const res =await createUserWithEmailAndPassword(auth,email,password)

            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db,"users",res.user.uid),{
                username,
                email,
                id: res.user.uid,
                blocked: [],
            });

            await setDoc(doc(db,"userchats",res.user.uid),{
                chats:[],
            });

            toast.success("Your account has been created! Please login")
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className='login'>
            <div className="item">
            <h2>welcome back ...</h2>
            <form onSubmit={handlelogin}>
                <input type="text" placeholder="Email here" name="email" />
                <input type="password" placeholder="password" name="password" />
                <button>sign in</button>
            </form>
            </div>
            <div className="seperator"></div>
            <div className="item">
            <h2>create an account</h2>
            <form onSubmit = {handleregister} >
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    upload an image</label>
                <input type="file" id="file" style={{display: "none"}} onChange={handleavatar} />
                <input type="text" placeholder="username" name="username" />
                <input type="text" placeholder="Email here" name="email" />
                <input type="password" placeholder="password" name="password" />
                <button>sign up</button>
            </form>
            </div>
        </div>
    )
}

export default Login