// App.js

// 1. Lấy đồ nghề từ biến toàn cục
const { useState } = React;
const { BrowserRouter, Route, Link, Switch } = ReactRouterDOM; // Cú pháp v5

// 2. Component Home
function Home() {
    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Trang Chủ</h1>
            <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded">
                Xem Menu
            </Link>
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

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<App />);