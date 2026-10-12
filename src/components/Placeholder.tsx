type PlaceholderProps = {
  label: string;
  className?: string;
};

/** A dashed gray box marking where real content will go. */
export default function Placeholder({ label, className = "" }: PlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-muted/50 bg-line/30 p-6 text-center font-mono text-xs text-muted ${className}`}
    >
      {label}
    </div>
  );
}
