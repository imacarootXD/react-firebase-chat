import { useState } from "react"
import "./chatlist.css"

const ChatList = () => {
    const[addMode,setAddMode] = useState(false)
    return(
        <div className='chatlist'>
            <div className="search">
                <div className="SearchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add" onClick={() => setAddMode((prev) => !prev)} />
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>
                        person
                    </span>
                    <p>
                        message 
                    </p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>
                        person
                    </span>
                    <p>
                        message 
                    </p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>
                        person
                    </span>
                    <p>
                        message 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ChatList