const { useHistory } = ReactRouterDOM
const { useEffect } = React

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
            </div>
        </div>
    )
}