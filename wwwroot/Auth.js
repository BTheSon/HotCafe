const firebaseConfig = {
    apiKey: "AIzaSyCJieJcgCPRmPuS3j3QaDWRV5YrIFP-7Q0",
    authDomain: "learn-firebase-32fb2.firebaseapp.com",
    databaseURL: "https://learn-firebase-32fb2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learn-firebase-32fb2",
    storageBucket: "learn-firebase-32fb2.firebasestorage.app",
    messagingSenderId: "130269159118",
    appId: "1:130269159118:web:0017f25561a312f83b7a9f",
    measurementId: "G-BNSE6ZFD98"
};

// Khởi tạo Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const { useHistory } = ReactRouterDOM

function Auth({ className = "" }) {
    const history = useHistory();
    const handleLogin = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                // Lưu vào localStorage
                localStorage.setItem("user", JSON.stringify({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }));
                // Chuyển trang
                history.push('/');
            })
            .catch(err => {
                console.error("Login failed:", err);
                alert("Login thất bại, thử lại!");
            });
    };

    return (
        <div className={className + " flex justify-center items-center h-screen"}>
            <button
                className="flex flex-wrap-reverse gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                title="Đăng nhập bằng Google"
                onClick={handleLogin}
            >
                <span className="material-symbols-rounded">login</span>
                <span>Đăng nhập</span>
            </button>
        </div>
    );
}

// Theo dõi trạng thái đăng nhập để redirect nếu đã login
auth.onAuthStateChanged(user => {
    if (user) {
        // Nếu đã login, lưu localStorage và redirect
        localStorage.setItem("user", JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        }));
        if (window.location.pathname === "/login") {
            history.push('/');
        }
    }
});
