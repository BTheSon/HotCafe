using HotCafe.Models;
using HotCafe.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotCafe.Controllers;

[Route("api/rooms")]
public class RoomController : Controller {

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
	[Route("add")]
	public async Task<bool> AddRoom([FromBody] Room room) {
		return await FirebaseDatabaseService.CreateWithSpecificKey(room, "rooms", room.roomId);
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
	[Route("get")]
	public async Task<string> GetRoom([FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.Get($"rooms/{room_id}");
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
	[Route("get-list")]
	public async Task<string> GetRoomList() {
		return await FirebaseDatabaseService.Get($"rooms");
	}

}