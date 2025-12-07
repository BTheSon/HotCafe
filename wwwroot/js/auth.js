import { auth } from '/js/firebase-init.js';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

export async function googleSignIn() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        return {
            ok: true,
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        };
    } catch (err) {
        return {
            ok: false
        };
    }
}

export async function googleSignOut() {
    await signOut(auth);
}

export function observeAuthState(onChange) {
    onAuthStateChanged(auth, (user) => {
        onChange(user);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("typeof observeAuthState:", typeof window.observeAuthState);

    if (typeof window.observeAuthState === "function") {
        observeAuthState(user => {
            if (auth != null) {
                document.getElementById("displayName").innerHTML = user.displayName;
            }
        });
    } else {
        console.error("observeAuthState chưa sẵn sàng — có thể module chưa load hoặc có lỗi trong module.");
    }
});

window.googleSignIn = googleSignIn;
window.googleSignOut = googleSignOut;
window.observeAuthState = observeAuthState;