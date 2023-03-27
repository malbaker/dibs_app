export default function ReturnToTopButton() {
  function onClick() {
    document.getElementById("scrolledElement").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div
      style={{ position: "sticky", bottom: 5, left: 5 }}
      className="w-12 h-12 rounded-full bg-black black"
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        stroke="white"
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
