
import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";


const Login = () => {
    const[avatar,setavatar] = useState({
        file:null,
        url:""
    })

    const[loading,setloading] = useState(false)

    const handleavatar = e =>{
        if(e.target.files[0]){
             setavatar({
             file:e.target.files[0],
             url: URL.createObjectURL(e.target.files[0])
             })
        }
    } 

    const handlelogin = async (e) =>{
        e.preventDefault();
        setloading(true)
        const fromData = new FormData(e.target)
        const {email,password} = Object.fromEntries(fromData);
        
        try{

            await signInWithEmailAndPassword(auth,email,password);

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
        finally{
            setloading(false)
        }
    };

    const handleregister = async (e) =>{
        e.preventDefault()
        setloading(true)
        const fromData = new FormData(e.target)
        const {username,email,password} = Object.fromEntries(fromData);
        try{
            const res =await createUserWithEmailAndPassword(auth,email,password)

            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db,"users",res.user.uid),{
                username,
                email,
                avatar: imgUrl,
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
        finally{
            setloading(false);
        }
    }

    return (
        <div className='login'>
            <div className="item">
            <h2>welcome back ...</h2>
            <form onSubmit={handlelogin}>
                <input type="text" placeholder="Email here" name="email" />
                <input type="password" placeholder="password" name="password" />
                <button disabled={loading}>{loading ? "loading" : "sign in"}</button>
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
                <button disabled={loading}>{loading ? "loading" : "sign up"}</button>
            </form>
            </div>
        </div>
    )
}

export default Login