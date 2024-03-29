import React from "react";
export default function ReturnToTopButton() {
  function onClick() {
    document.getElementById("scrolledElement").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div
      className="w-10 h-10 rounded-full bg-transparent black sticky bottom-5 left-1"
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        stroke="black"
      >
        <path
          fillRule="evenodd"
          d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
