
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CustomRadio() {
  return (
    <RadioGroup className="grid-cols-3" defaultValue="Love">
      <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2">
        <RadioGroupItem
          id="radio-love"
          value="Love"
          className="sr-only after:absolute after:inset-0"
        />
        <p>😍</p>
        <p className="text-xs font-medium leading-none text-foreground">
          Love It!
        </p>
      </label>
      <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2">
        <RadioGroupItem
          id="radio-decent"
          value="Decent"
          className="sr-only after:absolute after:inset-0"
        />
        <p>😊</p>
        <p className="text-xs font-medium leading-none text-foreground">
          Decent
        </p>
      </label>
      <label className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 ring-offset-background transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2">
        <RadioGroupItem
          id="radio-needs-improvement"
          value="Needs Improvement"
          className="sr-only after:absolute after:inset-0"
        />
        <p>😞</p>
        <p className="text-xs font-medium leading-none text-foreground">
          Bad
        </p>
      </label>
    </RadioGroup>
  );
}
