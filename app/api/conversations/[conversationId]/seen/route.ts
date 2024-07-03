import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
interface IParams {
    conversationId?: string;
}

export const POST = async (request: Request, {params}:{params: IParams}) => {
    try{
        const currentUser = await getCurrentUser();
        const {conversationId} = params;

        if(!currentUser?.id  || !currentUser?.email){
            return new NextResponse('Unathorized', {status: 401});
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                message: {
                    include: {
                        seen: true
                    }
                },
                users: true,
            }
        })

        if(!conversation) {
            return new NextResponse('Invalid ID', {status: 400});
        }

        const lastMessage = conversation.message[conversation.message.length - 1]

        if(!lastMessage) {
            return NextResponse.json(conversation);
        }

        // update seen of last message
        const updateMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })
        return NextResponse.json(updateMessage)
    }catch(error: any) {
        console.log(error, 'ERROR_MESSAGE_SEEN');
        return new NextResponse('internal Error', {status: 500})
    }
}