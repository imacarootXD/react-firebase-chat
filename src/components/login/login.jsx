import { useState } from "react"
import "./login.css"

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
    return (
        <div className='login'>
            <div className="item">
            <h2>welcome back ...</h2>
            <form>
                <input type="text" placeholder="Email here" name="email" />
                <input type="password" placeholder="password" name="password" />
                <button>sign in</button>
            </form>
            </div>
            <div className="seperator"></div>
            <div className="item">
            <h2>create an account</h2>
            <form>
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