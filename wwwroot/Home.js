
const { useHistory } = ReactRouterDOM
const { useEffect, useCallback } = React
const { googleSignOut, observeAuthState } = window;
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
    const handleJoinRoom = useCallback(() => { }, [])
    const handleCreateRoom = useCallback(() => { 
        try {
            fetch()
        }catch(err){

        }
    }, []);

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
                            onChange={(e)=>setInpJoin(e.target.value)}
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
                            onChange={(e)=>setInpCreate(e.target.value)}
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