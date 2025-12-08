using System.Text.Json;

namespace HotCafe.Models;

public abstract class Serializable {

	/// <summary>
	/// Chứa {tùy chọn} cho {JsonSerializer.Serialize} trong {@ToJson()}.
	/// </summary>
	private static JsonSerializerOptions? jsonSerializerOptions = null;

	/// <summary>
	/// Khởi tạo {tùy chọn} cho {@jsonSerializerOptions} và trả về bằng {Singleton}.
	/// </summary>
	private static JsonSerializerOptions GetJsonSerializerOptions() {
		return jsonSerializerOptions ??= new JsonSerializerOptions {
			IncludeFields = true
		};
	}

	/// <summary>
	/// Chuyển đổi các {trường} và {thuộc tính} của một {đối tượng} thành chuỗi {Json}.
	/// {Đối tượng} là các {lớp con} đã kế thừa {lớp này}.
	/// {Kiểu} của lớp con sẽ được nhận diện bằng {GetType()} nên không cần {override} hàm này về lớp con.
	/// </summary>
	public virtual string ToJson() {
		return JsonSerializer.Serialize(this, GetType(), GetJsonSerializerOptions());
	}

}