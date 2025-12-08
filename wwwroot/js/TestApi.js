class Api {
	static add_user() {
		fetch("/api/users/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId: "userId_1",
				displayName: "Bảo",
				email: "nttb749@gmail.com",
				createdAt: 0
			})
		})
			.then(res => res.json())
			.then(data => console.log("Server Response:", data))
			.catch(err => console.error(err));
	}
	static get_user() {
		fetch("/api/users/get", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"user_id": "userId_1"
			}
		})
			.then(res => res.json())
			.then(data => console.log("Server Response:", data))
			.catch(err => console.error(err));
	}
	static add_message() {
		fetch("/api/rooms/messages/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"room_id": "roomId_1"
			},
			body: JSON.stringify({
				messageId: "messageId_1",
				senderId: "userId_1",
				text: "test",
				createdAt: 0
			})
		})
			.then(res => res.json())
			.then(data => console.log("Server Response:", data))
			.catch(err => console.error(err));
	}
	static get_message_list() {
		fetch("/api/rooms/messages/get-list", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"roomId": "roomId_1"
			}
		})
			.then(res => res.text())
			.then(data => console.log("Server Response:", data))
			.catch(err => console.error(err));
	}
}

//Api.add_user();
//Api.get_user();
//Api.add_message();
Api.get_message_list();