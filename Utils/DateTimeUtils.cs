namespace HotCafe.Utils;

public class DateTimeUtils {

	public static string getDateTimeFromTimestamp(long timestamp) {
		DateTime dateTime = DateTimeOffset.FromUnixTimeSeconds(timestamp).ToLocalTime().DateTime;
		return dateTime.ToString("HH:mm, dd/MM/yyyy");
	}

	public static long getCurrentTimestamp() {
		return DateTimeOffset.Now.ToUnixTimeSeconds();
	}

}