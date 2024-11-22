import "./list.css"
import ChatList from"./chatlist/chatlist"
import UserInfo from "./userinfo/userinfo"

const List = () => {
    return (
      <div className='list'>
         <UserInfo/>
         <ChatList/>
      </div>
   )
}
  
export default List