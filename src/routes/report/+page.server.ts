import { base64ToBytes, bytesToBase64 } from '$lib/base64';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, }) => {
		const data = await request.formData();
		const photo = data.get('photo') as Blob;
		const photoBytes = (await (await photo.stream().getReader().read())).value as Uint8Array;
		const photoB64 = bytesToBase64(photoBytes);
		const results = await (
			await fetch(
				"http://127.0.0.1:8000/upload-image", {
					method: "POST",
					body: JSON.stringify({ photo: photoB64 })
				}
			)
		).json();

		const items: {name: string, bbox: [number, number, number, number], instructions: string, supercategory: string}[] = results["items"] ?? [];
		const id: { [k: string]: string } = results["id"] ?? {};

		return {
			items,
			id,
			photo: photoB64
        };
	}
};