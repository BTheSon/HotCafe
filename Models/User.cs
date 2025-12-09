using HotCafe.Utils;

namespace HotCafe.Models;

#pragma warning disable IDE1006
#pragma warning disable CS8618
public class User : Serializable {

	public string userId {
		get; set;
	}
	public string displayName {
		get; set;
	}
	public string photoURL {
		get; set;
	}
	public string email {
		get; set;
	}
	public long createdAt {
		get; private set;
	} = DateTimeUtils.getCurrentTimestamp();

}