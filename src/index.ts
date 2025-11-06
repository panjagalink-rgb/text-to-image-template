export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Ambil prompt dari parameter URL ?p=
    const prompt = url.searchParams.get("p") || "dog with hat";
    // Opsional: model (biar cocok sama PHP radio button)
    const model = url.searchParams.get("model") || "1";

    // Tentukan model AI yang dipakai
    const modelName =
      model === "2"
        ? "@cf/bytedance/stable-diffusion-xl-lightning"
        : "@cf/stabilityai/stable-diffusion-xl";

    const inputs = { prompt };

    // Jalankan model AI
    const response = await env.AI.run(modelName, inputs);

    return new Response(response, {
      headers: {
        "content-type": "image/png",
        "Access-Control-Allow-Origin": "*", // biar bisa dipanggil dari PHP
      },
    });
  },
};
