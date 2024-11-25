import'./adduser.css'

const AddUser = () =>{
    return(
        <div className='adduser'>
            <form>
                <input type="text" placeholder='Username' name='username' />
                <button>search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src='./avatar.png' alt="" />
                    <span>person</span>
                </div>
                <button>add user</button>

            </div>
        </div>
    )
}

export default AddUser