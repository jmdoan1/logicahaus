import posthog from "posthog-js";
import "./book-now.css";

export default function Booknow() {
  return (
    <div className="book-container">
      <a
        className="border-animation"
        href="https://calendly.com/logica-haus/30min"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => posthog.capture("calendly_link_clicked")}
      >
        <div className="border-animation__inner">Book Now</div>
      </a>
    </div>
  );
}
