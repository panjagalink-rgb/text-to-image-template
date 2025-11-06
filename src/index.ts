import { Ai } from "@cloudflare/ai";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prompt = url.searchParams.get("p") || "cyberpunk cat"; // baca prompt dari URL ?p=
    const negative = url.searchParams.get("n") || "blurry, text, watermark, bad anatomy"; // optional: negative prompt

    const ai = new Ai(env.AI);

    // Gunakan model yang lebih teliti membaca teks
    const result = await ai.run("@cf/stabilityai/stable-diffusion-xl", {
      prompt,
      negative_prompt: negative,
    });

    return new Response(result, {
      headers: {
        "content-type": "image/png",
        "Access-Control-Allow-Origin": "*", // biar bisa diakses dari web lain
      },
    });
  },
} satisfies ExportedHandler<Env>;
