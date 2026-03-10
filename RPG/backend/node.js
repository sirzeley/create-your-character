import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

function extrairBase64(dados) {
  // Tenta várias chaves comuns para encontrar a imagem/base64
  if (!dados) return null;
  if (dados.image) return dados.image;
  if (dados.images && dados.images[0]) return dados.images[0];
  if (dados.artifacts && dados.artifacts[0] && (dados.artifacts[0].base64 || dados.artifacts[0].b64)) {
    return dados.artifacts[0].base64 || dados.artifacts[0].b64;
  }
  if (dados.output && dados.output[0] && dados.output[0].b64_json) return dados.output[0].b64_json;
  // fallback: stringify para ajudar no debug
  return null;
}

app.post("/gerar-imagem", async (req, res) => {
  const { prompt } = req.body;
  if (!process.env.STABILITY_API_KEY) {
    return res.status(500).json({ error: "STABILITY_API_KEY não definida no .env" });
  }
  try {
    const resposta = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        output_format: "png",
        aspect_ratio: "1:1"
      })
    });

    const texto = await resposta.text(); // pega o corpo como texto para inspecionar quando não for JSON padrão
    let dados;
    try {
      dados = JSON.parse(texto);
    } catch (e) {
      // não era JSON — enviar texto bruto para debug
      return res.status(502).json({ error: "Resposta inesperada da API externa", body: texto });
    }

    if (!resposta.ok) {
      return res.status(502).json({ error: "Erro da API externa", details: dados });
    }

    const base64 = extrairBase64(dados);
    if (!base64) {
      // envia os dados inteiros para ajudar no ajuste
      return res.status(502).json({ error: "Não foi possível localizar imagem em base64 na resposta", details: dados });
    }

    return res.json({ imagem: base64 });
  } catch (err) {
    console.error("Erro ao chamar a API de imagens:", err);
    return res.status(500).json({ error: "Erro interno no servidor", details: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
