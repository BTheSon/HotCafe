// 1. Lấy đồ nghề từ biến toàn cục
const { useState, useEffect, useCallback } = React;
const { BrowserRouter, Route, Link, Switch } = ReactRouterDOM; // Cú pháp v5

// 4. App Chính
function App() {
    return (
        <BrowserRouter>
            {/* React Router v5 dùng Switch thay vì Routes */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/auth" component={Auth} />
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);