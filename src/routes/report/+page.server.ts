import { bytesToBase64 } from '$lib/base64';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, }) => {
		const data = await request.formData();
		const photo = data.get('photo') as Blob;
		const reader = await photo.stream().getReader();
		let photoBytes: Uint8Array = new Uint8Array();

		while(true) {
			const result = await reader.read();
			if (result.value === undefined)
				break;
			let tmp = new Uint8Array(result.value.length + photoBytes.length);
			tmp.set(photoBytes);
			tmp.set(result.value, photoBytes.length);
			photoBytes = tmp;
			if (result.done)
				break;
		}
		const photoB64 = bytesToBase64(photoBytes);
		const text = await (
			await fetch(
				"http://127.0.0.1:5000/upload-image", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						photo: photoB64,
						geolocation: data.get("geolocation"),
						url: data.get("laws")
					})
				}
			)
		).text();
		console.log(text);
		const results = JSON.parse(text);

		const items: {name: string, bbox: [number, number, number, number], instructions: string, supercategory: string}[] = results["items"] ?? [];
		const id: { [k: string]: string } = results["id"] ?? {};

		return {
			items,
			id,
			photo: photoB64
        };
	}
};