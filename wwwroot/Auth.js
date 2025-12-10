const { useCallback } = React

const firebaseConfig = {
    apiKey: "AIzaSyDwe6DIPlE8MiXwR9UarM6WjyphGBDlAb0",
    databaseURL: "https://dotnet-project-mvc-default-rtdb.firebaseio.com",
    authDomain: "dotnet-project-mvc.firebaseapp.com",
    projectId: "dotnet-project-mvc",
    storageBucket: "dotnet-project-mvc.firebasestorage.app",
    messagingSenderId: "756217519140",
    appId: "1:756217519140:web:2a16cf47586e64e1804cb1",
    measurementId: "G-N27E3WWMRW"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const { useHistory } = ReactRouterDOM

function Auth({ className = "" }) {
    const history = useHistory();

    const handleLogin = useCallback(async () => {
        try {
            const result = await auth.signInWithPopup(provider);
            console.log("okee");
            console.log(result);
            fetch("/api/users/add", {
            	method: "POST",
            	headers: {
            		"Content-Type": "application/json"
            	},
            	body: JSON.stringify({
                    userId: result.user.uid,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    email: result.user.email
            	})
            });
            history.push("/");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login thất bại, thử lại!");
        }
    }, []);

    return (
        <div className={className + " flex justify-center items-center h-screen"}>
            <button title="Đăng nhập bằng Google" onClick={handleLogin} className="flex items-center justify-center w-full max-w-xs px-4 py-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
                    <path d="M533.5 278.4c0-18.8-1.6-37-4.7-54.6H272v103.5h146.9c-6.3 34-25.2 62.9-53.8 82l87 67c50.8-46.9 80.4-115.8 80.4-197.9z" fill="#4285F4" />
                    <path d="M272 544.3c72.6 0 133.6-24 178.1-65.1l-87-67c-24.2 16.2-55 25.7-91.1 25.7-69.9 0-129.2-47.1-150.4-110.3l-89.3 69c44.7 88.3 137.7 148.7 239.7 148.7z" fill="#34A853" />
                    <path d="M121.2 324.6c-10.6-31.2-10.6-64.7 0-95.9l-89.3-69C7.3 207.6 0 241.5 0 278.4c0 36.9 7.3 70.8 31.9 119.7l89.3-69z" fill="#FBBC05" />
                    <path d="M272 108.7c37.4-.6 71.1 13.1 97.6 37.7l73.1-72.7C403.8 27.8 342.8 0 272 0 169.9 0 76.9 60.4 32.2 148.7l89.3 69c21.2-63.2 80.5-110.3 150.5-110.3z" fill="#EA4335" />
                </svg>
                <span className="text-gray-700 font-medium">Đăng nhập bằng Google</span>
            </button>

        </div>
    );
}

auth.onAuthStateChanged(user => {
    if (user) {
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