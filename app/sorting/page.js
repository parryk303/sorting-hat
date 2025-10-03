"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
      setError("");
      setHasResult(true);
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setHasResult(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6, height: "100vh", minWidth: '80vw' }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold",  fontFamily: "AlmendraSC" }}
      >
        J S O N &nbsp;&nbsp;&nbsp; Magic
      </Typography>

      {!hasResult && (
        <>
          <TextField
            label="Paste JSON here"
            multiline
            fullWidth
            minRows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            sx={{ mb: 2, fontFamily: "monospace" }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleValidate}
              disabled={!input.trim()}
            >
              Validate & Prettify
            </Button>
          </Box>
          {error && (
            <Paper sx={{ p: 2, backgroundColor: "#ffebee", color: "#c62828" }}>
              <Typography variant="h6">Invalid JSON</Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {error}
              </Typography>
            </Paper>
          )}
        </>
      )}

      {hasResult && (
        <Paper sx={{ p: 2, backgroundColor: "#f4f6f8", mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Prettified JSON
          </Typography>
          <pre
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            {output}
          </pre>
        </Paper>
      )}

      {hasResult && (
        <Stack direction="row" justifyContent="center">
          <Button  variant="outlined" color="secondary" onClick={handleClear}>
            Clear & New
          </Button>
        </Stack>
      )}

      <Link href="/" passHref>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "20px",
            right: "20px",
            borderRadius: "50%",
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
    </Container>
  );
}
