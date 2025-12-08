namespace HotCafe.Models;

#pragma warning disable IDE1006
#pragma warning disable CS8618
public class Message : Serializable {

	public string senderId {
		get; set;
	}
	public string text {
		get; set;
	}
	public long createdAt {
		get; set;
	}

}