import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDatabase, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

import {
	ref as dbRef,
	push as dbPush,
	set as dbSet,
	onChildAdded as dbOnChildAdded,
	onChildChanged as dbOnChildChanged,
	onChildRemoved as dbOnChildRemoved,
	onChildMoved as dbOnChildMoved
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);



export function ref(path) {
	return dbRef(db, path);
}

export function push(refNode) {
	return dbPush(refNode);
}

export function set(refNode, value) {
	return dbSet(refNode, value);
}


/**
 * 
 * 
onChildAdded(ref('users'), (data) => {
	
});
 * 
 * 
 */
export function onChildAdded(refNode, callback) {
	return dbOnChildAdded(refNode, callback);
}

export function onChildChanged(refNode, callback) {
	return dbOnChildChanged(refNode, callback);
}

export function onChildRemoved(refNode, callback) {
	return dbOnChildRemoved(refNode, callback);
}

export function onChildMoved(refNode, callback) {
	return dbOnChildMoved(refNode, callback);
}

export { app, auth, db };
export default { app, auth, db };

window.realtimeDB = {
	onValue,
	ref,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	onChildMoved
}