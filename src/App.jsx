import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Navlinks from "./components/Navlinks";
import Chatbox from "./components/Chatbox";
import Chatlist from "./components/Chatlist";
import { auth } from "./firebase/firebase";

const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            {user ? (
                <div className="flex lg:flex-row flex-col items-start w-full">
                    {/* Sidebar */}
                    <div className="shrink-0">
                        <Navlinks />
                    </div>

                    {/* Main content */}
                    <div className="flex flex-1 w-full">
                        <Chatlist setSelectedUser={setSelectedUser} />
                        <Chatbox selectedUser={selectedUser} />
                    </div>
                </div>
            ) : (
                <div>
                    {isLogin ? (
                        <Login isLogin={isLogin} setIsLogin={setIsLogin} />
                    ) : (
                        <Register isLogin={isLogin} setIsLogin={setIsLogin} />
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
