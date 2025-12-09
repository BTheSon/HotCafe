
const { useHistory } = ReactRouterDOM
const { useEffect, useCallback } = React
const { googleSignOut, observeAuthState, auth } = window;

const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

function Home() {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [inpCreate, setInpCreate] = useState("");
    const [inpJoin, setInpJoin] = useState("");

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(u => {
            if (!u) {
                history.push("/auth");
            } else {
                setUser(u);
            }
        });
        return () => unsub();
    }, []);


    const handleLogin = useCallback(() => {
        googleSignOut();
        history.push('/auth');
    }, []);

    const handleJoinRoom = useCallback(async () => {
        try {
            const roomId = "roomId_" + inpJoin;
            const result = await fetch("/api/rooms/members/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "room_id": roomId
                },
                body: JSON.stringify({
                    "userId": user?.uid ?? auth.currentUser.uid,
                    "role": "member"
                })
            });

            if (!result.ok) {
                throw new Error(result.err);
            }
            const data = await result.json();
            if ("error_message" in data) {
                alert(data.error_message);
                return;
            } 
            if ("really_on_room" in data) {
                history.push(`/chat/${roomId}`);
                return;
            }
            history.push(`/chat/${roomId}`);
        } catch (err) {
            console.error(err);
        }
    }, [inpJoin, user, history])

    const handleCreateRoom = useCallback(async () => {
        if (!user) {
            alert("Bạn cần đăng nhập để tạo phòng!");
            return;
        }
        if (!inpCreate.trim()) {
            alert("Vui lòng nhập mã phòng!");
            return;
        }

        try {
            //const currentTime = Date.now();

            const roomId = `roomId_${inpCreate}`;

            const createRoomRes = await fetch("/api/rooms/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomId: roomId,
                    name: `Phòng ${inpCreate}`,
                    code: inpCreate,
                    ownerId: user.uid,
                    memberCount: 1
                })
            });

            const isCreated = await createRoomRes.json();

            if (isCreated.error_message != null) {
                alert(isCreated.error_message);
                //throw new Error("Không thể tạo phòng!");
            }

            const addMemberRes = await fetch("/api/rooms/members/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "room_id": roomId
                },
                body: JSON.stringify({
                    userId: user.uid,
                    role: "admin"
                })
            });

            const isMemberAdded = await addMemberRes.json();

            if (isMemberAdded != null) {
                alert("Tạo phòng thành công!");
                history.push(`/chat/${isCreated.roomId}`);
            }

        } catch (err) {
            console.error("Lỗi tạo phòng:", err);
            alert("Đã có lỗi xảy ra khi tạo phòng: " + err.message);
        }
    }, [user, inpCreate, history]);

    return (
        <div id="homepage" className="min-h-screen bg-gradient-to-br  to-indigo-100">
            <div id="header" className="p-4 flex justify-end">
                <button onClick={handleLogin} className="flex items-center justify-center w-42 px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700 font-medium">Đăng xuất</span>
                </button>
            </div>
            <div id="body" className="flex flex-col justify-center items-center h-screen -mt-20">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-7">
                        <img className="rounded-full" width="150" height="150" src={user?.photoURL}></img>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Xin chào, {user?.displayName || "Khách"}
                    </h1>
                </div>
                <div className="bg-white rounded-lg shadow-md border-2 p-8 w-full max-w-md">
                    <div id="form-joinroom" className="mb-6">
                        <input
                            className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
                            type="text"
                            placeholder="Nhập mã phòng"
                            value={inpJoin}
                            onChange={(e) => setInpJoin(e.target.value)}
                        />
                        <button
                            onClick={handleJoinRoom}
                            className="w-full px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow"
                        >
                            Tham gia
                        </button>
                    </div>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Hoặc</span>
                        </div>
                    </div>
                    <div id="form-createroom">
                        <input
                            className="w-full px-4 py-3 bg-green-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
                            type="text"
                            placeholder="Nhập mã phòng"
                            value={inpCreate}
                            onChange={(e) => setInpCreate(e.target.value)}
                        />
                        <button
                            onClick={handleCreateRoom}
                            className="w-full px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow"
                        >
                            Tạo phòng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}