import "server-only"

import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const secret = process.env.NEXT_PUBLIC_STREAM_SECRET!;

export const streamVideo = new StreamClient(apiKey, secret)