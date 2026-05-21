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
  { key: "DeepSeek", label: "DeepSeek" },
  { key: "Moonshot", label: "Moonshot AI" },
  { key: "Zhipu", label: "Z.ai (Zhipu)" },
  { key: "MiniMax", label: "MiniMax" },
  { key: "IBM", label: "IBM Granite" },
  { key: "Cohere", label: "Cohere" },
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
  "deepseek-v4-flash": {
    displayName: "DeepSeek V4-Flash 284B-A13B (MoE)",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-V4-Flash",
    params: 284e9,
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
    displayName: "DeepSeek V4-Pro 1.6T-A49B (MoE)",
    brand: "DeepSeek",
    hfRepoId: "deepseek-ai/DeepSeek-V4-Pro",
    params: 1.6e12,
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
    displayName: "GLM-5.1 743B-A41B (MoE)",
    brand: "Zhipu",
    hfRepoId: "zai-org/GLM-5.1",
    params: 743e9,
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
  // ── MiniMax ───────────────────────────────────────────────────────
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
  // ── Cohere (hybrid sliding-window MoE, VLM) ───────────────────────
  // Command A+ (05-2026, model_type cohere2_moe inside cohere2_vision):
  // sliding-window/full mix — 24 sliding (window=4096) + 8 full layers of 32,
  // so we model it `hybrid` with fullLayers=8, slidingWindow=4096. 128 experts
  // (8 active), kvHeads=8, headDim=128. 218B total / 25B active and a 128K
  // window per the model card (config's max_position_embeddings 5M is the rope
  // ceiling, not the supported context). Apache-2.0, multimodal.
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
    maxContextK: 128,
    capabilities: { vlm: true, thinking: false, toolUse: true },
  },
};

/**
 * Release dates, sourced from each HuggingFace repo's `createdAt` field
 * (`https://huggingface.co/api/models/<repo>`) — the authoritative
 * "released on HF" date. Kept as one block so it's trivial to re-verify
 * against the API. Stored ISO `YYYY-MM-DD`; the UI formats to "Mon YYYY".
 * Fetched 2026-05-21.
 */
export const MODEL_RELEASE_DATES: Record<string, string> = {
  "gemma2-9b": "2024-06-24",
  "gemma3-4b": "2025-02-20",
  "gemma3-12b": "2025-03-01",
  "gemma3-27b": "2025-03-01",
  "gemma4-e2b": "2026-03-02",
  "gemma4-e4b": "2026-03-02",
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
  "mixtral-8x7b": "2023-12-01",
  "mixtral-8x22b": "2024-04-16",
  "phi-3.5-mini": "2024-08-16",
  "phi-4": "2024-12-11",
  "deepseek-r1-distill-7b": "2025-01-20",
  "deepseek-r1-distill-14b": "2025-01-20",
  "deepseek-r1-distill-32b": "2025-01-20",
  "deepseek-r1-distill-70b": "2025-01-20",
  "deepseek-v3": "2024-12-25",
  "deepseek-r1": "2025-01-20",
  "deepseek-v3.2": "2025-09-29",
  "deepseek-v4-flash": "2026-04-22",
  "deepseek-v4-pro": "2026-04-22",
  "kimi-k2-thinking": "2025-11-04",
  "kimi-k2-0905": "2025-09-03",
  "kimi-linear-48b": "2025-10-30",
  "kimi-k2.6": "2026-04-14",
  "glm-4.5-air": "2025-07-20",
  "glm-4.6": "2025-09-29",
  "glm-4.7": "2025-12-22",
  "glm-5.1": "2026-04-03",
  "minimax-m1": "2025-06-13",
  "minimax-m2": "2025-10-22",
  "minimax-m2.5": "2026-02-12",
  "minimax-m2.7": "2026-04-09",
  "granite-4.1-8b": "2026-04-06",
  "granite-4.1-30b": "2026-04-06",
  "command-a-plus-2026": "2026-05-11",
};

// Enrich the catalog once at module load so every consumer of KnownModel
// (selector, result card, …) sees `releaseDate`. Runs before the model-group
// singleton below, which copies the field onto each ModelOption.
for (const [key, date] of Object.entries(MODEL_RELEASE_DATES)) {
  const model = KNOWN_MODELS[key];
  if (model) model.releaseDate = date;
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
