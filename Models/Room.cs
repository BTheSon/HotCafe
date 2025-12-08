namespace simplechat.Objects;

#pragma warning disable IDE1006
#pragma warning disable CS8618
public class Room : Serializable {

	public string name {
		get; set;
	}
	public string code {
		get; set;
	}
	public string ownerId {
		get; set;
	}
	public bool isPrivate {
		get; set;
	}
	public long createdAt {
		get; set;
	}
	public int memberCount {
		get; set;
	}

}