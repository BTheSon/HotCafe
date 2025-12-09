
const { useHistory } = ReactRouterDOM
const { useEffect, useCallback } = React
const { googleSignOut, observeAuthState } = window;

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

    const handleJoinRoom = useCallback(() => {

    }, [])

    const handleCreateRoom = useCallback(async () => {
        // 1. Kiểm tra đầu vào
        if (!user) {
            alert("Bạn cần đăng nhập để tạo phòng!");
            return;
        }
        if (!inpCreate.trim()) {
            alert("Vui lòng nhập mã phòng (Invite Code)!");
            return;
        }

        try {
            const currentTime = Date.now();
            // const newRoomId = generateId("room"); // Tạo ID phòng duy nhất

            // 2. Gọi API tạo phòng (API 2.2)
            // Lưu ý: Base URL là /api
            const createRoomRes = await fetch("/api/rooms/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: `Phòng ${inpCreate}`, // Tạm lấy tên phòng theo mã, hoặc bạn có thể thêm input nhập tên
                    code: inpCreate,            // Mã tham gia từ input
                    ownerId: user.uid,          // ID người dùng từ Firebase Auth
                    createdAt: currentTime,
                    memberCount: 1
                })
            });

            // API trả về true/false, cần parse json trước
            const isCreated = await createRoomRes.json();

            if (!isCreated) {
                throw new Error("API trả về false (Không thể tạo phòng)");
            }

            // 3. (Tùy chọn nhưng khuyến nghị) Thêm người tạo vào danh sách Member với quyền admin (API 3.2)
            // Vì API 2.2 chỉ tạo phòng, chưa chắc chắn backend đã tự insert owner vào bảng members
            const addMemberRes = await fetch("/api/rooms/members/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "room_id": newRoomId
                },
                body: JSON.stringify({
                    userId: user.uid,
                    joinedAt: currentTime,
                    role: "admin"
                })
            });

            const isMemberAdded = await addMemberRes.json();

            if (isCreated) {
                alert("Tạo phòng thành công!");
                // 4. Chuyển hướng người dùng vào phòng vừa tạo
                history.push(`/chat/${newRoomId}`);
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
                    <h1 className="text-3xl font-bold text-gray-800">
                        Xin chào, {user?.displayName || "Khách"}
                    </h1>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
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