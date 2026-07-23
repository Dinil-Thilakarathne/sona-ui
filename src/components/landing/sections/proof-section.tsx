import { landingComponents } from "../data";

const proofs = [
  [String(landingComponents.length), "components"],
  ["React 19", "built for modern apps"],
  ["Copy-owned", "source in your project"],
  ["AI-ready", "catalog and agent skill"],
];

export function ProofSection() {
  return (
    <section
      className="mx-auto w-full max-w-[76rem] border-y border-border px-4"
      aria-label="Sona UI at a glance"
    >
      <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
        {proofs.map(([value, label]) => (
          <div key={label} className="grid gap-1 bg-background p-4 sm:px-5">
            <strong className="text-[0.95rem] font-semibold tracking-[-0.02em]">
              {value}
            </strong>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
