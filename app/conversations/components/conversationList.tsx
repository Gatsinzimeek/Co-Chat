"use client"

import { Conversation } from "@prisma/client"

interface conversationListProps{
    initialItems: Conversation[]; 
}

const ConversationList: React.FC<conversationListProps> = ({initialItems}) => {
  return (
    <div>
      hello
    </div>
  )
}

export default ConversationList
