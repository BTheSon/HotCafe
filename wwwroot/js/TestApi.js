class Api {
	static call1() {
		fetch("/api/users/get?id=zFsAyDoLc9ZGS0KDyqiqYDj2WCw1", { method: "POST" })
			.then(result => result.json())
			.then(data => {
				console.log(data);
			});
	}
	static call2() {
		fetch("/api/users/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				displayName: "Bảo",
				createdAt: 0,
				email: "nttb749@gmail.com"
			})
		})
			.then(res => res.json())
			.then(data => console.log("Server Response:", data))
			.catch(err => console.error(err));
	}
	static call3() {
		fetch("/api/room-members/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"room_id": "roomId_1"
			},
			body: JSON.stringify({
				userId: "userId_2",
				joinedAt: 0,
				role: "owner"
			})
		})
			.then(res => res.json())
			.then(data => console.log("Server Response:", data))
			.catch(err => console.error(err));
	}
	static call4() {
		fetch("/api/room-members/gets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"room_id": "roomId_1"
			}
		})
			.then(res => res.json())
			.then(data => console.log("Server Response:", data))
			.catch(err => console.error(err));
	}
}

Api.call4();