import React from "react";

export function InsigniaEmblem({
  siglas,
  resultado,
}: {
  siglas: string;
  resultado: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative flex w-full max-w-[220px] items-center justify-center py-2"
    >
      <svg
        viewBox="390 98 252 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full drop-shadow-sm"
      >
        <defs>
          <linearGradient
            id="emblem_linear_gold_outer"
            x1="414.6"
            y1="114.25"
            x2="646.224"
            y2="314.991"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFE9A8" />
            <stop offset="0.5" stopColor="#FFB020" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
          <linearGradient
            id="emblem_linear_purple_inner"
            x1="428.25"
            y1="129.85"
            x2="628.949"
            y2="303.532"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6D5DF6" />
            <stop offset="0.55" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#2E2785" />
          </linearGradient>
          <radialGradient
            id="emblem_radial_circle"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(498.84 203.17) scale(102.96)"
          >
            <stop stopColor="#9B8CFF" />
            <stop offset="1" stopColor="#3730A3" />
          </radialGradient>
          <linearGradient
            id="emblem_circle_border"
            x1="458.8"
            y1="168.85"
            x2="573.2"
            y2="283.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFEAA8" />
            <stop offset="1" stopColor="#FFB020" />
          </linearGradient>
          <linearGradient
            id="emblem_ribbon_gold"
            x1="430.2"
            y1="322.25"
            x2="430.2"
            y2="371.65"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFE393" />
            <stop offset="1" stopColor="#FFAC12" />
          </linearGradient>
          <radialGradient
            id="emblem_glow"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(516 231.25) scale(130)"
          >
            <stop stopColor="#7C3AED" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
          <mask
            id="emblem_mask_shine"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="428"
            y="129"
            width="176"
            height="204"
          >
            <path
              d="M516 129.85L603.75 180.55V281.95L516 332.65L428.25 281.95V180.55L516 129.85Z"
              fill="white"
            />
          </mask>
        </defs>

        {/* Resplandor radial de fondo */}
        <path
          d="M516 361.25C587.797 361.25 646 303.047 646 231.25C646 159.453 587.797 101.25 516 101.25C444.203 101.25 386 159.453 386 231.25C386 303.047 444.203 361.25 516 361.25Z"
          fill="url(#emblem_glow)"
        />

        {/* Hexágono dorado exterior */}
        <path
          d="M516 114.25L617.4 172.75V289.75L516 348.25L414.6 289.75V172.75L516 114.25Z"
          fill="url(#emblem_linear_gold_outer)"
          strokeWidth="2.6"
          strokeLinejoin="round"
          stroke="#B45309"
        />

        {/* Hexágono morado interior */}
        <path
          d="M516 129.85L603.75 180.55V281.95L516 332.65L428.25 281.95V180.55L516 129.85Z"
          fill="url(#emblem_linear_purple_inner)"
        />

        {/* Brillo diagonal con máscara */}
        <g mask="url(#emblem_mask_shine)">
          <path d="M412 127.25H542L425 296.25H412V127.25Z" fill="white" fillOpacity="0.14" />
        </g>

        {/* Borde fino interior */}
        <path
          d="M516 145.45L590.1 188.35V274.15L516 317.05L441.9 274.15V188.35L516 145.45Z"
          strokeWidth="1.95"
          stroke="white"
          strokeOpacity="0.3"
        />

        {/* Medallón circular central */}
        <path
          d="M516 283.25C547.59 283.25 573.2 257.641 573.2 226.05C573.2 194.459 547.59 168.85 516 168.85C484.409 168.85 458.8 194.459 458.8 226.05C458.8 257.641 484.409 283.25 516 283.25Z"
          fill="url(#emblem_radial_circle)"
          strokeWidth="5.2"
          stroke="url(#emblem_circle_border)"
        />

        {/* Siglas dinámicas en el centro */}
        <text
          x="516"
          y="228"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontWeight="bold"
          fontSize="36"
          letterSpacing="0.04em"
          fontFamily="var(--font-talented-grotesk), Arial, sans-serif"
        >
          {siglas}
        </text>

        {/* 3 Estrellas doradas */}
        <path
          d="M484.8 285.85L487.53 292.48L494.68 293L489.22 297.68L490.91 304.7L484.8 300.93L478.69 304.7L480.38 297.68L474.92 293L482.07 292.48L484.8 285.85Z"
          fill="#FFD76A"
        />
        <path
          d="M516 285.85L519.77 294.95L529.65 295.73L522.11 302.1L524.45 311.72L516 306.52L507.55 311.72L509.89 302.1L502.35 295.73L512.23 294.95L516 285.85Z"
          fill="#FFD76A"
        />
        <path
          d="M547.2 285.85L549.93 292.48L557.08 293L551.62 297.68L553.31 304.7L547.2 300.93L541.09 304.7L542.78 297.68L537.32 293L544.47 292.48L547.2 285.85Z"
          fill="#FFD76A"
        />

        {/* Listón / Banner inferior */}
        <path
          d="M440.6 322.25H591.4L601.8 346.95L591.4 371.65H440.6L430.2 346.95L440.6 322.25Z"
          fill="url(#emblem_ribbon_gold)"
          strokeWidth="2.6"
          strokeLinejoin="round"
          stroke="#B45309"
        />

        {/* Porcentaje dinámico en el listón */}
        <text
          x="516"
          y="348"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#12122B"
          fontWeight="bold"
          fontSize="20"
          fontFamily="var(--font-talented-grotesk), Arial, sans-serif"
        >
          {resultado} %
        </text>

        {/* 4 Destellos brillantes alrededor */}
        <path
          d="M614.8 120.75C614.8 130.283 619.567 135.05 629.1 135.05C619.567 135.05 614.8 139.817 614.8 149.35C614.8 139.817 610.033 135.05 600.5 135.05C610.033 135.05 614.8 130.283 614.8 120.75Z"
          fill="#FFB020"
        />
        <path
          d="M417.2 148.05C417.2 154.983 420.666 158.45 427.6 158.45C420.666 158.45 417.2 161.917 417.2 168.85C417.2 161.917 413.733 158.45 406.8 158.45C413.733 158.45 417.2 154.983 417.2 148.05Z"
          fill="#FFB020"
        />
        <path
          d="M625.2 287.15C625.2 293.217 628.233 296.25 634.3 296.25C628.233 296.25 625.2 299.283 625.2 305.35C625.2 299.283 622.167 296.25 616.1 296.25C622.167 296.25 625.2 293.217 625.2 287.15Z"
          fill="#FFB020"
        />
        <path
          d="M409.4 288.45C409.4 293.65 412 296.25 417.2 296.25C412 296.25 409.4 298.85 409.4 304.05C409.4 298.85 406.8 296.25 401.6 296.25C406.8 296.25 409.4 293.65 409.4 288.45Z"
          fill="#FFB020"
        />
      </svg>
    </div>
  );
}
