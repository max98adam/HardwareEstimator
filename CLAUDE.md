# CLAUDE.md — maintainer context for the LLM Inference Hardware Estimator

This file is the source of truth for keeping the model & hardware catalog
current. It is read by every Claude Code session in this repo, including the
scheduled **"Update models and hardware"** routine. (See also `AGENTS.md` for
the full architecture/style guide.)

## What this project is

A React + Vite + TypeScript web calculator that estimates RAM, storage, and
token throughput (TPS) for running LLMs locally or in the cloud. It is a fork
of [smelukov/WeightRoom](https://github.com/smelukov/WeightRoom), renamed to
**LLM Inference Hardware Estimator**, deployed to GitHub Pages at
`https://max98adam.github.io/HardwareEstimator/` (project page, base path
`/HardwareEstimator/`).

## Where the catalog data lives

| Data | File | Notes |
|------|------|-------|
| Models | `src/lib/models.ts` → `KNOWN_MODELS` | one entry per model |
| Model release dates | `src/lib/models.ts` → `MODEL_RELEASE_DATES` | ISO `YYYY-MM-DD`, enriched onto each model at load |
| Vendors/brands | `src/lib/models.ts` → `MODEL_BRANDS` + `ModelBrand` in `src/lib/types.ts` | adding a brand needs an icon in `src/components/BrandIcon.tsx` |
| Hardware | `src/lib/hardwarePresets.ts` → `HARDWARE_PRESETS` | grouped by `HardwareCategory` |
| Quants | `src/lib/quants.ts` (weights) + `KV_QUANTS` (KV) | bits also in `QUANT_BYTES` (calculator.ts) |
| Footer "Last updated" date | `src/lib/constants.ts` → `LAST_UPDATED` | bump on every catalog refresh; also update the date in `README.md` |

The KV-cache / TPS math is in `src/lib/calculator.ts`; KV-formula docs (shown in
the footer) are in `src/lib/kvFormulas.ts`.

## Data sources & verification (authoritative order)

1. **Architecture fields** (`layers`, `kvHeads`, `headDim`, `slidingWindow`,
   MLA dims, `maxContextK`) → the model's **HuggingFace `config.json`**:
   `https://huggingface.co/<repo>/resolve/main/config.json`. This is the
   ground truth — always verify against it. `maxContextK = max_position_embeddings / 1024`.
   For gated repos (Meta/Google/Mistral) use a faithful public mirror
   (`unsloth/*`, `nvidia/*`) and note which.
2. **Release date** → the HF repo's `createdAt`:
   `https://huggingface.co/api/models/<repo>` (the field `createdAt`, take the
   `YYYY-MM-DD` part). This is what populates `MODEL_RELEASE_DATES`.
3. **Total / active parameter counts** → NOT in `config.json`; taken from the
   model card / blog / paper. Mark these as unverified-from-config; sanity-check
   against the expert/layer layout but don't claim config-verification.

## KV-formula modeling conventions (DO NOT "fix" these — they're deliberate)

The calculator supports four KV formulas. Map each model to the closest one:

- **`standard`** — plain GQA: `2 × L × kvHeads × headDim × T × bytes`.
- **`hybrid`** — sliding-window/full mix: `slidingWindow`, `fullLayers` (count
  of FULL/global layers), optional `fullKvHeads`/`fullHeadDim`, `kvFactor` (1 if
  K and V share storage). Used by Gemma 2/3/4, gpt-oss (sw=128, fl=layers/2),
  Llama 4 (sw=8192 chunked, fl=global/NoPE layers).
- **`mla`** — DeepSeek-style latent: set `kvHeads: 0`, `headDim: 0`, and size KV
  via `kvLoraRank` (512) + `qkRopeHeadDim` (64). Used by DeepSeek V3/R1/V3.2 and
  all Kimi K2 variants.
- **`linear_hybrid`** — only the full-attention layers grow; linear layers ≈ 0.
  `fullLayers` = count of full layers. Used by Qwen 3.5/3.6/3-Next, MiniMax-M1
  (full attn every 8th layer), and Kimi-Linear (encode the MLA latent as
  `kvHeads: 1, headDim: 576 (=512+64), kvFactor: 1`).

Special approximation — **DeepSeek V4** (CSA/HCA sparse attention, no MLA latent
in config): modeled as `hybrid` with `fullLayers` = the CSA-layer count
(`compress_ratios == 4` entries in config), `fullHeadDim: 128` (= `head_dim` 512
folded with CSA's 4× compression), `slidingWindow: 128`. It's an approximation —
keep the inline comment saying so.

## TurboQuant

TurboQuant (arXiv:2504.19874) is a **KV-cache** quantization, NOT a weight quant.
It lives only in `KV_QUANTS` (`turboquant_3_5`, `turboquant_2_5`), never in the
weights dropdown. Validated for standard/GQA attention; unverified for MLA/VLM.

## How to add a model

1. Verify every architecture field against the repo's `config.json`.
2. Add an entry to `KNOWN_MODELS` with the right `kvFormula` (see conventions).
3. Add its `hfRepoId`, `capabilities` ({vlm, thinking, toolUse}), and
   `maxContextK`.
4. Add its `createdAt` date to `MODEL_RELEASE_DATES`.
5. New vendor? Add to `ModelBrand` (types.ts), `MODEL_BRANDS` (models.ts), and a
   `LETTER_BRANDS` glyph in `BrandIcon.tsx`.
6. Sanity-check RAM/KV with a quick `npx tsx` call to `calcLLMRam`.

## How to add a hardware preset

Add to `HARDWARE_PRESETS` via the `gpuPreset`/`applePreset` helpers in
`src/lib/hardwarePresets.ts` (VRAM, bandwidth GB/s, memory type from the
official datasheet). New category → add to `HardwareCategory` +
`HARDWARE_CATEGORY_LABELS`. Add a headline bandwidth to the "datasheet sanity"
spot-check in `src/lib/__tests__/hardwarePresets.test.ts`.

## Build / test / deploy

```bash
npm install
npm run typecheck && npm run lint
npm run test:unit          # must stay green
npm run build              # VITE_BASE defaults to "/" locally
```

CI (`ci.yml`) runs tests; `deploy.yml` builds with `VITE_BASE=/HardwareEstimator/`
and publishes to GitHub Pages on every push to `main` (Pages Source must be
"GitHub Actions"). A husky pre-commit hook runs lint-staged + the unit suite.

## On each catalog refresh (the scheduled routine's checklist)

1. Research the latest notable open-weight LLMs and inference hardware.
2. For each candidate, verify against `config.json` (and `createdAt`).
3. Add/update entries following the conventions above.
4. Re-verify a sample of existing entries against `config.json`; fix drift.
5. Bump `LAST_UPDATED` in `src/lib/constants.ts` and the date line in `README.md`.
6. Run typecheck + lint + unit tests + build; all must pass.
7. Commit and open a PR (do not push straight to `main`).
