import Image from "next/image";
import Link from "next/link";
import talentedLogo from "./assets/talented-logo.svg";

interface AuthShellProps {
  subtitle?: string;
  children: React.ReactNode;
}

export function AuthShell({
  subtitle = "Tu primer empleo, con ventaja",
  children,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex w-full max-w-[390px] flex-col items-center sm:max-w-[440px]">
        <header className="flex flex-col items-center text-center">
          <Link
            href="/login"
            aria-label="Talented, ir al inicio de sesión"
            className="rounded-[22px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3730A3]"
          >
            <Image
              src={talentedLogo}
              alt="Logo de Talented"
              width={84}
              height={84}
              priority
              className="block h-[84px] w-[84px]"
            />
          </Link>

          <h1
            className="mt-3 text-[36px] leading-[1.15] font-bold tracking-[-0.02em] text-[#12122B] sm:text-[38px]"
            style={{
              fontFamily:
                'var(--font-auth-heading), "Space Grotesk", Arial, Helvetica, sans-serif',
            }}
          >
            Talented
          </h1>

          <p className="mt-1.5 text-[13px] leading-[1.4] text-[#4A4A68] sm:text-[15px]">
            {subtitle}
          </p>
        </header>

        <section
          aria-label="Formulario de acceso"
          className="mt-7 w-full sm:rounded-[14px] sm:border sm:border-[#E4E3F1] sm:bg-white sm:p-[33px]"
        >
          {children}
        </section>

        <footer className="mt-6 max-w-[320px] text-center text-[13px] leading-[1.45] text-[#4A4A68] sm:max-w-[440px]">
          Al continuar aceptas los{" "}
          <span className="font-medium text-[#4A4A68]">Términos</span> y el{" "}
          <span className="font-medium text-[#4A4A68]">
            Aviso de Privacidad
          </span>
          .
        </footer>
      </div>
    </main>
  );
}
