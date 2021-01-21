import React from "react";

const About = () => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src="/media/about.jpeg"
        alt="vegetables"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        }}
      />

      <div
        style={{
          padding: "10px",
          color: "white",
          textAlign: "center",
          position: "absolute",
          top: "calc(50% - 70px)",
          left: "calc(50% - 175px)",
          width: "350px",
        }}
      >
        <h2>A propos</h2>
        <br />

        <ul>
          <li>
            Pour ceux qui veulent connaître l'impacte environnemental de leur
            alimentation et agir en conséquence.
          </li>
          <li>
            Pour ceux qui ont pris conscience qu'ils pouvaient mieux consommer.
          </li>
          <li>Pour ceux qui veulent mieux manger : local, frais, fermier.</li>
          <li>Pour ceux qui souhaitent acheter en direct des producteurs.</li>
          <li>Pour ceux qui s'engagent pour un monde meilleur.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
