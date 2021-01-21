import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div
        style={{
          width: "auto",
          height: "130vh",
          backgroundImage: "url(/media/about.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      ></div>

      <div
        style={{
          padding: "10px",
          color: "white",
          textAlign: "center",
          position: "absolute",
          top: "calc(50% - 60px)",
          left: "calc(50% - 175px)",
          width: "350px",
        }}
      >
        <div>
          <Link to={"/"}>
            <h4
              style={{
                position: "absolute",
                top: "calc(2% - 200px)",
                fontSize: "13px",
              }}
            >
              Retour
            </h4>
          </Link>

          <p
            style={{
              position: "absolute",
              top: "calc(2% - 180px)",
              fontSize: "11px",
            }}
          >
            Accueil / À propos
          </p>
        </div>

        <h2 style={{ margin: "20px" }}>A propos</h2>
        <Accordion style={{ backgroundColor: "#87a878", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Impact écologique</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Pour ceux qui veulent connaître l'impact environnemental de leur
              alimentation et agir en conséquence.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ backgroundColor: "#87a878", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Prise de conscience</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Pour ceux qui ont pris conscience qu'ils pouvaient mieux consommer
              et manger : local, frais, fermier.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ backgroundColor: "#87a878", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel3a-content"
            id="panel4a-header"
          >
            <Typography>Petits producteurs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Pour ceux qui souhaitent acheter en direct des producteurs.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ backgroundColor: "#87a878", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>Équipe engagée</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div
                style={{
                  borderRadius: "4%",
                  margin: "10px",
                  padding: "10px",
                  backgroundImage: "url(/media/about1.jpeg)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  color: "white",
                  textShadow: "1px 1px 2px black",
                }}
              >
                <h4>Calypso Asline</h4>
                <h4>Co-Founder</h4>
                <div>
                  <a href="https://github.com/Calyaln">
                    <i class="fab fa-github"></i>
                  </a>{" "}
                  |{" "}
                  <a href="https://www.linkedin.com/in/calypso-asline-3b616b78/">
                    <i class="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "4%",
                  margin: "10px",
                  padding: "10px",
                  backgroundImage: "url(/media/about2.jpeg)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  color: "white",
                  textShadow: "1px 1px 2px black",
                }}
              >
                <h4>Charlotte Oury</h4>
                <h4>Co-Founder</h4>
                <div>
                  <a href="https://github.com/charlotte-on">
                    <i class="fab fa-github"></i>
                  </a>{" "}
                  |{" "}
                  <a href="https://www.linkedin.com/in/charlotte-oury-8866621a3/">
                    <i class="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "4%",
                  margin: "10px",
                  padding: "10px",
                  backgroundImage: "url(/media/about3.jpeg)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  color: "white",
                  textShadow: "1px 1px 2px black",
                }}
              >
                <h4>Victorien Provenzano</h4>
                <h4>Co-Founder</h4>
                <div>
                  <a href="https://github.com/vicpzn">
                    <i class="fab fa-github"></i>
                  </a>{" "}
                  |{" "}
                  <a href="https://www.linkedin.com/in/victorienprovenzano/">
                    <i class="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default About;
