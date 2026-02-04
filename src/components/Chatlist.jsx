import { useState, useEffect, useMemo } from "react";
import defaultAvatar from "../../public/assets/default.jpg";
import { RiMore2Fill } from "react-icons/ri";
import SearchModal from "./SearchModal";
import { formatTimestamp } from "../utils/formatTimestamp";
import { auth, db, listenForChats } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Chatlist = ({ setSelectedUser }) => {
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userDocRef = doc(db, "users", auth?.currentUser?.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            setUser(doc.data());
        });
        return unsubscribe;
    }, []);

    console.log(user?.fullName);

    useEffect(() => {
        const unsubscribe = listenForChats(setChats);

        return () => {
            unsubscribe();
        };
    }, []);

    const sortedChats = useMemo(() => {
        return [...chats].sort((a, b) => {
            const aTimestamp = a?.lastMessageTimestamp?.seconds + a?.lastMessageTimestamp?.nanoseconds / 1e9;
            const bTimestamp = b?.lastMessageTimestamp?.seconds + b?.lastMessageTimestamp?.nanoseconds / 1e9;

            return bTimestamp - aTimestamp;
        });
    }, [chats]);

    const startChat = (user) => {
        setSelectedUser(user);
    };

    return (
        <section className="relative hidden lg:flex flex-col bg-[#f6f9fc] h-screen w-full md:w-150 border-r border-gray-200">

            {/* Top header */}
            <header className="flex items-center justify-between w-full p-4 sticky top-0 z-100 bg-white border-b border-gray-200 shadow-sm">
                <main className="flex items-center gap-3">
                    <img
                        src={user?.image || defaultAvatar}
                        className="w-11 h-11 object-cover rounded-full border border-gray-200"
                        alt=""
                    />
                    <span>
                        <h3 className="font-semibold text-gray-800 text-[16px]">
                            {user?.fullName || "ChatFrik user"}
                        </h3>
                        <p className="font-light text-gray-500 text-[14px]">
                            @{user?.username || "chatfrik"}
                        </p>
                    </span>
                </main>
                <button className="bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center rounded-lg transition">
                    <RiMore2Fill className="w-5.5 h-5.5 text-gray-600" />
                </button>
            </header>

            {/* Messages header */}
            <div className="w-full px-5 py-3 bg-white border-b border-gray-200">
                <header className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-gray-700">
                        Messages ({chats?.length || 0})
                    </h3>
                    <SearchModal startChat={startChat} />
                </header>
            </div>

            {/* Chat list */}
            <main className="flex flex-col items-start custom-scrollbar w-full h-full overflow-y-auto">
                {sortedChats?.map((chat) => (
                    <button
                        key={chat?.id}
                        className="w-full px-5 py-4 border-b border-gray-200 hover:bg-orange-50 transition"
                    >
                        {chat?.users
                            ?.filter((user) => user?.email !== auth?.currentUser?.email)
                            ?.map((user) => (
                                <div key={user?.uid || user?.email} className="flex items-center justify-between">
                                    <div
                                        className="flex items-center gap-3"
                                        onClick={() => startChat(user)}
                                    >
                                        <img
                                            src={user?.image || defaultAvatar}
                                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                            alt=""
                                        />
                                        <span className="text-left">
                                            <h2 className="font-semibold text-gray-800 text-[15px]">
                                                {user?.fullName || "ChatFrik User"}
                                            </h2>
                                            <p className="font-light text-gray-500 text-[13px] truncate max-w-65">
                                                {chat?.lastMessage}
                                            </p>
                                        </span>
                                    </div>
                                    <p className="font-normal text-gray-400 text-[11px] whitespace-nowrap">
                                        {formatTimestamp(chat?.lastMessageTimestamp)}
                                    </p>
                                </div>
                            ))}
                    </button>
                ))}
            </main>
        </section>
    );
};

export default Chatlist;
