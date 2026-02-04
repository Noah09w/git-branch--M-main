import { useEffect, useMemo, useRef, useState } from "react";
import defaultAvatar from "../../public/assets/default.jpg";
import { formatTimestamp } from "../utils/formatTimestamp";
import { RiSendPlaneFill } from "react-icons/ri";
import { auth, listenForMessages, sendMessage } from "../firebase/firebase";
import logo from "../../public/assets/logo.png";

const Chatbox = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, sendMessageText] = useState("");
    const scrollRef = useRef(null);

    const chatId =
        auth?.currentUser?.uid < selectedUser?.uid
            ? `${auth?.currentUser?.uid}-${selectedUser?.uid}`
            : `${selectedUser?.uid}-${auth?.currentUser?.uid}`;
    const user1 = auth?.currentUser;
    const user2 = selectedUser;
    const senderEmail = auth?.currentUser?.email;

    console.log(typeof chatId);
    console.log(user1);
    console.log(user2);

    useEffect(() => {
        listenForMessages(chatId, setMessages);
    }, [chatId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sortedMessages = useMemo(() => {
        return [...messages].sort((a, b) => {
            const aTimestamp = a?.timestamp?.seconds + a?.timestamp?.nanoseconds / 1e9;
            const bTimestamp = b?.timestamp?.seconds + b?.timestamp?.nanoseconds / 1e9;
            return aTimestamp - bTimestamp;
        });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: senderEmail,
            text: messageText,
            timestamp: {
                seconds: Math.floor(Date.now() / 1000),
                nanoseconds: 0,
            },
        };

        sendMessage(messageText, chatId, user1?.uid, user2?.uid);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        sendMessageText("");
    };

    return (
        <>
            {selectedUser ? (
                <section className="flex flex-col h-screen w-full bg-[#f6f9fc]">

                    <header className="w-full p-4 bg-white border-b border-gray-200 shadow-sm">
                        <main className="flex items-center gap-3">
                            <img
                                src={selectedUser?.image || defaultAvatar}
                                className="w-11 h-11 object-cover rounded-full border border-gray-200"
                                alt=""
                            />
                            <span>
                                <h3 className="font-semibold text-gray-800 text-lg">
                                    {selectedUser?.fullName || "Chatfrik User"}
                                </h3>
                                <p className="font-light text-gray-500 text-sm">
                                    @{selectedUser?.username || "chatfrik"}
                                </p>
                            </span>
                        </main>
                    </header>

                    <main className="flex flex-col flex-1 justify-between">

                        <section className="px-4 py-4 flex-1 overflow-hidden">
                            <div ref={scrollRef} className="overflow-y-auto h-full space-y-4 pr-2">
                                {sortedMessages?.map((msg, index) => (
                                    <div key={index}>
                                        {msg?.sender === senderEmail ? (
                                            <div className="flex justify-end">
                                                <div className="max-w-[70%]">
                                                    <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-2xl rounded-br-md shadow">
                                                        <p className="text-sm">{msg.text}</p>
                                                    </div>
                                                    <p className="text-gray-400 text-xs mt-1 text-right">
                                                        {formatTimestamp(msg?.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-start items-start gap-2">
                                                <img
                                                    src={defaultAvatar}
                                                    className="h-9 w-9 object-cover rounded-full border border-gray-200"
                                                    alt=""
                                                />
                                                <div className="max-w-[70%]">
                                                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
                                                        <p className="text-sm text-gray-800">{msg.text}</p>
                                                    </div>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        {formatTimestamp(msg?.timestamp)}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="p-4 bg-white border-t border-gray-200">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 shadow-sm"
                            >
                                <input
                                    value={messageText}
                                    onChange={(e) => sendMessageText(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-gray-800 text-[15px]"
                                    type="text"
                                    placeholder="Write your message..."
                                />
                                <button
                                    type="submit"
                                    className="flex items-center justify-center p-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition shadow"
                                >
                                    <RiSendPlaneFill className="text-white" />
                                </button>
                            </form>
                        </div>

                    </main>
                </section>
            ) : (
                <section className="h-screen w-full bg-[#f6f9fc]">
                    <div className="flex flex-col justify-center items-center h-full">
                        <img src={logo} alt="" width={100} />
                        <h1 className="text-[28px] font-bold text-gray-800 mt-5">
                            Welcome to Chatfrik
                        </h1>
                        <p className="text-gray-500 text-center max-w-md mt-2">
                            Connect and chat with friends easily, securely, fast and free
                        </p>
                    </div>
                </section>
            )}
        </>
    );
};

export default Chatbox;
