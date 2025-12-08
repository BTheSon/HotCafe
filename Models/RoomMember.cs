namespace HotCafe.Models;

#pragma warning disable IDE1006
#pragma warning disable CS8618
public class RoomMember : Serializable {

	public long joinedAt {
		get; set;
	}
	public string role {
		get; set;
	}

}