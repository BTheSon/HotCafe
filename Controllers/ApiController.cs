using Microsoft.AspNetCore.Mvc;
using HotCafe.Services;

namespace HotCafe.Controllers;

[Route("api")]
public class ApiController : Controller {

	[HttpPost]
	[Route("get-user")]
	public async Task<string> GetUser(string id) {
		string json = await FirebaseDatabaseService.Get($"users/{id}");
		return json;
	}

	[HttpPost]
	[Route("get-message")]
	public async Task<string> GetMessage(string id) {
		string json = await FirebaseDatabaseService.Get($"messages/{id}");
		return json;
	}

	[HttpPost]
	[Route("get-room")]
	public async Task<string> GetRoom(string id) {
		string json = await FirebaseDatabaseService.Get($"rooms/{id}");
		return json;
	}

	[HttpPost]
	[Route("get-room-member")]
	public async Task<string> GetRoomMember(string id) {
		string json = await FirebaseDatabaseService.Get($"roomMembers/{id}");
		return json;
	}

}
