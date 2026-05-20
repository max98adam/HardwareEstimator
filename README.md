# LLM Inference Hardware Estimator

> Forked from [smelukov/WeightRoom](https://github.com/smelukov/WeightRoom).

A web calculator that estimates RAM, storage, and token throughput (TPS) for running large language models locally or in the cloud.

🔗 **Live demo:** https://max98adam.github.io/HardwareEstimator/

This fork extends the original with the latest open-weight models (gpt-oss, Llama 4, Qwen 3-Next, DeepSeek V3.2 / V4, Kimi K2, GLM-4.x, MiniMax) and inference hardware (NVIDIA RTX PRO 6000 Blackwell, B300, AMD MI355X, …).

_Last updated by Claude on 2026-05-20._ The model & hardware catalog is refreshed by a scheduled Claude Code routine — see [CLAUDE.md](./CLAUDE.md).

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
