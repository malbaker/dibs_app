export default function ReturnToTopButton() {
  function onClick() {
    document.getElementById("scrolledElement").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={6}
      stroke="currentColor"
      className="w-9 h-12"
      onClick={() => onClick()}
      style={{ position: "sticky", bottom: 0, left: 0 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
      />
    </svg>
  );
}
