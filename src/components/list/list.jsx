import chatlist from"./list.css"
import"./chatlist/chatlist"
import userinfo from "./userinfo/userinfo"

const List = () => {
    return (
      <div className='list'>
         <userinfo/>
         <chatlist/>
      </div>
   )
}
  
export default List