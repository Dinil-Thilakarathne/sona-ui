interface NextjsIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function NextjsIcon({
  width = 24,
  height = 24,
  className = "",
}: NextjsIconProps = {}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Next.js Icon"
      className={className}
    >
      <path
        d="M12 0.25C18.4893 0.25 23.75 5.51065 23.75 12C23.75 18.4893 18.4893 23.75 12 23.75C5.51065 23.75 0.25 18.4893 0.25 12C0.25 5.51065 5.51065 0.25 12 0.25Z"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M19.9346 21.0027L9.21913 7.19995H7.2002V16.796H8.81534V9.25108L18.6667 21.9793C19.1112 21.6818 19.5348 21.3553 19.9346 21.0027Z"
        fill="url(#paint0_linear_57_110)"
      />
      <path
        d="M16.933 7.19995H15.333V16.8H16.933V7.19995Z"
        fill="url(#paint1_linear_57_110)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_57_110"
          x1="14.5335"
          y1="15.5333"
          x2="19.2669"
          y2="21.3999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_57_110"
          x1="16.133"
          y1="7.19995"
          x2="16.1062"
          y2="14.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
