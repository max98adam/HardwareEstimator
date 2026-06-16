# LLM Inference Hardware Estimator

> Forked from [smelukov/WeightRoom](https://github.com/smelukov/WeightRoom).

A web calculator that estimates RAM, storage, and token throughput (TPS) for running large language models locally or in the cloud.

🔗 **Live demo:** https://max98adam.github.io/HardwareEstimator/

This fork extends the original with the latest open-weight models (gpt-oss, Llama 4, Qwen 3-Next, DeepSeek V3.2 / V4, Kimi K2 / K2.7-Code, GLM-5.1 / 4.7-Flash, MiniMax M2.x / M3, Mistral Large 3 / Small 4 / Medium 3.5 / Devstral 2, IBM Granite 4.1, Cohere Command A+ / North-Mini-Code, InclusionAI Ring/Ling 2.6, Xiaomi MiMo V2.5 Pro, Google Gemma 4 12B, NVIDIA Nemotron 3 Ultra, LG EXAONE 4.5) and inference hardware (NVIDIA DGX Spark / GB10, NVIDIA RTX PRO 6000 Blackwell, RTX PRO 5000 Blackwell 48/72GB, B300, AMD MI355X, …). Weights quantization covers GGUF, GPTQ, AWQ, MLX and NVFP4 (the latter shown only for models that ship an NVFP4 build on HuggingFace).

_Last updated by Claude on 2026-06-16._ The model & hardware catalog is refreshed by a scheduled Claude Code routine — see [CLAUDE.md](./CLAUDE.md).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run test     # unit + e2e tests
```

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`
(`VITE_BASE=/HardwareEstimator/`). Set **Settings → Pages → Source = GitHub Actions** once.

## License

MIT — see [LICENSE](./LICENSE).
