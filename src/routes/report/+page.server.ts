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
		// const results = await (
		// 	await fetch(
		// 		"http://127.0.0.1:8000/upload-image", {
		// 			method: "POST",
		// 			body: JSON.stringify({ photo: photoB64 })
		// 		}
		// 	)
		// ).json();
		const results = {};

		const items: {name: string, bbox: [number, number, number, number], instructions: string, supercategory: string}[] = results["items"] ?? [];
		const id: { [k: string]: string } = results["id"] ?? {};
		items.push({
			name: "plastic bottle",
			bbox: [0.0, 0.0, 0.4, 0.4],
			instructions: "Rinse out the bottle, remove the cap, and place it in the recycling bin. Flatten the bottle if possible to save space.",
			supercategory: "plastic"
		});
		items.push({
			name: "plastic bottle",
			bbox: [0.5, 0.5, 1.0, 1.0],
			instructions: "Rinse out the bottle, remove the cap, and place it in the recycling bin. Flatten the bottle if possible to save space.",
			supercategory: "plastic"
		});

		return {
			items,
			id,
			photo: photoB64
        };
	}
};