import type {
  KnownModel,
  ModelBrand,
  ModelCapabilities,
} from "./types";

export const MODEL_BRANDS: { key: ModelBrand; label: string }[] = [
  { key: "Google", label: "Google" },
  { key: "OpenAI", label: "OpenAI" },
  { key: "Alibaba", label: "Alibaba" },
  { key: "Meta", label: "Meta" },
  { key: "Mistral", label: "Mistral AI" },
  { key: "Microsoft", label: "Microsoft" },
  { key: "NVIDIA", label: "NVIDIA Nemotron" },
  { key: "DeepSeek", label: "DeepSeek" },
  { key: "Moonshot", label: "Moonshot AI" },
  { key: "Zhipu", label: "Z.ai (Zhipu)" },
  { key: "MiniMax", label: "MiniMax" },
  { key: "IBM", label: "IBM Granite" },
  { key: "Cohere", label: "Cohere" },
  { key: "InclusionAI", label: "InclusionAI (Ant Group)" },
  { key: "Xiaomi", label: "Xiaomi MiMo" },
  { key: "LG", label: "LG EXAONE" },
  { key: "ThinkingMachines", label: "Thinking Machines" },
  { key: "Tencent", label: "Tencent Hunyuan" },
  { key: "Sber", label: "Sber GigaChat" },
  { key: "Meituan", label: "Meituan LongCat" },
];

export const KNOWN_MODELS: Record<string, KnownModel> = {
  // ── Google Gemma (hybrid) ──────────────────────────────────────────
  "gemma2-9b": {
    displayName: "Gemma 2 9B",
    brand: "Google",
    hfRepoId: "google/gemma-2-9b",
    params: 9e9,
    layers: 42,
    kvHeads: 8,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 21,
    slidingWindow: 4096,
    moe: false,
    maxContextK: 8,
  },
  "gemma3-4b": {
    displayName: "Gemma 3 4B",
    brand: "Google",
    hfRepoId: "google/gemma-3-4b-it",
    params: 4e9,
    layers: 34,
    kvHeads: 4,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 5,
    slidingWindow: 1024,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  "gemma3-12b": {
    displayName: "Gemma 3 12B",
    brand: "Google",
    hfRepoId: "google/gemma-3-12b-it",
    params: 12e9,
    layers: 48,
    kvHeads: 8,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 8,
    slidingWindow: 1024,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  "gemma3-27b": {
    displayName: "Gemma 3 27B",
    brand: "Google",
    hfRepoId: "google/gemma-3-27b-it",
    params: 27e9,
    layers: 62,
    kvHeads: 16,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 10,
    slidingWindow: 1024,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  // Gemma 4 introduces attention_k_eq_v on the dense 31B and the MoE variant:
  // K and V tensors share storage, halving the KV cache. We model this with
  // kvFactor: 1 (default is 2 for separate K and V).
  "gemma4-e2b": {
    displayName: "Gemma 4 E2B",
    brand: "Google",
    hfRepoId: "google/gemma-4-E2B-it",
    params: 5.1e9,
    layers: 35,
    kvHeads: 1,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 7,
    fullKvHeads: 1,
    fullHeadDim: 512,
    slidingWindow: 512,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  "gemma4-e4b": {
    displayName: "Gemma 4 E4B",
    brand: "Google",
    hfRepoId: "google/gemma-4-E4B-it",
    params: 8e9,
    layers: 42,
    kvHeads: 2,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 7,
    fullKvHeads: 2,
    fullHeadDim: 512,
    slidingWindow: 512,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  "gemma4-12b": {
    // Gemma 4 12B (dense, gemma4_unified): sliding kv heads 8 / head_dim 256,
    // full kv heads 1 / head_dim 512 (num_global_key_value_heads=1,
    // global_head_dim=512). attention_k_eq_v=true → kvFactor=1. layer_types
    // alternate 5 sliding + 1 full across 48 layers → 8 full layers. 256K
    // context (max_position_embeddings 262144). vision_config + audio_config
    // present → multimodal (text+image+audio+video in).
    displayName: "Gemma 4 12B",
    brand: "Google",
    hfRepoId: "google/gemma-4-12B-it",
    params: 11.95e9,
    layers: 48,
    kvHeads: 8,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 8,
    fullKvHeads: 1,
    fullHeadDim: 512,
    slidingWindow: 1024,
    kvFactor: 1,
    moe: false,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  "gemma4-26b-a4b": {
    displayName: "Gemma 4 26B-A4B (MoE)",
    brand: "Google",
    hfRepoId: "google/gemma-4-26B-A4B-it",
    params: 25.2e9,
    activeParams: 3.8e9,
    layers: 30,
    kvHeads: 8,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 5,
    fullKvHeads: 2,
    fullHeadDim: 512,
    slidingWindow: 1024,
    kvFactor: 1,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  "gemma4-31b": {
    displayName: "Gemma 4 31B",
    brand: "Google",
    hfRepoId: "google/gemma-4-31B-it",
    params: 30.7e9,
    layers: 60,
    kvHeads: 16,
    headDim: 256,
    kvFormula: "hybrid",
    fullLayers: 10,
    fullKvHeads: 4,
    fullHeadDim: 512,
    slidingWindow: 1024,
    kvFactor: 1,
    moe: false,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // ── OpenAI gpt-oss (MoE, sliding-window hybrid) ───────────────────
  // OpenAI's first open-weight release (Aug 2025, Apache-2.0). Both sizes
  // are MoE and alternate sliding-window (window=128) and full-attention
  // layers, so we model them with the `hybrid` formula: half the layers are
  // full-attention, the rest cap their KV cache at the 128-token window.
  // Shipped natively in MXFP4 (~4.25 bpw). head_dim=64, num_key_value_heads=8.
  "gpt-oss-20b": {
    displayName: "gpt-oss 20B-A3.6B (MoE)",
    brand: "OpenAI",
    hfRepoId: "openai/gpt-oss-20b",
    params: 20.9e9,
    activeParams: 3.6e9,
    layers: 24,
    kvHeads: 8,
    headDim: 64,
    kvFormula: "hybrid",
    fullLayers: 12,
    slidingWindow: 128,
    moe: true,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "gpt-oss-120b": {
    displayName: "gpt-oss 120B-A5.1B (MoE)",
    brand: "OpenAI",
    hfRepoId: "openai/gpt-oss-120b",
    params: 116.8e9,
    activeParams: 5.1e9,
    layers: 36,
    kvHeads: 8,
    headDim: 64,
    kvFormula: "hybrid",
    fullLayers: 18,
    slidingWindow: 128,
    moe: true,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── Qwen (standard) ───────────────────────────────────────────────
  "qwen2.5-7b": {
    displayName: "Qwen 2.5 7B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen2.5-7B",
    params: 7e9,
    layers: 28,
    kvHeads: 4,
    headDim: 128,
    moe: false,
    maxContextK: 128,
  },
  "qwen2.5-72b": {
    displayName: "Qwen 2.5 72B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen2.5-72B",
    params: 72e9,
    layers: 80,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
  },
  "qwen3.5-9b": {
    displayName: "Qwen 3.5 9B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3.5-9B",
    params: 9e9,
    layers: 32,
    kvHeads: 4,
    headDim: 256,
    kvFormula: "linear_hybrid",
    fullLayers: 8,
    moe: false,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // ── Qwen 3.6 (Apr 2026 — Gated DeltaNet hybrid + agentic coding) ──
  // Both variants use the qwen3_5 / qwen3_5_moe model types and share the
  // hybrid attention pattern: every 4th layer is full attention
  // (full_attention_interval=4), the rest are Gated DeltaNet linear attention.
  // Architecture parameters verified against config.json on Hugging Face.
  "qwen3.6-27b": {
    // Dense, qwen3_5: 64 layers → 16 full + 48 linear. num_key_value_heads=4,
    // head_dim=256. vision_config + image_token_id → VLM.
    displayName: "Qwen 3.6 27B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3.6-27B",
    params: 27e9,
    layers: 64,
    kvHeads: 4,
    headDim: 256,
    kvFormula: "linear_hybrid",
    fullLayers: 16,
    moe: false,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  "qwen3.6-35b-a3b": {
    // MoE, qwen3_5_moe: 40 layers → 10 full + 30 linear. num_key_value_heads=2,
    // head_dim=256. 256 experts, 8 routed + 1 shared per token (≈ 3B active).
    // vision_config present → VLM.
    displayName: "Qwen 3.6 35B-A3B (MoE)",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3.6-35B-A3B",
    params: 35e9,
    layers: 40,
    kvHeads: 2,
    headDim: 256,
    kvFormula: "linear_hybrid",
    fullLayers: 10,
    moe: true,
    activeParams: 3e9,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // ── Qwen 3.8 (Aug 2026 — successor to 3.6, same qwen3_5 hybrid stack) ──
  // Same Gated DeltaNet hybrid attention as Qwen 3.5 / 3.6: every 4th layer is
  // full attention (full_attention_interval=4), the rest are linear. Verified
  // against config.json on Hugging Face.
  "qwen3.8-27b": {
    // Dense, qwen3_5: 64 layers → 16 full + 48 linear (layer_types confirms
    // 16 full_attention + 48 linear_attention). num_key_value_heads=4,
    // head_dim=256. vision_config + image_token_id → VLM. 256K context
    // (max_position_embeddings 262144 / 1024).
    displayName: "Qwen 3.8 27B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3.8-27B",
    params: 27.78e9,
    layers: 64,
    kvHeads: 4,
    headDim: 256,
    kvFormula: "linear_hybrid",
    fullLayers: 16,
    moe: false,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // Qwen 3.8-Max (Qwen3.8-2.4T-A95B, model_type qwen3_5_moe_text): Alibaba's
  // frontier open-weight release — same qwen3_5 Gated DeltaNet hybrid stack as
  // 3.5/3.6/3.8 (full_attention_interval=4). Architecture verified against
  // config.json on Hugging Face:
  //   - 92 hidden layers → 23 full-attention (every 4th layer 3..91) + 69
  //     linear-attention (Gated DeltaNet) → linear_hybrid, fullLayers=23.
  //   - num_key_value_heads=4, head_dim=256 on full-attention layers.
  //   - 512 routed experts + 1 shared, num_experts_per_tok=10.
  //   - max_position_embeddings 262144 → 256K context (extendable to ~1M via
  //     YaRN per the model card).
  //   - No vision_config → text-only. Chat template refuses disabling
  //     thinking (enable_thinking=False raises) → thinking-only.
  // Total safetensors from HF API: 2,446B (bf16-equivalent) — matches the
  // 2.4T name. Active ≈95B per the model card and launch coverage.
  // License: revenue-share ("license: other"), not Apache-2.0.
  "qwen3.8-max": {
    displayName: "Qwen 3.8-Max 2.4T-A95B (MoE)",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3.8-2.4T-A95B",
    params: 2.446e12,
    activeParams: 95e9,
    layers: 92,
    kvHeads: 4,
    headDim: 256,
    kvFormula: "linear_hybrid",
    fullLayers: 23,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // Qwen 3.8-Flash-Next: first public preview of the qwen4_exp architecture.
  // Same hybrid pattern as qwen3_5 (full_attention_interval=4) but a leaner,
  // sparser MoE — 512 routed experts + 1 shared, num_experts_per_tok=10, with
  // a small moe_intermediate_size (640). 48 layers → 12 full + 36 linear
  // (layer_types confirms). num_key_value_heads=2, head_dim=256, VLM (deep-
  // stack vision), 256K context. Total safetensors ≈180B; active ≈6B per the
  // model card / launch coverage.
  "qwen3.8-flash-next": {
    displayName: "Qwen 3.8-Flash-Next 180B-A6B (MoE, Qwen 4 preview)",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3.8-Flash-Next",
    params: 180e9,
    activeParams: 6e9,
    layers: 48,
    kvHeads: 2,
    headDim: 256,
    kvFormula: "linear_hybrid",
    fullLayers: 12,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // ── Qwen 3 (standard, thinking) ───────────────────────────────────
  "qwen3-4b": {
    displayName: "Qwen 3 4B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3-4B",
    params: 4.02e9,
    layers: 36,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "qwen3-8b": {
    displayName: "Qwen 3 8B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3-8B",
    params: 8.19e9,
    layers: 36,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "qwen3-32b": {
    displayName: "Qwen 3 32B",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3-32B",
    params: 32.76e9,
    layers: 64,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "qwen3-235b-a22b": {
    displayName: "Qwen 3 235B-A22B (MoE)",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3-235B-A22B",
    params: 235e9,
    layers: 94,
    kvHeads: 4,
    headDim: 128,
    moe: true,
    activeParams: 22e9,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── Qwen 3 Next / Coder ───────────────────────────────────────────
  // Qwen3-Next-80B-A3B: hybrid architecture — Gated DeltaNet linear
  // attention on most layers, full attention only every 4th layer
  // (full_attention_interval=4 → 12 of 48). Only the full-attention layers
  // grow a KV cache, so `linear_hybrid` with fullLayers=12 models it. The
  // ultra-sparse 3B-active MoE makes it a popular efficiency pick.
  "qwen3-next-80b-a3b": {
    displayName: "Qwen 3-Next 80B-A3B (MoE)",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3-Next-80B-A3B-Instruct",
    params: 80e9,
    activeParams: 3e9,
    layers: 48,
    kvHeads: 2,
    headDim: 256,
    kvFormula: "linear_hybrid",
    fullLayers: 12,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // Qwen3-Coder-480B-A35B: the flagship open agentic-coding MoE. Standard
  // GQA (kvHeads=8, headDim=128) across 62 layers; 256K native context.
  "qwen3-coder-480b": {
    displayName: "Qwen 3-Coder 480B-A35B (MoE)",
    brand: "Alibaba",
    hfRepoId: "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    params: 480e9,
    activeParams: 35e9,
    layers: 62,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // ── Meta Llama (standard) ──────────────────────────────────────────
  "llama3.2-3b": {
    displayName: "Llama 3.2 3B",
    brand: "Meta",
    hfRepoId: "meta-llama/Llama-3.2-3B",
    params: 3.21e9,
    layers: 28,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
  },
  "llama3.1-8b": {
    displayName: "Llama 3.1 8B",
    brand: "Meta",
    hfRepoId: "meta-llama/Llama-3.1-8B",
    params: 8e9,
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
  },
  "llama3.3-70b": {
    displayName: "Llama 3.3 70B Instruct",
    brand: "Meta",
    hfRepoId: "meta-llama/Llama-3.3-70B-Instruct",
    params: 70.55e9,
    layers: 80,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "llama3.1-405b": {
    displayName: "Llama 3.1 405B",
    brand: "Meta",
    hfRepoId: "meta-llama/Llama-3.1-405B",
    params: 405e9,
    layers: 126,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
  },
  // ── Llama 4 (MoE, natively multimodal, iRoPE chunked attention) ───
  // Llama 4 interleaves chunked local attention (attention_chunk_size=8192)
  // with global (NoPE) attention layers ~every 4th layer. We approximate
  // this with the `hybrid` formula: sliding window = 8192 caps the local
  // layers, the 12 global layers grow with context. This is what makes
  // Scout's headline 10M context plausible — without the chunking the KV
  // cache would be astronomical on every layer.
  "llama4-scout": {
    displayName: "Llama 4 Scout 109B-A17B (MoE)",
    brand: "Meta",
    hfRepoId: "meta-llama/Llama-4-Scout-17B-16E-Instruct",
    params: 109e9,
    activeParams: 17e9,
    layers: 48,
    kvHeads: 8,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 12,
    slidingWindow: 8192,
    moe: true,
    maxContextK: 10240,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  "llama4-maverick": {
    displayName: "Llama 4 Maverick 400B-A17B (MoE)",
    brand: "Meta",
    hfRepoId: "meta-llama/Llama-4-Maverick-17B-128E-Instruct",
    params: 400e9,
    activeParams: 17e9,
    layers: 48,
    kvHeads: 8,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 12,
    slidingWindow: 8192,
    moe: true,
    maxContextK: 1024,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  // ── Mistral (standard) ────────────────────────────────────────────
  "mistral-nemo-12b": {
    displayName: "Mistral NeMo 12B Instruct",
    brand: "Mistral",
    hfRepoId: "mistralai/Mistral-Nemo-Instruct-2407",
    params: 12.248e9,
    layers: 40,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "mistral-7b": {
    displayName: "Mistral 7B",
    brand: "Mistral",
    hfRepoId: "mistralai/Mistral-7B-v0.1",
    params: 7.3e9,
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 32,
  },
  "mistral-small-24b": {
    displayName: "Mistral Small 3 24B Instruct",
    brand: "Mistral",
    hfRepoId: "mistralai/Mistral-Small-24B-Instruct-2501",
    params: 24e9,
    layers: 40,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 32,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "mistral-medium-3.5": {
    // Mistral Medium 3.5: dense 128B multimodal flagship (mistral3 /
    // Mistral3ForConditionalGeneration wrapper → VLM). Plain GQA, no sliding
    // window. 88 layers, kvHeads=8, headDim=128, 256K context. "Dense 128B"
    // per the model card.
    displayName: "Mistral Medium 3.5 128B",
    brand: "Mistral",
    hfRepoId: "mistralai/Mistral-Medium-3.5-128B",
    params: 128e9,
    layers: 88,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  // ── Mistral MLA generation (Large 3 / Small 4 — latent attention MoE) ──
  // Mistral Large 3 and Small 4 move to DeepSeek-style MLA latent attention
  // (kv_lora_rank + qk_rope_head_dim) on top of a fine-grained MoE, and both
  // ship a Pixtral vision encoder → VLM. Mistral Large 3 has no HuggingFace
  // config.json — it is a Mistral-format repo, so its architecture is verified
  // against params.json (n_layers 61, kv_lora_rank 512, qk_rope_head_dim 64,
  // 128 experts / 4 active + 1 shared). Total 675B from the repo name; active
  // ≈40B and Small 4's active ≈6.6B are computed from the config layout.
  "mistral-large-3": {
    displayName: "Mistral Large 3 675B-A40B (MoE)",
    brand: "Mistral",
    hfRepoId: "mistralai/Mistral-Large-3-675B-Instruct-2512",
    params: 675e9,
    activeParams: 40e9,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 288, // params.json max_position_embeddings 294912 / 1024
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  "mistral-small-4": {
    // mistral4 text core (kv_lora_rank=256, qk_rope_head_dim=64) inside a
    // Mistral3ForConditionalGeneration VLM wrapper. 36 layers, 128 experts /
    // 4 active + 1 shared (≈6.6B active), native 1M context (YaRN).
    displayName: "Mistral Small 4 119B-A6.6B (MoE)",
    brand: "Mistral",
    hfRepoId: "mistralai/Mistral-Small-4-119B-2603",
    params: 119e9,
    activeParams: 6.6e9,
    layers: 36,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 256, // smaller MLA latent than DeepSeek/GLM (512)
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 1024, // max_position_embeddings 1048576 / 1024
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  "devstral-2-123b": {
    // Devstral 2: dense agentic-coding model (model_type ministral3, plain
    // GQA). 88 layers, kvHeads=8, headDim=128, 256K context, no vision.
    displayName: "Devstral 2 123B",
    brand: "Mistral",
    hfRepoId: "mistralai/Devstral-2-123B-Instruct-2512",
    params: 123e9,
    layers: 88,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 256, // max_position_embeddings 262144 / 1024
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // Leanstral 1.5 (Mistral, Apache-2.0): a lean 119B-A6B MLA-MoE VLM built on
  // top of the Leanstral-2603 base. Same MLA cache layout as Mistral Small 4
  // (kv_lora_rank=256, qk_rope_head_dim=64) but Apache-2.0 licensed and
  // natively FP8 (fp8_e4m3). 36 layers, 128 routed experts + 1 shared, 4
  // active per token. Vision encoder wrapper → multimodal. Native 1M context
  // (max_position_embeddings 1048576, YaRN factor 128 over an 8K base).
  "leanstral-1.5": {
    displayName: "Leanstral 1.5 119B-A6B (MoE)",
    brand: "Mistral",
    hfRepoId: "mistralai/Leanstral-1.5-119B-A6B",
    params: 119e9,
    activeParams: 6e9,
    layers: 36,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 256, // matches Mistral Small 4's smaller MLA latent
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 1024, // max_position_embeddings 1048576 / 1024
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  "mixtral-8x7b": {
    displayName: "Mixtral 8x7B-A13B (MoE)",
    brand: "Mistral",
    hfRepoId: "mistralai/Mixtral-8x7B-v0.1",
    params: 46.7e9,
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    activeParams: 12.9e9,
    maxContextK: 32,
  },
  "mixtral-8x22b": {
    displayName: "Mixtral 8x22B-A39B (MoE)",
    brand: "Mistral",
    hfRepoId: "mistralai/Mixtral-8x22B-v0.1",
    params: 141e9,
    layers: 56,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    activeParams: 39e9,
    maxContextK: 64,
  },
  // ── Microsoft Phi (standard) ──────────────────────────────────────
  "phi-3.5-mini": {
    displayName: "Phi-3.5 Mini Instruct 3.8B",
    brand: "Microsoft",
    hfRepoId: "microsoft/Phi-3.5-mini-instruct",
    params: 3.8e9,
    layers: 32,
    kvHeads: 32,
    headDim: 96,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "phi-4": {
    displayName: "Phi-4 14B",
    brand: "Microsoft",
    hfRepoId: "microsoft/phi-4",
    params: 14e9,
    layers: 40,
    kvHeads: 10,
    headDim: 128,
    moe: false,
    maxContextK: 16,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // ── NVIDIA Nemotron (Mamba-2 + MoE + selective attention) ─────────
  // Nemotron 3 Ultra (model_type nemotron_h): hybrid stack of Mamba-2
  // (constant-size SSM state), MoE MLP-only blocks, and a small number of
  // selective full-attention layers. Of the 108 transformer blocks only 12
  // are attention — the rest are Mamba or MoE-only and contribute ≈0 KV
  // cache, so we model it with `linear_hybrid` (fullLayers=12). kvHeads=2,
  // headDim=128 on the attention layers; 512 routed experts + 1 shared, 22
  // active per token (≈55B active of 550B total). 256K native context
  // (max_position_embeddings 262144). OpenMDW-1.1 license.
  "nemotron-3-ultra": {
    displayName: "Nemotron 3 Ultra 550B-A55B (MoE, hybrid)",
    brand: "NVIDIA",
    hfRepoId: "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16",
    params: 550e9,
    activeParams: 55e9,
    layers: 108,
    kvHeads: 2,
    headDim: 128,
    kvFormula: "linear_hybrid",
    fullLayers: 12,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // Nemotron 3 Super (nemotron_h): the mid-sized sibling of Nemotron 3 Ultra
  // with the same Mamba-2 + MoE + selective-attention recipe. Architecture
  // verified against config.json — 88 blocks with hybrid_override_pattern
  // reporting 8 `*` (attention), 40 `M` (mamba), 40 `E` (MoE MLP-only). Only
  // the 8 attention layers contribute KV cache → `linear_hybrid`, fullLayers=8.
  // kvHeads=2, headDim=128, 256K native context. Total params from the public
  // BF16 mirror ≈124B (rounded to 120B to match the model name), active ~12B
  // computed from the expert layout (256 routed + 1 shared, 8 active per token).
  "nemotron-3-super": {
    displayName: "Nemotron 3 Super 120B-A12B (MoE, hybrid)",
    brand: "NVIDIA",
    hfRepoId: "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16",
    params: 120e9,
    activeParams: 12e9,
    layers: 88,
    kvHeads: 2,
    headDim: 128,
    kvFormula: "linear_hybrid",
    fullLayers: 8,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── DeepSeek (standard + MLA) ─────────────────────────────────────
  "deepseek-r1-distill-7b": {
    displayName: "DeepSeek R1 Distill 7B",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
    params: 7.62e9,
    layers: 28,
    kvHeads: 4,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: false },
  },
  "deepseek-r1-distill-14b": {
    displayName: "DeepSeek R1 Distill 14B",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B",
    params: 14.77e9,
    layers: 48,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: false },
  },
  "deepseek-r1-distill-32b": {
    displayName: "DeepSeek R1 Distill 32B",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    params: 32.76e9,
    layers: 64,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: false },
  },
  "deepseek-r1-distill-70b": {
    displayName: "DeepSeek R1 Distill 70B",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B",
    params: 70.55e9,
    layers: 80,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: false },
  },
  "deepseek-v3": {
    displayName: "DeepSeek V3 671B-A37B (MoE)",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-V3",
    params: 671e9,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    activeParams: 37e9,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "deepseek-r1": {
    displayName: "DeepSeek R1 671B-A37B (MoE)",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-R1",
    params: 671e9,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    activeParams: 37e9,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: false },
  },
  "deepseek-v3.2": {
    // V3.2-Exp keeps the V3 MLA core (61 layers, kv_lora_rank=512,
    // qk_rope_head_dim=64) and adds DeepSeek Sparse Attention on top, which
    // shrinks the cache further at long context. Modeling it as plain MLA is
    // a safe upper bound on KV memory.
    displayName: "DeepSeek V3.2-Exp 671B-A37B (MoE)",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-V3.2-Exp",
    params: 671e9,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    activeParams: 37e9,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── DeepSeek V4 (CSA + HCA sparse attention — approximated) ───────
  // V4 abandons MLA for a new hybrid scheme: ~half the layers are CSA
  // (KV compressed 4× along the sequence + sparse top-k) and ~half are
  // HCA (compressed 128×, effectively negligible). num_key_value_heads=1,
  // head_dim=512, sliding_window=128. None of our four formulas fit
  // exactly, so we approximate with `hybrid`: the CSA layers are the
  // "full" layers but with the 4× compression folded into the head dim
  // (512 → 128); the HCA/windowed layers are the sliding layers, bounded
  // by the 128-token window. This lands within the right order of
  // magnitude of DeepSeek's claim (V4 KV ≈ 7–10% of V3.2 at 1M context).
  // Updated in Aug 2026 to the dated official releases (V4-Flash-0731 and
  // V4-Pro-0813). Architecture is identical to the April preview repos — same
  // layer count, same CSA/HCA distribution (compress_ratios == 4 layers), same
  // sliding_window=128, same MoE expert layout — only the total-params numbers
  // moved (retraining plus embedding/lora growth): 291B → 304B for Flash and
  // 1.599T → 1.650T for Pro. Both ship natively FP8 (F8_E4M3 dominates the
  // safetensors mix), so the FP8 quant option keeps pointing at the main repo.
  "deepseek-v4-flash": {
    displayName: "DeepSeek V4-Flash 304B-A13B (MoE)",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-V4-Flash-0731",
    params: 304e9,
    activeParams: 13e9,
    layers: 43,
    kvHeads: 1,
    headDim: 512,
    kvFormula: "hybrid",
    fullLayers: 21, // CSA layers (compress_ratio=4): 21 of 43 in config.json
    fullKvHeads: 1,
    fullHeadDim: 128, // head_dim 512 with CSA's 4× sequence compression folded in
    slidingWindow: 128,
    moe: true,
    maxContextK: 1024,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "deepseek-v4-pro": {
    displayName: "DeepSeek V4-Pro 1.65T-A49B (MoE)",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-V4-Pro-0813",
    params: 1.65e12,
    activeParams: 49e9,
    layers: 61,
    kvHeads: 1,
    headDim: 512,
    kvFormula: "hybrid",
    fullLayers: 30, // CSA layers (compress_ratio=4): 30 of 61 in config.json
    fullKvHeads: 1,
    fullHeadDim: 128, // head_dim 512 with CSA's 4× sequence compression folded in
    slidingWindow: 128,
    moe: true,
    maxContextK: 1024,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── Moonshot AI — Kimi (MLA, ~1T MoE) ─────────────────────────────
  "kimi-k2-thinking": {
    // Kimi K2 Thinking: ~1T-param MoE (32B active) reasoning model with the
    // same MLA cache layout as DeepSeek (kv_lora_rank=512, qk_rope=64).
    // Shipped natively quantized (INT4). 256K context.
    displayName: "Kimi K2 Thinking 1T-A32B (MoE)",
    brand: "Moonshot",
    hfRepoId: "moonshotai/Kimi-K2-Thinking",
    params: 1e12,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    activeParams: 32e9,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "kimi-k2-0905": {
    // Kimi K2 Instruct 0905: the popular non-thinking K2, extended to 256K
    // context. Same MLA core as the Thinking variant.
    displayName: "Kimi K2 Instruct 0905 1T-A32B (MoE)",
    brand: "Moonshot",
    hfRepoId: "moonshotai/Kimi-K2-Instruct-0905",
    params: 1e12,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    activeParams: 32e9,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "kimi-linear-48b": {
    // Kimi-Linear-48B-A3B: hybrid linear model — Kimi Delta Attention
    // (linear, ≈0 cache) on 20 of 27 layers, with full MLA attention on
    // only 7 layers. We model it with `linear_hybrid`: the 7 full layers
    // carry an MLA latent, encoded as a single (kv_lora_rank + qk_rope =
    // 576)-wide "head" with kvFactor=1 (latent jointly stores K and V).
    displayName: "Kimi-Linear 48B-A3B (MoE, hybrid)",
    brand: "Moonshot",
    hfRepoId: "moonshotai/Kimi-Linear-48B-A3B-Instruct",
    params: 48e9,
    activeParams: 3e9,
    layers: 27,
    kvHeads: 1,
    headDim: 576, // kv_lora_rank 512 + qk_rope_head_dim 64 (MLA latent)
    kvFormula: "linear_hybrid",
    fullLayers: 7,
    kvFactor: 1,
    moe: true,
    maxContextK: 1024,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "kimi-k2.6": {
    // Kimi K2.6: current flagship (multimodal + thinking). Same 61-layer
    // MLA architecture as K2/K2.5 — differs only in post-training.
    displayName: "Kimi K2.6 1T-A32B (MoE)",
    brand: "Moonshot",
    hfRepoId: "moonshotai/Kimi-K2.6",
    params: 1e12,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    activeParams: 32e9,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // Kimi K2.7-Code (model_type kimi_k25): coding-specialised K2 with the same
  // MLA core as K2/K2.5/K2.6 — kv_lora_rank=512, qk_rope_head_dim=64, 61 layers
  // (first_k_dense_replace=1), 384 routed experts (8 active) + 1 shared, 256K
  // context. Includes the MoonViT vision encoder (vision_config in config.json)
  // → multimodal. Reduces reasoning-token usage ~30% vs K2.6 while improving
  // long-horizon coding-benchmark scores.
  "kimi-k2.7-code": {
    displayName: "Kimi K2.7-Code 1T-A32B (MoE)",
    brand: "Moonshot",
    hfRepoId: "moonshotai/Kimi-K2.7-Code",
    params: 1e12,
    layers: 61,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    activeParams: 32e9,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // Kimi K3 (model_type kimi_k3, KimiK3ForConditionalGeneration): Moonshot's
  // frontier-scale hybrid MoE — the successor to Kimi K2.7-Code and the
  // linear-attention Kimi-Linear-48B. Native MXFP4-packed weights. Text-config
  // verified against config.json (text_config block) on Hugging Face:
  //   - num_hidden_layers 93. linear_attn_config.full_attn_layers lists 24
  //     layers (every 4th layer 4..92 plus layer 93); the other 69 are
  //     kda_layers (Kimi Delta Attention, linear) → linear_hybrid,
  //     fullLayers=24.
  //   - Full-attention layers use MLA latent (kv_lora_rank=512,
  //     qk_rope_head_dim=64), so we encode the latent as a single wide "head"
  //     with kvHeads=1, headDim=576 (=512+64), kvFactor=1 — mirroring how
  //     kimi-linear-48b models Kimi's MLA-latent-per-layer footprint.
  //   - 896 routed experts + 2 shared, num_experts_per_tok=16, moe_
  //     intermediate_size=3072, first_k_dense_replace=1.
  //   - max_position_embeddings 1048576 → 1024K context.
  //   - Wrapper config has vision_config → VLM (image-text-to-text).
  //   - Total params from safetensors: ≈2.78T (bf16-equivalent). Active is the
  //     widely reported ≈104B (dense layer + 16 routed + 2 shared MoE experts
  //     across 92 MoE layers).
  "kimi-k3": {
    displayName: "Kimi K3 2.78T-A104B (MoE, hybrid)",
    brand: "Moonshot",
    hfRepoId: "moonshotai/Kimi-K3",
    params: 2.78e12,
    activeParams: 104e9,
    layers: 93,
    kvHeads: 1,
    headDim: 576, // kv_lora_rank 512 + qk_rope_head_dim 64 (MLA latent)
    kvFormula: "linear_hybrid",
    fullLayers: 24, // MLA full-attention layers; 69 KDA linear layers ≈ 0 KV
    kvFactor: 1,
    moe: true,
    maxContextK: 1024, // max_position_embeddings 1048576 / 1024
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // ── Z.ai (Zhipu) — GLM (standard GQA MoE, partial RoPE) ───────────
  "glm-4.5-air": {
    // The lighter, widely self-hosted GLM — 106B-A12B, 46 layers.
    displayName: "GLM-4.5-Air 106B-A12B (MoE)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-4.5-Air",
    params: 106e9,
    activeParams: 12e9,
    layers: 46,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "glm-4.6": {
    displayName: "GLM-4.6 355B-A32B (MoE)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-4.6",
    params: 355e9,
    activeParams: 32e9,
    layers: 92,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 198, // max_position_embeddings 202752 / 1024
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // GLM-4.7-Flash (model_type glm4_moe_lite): the lightweight GLM tier moves
  // to MLA latent attention (kv_lora_rank=512, qk_rope_head_dim=64), unlike the
  // full GLM-4.5/4.6/4.7 which stay on plain GQA. 47 layers, 64 routed experts
  // + 1 shared (4 active). Total ≈30B / active ≈4B computed from config.
  "glm-4.7-flash": {
    displayName: "GLM-4.7-Flash 30B-A4B (MoE)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-4.7-Flash",
    params: 30e9,
    activeParams: 3.9e9,
    layers: 47,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 198, // max_position_embeddings 202752 / 1024
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "glm-4.7": {
    // Current GLM flagship — same 92-layer GQA core as 4.6, longer context.
    displayName: "GLM-4.7 355B-A32B (MoE)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-4.7",
    params: 355e9,
    activeParams: 32e9,
    layers: 92,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 198,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // GLM-5.1 (model_type glm_moe_dsa): the GLM-5 generation moves to MLA
  // latent attention (kv_lora_rank=512, qk_rope_head_dim=64) plus DeepSeek-
  // style sparse attention (DSA, index_topk=2048). Same MLA cache layout as
  // DeepSeek V3.2 / Kimi, so we model it as `mla` (a safe upper bound on KV —
  // the DSA sparsity only shrinks it further at long context). 78 layers,
  // 256 routed experts + 1 shared, 8 active. Total/active params are computed
  // from config (≈743B transformer-proper, ≈41B active) — not in the card.
  "glm-5.1": {
    // Total bumped 743e9 → 754e9 to match the safetensors total from the HF
    // API (753.86B) — matches GLM-5.2's actual size, which shares the same
    // MoE layout and differs only in dense-layer count and context window.
    displayName: "GLM-5.1 754B-A41B (MoE)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-5.1",
    params: 754e9,
    activeParams: 41e9,
    layers: 78,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 198, // max_position_embeddings 202752 / 1024
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // GLM-5.2 (model_type glm_moe_dsa): same MLA + DSA core as GLM-5.1 (78
  // layers, kv_lora_rank=512, qk_rope_head_dim=64, 256 routed experts + 1
  // shared, 8 active per token), extended to a native 1M-token context window
  // (max_position_embeddings 1048576). first_k_dense_replace=3 (one fewer
  // dense layer than 5.1) and adds an MTP head (num_nextn_predict_layers=1);
  // safetensors total is ≈753B. Active stays at ≈41B since experts are the
  // same size. MIT license, text-only.
  "glm-5.2": {
    displayName: "GLM-5.2 753B-A41B (MoE)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-5.2",
    params: 753e9,
    activeParams: 41e9,
    layers: 78,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 1024, // max_position_embeddings 1048576 / 1024
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // GLM-5.3-Flash (model_type glm5_next / Glm5NextForConditionalGeneration —
  // "Ox Alpha" unmasked): Zhipu's first natively multimodal GLM-5 release, and
  // the first GLM to combine MLA + DeepSeek-style sparse attention (DSA) with
  // linear attention on most layers. Text-config verified against config.json
  // on Hugging Face:
  //   - num_hidden_layers 45. layer_types is 34 `linear_attention` + 11
  //     `deepseek_sparse_attention` (full_attn_layers at 3, 7, 11, 15, 19, 23,
  //     27, 31, 35, 39, 43 — every 4th layer) → linear_hybrid, fullLayers=11.
  //   - Full-attention layers use no-RoPE MLA (mla_use_nope=true,
  //     kv_lora_rank=512, qk_rope_head_dim=0, qk_nope_head_dim=256,
  //     v_head_dim=256). Encoded like Kimi K3 / Ling-flash as a single wide
  //     MLA-latent "head" with kvHeads=1, headDim=512 (=kv_lora_rank +
  //     qk_rope_head_dim = 512 + 0), kvFactor=1.
  //   - 288 routed experts + 1 shared (n_shared_experts=1), num_experts_per_tok
  //     8. first_k_dense_replace=3.
  //   - max_position_embeddings 1048576 → 1024K context.
  //   - Wrapper config has vision_config → VLM (image + video in).
  //   - quantization_config fmt=e4m3 → natively FP8.
  // Total safetensors from HF API: F8_E4M3 314B + BF16 6.9B ≈ 321B. Active ~18B
  // per the model card ("320B-A18B" per the launch coverage). MIT license.
  "glm-5.3-flash": {
    displayName: "GLM-5.3-Flash 320B-A18B (MoE, hybrid)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-5.3-Flash",
    params: 321e9,
    activeParams: 18e9,
    layers: 45,
    kvHeads: 1,
    headDim: 512, // MLA latent (kv_lora_rank 512 + qk_rope_head_dim 0, mla_use_nope=true)
    kvFormula: "linear_hybrid",
    fullLayers: 11,
    kvFactor: 1,
    moe: true,
    maxContextK: 1024, // max_position_embeddings 1048576 / 1024
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // ── MiniMax ───────────────────────────────────────────────────────
  // MiniMax-M3 (model_type minimax_m3_vl): introduces MiniMax Sparse Attention
  // (MSA) — block-sparse top-k (16 blocks of 128 tokens) over standard GQA on
  // layers 3-59 (the first 3 layers are dense full-attention). num_attention_
  // heads=64, num_key_value_heads=4, head_dim=128. 128 routed experts + 1
  // shared, 4 routed active per token. Native multimodal (text+image+video).
  // 1M context (max_position_embeddings 1048576).
  // MSA reduces KV compute and (per the card) memory footprint at long context,
  // but none of our four formulas describes block-sparse top-k KV exactly — so
  // we model it as `standard` GQA (full KV at every layer) as a safe upper
  // bound, mirroring how DeepSeek V3.2 (MLA + DSA) is modeled as plain MLA.
  "minimax-m3": {
    displayName: "MiniMax-M3 428B-A23B (MoE)",
    brand: "MiniMax",
    hfRepoId: "MiniMaxAI/MiniMax-M3",
    params: 428e9,
    activeParams: 23e9,
    layers: 60,
    kvHeads: 4,
    headDim: 128,
    moe: true,
    maxContextK: 1024,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  "minimax-m1": {
    // MiniMax-M1: 456B-A45.9B reasoning model with hybrid "lightning"
    // (linear) attention — full attention only every 8th layer (10 of 80).
    // Modeled as linear_hybrid; the linear layers carry ≈0 KV cache, so
    // even its 10.24M context stays affordable.
    displayName: "MiniMax-M1 456B-A46B (MoE, hybrid)",
    brand: "MiniMax",
    hfRepoId: "MiniMaxAI/MiniMax-M1-80k",
    params: 456e9,
    activeParams: 45.9e9,
    layers: 80,
    kvHeads: 8,
    headDim: 128,
    kvFormula: "linear_hybrid",
    fullLayers: 10,
    moe: true,
    maxContextK: 10000, // max_position_embeddings 10240000 / 1024
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // MiniMax pivoted M2 back to plain full GQA on every layer (the lightning
  // attention of M1/Text-01 was dropped), so M2 / M2.5 use the `standard`
  // formula.
  "minimax-m2": {
    // MiniMax-M2: agentic/coding MoE with only ~10B active params, so it is
    // cheap to serve. Full attention on all 62 layers, GQA kvHeads=8.
    displayName: "MiniMax-M2 230B-A10B (MoE)",
    brand: "MiniMax",
    hfRepoId: "MiniMaxAI/MiniMax-M2",
    params: 230e9,
    activeParams: 10e9,
    layers: 62,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 192,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "minimax-m2.5": {
    // Current M2-series flagship — same 62-layer full-GQA architecture as M2.
    displayName: "MiniMax-M2.5 230B-A10B (MoE)",
    brand: "MiniMax",
    hfRepoId: "MiniMaxAI/MiniMax-M2.5",
    params: 230e9,
    activeParams: 10e9,
    layers: 62,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 192,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "minimax-m2.7": {
    // MiniMax-M2.7: same minimax_m2 full-GQA core as M2/M2.5 (62 layers,
    // kvHeads=8, headDim=128, 230B-A10B). Context extended to 200K
    // (max_position_embeddings 204800 / 1024).
    displayName: "MiniMax-M2.7 230B-A10B (MoE)",
    brand: "MiniMax",
    hfRepoId: "MiniMaxAI/MiniMax-M2.7",
    params: 230e9,
    activeParams: 10e9,
    layers: 62,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 200,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── IBM Granite (standard GQA) ────────────────────────────────────
  // Granite 4.1 dense transformers (model_type granite / GraniteForCausalLM):
  // plain GQA, kvHeads=8, headDim=128 (hidden 4096 / 32 heads), 128K context.
  "granite-4.1-8b": {
    displayName: "Granite 4.1 8B",
    brand: "IBM",
    hfRepoId: "ibm-granite/granite-4.1-8b",
    params: 8.8e9,
    layers: 40,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "granite-4.1-30b": {
    displayName: "Granite 4.1 30B",
    brand: "IBM",
    hfRepoId: "ibm-granite/granite-4.1-30b",
    params: 28.9e9,
    layers: 64,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // Granite 4.2 (Aug 2026 — same dense-GQA model_type as 4.1). All three
  // sizes verified against config.json on Hugging Face: plain GQA (no
  // sliding window, no MLA), kvHeads=8, 128K context, model_type=granite.
  // headDim is derived hidden_size / num_attention_heads (config leaves the
  // field null, transformers computes it).
  "granite-4.2-3b": {
    // 40 layers, hidden_size=2560, num_attention_heads=40 → head_dim=64.
    displayName: "Granite 4.2 3B",
    brand: "IBM",
    hfRepoId: "ibm-granite/granite-4.2-3b",
    params: 3.66e9,
    layers: 40,
    kvHeads: 8,
    headDim: 64,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "granite-4.2-8b": {
    // 40 layers, hidden_size=4096, num_attention_heads=32 → head_dim=128.
    displayName: "Granite 4.2 8B",
    brand: "IBM",
    hfRepoId: "ibm-granite/granite-4.2-8b",
    params: 8.79e9,
    layers: 40,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "granite-4.2-30b": {
    // 64 layers, hidden_size=4096, num_attention_heads=32 → head_dim=128.
    displayName: "Granite 4.2 30B",
    brand: "IBM",
    hfRepoId: "ibm-granite/granite-4.2-30b",
    params: 29.28e9,
    layers: 64,
    kvHeads: 8,
    headDim: 128,
    moe: false,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // ── Cohere (hybrid sliding-window MoE, VLM) ───────────────────────
  // Command A+ (05-2026, model_type cohere2_moe inside cohere2_vision):
  // sliding-window/full mix — 24 sliding (window=4096) + 8 full layers of 32,
  // so we model it `hybrid` with fullLayers=8, slidingWindow=4096. 128 experts
  // (8 active, 4 shared), kvHeads=8, headDim=128. 218B total / 25B active and
  // a 200K native context window (max_position_embeddings 200000 / 1024 ≈ 195).
  // Apache-2.0, multimodal.
  "command-a-plus-2026": {
    displayName: "Command A+ 218B-A25B (MoE)",
    brand: "Cohere",
    hfRepoId: "CohereLabs/command-a-plus-05-2026-bf16",
    params: 218e9,
    activeParams: 25e9,
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 8,
    slidingWindow: 4096,
    moe: true,
    maxContextK: 195,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  // North-Mini-Code 1.0 (model_type cohere2_moe): Cohere's first agentic-
  // coding open-weight MoE. Same sliding-window/full mix as Command A+ but
  // smaller and text-only: 49 layers, kvHeads=4, headDim=128, sliding_window
  // 4096, interleaved 3:1 SWA:Global → 12 full + 37 sliding layers. 128
  // routed experts (8 active) and no shared expert. 30B total / 3B active.
  // Native 500K context (max_position_embeddings 500000 → ≈488K). Apache-2.0.
  "north-mini-code-1": {
    displayName: "North-Mini-Code 1.0 30B-A3B (MoE)",
    brand: "Cohere",
    hfRepoId: "CohereLabs/North-Mini-Code-1.0",
    params: 30e9,
    activeParams: 3e9,
    layers: 49,
    kvHeads: 4,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 12,
    slidingWindow: 4096,
    moe: true,
    maxContextK: 488,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── InclusionAI (Ant Group) — Ling/Ring (MLA, bailing_hybrid) ─────
  // Ant Group's open-source MoE series. Both Ring (thinking) and Ling
  // (non-thinking) share the BailingMoeV2_5 architecture (model_type
  // `bailing_hybrid`): MLA latent attention (kv_lora_rank=512,
  // qk_rope_head_dim=64) with 4 dense layers at the start followed by 76
  // MoE layers (first_k_dense_replace=4). 256 routed experts + 1 shared,
  // 8 routed active per token. ~1T total, ~63B active. MIT license.
  // Architecture verified against config.json on Hugging Face.
  "ring-2.6-1t": {
    // Ring = thinking variant with adaptive reasoning-effort (high/xhigh).
    // Native context 128K (max_position_embeddings 131072), 256K via YaRN.
    displayName: "Ring 2.6 1T-A63B (MoE)",
    brand: "InclusionAI",
    hfRepoId: "inclusionAI/Ring-2.6-1T",
    params: 1e12,
    activeParams: 63e9,
    layers: 80,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  "ling-2.6-1t": {
    // Ling = non-thinking sibling. Identical MLA layout to Ring, but the
    // Hugging Face config ships a longer native window
    // (max_position_embeddings 262144 → 256K).
    displayName: "Ling 2.6 1T-A63B (MoE)",
    brand: "InclusionAI",
    hfRepoId: "inclusionAI/Ling-2.6-1T",
    params: 1e12,
    activeParams: 63e9,
    layers: 80,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // Ling flash-scale variants (bailing_hybrid): MLA on a small fraction of
  // full-attention layers, Lightning Linear / KDA on the rest. `layer_group_
  // size` in config.json defines the cadence — one full-attn layer per group,
  // linear on the rest. Same encoding used by kimi-linear-48b / Kimi K3:
  // `linear_hybrid` with the MLA latent modelled as a single (kv_lora_rank +
  // qk_rope = 576)-wide "head" with kvFactor=1, only counted on full layers.
  "ling-2.6-flash": {
    // layer_group_size=8, num_hidden_layers=32 → 32/8 = 4 MLA + 28 linear.
    // 256 routed experts + 1 shared, 8 active. 128K context.
    displayName: "Ling 2.6-flash 107B-A7B (MoE, hybrid)",
    brand: "InclusionAI",
    hfRepoId: "inclusionAI/Ling-2.6-flash",
    params: 107e9,
    activeParams: 7e9,
    layers: 32,
    kvHeads: 1,
    headDim: 576, // MLA latent (kv_lora_rank 512 + qk_rope_head_dim 64)
    kvFormula: "linear_hybrid",
    fullLayers: 4,
    kvFactor: 1,
    moe: true,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "ling-3.0-flash": {
    // layer_group_size=6, num_hidden_layers=42 → 42/6 = 7 MLA + 35 KDA.
    // 512 routed experts + 1 shared, 8 active. 256K context.
    displayName: "Ling 3.0-flash 127B-A5B (MoE, hybrid)",
    brand: "InclusionAI",
    hfRepoId: "inclusionAI/Ling-3.0-flash",
    params: 127e9,
    activeParams: 5e9,
    layers: 42,
    kvHeads: 1,
    headDim: 576,
    kvFormula: "linear_hybrid",
    fullLayers: 7,
    kvFactor: 1,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  "ling-3.0-tiny": {
    // Smallest member of the Ling 3.0 family (model_type bailing_hybrid). Same
    // MLA-full + KDA-linear hybrid recipe as Ling 3.0-flash, just at a much
    // smaller size — laptop-runnable. Architecture verified against config.json
    // on Hugging Face: layer_group_size=4, num_hidden_layers=24 → 24/4 = 6 MLA
    // full-attention + 18 KDA linear. kv_lora_rank=512, qk_rope_head_dim=64,
    // so the MLA latent is encoded as a single (kv_lora_rank + qk_rope = 576)-
    // wide "head" with kvFactor=1 — same convention as Ling-flash / Kimi K3.
    // 128 routed experts + 1 shared, num_experts_per_tok=8. 128K context
    // (max_position_embeddings 131072). Total safetensors 7.89B; active ≈1.3B
    // per the model card. Text-only. MIT license.
    displayName: "Ling 3.0-tiny 7.9B-A1.3B (MoE, hybrid)",
    brand: "InclusionAI",
    hfRepoId: "inclusionAI/Ling-3.0-tiny",
    params: 7.9e9,
    activeParams: 1.3e9,
    layers: 24,
    kvHeads: 1,
    headDim: 576, // MLA latent (kv_lora_rank 512 + qk_rope_head_dim 64)
    kvFormula: "linear_hybrid",
    fullLayers: 6,
    kvFactor: 1,
    moe: true,
    maxContextK: 128,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // ── Xiaomi MiMo (hybrid SWA + Global, MoE, 1M context) ────────────
  // MiMo-V2.5-Pro: Xiaomi's flagship MoE (model_type `mimo_v2`). Hybrid
  // attention pattern: every 7th layer is full / global, the other 6 are
  // sliding-window (window=128) — 10 full + 60 SWA across 70 layers. 384
  // routed experts, 8 active per token, no shared expert. 1.02T total /
  // 42B active. MIT license. 1M context (max_position_embeddings 1048576).
  // Headline notes:
  // - QK head_dim is 192 and v_head_dim is 128 (asymmetric K/V dims). Our
  //   hybrid formula uses a single `headDim` with factor=2; encoding the
  //   asymmetry as headDim=160 = average(192, 128) reproduces the correct
  //   per-token KV bytes (2 × kvHeads × 160 = kvHeads × 320 = 8 × 320).
  // - The SWA layers share the same QK/V dims as the full layers, so no
  //   separate fullKvHeads/fullHeadDim are needed.
  "mimo-v2.5-pro": {
    displayName: "MiMo V2.5 Pro 1T-A42B (MoE, hybrid)",
    brand: "Xiaomi",
    hfRepoId: "XiaomiMiMo/MiMo-V2.5-Pro",
    params: 1.02e12,
    activeParams: 42e9,
    layers: 70,
    kvHeads: 8,
    headDim: 160, // average of QK head_dim 192 and v_head_dim 128
    kvFormula: "hybrid",
    fullLayers: 10, // 6:1 SWA:GA ratio → every 7th layer is full
    slidingWindow: 128,
    moe: true,
    maxContextK: 1024,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // ── LG AI Research — EXAONE 4.5 (hybrid SWA + global, VLM) ────────────
  // EXAONE 4.5 33B (model_type exaone4_5): dense multimodal model wrapping
  // an Exaone4ForCausalLM text core inside an Exaone4_5_ForConditionalGeneration
  // VLM head. Sliding-window/full pattern "LLLG" repeating across 64 layers
  // → every 4th layer is global full-attention (16 full + 48 sliding,
  // sliding_window=4096). num_key_value_heads=8, head_dim=128
  // (hidden 5120 / 40 attention heads). vision_config present → VLM.
  // 256K context via YaRN (max_position_embeddings 262144).
  "exaone-4.5-33b": {
    displayName: "EXAONE 4.5 33B",
    brand: "LG",
    hfRepoId: "LGAI-EXAONE/EXAONE-4.5-33B",
    params: 34.35e9, // safetensors total params from HF API
    layers: 64,
    kvHeads: 8,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 16,
    slidingWindow: 4096,
    moe: false,
    maxContextK: 256,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
  // K-EXAONE 2.0 (model_type exaone_moe): LG's frontier open-weight MoE with
  // a hybrid sliding-window/full pattern. Architecture verified against
  // config.json — 78 layers, layer_types is 20 `full_attention` + 58
  // `sliding_attention` (the `sliding_windows` array carries the per-layer
  // window sizes: 20 zeros → full, 57 layers at 128, one layer at 4096 that
  // we approximate as sliding=128 since the vast majority use the tight
  // window). kvHeads=8, headDim=128 across all layers. 256 routed experts +
  // 1 shared, 8 active per token. 256K context via YaRN (max_position_
  // embeddings 262144). Safetensors total 749B. Active ≈37B per the model
  // card. Text-only.
  "k-exaone-2.0": {
    displayName: "K-EXAONE 2.0 750B-A37B (MoE, hybrid)",
    brand: "LG",
    hfRepoId: "LGAI-EXAONE/K-EXAONE-2.0-750B-A37B",
    params: 750e9,
    activeParams: 37e9,
    layers: 78,
    kvHeads: 8,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 20,
    slidingWindow: 128,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── Thinking Machines (Mira Murati's lab) — Inkling (hybrid SWA + global MoE) ──
  // Inkling (model_type inkling_mm_model, InklingForConditionalGeneration): first
  // frontier-scale open-weight MoE from Thinking Machines. Text-config verified
  // against config.json on Hugging Face:
  //   - num_hidden_layers 66. `local_layer_ids` lists 55 SWA layers, so the 11
  //     remaining are global full-attention (indices 5, 11, 17, 23, 29, 35, 41,
  //     47, 53, 59, 65 — an every-6th-layer pattern) → hybrid, fullLayers=11.
  //   - SWA layers (`swa_num_key_value_heads`=16, `swa_head_dim`=128,
  //     `sliding_window_size`=512) go on the base `kvHeads`/`headDim`/`sliding
  //     Window` slots — matching how Gemma 4 12B encodes its SWA vs full mix.
  //   - Global layers (`num_key_value_heads`=8, `head_dim`=128) go on
  //     `fullKvHeads`/`fullHeadDim`.
  //   - 256 routed experts + 2 shared, num_experts_per_tok=6.
  //   - model_max_length 1048576 → 1024K context.
  //   - Wrapper config has vision_config + audio_config (VLM + audio-in).
  // Total params from safetensors: ~952B (bf16). Active is the widely reported
  // ~41B (top-6 of 256 routed + 2 shared, evenly ≈ 8/258 of MoE mass). Apache-2.0.
  "inkling": {
    displayName: "Inkling 952B-A41B (MoE, hybrid)",
    brand: "ThinkingMachines",
    hfRepoId: "thinkingmachines/Inkling",
    params: 952e9,
    activeParams: 41e9,
    layers: 66,
    kvHeads: 16, // SWA layers: swa_num_key_value_heads
    headDim: 128, // SWA layers: swa_head_dim
    kvFormula: "hybrid",
    fullLayers: 11, // global full-attention layers (66 − 55 SWA in local_layer_ids)
    fullKvHeads: 8, // global layers: num_key_value_heads
    fullHeadDim: 128, // global layers: head_dim
    slidingWindow: 512,
    moe: true,
    maxContextK: 1024, // model_max_length 1048576 / 1024
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // Inkling Small (model_type inkling_mm_model): smaller sibling of Inkling
  // with the same hybrid SWA + global MoE recipe. Architecture verified
  // against config.json — 42 hidden layers, local_layer_ids lists 35 SWA
  // layers → 7 global full-attention (42 − 35 = 7). Unlike big Inkling, the
  // SWA and full layers share KV dims: swa_num_key_value_heads=8 ==
  // num_key_value_heads=8 and swa_head_dim=128 == head_dim=128, so no
  // separate fullKvHeads/fullHeadDim needed. sliding_window_size=512. 256
  // routed experts + 2 shared, num_experts_per_tok=6. 1M context; VLM
  // (vision_config present). Total params from safetensors ≈266B; active
  // ≈11B (scaled from big Inkling's 41B/952B MoE ratio).
  "inkling-small": {
    displayName: "Inkling Small 266B-A11B (MoE, hybrid)",
    brand: "ThinkingMachines",
    hfRepoId: "thinkingmachines/Inkling-Small",
    params: 266e9,
    activeParams: 11e9,
    layers: 42,
    kvHeads: 8,
    headDim: 128,
    kvFormula: "hybrid",
    fullLayers: 7,
    slidingWindow: 512,
    moe: true,
    maxContextK: 1024,
    capabilities: { vlm: true, thinking: true, toolUse: true },
  },
  // ── Tencent Hunyuan (standard GQA MoE) ────────────────────────────
  // Tencent Hunyuan Hy3 (model_type hy_v3): 80 layers of plain GQA
  // (kvHeads=8, headDim=128), 192 routed experts + 1 shared, 8 active per
  // token, first_k_dense_replace=1, 256K native context. No sliding window,
  // no MLA — takes the `standard` code path. Text-only. Apache-2.0. Total
  // params from safetensors ≈299B; active ≈21B per the model card.
  "hy3": {
    displayName: "Hunyuan Hy3 299B-A21B (MoE)",
    brand: "Tencent",
    hfRepoId: "tencent/Hy3",
    params: 299e9,
    activeParams: 21e9,
    layers: 80,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // Tencent Hunyuan A13B (model_type hunyuan_v1_moe): the popular smaller
  // Hunyuan MoE, backfilled for completeness. 32 layers, plain GQA
  // (kvHeads=8, headDim=128), 64 routed experts, top-8, 32K context.
  "hunyuan-a13b": {
    displayName: "Hunyuan A13B 80B-A13B (MoE)",
    brand: "Tencent",
    hfRepoId: "tencent/Hunyuan-A13B-Instruct",
    params: 80e9,
    activeParams: 13e9,
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    moe: true,
    maxContextK: 32,
    capabilities: { vlm: false, thinking: false, toolUse: true },
  },
  // ── Sber GigaChat (MLA + Gated DeltaNet linear MoE) ───────────────
  // GigaChat 3.5 Ultra (model_type gigachat3_5): Sber's frontier open-weight
  // MoE. Hybrid attention: MLA (kv_lora_rank=512, qk_rope_head_dim=64) on
  // 10 full-attention layers (indices 3,7,11,…,39 per config's
  // full_attention_layers) + GigaChat35GatedDeltaNet linear attention on
  // the other 30 → `linear_hybrid` with fullLayers=10. MLA latent encoded
  // as a single (kv_lora_rank + qk_rope = 576)-wide head with kvFactor=1,
  // matching the Kimi K3 / Ling-flash convention. 256 routed experts + 1
  // shared, top-8, first_k_dense_replace=3, 256K context, native FP8
  // (quantization_config fmt=e4m3). Total ≈434B; active ~28B per the model
  // card. MIT-licensed.
  "gigachat-3.5-ultra": {
    displayName: "GigaChat 3.5 Ultra 434B-A28B (MoE, hybrid)",
    brand: "Sber",
    hfRepoId: "ai-sage/GigaChat3.5-432B-A28B",
    params: 434e9,
    activeParams: 28e9,
    layers: 40,
    kvHeads: 1,
    headDim: 576, // MLA latent (kv_lora_rank 512 + qk_rope_head_dim 64)
    kvFormula: "linear_hybrid",
    fullLayers: 10,
    kvFactor: 1,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
  // ── Meituan LongCat (MLA + sparse-attention indexer) ──────────────
  // LongCat 2.0 (attention_method=MLA, use_mla=1): Meituan's frontier open
  // MoE. Pure MLA (kv_lora_rank=512, qk_rope_head_dim=64) with a DeepSeek-
  // style sparse-attention indexer (index_topk=2048); the indexer only
  // shrinks KV further at long context, so modelling it as plain `mla` is
  // a safe upper bound (same convention as DeepSeek V3.2 and GLM-5.x with
  // DSA). config.json uses `num_layers` (not num_hidden_layers) = 38.
  // 768 routed + 128 "zero" experts, moe_topk=12, no shared expert. 256K
  // context. 3-step MTP head. Total params from safetensors ≈1.78T; active
  // ≈48B per the model card. MIT license, text-only.
  "longcat-2.0": {
    displayName: "LongCat 2.0 1.78T-A48B (MoE)",
    brand: "Meituan",
    hfRepoId: "meituan-longcat/LongCat-2.0",
    params: 1.78e12,
    activeParams: 48e9,
    layers: 38,
    kvHeads: 0,
    headDim: 0,
    kvFormula: "mla",
    kvLoraRank: 512,
    qkRopeHeadDim: 64,
    moe: true,
    maxContextK: 256,
    capabilities: { vlm: false, thinking: true, toolUse: true },
  },
};

/**
 * Release dates, sourced from each HuggingFace repo's `createdAt` field
 * (`https://huggingface.co/api/models/<repo>`) — the authoritative
 * "released on HF" date. Kept as one block so it's trivial to re-verify
 * against the API. Stored ISO `YYYY-MM-DD`; the UI formats to "Mon YYYY".
 * Fetched 2026-08-27.
 */
export const MODEL_RELEASE_DATES: Record<string, string> = {
  "gemma2-9b": "2024-06-24",
  "gemma3-4b": "2025-02-20",
  "gemma3-12b": "2025-03-01",
  "gemma3-27b": "2025-03-01",
  "gemma4-e2b": "2026-03-02",
  "gemma4-e4b": "2026-03-02",
  "gemma4-12b": "2026-05-23",
  "gemma4-26b-a4b": "2026-03-11",
  "gemma4-31b": "2026-03-11",
  "gpt-oss-20b": "2025-08-04",
  "gpt-oss-120b": "2025-08-04",
  "qwen2.5-7b": "2024-09-15",
  "qwen2.5-72b": "2024-09-15",
  "qwen3.5-9b": "2026-02-27",
  "qwen3.6-27b": "2026-04-21",
  "qwen3.6-35b-a3b": "2026-04-15",
  "qwen3-4b": "2025-04-27",
  "qwen3-8b": "2025-04-27",
  "qwen3-32b": "2025-04-27",
  "qwen3-235b-a22b": "2025-04-27",
  "qwen3-next-80b-a3b": "2025-09-09",
  "qwen3-coder-480b": "2025-07-22",
  "llama3.2-3b": "2024-09-18",
  "llama3.1-8b": "2024-07-14",
  "llama3.3-70b": "2024-11-26",
  "llama3.1-405b": "2024-07-16",
  "llama4-scout": "2025-04-02",
  "llama4-maverick": "2025-04-01",
  "mistral-nemo-12b": "2024-07-17",
  "mistral-7b": "2023-09-20",
  "mistral-small-24b": "2025-01-28",
  "mistral-medium-3.5": "2026-03-31",
  "mistral-large-3": "2025-11-28",
  "mistral-small-4": "2026-01-23",
  "devstral-2-123b": "2025-11-28",
  "leanstral-1.5": "2026-07-01",
  "mixtral-8x7b": "2023-12-01",
  "mixtral-8x22b": "2024-04-16",
  "phi-3.5-mini": "2024-08-16",
  "phi-4": "2024-12-11",
  "nemotron-3-ultra": "2026-06-03",
  "deepseek-r1-distill-7b": "2025-01-20",
  "deepseek-r1-distill-14b": "2025-01-20",
  "deepseek-r1-distill-32b": "2025-01-20",
  "deepseek-r1-distill-70b": "2025-01-20",
  "deepseek-v3": "2024-12-25",
  "deepseek-r1": "2025-01-20",
  "deepseek-v3.2": "2025-09-29",
  "deepseek-v4-flash": "2026-07-31", // updated to V4-Flash-0731 official release
  "deepseek-v4-pro": "2026-08-13", // updated to V4-Pro-0813 official release
  "kimi-k2-thinking": "2025-11-04",
  "kimi-k2-0905": "2025-09-03",
  "kimi-linear-48b": "2025-10-30",
  "kimi-k2.6": "2026-04-14",
  "kimi-k2.7-code": "2026-06-11",
  "glm-4.5-air": "2025-07-20",
  "glm-4.6": "2025-09-29",
  "glm-4.7-flash": "2026-01-19",
  "glm-4.7": "2025-12-22",
  "glm-5.1": "2026-04-03",
  "glm-5.2": "2026-06-16",
  "minimax-m1": "2025-06-13",
  "minimax-m2": "2025-10-22",
  "minimax-m2.5": "2026-02-12",
  "minimax-m2.7": "2026-04-09",
  "minimax-m3": "2026-06-02",
  "granite-4.1-8b": "2026-04-06",
  "granite-4.1-30b": "2026-04-06",
  "command-a-plus-2026": "2026-05-11",
  "north-mini-code-1": "2026-06-05",
  "ring-2.6-1t": "2026-05-14",
  "ling-2.6-1t": "2026-04-29",
  "mimo-v2.5-pro": "2026-04-27",
  "exaone-4.5-33b": "2026-04-04",
  "inkling": "2026-07-14",
  // New in the 2026-08-26 refresh
  "kimi-k3": "2026-06-13",
  "qwen3.8-27b": "2026-08-05",
  "qwen3.8-flash-next": "2026-08-24",
  "granite-4.2-3b": "2026-08-07",
  "granite-4.2-8b": "2026-08-07",
  "granite-4.2-30b": "2026-08-07",
  "nemotron-3-super": "2026-03-10",
  "ling-2.6-flash": "2026-04-28",
  "ling-3.0-flash": "2026-08-02",
  "k-exaone-2.0": "2026-07-29",
  "inkling-small": "2026-07-27",
  "hy3": "2026-07-02",
  "hunyuan-a13b": "2025-06-25",
  "gigachat-3.5-ultra": "2026-07-05",
  "longcat-2.0": "2026-07-05",
  // New in the 2026-08-27 refresh
  "qwen3.8-max": "2026-08-12",
  "glm-5.3-flash": "2026-08-25",
  "ling-3.0-tiny": "2026-08-10",
};

/**
 * Models that ship a real NVFP4 (NVIDIA 4-bit float) build on HuggingFace,
 * mapped to a representative NVFP4 repo. Presence of an entry is what unlocks
 * the NVFP4 option in the weights-quant selector — we only offer NVFP4 for a
 * model when an NVFP4 checkpoint of that model actually exists on the Hub.
 *
 * Sourced (preferring faithful publishers: RedHatAI / NVIDIA / the vendor)
 * and verified to exist via `https://huggingface.co/api/models/<repo>`.
 * Re-verify on each catalog refresh; drop entries whose repo disappears.
 * Fetched 2026-08-27.
 */
export const MODEL_NVFP4_REPOS: Record<string, string> = {
  "gemma4-12b": "AxionML/Gemma-4-12B-NVFP4",
  "gemma4-26b-a4b": "RedHatAI/gemma-4-26B-A4B-it-NVFP4",
  "gemma4-31b": "RedHatAI/gemma-4-31B-it-NVFP4",
  "qwen3.5-9b": "AxionML/Qwen3.5-9B-NVFP4",
  "qwen3.6-27b": "sakamakismile/Qwen3.6-27B-Text-NVFP4-MTP",
  "qwen3.6-35b-a3b": "RedHatAI/Qwen3.6-35B-A3B-NVFP4",
  "qwen3-8b": "RedHatAI/Qwen3-8B-NVFP4",
  "qwen3-32b": "RedHatAI/Qwen3-32B-NVFP4",
  "qwen3-235b-a22b": "RedHatAI/Qwen3-235B-A22B-NVFP4",
  "qwen3-next-80b-a3b": "RedHatAI/Qwen3-Next-80B-A3B-Instruct-NVFP4",
  "qwen3-coder-480b": "NVFP4/Qwen3-Coder-480B-A35B-Instruct-FP4",
  "llama3.1-8b": "RedHatAI/Llama-3.1-8B-Instruct-NVFP4",
  "llama3.3-70b": "RedHatAI/Llama-3.3-70B-Instruct-NVFP4",
  "llama4-scout": "RedHatAI/Llama-4-Scout-17B-16E-Instruct-NVFP4",
  "llama4-maverick": "RedHatAI/Llama-4-Maverick-17B-128E-Instruct-NVFP4",
  "mistral-medium-3.5": "RecViking/Mistral-Medium-3.5-128B-NVFP4",
  "mistral-large-3": "mistralai/Mistral-Large-3-675B-Instruct-2512-NVFP4",
  "mistral-small-4": "mistralai/Mistral-Small-4-119B-2603-NVFP4",
  "nemotron-3-ultra": "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4",
  "deepseek-r1-distill-32b": "nm-testing/DeepSeek-R1-Distill-Qwen-32B-NVFP4",
  "deepseek-r1": "RedHatAI/DeepSeek-R1-NVFP4-FP8-BLOCK",
  "deepseek-v3.2": "RedHatAI/DeepSeek-V3.2-NVFP4-FP8-BLOCK",
  "deepseek-v4-flash": "RedHatAI/DeepSeek-V4-Flash-NVFP4-FP8",
  "deepseek-v4-pro": "RedHatAI/DeepSeek-V4-Pro-NVFP4-FP8",
  "kimi-k2-thinking": "Abduali/Kimi-K2-Thinking-NVFP4",
  "kimi-linear-48b": "Firworks/Kimi-Linear-48B-A3B-Instruct-nvfp4",
  "kimi-k2.6": "RedHatAI/Kimi-K2.6-NVFP4",
  "glm-4.5-air": "OnFinanceAI/GLM-4.5-Air-FP4",
  "glm-4.6": "RedHatAI/GLM-4.6-NVFP4",
  "glm-5.1": "nvidia/GLM-5.1-NVFP4",
  "glm-5.2": "justinjja/GLM-5.2-NVFP4",
  "minimax-m2.5": "RedHatAI/MiniMax-M2.5-NVFP4",
  "minimax-m2.7": "nvidia/MiniMax-M2.7-NVFP4",
  "minimax-m3": "nvidia/MiniMax-M3-NVFP4",
  "inkling": "thinkingmachines/Inkling-NVFP4",
  // New in the 2026-08-26 refresh
  "kimi-k3": "nvidia/Kimi-K3-NVFP4",
  "qwen3.8-27b": "RedHatAI/Qwen3.8-27B-NVFP4",
  "nemotron-3-super": "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-NVFP4",
  "k-exaone-2.0": "LGAI-EXAONE/K-EXAONE-2.0-750B-A37B-NVFP4",
  "inkling-small": "thinkingmachines/Inkling-Small-NVFP4",
  "hy3": "kodelow/Hy3-NVFP4-W4A16",
  "ling-3.0-flash": "inclusionAI/Ling-3.0-flash-fp4",
  // New in the 2026-08-27 refresh
  "qwen3.8-max": "RadixArk/Qwen3.8-2.4T-A95B-NVFP4",
};

/**
 * Models that ship a real FP8 (E4M3) build on HuggingFace, mapped to a
 * representative FP8 repo. Presence of an entry is what unlocks the FP8
 * option in the weights-quant selector — we only offer FP8 for a model
 * when an FP8 checkpoint of that model actually exists on the Hub.
 *
 * DeepSeek V3 / R1 / V3.2 / V4 are natively shipped in FP8, so they point
 * at the main repo. Most other entries point at a faithful publisher
 * mirror (RedHatAI / NVIDIA / Qwen / zai-org / the vendor). Verified to
 * exist via `https://huggingface.co/api/models/<repo>`. Re-verify on each
 * catalog refresh; drop entries whose repo disappears.
 * Fetched 2026-08-27.
 */
export const MODEL_FP8_REPOS: Record<string, string> = {
  // Native FP8 — main repos ship as FP8 / FP8-Block
  "deepseek-v3": "deepseek-ai/DeepSeek-V3",
  "deepseek-r1": "deepseek-ai/DeepSeek-R1",
  "deepseek-v3.2": "deepseek-ai/DeepSeek-V3.2-Exp",
  "deepseek-v4-flash": "deepseek-ai/DeepSeek-V4-Flash-0731",
  "deepseek-v4-pro": "deepseek-ai/DeepSeek-V4-Pro-0813",
  // Third-party / vendor FP8 mirrors
  "qwen3-8b": "Qwen/Qwen3-8B-FP8",
  "qwen3-32b": "Qwen/Qwen3-32B-FP8",
  "qwen3-235b-a22b": "Qwen/Qwen3-235B-A22B-FP8",
  "qwen3-next-80b-a3b": "Qwen/Qwen3-Next-80B-A3B-Instruct-FP8",
  "qwen3-coder-480b": "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8",
  "qwen3.5-9b": "RedHatAI/Qwen3.5-9B-FP8-dynamic",
  "qwen3.6-27b": "Qwen/Qwen3.6-27B-FP8",
  "qwen3.6-35b-a3b": "Qwen/Qwen3.6-35B-A3B-FP8",
  "llama3.1-8b": "RedHatAI/Meta-Llama-3.1-8B-Instruct-FP8",
  "llama3.3-70b": "RedHatAI/Llama-3.3-70B-Instruct-FP8-dynamic",
  "llama3.1-405b": "RedHatAI/Meta-Llama-3.1-405B-Instruct-FP8",
  "llama4-scout": "RedHatAI/Llama-4-Scout-17B-16E-Instruct-FP8-dynamic",
  "llama4-maverick": "RedHatAI/Llama-4-Maverick-17B-128E-Instruct-FP8",
  "mistral-nemo-12b": "RedHatAI/Mistral-Nemo-Instruct-2407-FP8",
  "mistral-small-24b": "RedHatAI/Mistral-Small-24B-Instruct-2501-FP8-dynamic",
  "mistral-large-3": "mistralai/Mistral-Large-3-675B-Instruct-2512-FP8",
  "devstral-2-123b": "mistralai/Devstral-2-123B-Instruct-2512-FP8",
  // Leanstral 1.5 ships natively FP8 (params.json qformat_weight=fp8_e4m3).
  "leanstral-1.5": "mistralai/Leanstral-1.5-119B-A6B",
  "gemma3-27b": "RedHatAI/gemma-3-27b-it-FP8-dynamic",
  "gemma4-12b": "RedHatAI/gemma-4-12B-it-FP8-dynamic",
  "gemma4-26b-a4b": "RedHatAI/gemma-4-26B-A4B-it-FP8-dynamic",
  "gemma4-31b": "RedHatAI/gemma-4-31B-it-FP8-dynamic",
  "phi-4": "RedHatAI/phi-4-FP8-dynamic",
  "deepseek-r1-distill-32b": "RedHatAI/DeepSeek-R1-Distill-Qwen-32B-FP8-dynamic",
  "deepseek-r1-distill-70b": "RedHatAI/DeepSeek-R1-Distill-Llama-70B-FP8-dynamic",
  "glm-4.5-air": "zai-org/GLM-4.5-Air-FP8",
  "glm-4.6": "zai-org/GLM-4.6-FP8",
  "glm-4.7": "zai-org/GLM-4.7-FP8",
  "glm-5.1": "zai-org/GLM-5.1-FP8",
  "glm-5.2": "zai-org/GLM-5.2-FP8",
  "command-a-plus-2026": "CohereLabs/command-a-plus-05-2026-FP8",
  "north-mini-code-1": "CohereLabs/North-Mini-Code-1.0-FP8",
  "exaone-4.5-33b": "LGAI-EXAONE/EXAONE-4.5-33B-FP8",
  "granite-4.1-8b": "ibm-granite/granite-4.1-8b-FP8",
  "granite-4.1-30b": "ibm-granite/granite-4.1-30b-FP8",
  // New in the 2026-08-26 refresh
  "qwen3.8-27b": "Qwen/Qwen3.8-27B-FP8",
  "qwen3.8-flash-next": "Qwen/Qwen3.8-Flash-Next-FP8",
  "granite-4.2-8b": "ibm-granite/granite-4.2-8b-FP8",
  "granite-4.2-30b": "ibm-granite/granite-4.2-30b-FP8",
  "nemotron-3-super": "nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-FP8",
  "k-exaone-2.0": "LGAI-EXAONE/K-EXAONE-2.0-750B-A37B-FP8",
  "hy3": "tencent/Hy3-FP8",
  "hunyuan-a13b": "tencent/Hunyuan-A13B-Instruct-FP8",
  "ling-3.0-flash": "inclusionAI/Ling-3.0-flash-fp8",
  "ling-2.6-flash": "inclusionAI/Ling-2.6-flash-fp8",
  // GigaChat 3.5 Ultra ships natively FP8 (quantization_config fmt=e4m3).
  "gigachat-3.5-ultra": "ai-sage/GigaChat3.5-432B-A28B",
  // New in the 2026-08-27 refresh
  "qwen3.8-max": "Qwen/Qwen3.8-2.4T-A95B-FP8",
  // GLM-5.3-Flash ships natively FP8 (quantization_config fmt=e4m3).
  "glm-5.3-flash": "zai-org/GLM-5.3-Flash",
  "ling-3.0-tiny": "inclusionAI/Ling-3.0-tiny-fp8",
};

// Enrich the catalog once at module load so every consumer of KnownModel
// (selector, result card, …) sees `releaseDate`, `nvfp4RepoId`, `fp8RepoId`.
// Runs before the model-group singleton below, which copies fields onto each
// ModelOption.
for (const [key, date] of Object.entries(MODEL_RELEASE_DATES)) {
  const model = KNOWN_MODELS[key];
  if (model) model.releaseDate = date;
}
for (const [key, repo] of Object.entries(MODEL_NVFP4_REPOS)) {
  const model = KNOWN_MODELS[key];
  if (model) model.nvfp4RepoId = repo;
}
for (const [key, repo] of Object.entries(MODEL_FP8_REPOS)) {
  const model = KNOWN_MODELS[key];
  if (model) model.fp8RepoId = repo;
}

export function getModelsByBrand(): {
  brand: ModelBrand;
  label: string;
  models: [string, KnownModel][];
}[] {
  return MODEL_BRANDS.map(({ key, label }) => ({
    brand: key,
    label,
    models: Object.entries(KNOWN_MODELS)
      .filter(([, m]) => m.brand === key)
      .sort(([, a], [, b]) => a.params - b.params),
  }));
}

/** Item for Combobox — a single selectable model option. */
export interface ModelOption {
  key: string;
  displayName: string;
  /** Brand used to show a vendor icon. Undefined for the custom option. */
  brand?: ModelBrand | undefined;
  /** Capability flags for display in the selector. Undefined for the custom option. */
  capabilities?: ModelCapabilities | undefined;
  /** Release date (ISO `YYYY-MM-DD`) for display in the selector. Undefined for custom. */
  releaseDate?: string | undefined;
}

/** Group of models for grouped Combobox rendering. */
export interface ModelGroup {
  value: string;
  items: ModelOption[];
}

/**
 * Stable singleton: model groups + a flat lookup map.
 * All ModelOption objects are shared between the groups array and the lookup,
 * so Combobox can compare them by reference.
 */
const { groups: MODEL_GROUPS_SINGLETON, optionsByKey: OPTIONS_BY_KEY } =
  (() => {
    const optionsByKey = new Map<string, ModelOption>();

    const groups: ModelGroup[] = MODEL_BRANDS.map(({ key, label }) => ({
      value: label,
      items: Object.entries(KNOWN_MODELS)
        .filter(([, m]) => m.brand === key)
        .sort(([, a], [, b]) => a.params - b.params)
        .map(([k, m]) => {
          const opt: ModelOption = {
            key: k,
            displayName: m.displayName,
            brand: m.brand,
            capabilities: m.capabilities,
            releaseDate: m.releaseDate,
          };
          optionsByKey.set(k, opt);
          return opt;
        }),
    }));

    const customOpt: ModelOption = {
      key: "custom",
      displayName: "Custom model...",
    };
    optionsByKey.set("custom", customOpt);
    groups.push({ value: "Other", items: [customOpt] });

    return { groups, optionsByKey };
  })();

/** All model groups including "Other" with the custom option. */
export function getModelGroups(): ModelGroup[] {
  return MODEL_GROUPS_SINGLETON;
}

/** Find the stable ModelOption reference by key. Returns null if not found. */
export function findModelOption(key: string): ModelOption | null {
  return OPTIONS_BY_KEY.get(key) ?? null;
}

export { QUANT_BITS, WEIGHT_QUANTS, KV_QUANTS } from "./quants";
