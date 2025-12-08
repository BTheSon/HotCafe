using Microsoft.AspNetCore.Mvc;
using HotCafe.Services;
using HotCafe.Models;

namespace HotCafe.Controllers;

[Route("api")]
public class ApiController : Controller {

	#region Gets

	/// <summary>
	/// Lấy thông tin của một <see cref="User"/> cụ thể
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/users/get", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"user_id": "userId_1"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("users/get")]
	public async Task<string> GetUser([FromHeader(Name = "user_id")] string user_id) {
		return await FirebaseDatabaseService.Get($"users/{user_id}");
	}

	/// <summary>
	/// Lấy thông tin của một <see cref="Room"/> cụ thể
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/get", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"room_id": "roomId_1"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/get")]
	public async Task<string> GetRoom([FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.Get($"rooms/{room_id}");
	}

	/// <summary>
	/// Lấy thông tin của một <see cref="Member"/> trong một <see cref="Room"/> cụ thể
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/members/get", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"room_id": "roomId_1",
	///			"user_id": "userId_1"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/members/get")]
	public async Task<string> GetMember([FromHeader(Name = "room_id")] string room_id, [FromHeader(Name = "user_id")] string user_id) {
		return await FirebaseDatabaseService.Get($"members/{room_id}/{user_id}");
	}

	/// <summary>
	/// Lấy thông tin của một <see cref="Message"/> trong một <see cref="Room"/> cụ thể
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/messages/get", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"room_id": "roomId_1",
	///			"message_id": "messageId_1"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/messages/get")]
	public async Task<string> GetMessage([FromHeader(Name = "room_id")] string room_id, [FromHeader(Name = "message_id")] string message_id) {
		return await FirebaseDatabaseService.Get($"messages/{room_id}/{message_id}");
	}

	#endregion Gets

	#region Adds

	/// <summary>
	/// Tạo một <see cref="User"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/users/add", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json"
	///		},
	///		body: JSON.stringify({
	///			{key}: {value},
	///			...
	///		})
	///	});
	///	
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("users/add")]
	public async Task<bool> AddUser([FromBody] User user) {
		return await FirebaseDatabaseService.CreateWithSpecificKey(user, "users", user.userId);
	}

	/// <summary>
	/// Tạo một <see cref="Room"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/add", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json"
	///		},
	///		body: JSON.stringify({
	///			{key}: {value},
	///			...
	///		})
	///	});
	///	
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/add")]
	public async Task<bool> AddRoom([FromBody] Room room) {
		return await FirebaseDatabaseService.CreateWithSpecificKey(room, "rooms", room.roomId);
	}

	/// <summary>
	/// Tạo một <see cref="Member"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/members/add", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"room_id": "roomId_1"
	///		},
	///		body: JSON.stringify({
	///			{key}: {value},
	///			...
	///		})
	///	});
	///	
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/members/add")]
	public async Task<bool> AddMember([FromBody] Member member, [FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.CreateWithSpecificKey(member, $"members/{room_id}", member.userId);
	}

	/// <summary>
	/// Tạo một <see cref="Message"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/messages/add", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"room_id": "roomId_1"
	///		},
	///		body: JSON.stringify({
	///			{key}: {value},
	///			...
	///		})
	///	});
	///	
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/messages/add")]
	public async Task<bool> AddMessage([FromBody] Message message, [FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.CreateWithSpecificKey(message, $"messages/{room_id}", message.messageId);
	}

	#endregion Adds

	#region GetLists

	/// <summary>
	/// Lấy danh sách tất cả <see cref="User"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/users/get-list", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("users/get-list")]
	public async Task<string> GetUserList() {
		return await FirebaseDatabaseService.Get($"users");
	}

	/// <summary>
	/// Lấy danh sách tất cả <see cref="Room"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/get-list", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/get-list")]
	public async Task<string> GetRoomList() {
		return await FirebaseDatabaseService.Get($"rooms");
	}

	/// <summary>
	/// Lấy danh sách tất cả <see cref="Member"/> của một <see cref="Room"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/members/get-list", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"room_id": "roomId_1"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/members/get-list")]
	public async Task<string> GetMemberList([FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.Get($"members/{room_id}");
	}

	/// <summary>
	/// Lấy danh sách tất cả <see cref="Message"/> của một <see cref="Room"/>
	/// </summary>
	/// <code>
	/// 
	/// fetch("/api/rooms/messages/get-list", {
	///		method: "POST",
	///		headers: {
	///			"Content-Type": "application/json",
	///			"room_id": "roomId_1"
	///		}
	///	});
	///		
	/// </code>
	/// <returns>Chuỗi json</returns>
	[HttpPost]
	[Route("rooms/messages/get-list")]
	public async Task<string> GetMessageList([FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.Get($"messages/{room_id}");
	}

	#endregion GetLists

}