export const AddSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="48" cy="52" r="40" fill="#FFD54F"></circle>
      <circle cx="48" cy="52" r="34" fill="#FFCA28"></circle>
      <text
        x="48"
        y="66"
        fontFamily="Arial, sansSerif"
        fontSize="40"
        fontWeight="bold"
        textAnchor="middle"
        fill="#FFB300"
      >
        $
      </text>
      <rect
        x="71"
        y="10"
        width="10"
        height="32"
        rx="2"
        fill="#558B2F"
        transform="translate(1, 1)"
      ></rect>
      <rect
        x="60"
        y="20"
        width="32"
        height="10"
        rx="2"
        fill="#558B2F"
        transform="translate(1, 1)"
      ></rect>
      <rect x="71" y="10" width="10" height="32" rx="2" fill="#8BC34A"></rect>
      <rect x="60" y="20" width="32" height="10" rx="2" fill="#8BC34A"></rect>
    </svg>
  );
};
