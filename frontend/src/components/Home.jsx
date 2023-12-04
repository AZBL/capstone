import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homeContainer">
      <h2>PrimeCare Family Health</h2>
      <p className="practiceDescription">
        At PrimeCare Family Health, we're committed to providing compassionate
        and comprehensive healthcare for your entire family. Our dedicated team
        of healthcare professionals is here to support you through every stage
        of life, offering personalized care in a welcoming and inclusive
        environment.
      </p>
      <div id="services" className="servicesContainer">
        <h4>Services</h4>
        <ul>
          <li>Pediatric and Adult Care</li>
          <li>Routine Health Screenings</li>
          <li>Chronic Disease Management</li>
          <li>Physical Exams</li>
          <li>Mental Health Services</li>
          <li>Acute Illness Treatment</li>
          <li>Immunizations</li>
          <li>and more!</li>
        </ul>
      </div>
      <div id="staff" className="staffContainer">
        <h4>Staff</h4>
        <ul>
          <li>
            <Link to="/staff">Dr. Emily Johnson, DO</Link>
          </li>
          <li>
            <Link to="/staff">Dr. Michael Lee, MD</Link>
          </li>
          <li>
            <Link to="/staff">Tom Rivera, PA-C</Link>
          </li>
          <li>
            <Link to="/staff">Natalie Yang, NP</Link>
          </li>
          <li>
            <Link to="/staff">Samia Wilson, Center Manager</Link>
          </li>
        </ul>
      </div>
      <div id="contact" className="contactContainer">
        <h4>Contact Info</h4>
        <p>
          PrimeCare Family Health 123 Wellness Way Healthville, Medtown, 12345
        </p>
        <p>contact@primecarefamilyhealth.com</p>
        <p>(555)-555-5555</p>
      </div>
      <div className="hoursContainer">
        <h4>Hours</h4>
        <p>Monday-Friday: 8:00 AM - 6:00 PM</p>
        <p>Saturday: 9:00 AM - 12:30 PM</p>
        <p>Sunday: Closed</p>
      </div>
    </div>
  );
};
export default Home;
