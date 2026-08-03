# LLM Inference Hardware Estimator

> Forked from [smelukov/WeightRoom](https://github.com/smelukov/WeightRoom).

A web calculator that estimates RAM, storage, and token throughput (TPS) for running large language models locally or in the cloud.

🔗 **Live demo:** https://max98adam.github.io/HardwareEstimator/

This fork extends the original with the latest open-weight models (gpt-oss, Llama 4, Qwen 3-Next, DeepSeek V3.2 / V4, Kimi K2 / K2.7-Code / K3, GLM-5.2 / 5.1 / 4.7-Flash, MiniMax M2.x / M3, Mistral Large 3 / Small 4 / Medium 3.5 / Devstral 2 / Leanstral 1.5, IBM Granite 4.1, Cohere Command A+ / North-Mini-Code, InclusionAI Ring/Ling 2.6, Xiaomi MiMo V2.5 Pro, Google Gemma 4 12B, NVIDIA Nemotron 3 Ultra / Super, LG EXAONE 4.5 / K-EXAONE 2.0, Thinking Machines Inkling / Inkling Small) and inference hardware (NVIDIA Rubin R100 / DGX Spark / GB10, NVIDIA RTX PRO 6000 Blackwell, RTX PRO 5000 Blackwell 48/72GB, B300, AMD MI455X / MI355X, …). Weights quantization covers GGUF, GPTQ, AWQ, MLX, FP8 and NVFP4 (FP8 and NVFP4 shown only for models that ship a real build on HuggingFace).

_Last updated by Claude on 2026-08-03._ The model & hardware catalog is refreshed by a scheduled Claude Code routine — see [CLAUDE.md](./CLAUDE.md).

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
