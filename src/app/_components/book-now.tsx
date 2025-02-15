import "./book-now.css";

export default function Booknow() {
  return (
    <div className="book-container">
      <a
        className="border-animation"
        href="https://calendly.com/logica-haus/30min"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="border-animation__inner">Book Now</div>
      </a>
    </div>
  );
}
