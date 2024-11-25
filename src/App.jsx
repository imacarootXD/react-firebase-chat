import Chat from "./components/chat/chat";
import List from "./components/list/list";
import Detail from "./components/detail/detail";
import Login from "./components/login/login";
import Notification from "./components/notification/notification";
import { useEffect } from "react";





const App = () => {
  const user = false 
  useEffect(()=>{

  },[])

  return (
    <div className='container'>
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
       ) : (<Login />)
       }
       <Notification />
    </div>
  );
};

export default App