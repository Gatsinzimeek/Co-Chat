import Sidebar from "../Components/sidebar/Sidebar"
import getConversations from "../actions/getConversations"
import ConversationList from "./components/conversationList"
const layout = async({children}:{children: React.ReactNode}) => {

    const conversations = await getConversations();
  return (
    <Sidebar>
        <div className="h-full">
            <ConversationList initialItems={conversations}/>
          {children}
        </div>
    </Sidebar>
  )
}

export default layout
