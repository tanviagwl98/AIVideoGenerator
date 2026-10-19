import {mkdir, writeFile} from "node:fs/promises";

process.loadEnvFile(".env.local");
const script = `Before the world asks anything of you, try this thirty-second reset. First, leave your phone alone for ten minutes. Let your own thoughts arrive before everyone else's. Next, drink a glass of water before coffee. It's a tiny promise to care for yourself first. Finally, step into the daylight, even if only for one minute. Notice the air, the sky, the beginning. Small rituals don't change the whole world. They change how you enter it.`;
const voiceId = process.env.ELEVENLABS_VOICE_ID_INDIAN_FEMALE;
const modelId = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";
const fallbackVoiceId = "EXAVITQu4vr4xnSDxMaL"; // Sarah — account-available female premade voice
if (!process.env.ELEVENLABS_API_KEY || !voiceId) throw new Error("ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID_INDIAN_FEMALE must be set in .env.local");
const generate = (selectedVoiceId) => fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {method: "POST", headers: {"xi-api-key": process.env.ELEVENLABS_API_KEY, "content-type": "application/json", accept: "audio/mpeg"}, body: JSON.stringify({text: script, model_id: modelId, voice_settings: {stability: 0.5, similarity_boost: 0.75, style: 0.22, use_speaker_boost: true}})});
let response = await generate(voiceId);
if (response.status === 402) {
	console.warn("Configured Indian female voice requires a paid API plan. Using the available Sarah voice for this sample.");
	response = await generate(fallbackVoiceId);
}
if (!response.ok) throw new Error(`ElevenLabs request failed (${response.status}): ${await response.text()}`);
await mkdir("public/audio", {recursive: true});
await writeFile("public/audio/calm-morning.mp3", Buffer.from(await response.arrayBuffer()));
console.log("Created public/audio/calm-morning.mp3");
