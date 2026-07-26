import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="border-(--color-border) bg-(--color-background-secondary) border-t">
      <Container className="py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div>
            <h3 className="text-(--color-text-primary) text-lg font-semibold">
              Kapil Rajput
            </h3>

            <p className="text-(--color-text-secondary) mt-2 max-w-md text-sm leading-6">
              Building modern web, mobile and desktop applications with a focus
              on performance, scalability and exceptional user experience.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="text-(--color-text-secondary) flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Available for new opportunities
            </div>

            <div className="flex flex-wrap gap-5 text-sm">
              <a
                href="https://github.com/kapil9711C"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--color-primary) transition"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/kapil-rajput-53573326b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--color-primary) transition"
              >
                LinkedIn
              </a>

              <a
                href="mailto:kapil.rajput9711@gmail.com"
                className="hover:text-(--color-primary) transition"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-(--color-border) text-(--color-text-secondary) mt-8 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Kapil Rajput. All rights reserved.</p>

          <p className="font-mono">
            Next.js · React · React Native · TypeScript · Node.js · MongoDB
          </p>
        </div>
      </Container>
    </footer>
  );
}
