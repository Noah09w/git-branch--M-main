import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import defaultAvatar from "../../public/assets/default.jpg";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const SearchModal = ({ startChat }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert("Please enter a search term");
            return;
        }

        try {
            const normalizedSearchTerm = searchTerm.toLowerCase();
            const q = query(
                collection(db, "users"),
                where("username", ">=", normalizedSearchTerm),
                where("username", "<=", normalizedSearchTerm + "\uf8ff")
            );

            const querySnapshot = await getDocs(q);

            const foundUsers = [];

            querySnapshot.forEach((doc) => {
                foundUsers.push(doc.data());
            });

            setUsers(foundUsers);

            if (foundUsers.length === 0) {
                alert("No users found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(users);

    return (
        <div>
            <button
                onClick={openModal}
                className="bg-white border border-gray-200 w-9 h-9 flex items-center justify-center rounded-lg shadow hover:shadow-md transition"
            >
                <RiSearchLine className="w-4.5 h-4.5 text-orange-500" />
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-100 flex justify-center items-center bg-black/50 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="relative p-4 w-full max-w-md max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative bg-white w-full rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                            
                            <div className="flex items-center justify-between p-4 md:p-5 bg-linear-to-r from-orange-500 to-orange-600">
                                <h3 className="text-lg font-semibold text-white">
                                    Search Chat
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:bg-white/20 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition"
                                >
                                    <FaXmark size={20} />
                                </button>
                            </div>

                            <div className="p-4 md:p-5">
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            type="text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full p-2.5 focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                            placeholder="Search users"
                                        />
                                        <button
                                            onClick={handleSearch}
                                            className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg shadow transition"
                                        >
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 max-h-75 overflow-y-auto pr-1">
                                    {users?.map((user) => (
                                        <div
                                            key={user?.uid || user?.username}
                                            onClick={() => {
                                                console.log(user);
                                                startChat(user);
                                                closeModal();
                                            }}
                                            className="flex items-center gap-3 bg-white p-3 mb-3 rounded-lg cursor-pointer border border-gray-200 shadow-sm hover:shadow-md hover:bg-orange-50 transition"
                                        >
                                            <img
                                                src={user?.image || defaultAvatar}
                                                className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                alt=""
                                            />
                                            <span>
                                                <h2 className="p-0 font-semibold text-gray-800 text-[16px]">
                                                    {user?.fullName}
                                                </h2>
                                                <p className="text-[13px] text-gray-500">
                                                    @{user?.username}
                                                </p>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchModal;
