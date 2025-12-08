using HotCafe.Utils;

namespace HotCafe.Models;

#pragma warning disable IDE1006
#pragma warning disable CS8618
public class Room : Serializable {

	public string roomId {
		get; set;
	}
	public string name {
		get; set;
	}
	public string code {
		get; set;
	}
	public string ownerId {
		get; set;
	}
	public long createdAt {
		get; private set;
	} = DateTimeUtils.getCurrentTimestamp();
	public int memberCount {
		get; set;
	}

}