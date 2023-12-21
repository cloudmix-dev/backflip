interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

function Button({ label, variant }: ButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
      : "bg-emerald-600 hover:bg-emerald-500 focus-visible:outline-emerald-600";

  return (
    <button
      type="button"
      className={`inline-flex justify-center items-center rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${classes}`}
    >
      {label}
    </button>
  );
}

Button.Skeleton = function ButtonSkeleton() {
  return (
    <div className="inline-flex justify-center items-center rounded-md h-8 w-36 text-sm bg-zinc-300 shadow-sm animate-pulse">
      <div className="h-4 w-28 bg-zinc-200 rounded-md" />
    </div>
  );
};

export { Button };
