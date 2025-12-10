const { useEffect, useState, useRef } = React;
const { onChildAdded, ref, onValue } = window.realtimeDB;
const { auth } = window.firebase;

function MessageComponent({ senderId, displayName, photoURL, text, createdAt, isMe }) {
    const dateDisplay = createdAt
        ? new Date(createdAt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "";

    const bgClass = isMe ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200";

    return (
        <div className={`mb-3 p-3 border rounded-md flex flex-row ${bgClass}`}>
            <img className="mr-3 rounded-full" src={photoURL} height="50" width="50"/>
            <div className="w-full">
                <div className="flex justify-between items-baseline mb-1">
                    {}
                    <span className="font-semibold text-gray-700 text-sm">
                        {displayName || senderId}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{dateDisplay}</span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed break-words">
                    {text}
                </p>
            </div>
        </div>
    );
}
function Chat({ match }) {
    const roomId = match.params.id;
    const [user, setUser] = useState(null);
    const [listMessager, setListMessager] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    const [usersCache, setUsersCache] = useState({});

    const listeningUsersRef = useRef(new Set());

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(u => {
            if (!u) {
                alert('nguowif dung chua dang nhap');
            } else {
                setUser(u);
            }
        });
        return () => unsub();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !user) return;

        const newMessage = {
            messageId: `msg_${Date.now()}_${user.uid}`,
            senderId: user.uid,
            text: inputValue,
            createdAt: Math.floor(Date.now() / 1000)
        };

        setInputValue("");

        try {
            await fetch("/api/rooms/messages/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "room_id": roomId,
                },
                body: JSON.stringify(newMessage)
            });
        } catch (err) {
            console.error("Gửi lỗi:", err);
            alert("Gửi tin nhắn thất bại");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/rooms/messages/get-list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "room_id": roomId }
                });
                const rawDataString = await response.text();
                const data = JSON.parse(rawDataString);
                setListMessager(Array.isArray(data) ? data : []);
            } catch (err) { console.error("Lỗi fetch:", err); }
        };
        fetchData();
    }, [roomId]);

    useEffect(() => {
        const messagesRef = ref(`messages/${roomId}`);
        const unsub = onChildAdded(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;
            setListMessager(prev => {
                const isExist = prev.some(msg => msg.messageId === data.messageId);
                if (isExist) return prev;
                return [...prev, data];
            });
        });
        return () => { if (typeof unsub === 'function') unsub(); };
    }, [roomId]);

    useEffect(() => {
        scrollToBottom();
    }, [listMessager]);

    useEffect(() => {
        listMessager.forEach(msg => {
            const uid = msg.senderId;

            if (!usersCache[uid] && !listeningUsersRef.current.has(uid)) {

                listeningUsersRef.current.add(uid);

                onValue(ref(`users/${uid}`), (snapshot) => {
                    const userData = snapshot.val();

                    if (userData) {
                        setUsersCache(prev => ({
                            ...prev,
                            [uid]: userData
                        }));
                    }
                });
            }
        });
    }, [listMessager]);

    return (
        <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="h-14 border-b border-gray-200 bg-white flex items-center px-4 sticky top-0 z-10 shadow-sm">
                <h1 className="text-lg font-medium text-gray-600">Room: {roomId}</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-20 scroll-smooth">
                {(!listMessager || listMessager.length === 0) ? (
                    <div className="text-center text-gray-400 mt-10 text-sm">Chưa có tin nhắn...</div>
                ) : (
                    listMessager.map((item, index) => (
                        <MessageComponent
                            key={item.messageId || index}
                            senderId={item.senderId}

                            // TRUYỀN DATA: Lấy displayName từ usersCache
                            displayName={usersCache[item.senderId]?.displayName}
                            photoURL={usersCache[item.senderId]?.photoURL}

                            text={item.text}
                            createdAt={item.createdAt}
                            isMe={user && item.senderId === user.uid}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3">
                <div className="max-w-screen-xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 bg-gray-100 text-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-gray-400 text-sm transition-all"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors active:scale-95"
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}