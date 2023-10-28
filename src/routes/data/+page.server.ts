import {
    DynamoDBClient,
    ScanCommand
} from '@aws-sdk/client-dynamodb';
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, AWS_REGION } from '$env/static/private';

export async function load({  }) {
    const client = new DynamoDBClient({
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            sessionToken: AWS_SESSION_TOKEN
        },
        region: AWS_REGION,
    });
    const cmd = new ScanCommand({
        TableName: "Markers"
    });
    const result = await client.send(cmd);
    let markers = [];
    for (const item of result.Items ?? []) {
        const location = item["location"]["S"]?.split(", ");
        if (location === undefined)
            continue;
        markers.push({
            lat: Number(location[0]),
            lng: Number(location[1]),
            supercategory: item["supercategory"]["S"] ?? ""
        })
    }
    return { markers };
}