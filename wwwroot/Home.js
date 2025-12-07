const { useHistory } = ReactRouterDOM
const { useEffect, useCallback } = React

function Home() {
    const history = useHistory();

    // Lấy user từ localStorage an toàn hơn
    let user = null;
    const userJson = localStorage.getItem("user");
    if (userJson) {
        try {
            user = JSON.parse(userJson);
        } catch (e) {
            console.error("Lỗi parse JSON user", e);
            // Nếu JSON lỗi, nên xóa nó đi để tránh lỗi lần sau
            localStorage.removeItem("user");
        }
    }

    useEffect(() => {
        const tokenId = localStorage.getItem("user");
        if (!tokenId) {
            history.push('/auth');
        }
    }, [history]);

    useEffect(() => {
        observeAuthState((user) => {
            if (user) {
            } else {
            }
        });
    }, []);
    const googleSignOut = useCallback(() => {
        window.googleSignOut();
        alert("i");
    }, []);

    return (
        <div className="flex justify-center items-center h-screen"
            onClick={() => history.push('/')}
        >
            <div className="text-center"> {/* Thêm div bọc để xuống dòng đẹp hơn */}
                <p>Home Page</p>
                {/* CÁCH SỬA ĐÚNG: Chỉ hiển thị tên nếu user tồn tại */}
                <h1 className="text-xl font-bold">
                    Xin chào, {user?.displayName || "Khách"}
                </h1>
                <button onClick={googleSignOut} className="rounded-full flex items-center justify-center w-full max-w-xs px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700 font-medium">Đăng xuất</span>
                </button>
            </div>
        </div>
    )
}