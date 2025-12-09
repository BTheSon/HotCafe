using Appwrite;
using Appwrite.Services;
using Appwrite.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;

namespace HotCafe.Services;

public class AppwriteService {

	private const string END_POINT = "https://nyc.cloud.appwrite.io/v1";
	private const string BUCKET_ID = "68c4516000059b31a34e";
	private const string PROJECT_ID = "68c44dfb001c0ccf6934";
	private const string API_KEY = "standard_eeb6313048b140fd6cbc78ee1e4ddb943db79baec88c61a9df4d647ba7611a861bd6397dafc08617fa8f8f72bc462c9956aee00dd16f7cc5ce726134b57a8dd862209497175e0452ec4cabbee1ab2073089a9935f7b1068de6043842e2d2f287cd5828928f232678f2460ebd17f3e19911ce37d1ac9a5a1363dc98f2d079dc1e";

	private const string ID_UNIQUE = "unique()";

	private static Client? client = null;

	public static Client GetClient() {
		return client ??= new Client()
			.SetEndpoint(END_POINT)
			.SetProject(PROJECT_ID)
			.SetKey(API_KEY);
	}

	private static string BuildUrl(string FileId) {
		return $"{END_POINT}/storage/buckets/{BUCKET_ID}/files/{FileId}/view?project={PROJECT_ID}";
	}

	public async Task<string> UploadFile(IFormFile imageFile) {
		if (imageFile == null || imageFile.Length == 0) {
			return "";
		}

		using Stream stream = imageFile.OpenReadStream();

		Storage storage = new Storage(GetClient());

		Appwrite.Models.File result = await storage.CreateFile(
			bucketId: BUCKET_ID,
			fileId: ID_UNIQUE,
			file: Appwrite.Models.InputFile.FromStream(
				stream: stream,
				filename: imageFile.FileName,
				mimeType: imageFile.ContentType
			),
			permissions: []
		);

		return BuildUrl(result.Id);
	}
}