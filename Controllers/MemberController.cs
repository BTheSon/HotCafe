using System.Text.Json;
using HotCafe.Models;
using HotCafe.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotCafe.Controllers;

[Route("api/rooms/members")]
public class MemberController : Controller {

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
	[Route("add")]
	public async Task<string> AddMember([FromBody] Member member, [FromHeader(Name = "room_id")] string room_id) {
		System.Console.WriteLine(room_id);
		var IsExists = await FirebaseDatabaseService.IsExists($"rooms/{room_id}");
		if (!IsExists)
			return FirebaseDatabaseService.ProcessError("không tồn tại room");
		
		var IsExistsMemberInRoom = await FirebaseDatabaseService.IsExists($"members/{room_id}/{member.userId}");
		if (IsExistsMemberInRoom)
			return JsonSerializer.Serialize(new
            {
				really_on_room = "yes"
            });
		return await FirebaseDatabaseService.CreateWithSpecificKey(member, $"members/{room_id}", member.userId);
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
	[Route("get")]
	public async Task<string> GetMember([FromHeader(Name = "room_id")] string room_id, [FromHeader(Name = "user_id")] string user_id) {
		return await FirebaseDatabaseService.Get($"members/{room_id}/{user_id}");
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
	[Route("get-list")]
	public async Task<string> GetMemberList([FromHeader(Name = "room_id")] string room_id) {
		return await FirebaseDatabaseService.Get($"members/{room_id}");
	}

}