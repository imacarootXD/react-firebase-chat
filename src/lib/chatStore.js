import { create } from "zustand";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceivingUserBlocked: false,
    changeChat: (chatId,user) =>{
        const currentUser = useUserStore.getState().currentUser;
       
        if(user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceivingUserBlocked: false,
        })
        }

        if (currentUser.blocked.includes(user.id)){
            return set({
                chatId,
                user: user,
                isCurrentUserBlocked: false,
                isReceivingUserBlocked: true,
            })
        }
    },

    changeBlock: () => {
        set(state=>({...state,isReceivingUserBlocked: !state.isReceivingUserBlocked}));
    }
}))                                                                                                                                                                                                                                               ;
