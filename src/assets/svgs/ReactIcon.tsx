interface ReactIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function ReactIcon({
  width = 28,
  height = 28,
  className,
}: ReactIconProps = {}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="React Icon"
      className={className}
    >
      <path
        d="M13.9999 16.3804C15.3379 16.3804 16.4226 15.3147 16.4226 14C16.4226 12.6854 15.3379 11.6196 13.9999 11.6196C12.6618 11.6196 11.5771 12.6854 11.5771 14C11.5771 15.3147 12.6618 16.3804 13.9999 16.3804Z"
        fill="currentColor"
      />
      <path
        d="M14 18.8769C21.1797 18.8769 27 16.6935 27 14.0001C27 11.3066 21.1797 9.12317 14 9.12317C6.8203 9.12317 1 11.3066 1 14.0001C1 16.6935 6.8203 18.8769 14 18.8769Z"
        stroke="currentColor"
      />
      <path
        d="M9.70156 16.4384C13.2914 22.5476 18.1261 26.4083 20.5002 25.0616C22.8743 23.7148 21.8887 17.6707 18.2988 11.5616C14.709 5.45243 9.87426 1.59173 7.50019 2.93844C5.12612 4.28515 6.11171 10.3293 9.70156 16.4384Z"
        stroke="currentColor"
      />
      <path
        d="M9.70156 11.5615C6.11171 17.6706 5.12612 23.7148 7.50019 25.0615C9.87426 26.4082 14.709 22.5475 18.2988 16.4384C21.8887 10.3293 22.8743 4.2851 20.5002 2.93839C18.1261 1.59168 13.2914 5.45238 9.70156 11.5615Z"
        stroke="currentColor"
      />
    </svg>
  );
}
