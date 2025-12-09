using HotCafe.Models;
using HotCafe.Services;
using Microsoft.AspNetCore.Mvc;

namespace HotCafe.Controllers;

[Route("/api/users")]
public class UserController : Controller {

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
	[Route("/add")]
	public async Task<bool> AddUser([FromBody] User user) {
		return await FirebaseDatabaseService.CreateWithSpecificKey(user, "users", user.userId);
	}

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
	[Route("/get")]
	public async Task<string> GetUser([FromHeader(Name = "user_id")] string user_id) {
		return await FirebaseDatabaseService.Get($"users/{user_id}");
	}

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
	[Route("/get-list")]
	public async Task<string> GetUserList() {
		return await FirebaseDatabaseService.Get($"users");
	}

}
