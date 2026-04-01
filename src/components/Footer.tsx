const Footer = () => {
  return (
    <footer className="px-6 py-8 text-center border-t border-border/50">
      <p className="font-display text-lg font-semibold text-primary mb-1">Galissea</p>
      <p className="font-body text-xs tracking-[0.2em] uppercase text-accent mb-4">
        Cafe · Snack · Bar
      </p>
      <p className="font-body text-xs text-muted-foreground">
        © {new Date().getFullYear()} Galissea — Galissas, Syros
      </p>
    </footer>
  );
};

export default Footer;
