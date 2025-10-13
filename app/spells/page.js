"use client";

import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  Box,
  Modal,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Spells() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [house, setHouse] = useState("");
  const [sorted, setSorted] = useState();
  const [get, setGet] = useState(false);
  const [envs, setENVs] = useState("");
  const [css, setCSS] = useState("");

  function getRandomSpell() {
    const randomIndex = Math.floor(Math.random() * spells.length);
    return spells[randomIndex];
  }

  function parseEnvString(envString) {
    const envDict = {};

    // Split the input string into lines
    const lines = envString.split("\n");

    for (const line of lines) {
      // Split each line into key and value
      const [key, value] = line.split("=");

      // Convert key to lowercase and set the value to lowercase name of the environment
      if (value === "false" || value === "true") {
        envDict[key.trim()] = value;
      } else {
        envDict[key.trim()] = key.toLowerCase();
      }
    }

    return envDict;
  }

  function convertToEnvString(envObject) {
    let envString = "";

    for (const key in envObject) {
      if (envObject.hasOwnProperty(key)) {
        let value = envObject[key];
        if (value === "false" || value === "true") {
          envString += `${key}=<true or false>\n`;
        }
        if (key === "") {
          envString += `\n`;
        } else {
          envString += `${key}=<${value}>\n`;
        }
      }
    }

    return envString;
  }

  function parseInlineStyleString(input) {
    if (!input || typeof input !== "string") return {};

    const lines = input
      .split(",")
      .map((line) => line.trim())
      .filter(Boolean);

    const obj = {};
    for (const line of lines) {
      const parts = line.split(":");
      if (parts.length < 2) continue;

      const key = parts[0].trim();
      const value = parts
        .slice(1)
        .join(":")
        .trim()
        .replace(/^['"`]|['"`]$/g, "");
      obj[key] = value;
    }

    return obj;
  }

  function convertInlineToCSS(styleObj) {
    if (!styleObj || typeof styleObj !== "object") return "";

    const toKebabCase = (str) =>
      str.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());

    // Convert each entry into a line of CSS
    const lines = Object.entries(styleObj).map(([key, value]) => {
      return `${toKebabCase(key)}: ${value};`;
    });

    // Sort by line length (shortest to longest)
    lines.sort((a, b) => b.length - a.length);

    return lines.join("\n");
  }

  useEffect(() => {
    const sortHouse = (house) => {
      const styleObj = parseInlineStyleString(css);
      const resultCSS = convertInlineToCSS(styleObj);

      const result = {
        envs: convertToEnvString(parseEnvString(envs)),
        css: resultCSS,
        // Add more spells here
      };
      console.log("house", css, result.css);
      return result[house];
    };
    if (get && house) {
      setSorted(sortHouse(house));
      setIsModalOpen(true);
      setENVs("");
      setCSS("");
      setGet(false);
    } else {
      setGet(false);
    }
  }, [get, isModalOpen, house, sorted]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSort = (e) => {
    const id = e.currentTarget.id;
    const hogwarts = {
      envs: "envs",
      css: "css",
    };
    setHouse(hogwarts[id]);
    setGet(true);
  };

  const spells = [
    "Accio",
    "Alohomora",
    "Avada Kedavra",
    "Expelliarmus",
    "Expecto Patronum",
    "Lumos",
    "Nox",
    "Wingardium Leviosa",
    "Stupefy",
    "Protego",
    "Impedimenta",
    "Riddikulus",
    "Sectumsempra",
    "Levicorpus",
    "Aguamenti",
    "Incarcerous",
    "Obliviate",
    "Petrificus Totalus",
    "Reducto",
    "Silencio",
    "Finite Incantatem",
    "Aresto Momentum",
    "Incendio",
    "Aqua Eructo",
    "Confundo",
    "Diffindo",
    "Episkey",
    "Lumos Solem",
    "Muffliato",
    "Reparo",
    "Impervius",
    "Ferula",
    "Avis",
    "Locomotor Mortis",
    "Liberacorpus",
    "Tarantallegra",
    "Colloportus",
    "Deletrius",
    "Arania Exumai",
    "Sonorus",
    "Descendo",
    "Engorgio",
    "Reducio",
    "Confringo",
    "Aguamenti",
    "Glisseo",
    "Mobiliarbus",
    "Salvio Hexia",
    "Scourgify",
    "Episkey",
    "Tergeo",
    "Ventus",
    "Metelojinx Recanto",
  ];

  const modalContent = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 900,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
        onClick={closeModal}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ display: "flex" }}>
        <Image
          width={200}
          height={200}
          alt="sorting hat"
          src="/sortinghat.jpg"
        />
        <Box sx={{ display: "grid", marginLeft: "10px" }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "AlmendraSC", marginTop: "75px" }}
            gutterBottom
          >
            {getRandomSpell()}!
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontFamily: "AlmendraSC" }}
            gutterBottom
          >
            Your {house} have been sorted!
          </Typography>
        </Box>
      </Box>

      {house && sorted && (
        <Typography
          sx={{
            whiteSpace: "pre-line",
            fontFamily: "monospace",
            color: "green",
          }}
        >
          {sorted}
        </Typography>
      )}
    </Box>
  );

  const classroom =
    "url(https://images.ctfassets.net/usf1vwtuqyxm/2woRzI2EqwUCSU0kI2IwkG/25131825604b69815b4b124bc432bba3/MoodysClassroom_WB_F4_AlastorMoodysClassroomEmpty_Promo_080615_Land.jpg?w=914&q=70&fm=webp)";

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h2" align="center" sx={{ fontFamily: "AlmendraSC" }}>
        Spells
      </Typography>
      <Container
        sx={{
          backgroundImage: classroom,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "85vh",
          width: "85vh",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            sx={{
              display: "grid",
              position: "relative",
              left: "-350px",
            }}
            item
            xs={12}
            md={6}
          >
            <Typography variant="h4" sx={{ fontFamily: "MedievalSharp" }}>
              Create Sample.env
            </Typography>
            <TextField
              disablezoom="true"
              autoComplete="off"
              sx={{ width: "auto" }}
              style={{ width: "300px" }}
              margin="normal"
              multiline={true}
              minRows={10}
              maxRows={10}
              size="medium"
              value={envs}
              onChange={(e) => setENVs(e.target.value)}
            />
            <Button
              id="envs"
              sx={{
                position: "relative",
                top: "7px",
                width: "70px",
                left: "120px",
              }}
              variant="contained"
              color="primary"
              onClick={handleSort}
            >
              Sort
            </Button>
          </Grid>

          <Grid
            sx={{
              display: "grid",
              position: "relative",
              right: "-425px",
            }}
            item
            xs={12}
            md={6}
          >
            <Typography variant="h4" sx={{ fontFamily: "MedievalSharp" }}>
              Inline to CSS
            </Typography>
            <TextField
              disablezoom="true"
              autoComplete="off"
              sx={{ width: "auto" }}
              style={{ width: "300px" }}
              margin="normal"
              multiline={true}
              minRows={10}
              maxRows={10}
              size="medium"
              value={css}
              onChange={(e) => setCSS(e.target.value)}
            />
            <Button
              id="css"
              sx={{
                position: "relative",
                top: "7px",
                width: "70px",
                left: "120px",
              }}
              variant="contained"
              color="primary"
              onClick={handleSort}
            >
              Sort
            </Button>
          </Grid>
        </Grid>
      </Container>

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}

      <Link href="/" passHref>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '1vw',
            right: '1vw',
            borderRadius: '50%',
            width: 104,
            height: 104,
            backgroundColor: "white",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <Image
            style={{ marginTop: "-5px" }}
            width={70}
            height={70}
            alt="sorting hat"
            src="/sortinghat.jpg"
          />
        </Box>
      </Link>
    </Box>
  );
}
