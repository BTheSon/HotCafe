using HotCafe.Models;
using HotCafe.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotCafe.Controllers;

[Route("api/rooms/messages")]
public class MessageController : Controller {

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
	[Route("add")]
	public async Task<bool> AddMessage([FromBody] Message message, [FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.CreateWithSpecificKey(message, $"messages/{room_id}", message.messageId);
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
	[Route("get")]
	public async Task<string> GetMessage([FromHeader(Name = "room_id")] string room_id, [FromHeader(Name = "message_id")] string message_id) {
		return await FirebaseDatabaseService.Get($"messages/{room_id}/{message_id}");
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
	[Route("get-list")]
	public async Task<string> GetMessageList([FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.Get($"messages/{room_id}");
	}

}