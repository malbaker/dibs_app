export default function ReturnToTopButton() {
  function onClick() {
    document.getElementById("scrolledElement").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={() => onClick()}
      style={{ position: "sticky", bottom: 0, left: 0 }}
    >
      Return to top button
    </button>
  );
}
