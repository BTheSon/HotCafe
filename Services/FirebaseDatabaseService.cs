using Microsoft.JSInterop;
using System.Text;
using System.Text.Json;
using HotCafe.Models;

namespace HotCafe.Services;

public class FirebaseDatabaseService {

	private static string ProcessError(string error_message) {
		object obj = new {
			error_message = error_message
		};
		return JsonSerializer.Serialize(obj);
	}

	private static readonly HttpClient httpClient = new();

	/// <summary>
	/// Đường dẫn chính đến Database.
	/// </summary>
	private static readonly string BASE_URL = "https://dotnet-project-mvc-default-rtdb.firebaseio.com";

	/// <summary>
	/// Tạo một Node trong Database với Key được tạo tự động.
	/// </summary>
	/// <param name="model">Đối tượng dùng để tạo Node</param>
	/// <param name="parent">Đường dẫn đến Node sẽ chứa Node cần tạo</param>
	/// <code>
	/// {<paramref name="parent"/>}
	/// └─── {key_tự_động}
	///       ├─── name: "Thiên Bảo"
	///       └─── age: 20
	/// </code>
	public static async Task<string> CreateWithoutSpecificKey(Serializable model, string parent) {
		HttpResponseMessage result = await httpClient.PostAsync($"{BASE_URL}/{parent}.json", new StringContent(model.ToJson(), Encoding.UTF8, "application/json"));
		if (!result.IsSuccessStatusCode) {
			return ProcessError("Có lỗi xảy ra!");
		}
		return await result.Content.ReadAsStringAsync();
	}

	/// <summary>
	/// Tạo một Node trong Database với Key cụ thể.
	/// </summary>
	/// <param name="model">Đối tượng dùng để tạo Node</param>
	/// <param name="parent">Đường dẫn đến Node sẽ chứa Node cần tạo</param>
	/// <param name="key">Key cụ thể</param>
	/// <code>
	/// {<paramref name="parent"/>}
	/// └─── {<paramref name="key"/>}
	///       ├─── name: "Thiên Bảo"
	///       └─── age: 20
	/// </code>
	public static async Task<string> CreateWithSpecificKey(Serializable model, string parent, string key) {
		if (await IsExists(parent + "/" + key)) {
			if (model is Room) {
				return ProcessError("Phòng này đã tồn tại!");
			}
			return ProcessError("Có lỗi xảy ra!");
		}

		return await Put(model, parent, key);
	}

	/// <summary>
	/// Cập nhật toàn bộ dữ liệu của một Node trong Database.
	/// Nếu Key chưa tồn tại => Tạo Node mới.
	/// Nếu Key đã tồn tại => Ghi đè toàn bộ dữ liệu của Node.
	/// </summary>
	/// <param name="model">Đối tượng dùng để cập nhật Node</param>
	/// <param name="parent">Đường dẫn đến Node sẽ chứa Node cần cập nhật</param>
	/// <param name="key">Key của Node cần cập nhật</param>
	/// <code>
	/// {<paramref name="parent"/>}
	/// └─── {<paramref name="key"/>}
	///       ├─── name: "Thiên Bảo"
	///       └─── age: 20
	/// </code>
	public static async Task<string> UpdateAll(Serializable model, string parent, string key) {
		return await Put(model, parent, key);
	}

	/// <summary>
	/// Cập nhật một phần dữ liệu của một Node trong Database.
	/// Nếu Key chưa tồn tại => Tạo Node mới.
	/// Nếu Key đã tồn tại => Ghi đè dữ liệu của Node ở các trường tương ứng bên trong <paramref name="model"/>.
	/// </summary>
	/// <param name="model">Đối tượng dùng để cập nhật Node</param>
	/// <param name="parent">Đường dẫn đến Node sẽ chứa Node cần cập nhật</param>
	/// <param name="key">Key của Node cần cập nhật</param>
	/// <code>
	/// {<paramref name="parent"/>}
	/// └─── {<paramref name="key"/>}
	///       ├─── name: "Thiên Bảo"
	///       └─── age: 20
	/// </code>
	public static async Task<string> UpdatePart(Serializable model, string parent, string key) {
		return await Patch(model, parent, key);
	}

	/// <summary>
	/// Xóa một Node trong Database.
	/// </summary>
	/// <param name="parent">Đường dẫn đến Node sẽ chứa Node cần xóa</param>
	/// <param name="key">Key của Node cần xóa</param>
	/// <code>
	/// {<paramref name="parent"/>}
	/// └─── {<paramref name="key"/>}
	///       ├─── name: "Thiên Bảo"
	///       └─── age: 20
	/// </code>
	public static async Task<string> Delete(string parent, string key) {
		HttpResponseMessage result = await httpClient.DeleteAsync($"{BASE_URL}/{parent}/{key}.json");
		if (!result.IsSuccessStatusCode) {
			return ProcessError("Có lỗi xảy ra!");
		}
		return await result.Content.ReadAsStringAsync();
	}

	/// <summary>
	/// Kiểm tra một đường dẫn trong Database có tồn tại hay không.
	/// </summary>
	/// <param name="path">Đường dẫn cần kiểm tra</param>
	/// <code>
	/// users
	/// └─── {userId_1}
	///       ├─── name: "Thiên Bảo"
	///       └─── age: 20
	/// IsExists("users/userId_1") => True
	/// IsExists("users/userId_2") => False
	/// </code>
	public static async Task<bool> IsExists(string path) {
		string url = $"{BASE_URL}/{path}.json";
		var data = await httpClient.GetAsync(url);

		if (!data.IsSuccessStatusCode) {
			return false;
		}

		var result = await data.Content.ReadAsStringAsync();

		return result != "null" && !string.IsNullOrWhiteSpace(result);
	}

	public static async Task<string> Get(string path) {
		string url = $"{BASE_URL}/{path}.json";
		var response = await httpClient.GetAsync(url);

		if (!response.IsSuccessStatusCode) {
			return ProcessError("Có lỗi xảy ra!");
		}

		var result = await response.Content.ReadAsStringAsync();

		return result;
	}

	private static async Task<string> Put(Serializable model, string parent, string key) {
		HttpResponseMessage result = await httpClient.PutAsync($"{BASE_URL}/{parent}/{key}.json", new StringContent(model.ToJson(), Encoding.UTF8, "application/json"));
		if (!result.IsSuccessStatusCode) {
			return ProcessError("Có lỗi xảy ra!");
		}
		return await result.Content.ReadAsStringAsync();
	}

	private static async Task<string> Patch(Serializable model, string parent, string key) {
		HttpResponseMessage result =  await httpClient.PatchAsync($"{BASE_URL}/{parent}/{key}.json", new StringContent(model.ToJson(), Encoding.UTF8, "application/json"));
		if (!result.IsSuccessStatusCode) {
			return ProcessError("Có lỗi xảy ra!");
		}
		return await result.Content.ReadAsStringAsync();
	}

}