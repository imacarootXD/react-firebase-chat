import Chat from "./components/chat/chat";
import List from "./components/list/list";
import Detail from "./components/detail/detail";



const App = () => {
  return (
    <div className='container'>
      <List/>
      <Chat/>
      <Detail/>
    </div>
  )
}

export default App