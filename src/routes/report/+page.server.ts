import { Base64 } from '$lib';
import { bytesToBase64 } from '$lib/base64.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request, }) => {
		const data = await request.formData();
		const photo = data.get('photo') as Blob;
		const photoBytes = (await (await photo.stream().getReader().read())).value as Uint8Array;

		return {
            json: await (
				await fetch(
					"http://127.0.0.1:8000/upload-image", {
						method: "POST",
						body: JSON.stringify({ photo: bytesToBase64(photoBytes) })
					}
				)
			).json()
        };
	}
};