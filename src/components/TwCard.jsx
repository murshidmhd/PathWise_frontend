export default function TwCard({
  title,
  description,
  tag = "Featured",
  ctaLabel = "View Details",
  imageUrl = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
}) {
  return (
    <article className="group w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card-bg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white">
          {tag}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="font-heading text-xl font-bold text-text-primary">{title}</h3>
        <p className="font-body text-sm leading-relaxed text-text-secondary">
          {description}
        </p>

        <button
          type="button"
          className="inline-flex items-center rounded-lg bg-secondary px-4 py-2 font-body text-sm font-semibold text-white transition-colors duration-200 hover:bg-secondary/90"
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}
