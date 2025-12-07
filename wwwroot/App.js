// App.js

// 1. Lấy đồ nghề từ biến toàn cục
const { useState, useEffect, useCallback } = React;
const { BrowserRouter, Route, Link, Switch } = ReactRouterDOM; // Cú pháp v5

// 2. Component Home
function Home() {
    const [photoURL, setPhotoURL] = useState("");
    const [displayName, setDisplayName] = useState("");
    useEffect(() => {
        observeAuthState((user) => {
            if (user) {
                setDisplayName(user.displayName);
                setPhotoURL(user.photoURL);
            } else {
                setDisplayName("");
                setPhotoURL("");
            }
        });
    }, []);
    const googleSignIn = useCallback(() => {
        window.googleSignIn();
    }, []);
    const googleSignOut = useCallback(() => {
        window.googleSignOut();
    }, []);
    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Trang Chủ</h1>
            <div>
                <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Xem Menu
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
                {photoURL && <img id="avatar" className="rounded-full" src={photoURL} width="100" height="100"></img>}
                {displayName && <h1 className="text-2xl w-max" id="displayName">{displayName}</h1>}
                <button onClick={googleSignIn} className="rounded-full flex items-center justify-center w-full max-w-xs px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
                        <path d="M533.5 278.4c0-18.8-1.6-37-4.7-54.6H272v103.5h146.9c-6.3 34-25.2 62.9-53.8 82l87 67c50.8-46.9 80.4-115.8 80.4-197.9z" fill="#4285F4" />
                        <path d="M272 544.3c72.6 0 133.6-24 178.1-65.1l-87-67c-24.2 16.2-55 25.7-91.1 25.7-69.9 0-129.2-47.1-150.4-110.3l-89.3 69c44.7 88.3 137.7 148.7 239.7 148.7z" fill="#34A853" />
                        <path d="M121.2 324.6c-10.6-31.2-10.6-64.7 0-95.9l-89.3-69C7.3 207.6 0 241.5 0 278.4c0 36.9 7.3 70.8 31.9 119.7l89.3-69z" fill="#FBBC05" />
                        <path d="M272 108.7c37.4-.6 71.1 13.1 97.6 37.7l73.1-72.7C403.8 27.8 342.8 0 272 0 169.9 0 76.9 60.4 32.2 148.7l89.3 69c21.2-63.2 80.5-110.3 150.5-110.3z" fill="#EA4335" />
                    </svg>
                    <span className="text-gray-700 font-medium">Đăng nhập bằng Google</span>
                </button>
                <button onClick={googleSignOut} className="rounded-full flex items-center justify-center w-full max-w-xs px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700 font-medium">Đăng xuất</span>
                </button>
            </div>
        </div>
    );
}

// 3. Component Menu
function Menu() {
    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Menu</h1>
            <ul className="space-y-4 mb-4">
                <li>Cà phê đen</li>

                {/* Gọi Component Con (Nó đã tồn tại toàn cục) */}
                <li><ButtonHEhe /></li>
            </ul>
            <Link to="/" className="text-blue-500 underline">Quay lại</Link>
        </div>
    );
}

// 4. App Chính
function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow p-4 flex gap-4 justify-center">
                    <Link to="/" className="font-bold text-gray-700">Home</Link>
                    <Link to="/menu" className="font-bold text-gray-700">Menu</Link>
                </nav>

                {/* React Router v5 dùng Switch thay vì Routes */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/menu" component={Menu} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);