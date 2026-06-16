import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "./InfoTooltip";
import {
  KV_QUANTS,
  QUANT_SPECS,
  getWeightQuantGroups,
} from "@/lib/quants";
import type { QuantName } from "@/lib/types";

interface QuantSelectorProps {
  quant: QuantName;
  kvQuant: QuantName;
  onQuantChange: (value: QuantName) => void;
  onKvQuantChange: (value: QuantName) => void;
  /**
   * Whether to offer NVFP4 in the weights dropdown. NVFP4 is only shown for
   * models that ship a real NVFP4 build on HuggingFace (see MODEL_NVFP4_REPOS).
   * Defaults to false (hidden) for custom / imported models.
   */
  nvfp4Available?: boolean | undefined;
  /**
   * Whether to offer FP8 in the weights dropdown. FP8 is only shown for
   * models that ship a real FP8 build on HuggingFace (see MODEL_FP8_REPOS).
   * Defaults to false (hidden) for custom / imported models.
   */
  fp8Available?: boolean | undefined;
}

const WEIGHT_QUANT_GROUPS = getWeightQuantGroups();

const WEIGHTS_TOOLTIP = `Bits per model weight, grouped by format family:

• Float (FP32/BF16/FP16) — training precision, runs anywhere.
• GGUF (Q*_K_M, Q8_0…) — universal CPU/GPU/Mac via llama.cpp / Ollama.
• MLX (g64) — Apple Silicon native quantization.
• GPTQ (g128) — calibration-based PTQ for GPU (vLLM, ExLlama).
• AWQ 4-bit (g128) — activation-aware PTQ for GPU (vLLM, AutoAWQ).
• FP8 — NVIDIA 8-bit float (Hopper+/Blackwell GPUs, vLLM / TensorRT-LLM). Shown only for models that ship an FP8 build on HuggingFace.
• NVFP4 — NVIDIA 4-bit float (Blackwell GPUs, vLLM / TensorRT-LLM). Shown only for models that ship an NVFP4 build on HuggingFace.

Lower bits = smaller model but slightly worse quality. Q4 / GPTQ-4bit / AWQ-4bit are the most popular choices for production inference.`;

function getQuantLabel(value: QuantName): string {
  return QUANT_SPECS.find((q) => q.value === value)?.label ?? value;
}

function getKvQuantLabel(value: QuantName): string {
  return KV_QUANTS.find((q) => q.value === value)?.label ?? value;
}

export function QuantSelector({
  quant,
  kvQuant,
  onQuantChange,
  onKvQuantChange,
  nvfp4Available = false,
  fp8Available = false,
}: QuantSelectorProps) {
  // FP8 and NVFP4 are gated per-model: only list them when the selected model
  // has a real FP8 / NVFP4 build on HF. Every other family is always shown.
  const weightGroups = WEIGHT_QUANT_GROUPS.filter((g) => {
    if (g.family === "nvfp4") return nvfp4Available;
    if (g.family === "fp8") return fp8Available;
    return true;
  });
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label>Weights Quant</Label>
          <InfoTooltip content={WEIGHTS_TOOLTIP} />
        </div>
        <Select value={quant} onValueChange={(v) => onQuantChange(v as QuantName)}>
          <SelectTrigger data-testid="weights-quant-trigger" className="w-full">
            <span>{getQuantLabel(quant)}</span>
          </SelectTrigger>
          <SelectContent>
            {weightGroups.map((group) => (
              <SelectGroup key={group.familyLabel}>
                <SelectLabel>{group.familyLabel}</SelectLabel>
                {group.items.map((q) => (
                  <SelectItem key={q.value} value={q.value}>
                    {q.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Label>KV Cache Quant</Label>
          <InfoTooltip content="Quantization of the KV cache (attention memory). BF16 is the default — same precision as native training, no quality loss. Q8 halves KV memory with negligible quality loss. Q4 quarters it with small quality impact.

TurboQuant (Google Research, arXiv:2504.19874) is a data-free, sub-4-bit KV-cache vector quantization with near-lossless long-context recall — 3.5-bit is quality-neutral, 2.5-bit is aggressive. Experimental: research-grade tooling only, validated on standard/GQA attention. Benefit is unverified for MLA (DeepSeek V3/V4, Kimi K2) and multimodal models, and only the full-attention layers of hybrid/linear models gain." />
        </div>
        <Select value={kvQuant} onValueChange={(v) => onKvQuantChange(v as QuantName)}>
          <SelectTrigger data-testid="kv-quant-trigger" className="w-full">
            <span>{getKvQuantLabel(kvQuant)}</span>
          </SelectTrigger>
          <SelectContent>
            {KV_QUANTS.map((q) => (
              <SelectItem key={q.value} value={q.value}>
                {q.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
