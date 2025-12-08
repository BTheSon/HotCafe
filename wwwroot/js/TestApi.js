fetch("/api/get-user?id=zFsAyDoLc9ZGS0KDyqiqYDj2WCw1", {method: "POST"})
	.then(result => result.json())
	.then(data => {
		console.log(data);
	});