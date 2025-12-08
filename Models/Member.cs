namespace HotCafe.Models;

#pragma warning disable IDE1006
#pragma warning disable CS8618
public class Member : Serializable {

	public string userId {
		get; set;
	}
	public long joinedAt {
		get; set;
	}
	public string role {
		get; set;
	}

}