'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import Avatar from "@/app/Components/Avatar";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
};


const Header: React.FC<HeaderProps> = ({conversation}) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, SetDrawerOpen] = useState(false)

  const statusText = useMemo(() => {
    if(conversation.isGroup){
        return `${conversation.users.length} members`;
    }

    return 'Active';
  }, [conversation])
    return (
        <>
        <ProfileDrawer data={conversation} isOpen={drawerOpen} onclose={() => SetDrawerOpen(false)} /> 
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
            <Link href="/conversations" className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
                <HiChevronLeft size={23}/>
            </Link>
            <Avatar user={otherUser}/>
            <div className="flex flex-col">
                <div>
                    {conversation.name || otherUser.name}  
                </div>
                <div className="text-sm font-light text-neutral-500">
                    {statusText}
                </div>
            </div>
        </div>
        <HiEllipsisHorizontal size={32} onClick={() =>SetDrawerOpen(true)} className="text-sky-600 cursor-pointer transition"/>
    </div>
    </>
  )
}

export default Header
