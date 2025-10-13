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
import { JsonView, defaultStyles } from "react-json-view-lite";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import "react-json-view-lite/dist/index.css";

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy JSON:", err);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 6,
        minHeight: "100vh",
        minWidth: "85vw",
        position: "relative",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", fontFamily: "AlmendraSC" }}
      >
        J S O N &nbsp;&nbsp;&nbsp; Magic
      </Typography>

      {/* --- Always visible buttons --- */}

      {/* --- Input / Error / Result sections --- */}
      {!hasResult && (
        <>
          <Box
            sx={{
              position: "relative",
              top: "10px",
              display: "flex",
              justifyContent: "right",
              gap: 2,
              mb: 3,
              mr: 3,
              zIndex: 4,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ContentCopyIcon />}
              onClick={async () => {
                const textToCopy = hasResult ? output : input;
                if (textToCopy.trim()) {
                  try {
                    await navigator.clipboard.writeText(textToCopy);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                  }
                }
              }}
              disabled={!input.trim() && !output.trim()}
            >
              Copy
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleClear}
              disabled={!input.trim() && !output.trim()}
            >
              Clear
            </Button>
          </Box>
          <TextField
            label="Paste JSON here"
            multiline
            fullWidth
            minRows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            sx={{ mb: 2, fontFamily: "monospace" }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              id="Ravenclaw"
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
        <Paper
          sx={{
            p: 2,
            backgroundColor: "#ffffff",
            mb: 3,
            borderRadius: 2,
            color: "#000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              top: "10px",
              display: "flex",
              justifyContent: "right",
              gap: 2,
              mb: 3,
              mr: 3,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ContentCopyIcon />}
              onClick={async () => {
                const textToCopy = hasResult ? output : input;
                if (textToCopy.trim()) {
                  try {
                    await navigator.clipboard.writeText(textToCopy);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                  }
                }
              }}
              disabled={!input.trim() && !output.trim()}
            >
              Copy
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleClear}
              disabled={!input.trim() && !output.trim()}
            >
              Clear
            </Button>
          </Box>

          {(() => {
            try {
              const parsed = JSON.parse(output);
              if (Array.isArray(parsed)) {
                return (
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 1, fontFamily: "monospace", color: "#555" }}
                  >
                    Array length: {parsed.length}
                  </Typography>
                );
              }
            } catch {
              // ignore parsing errors
            }
            return null;
          })()}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "4ch 1fr", // widen a bit for longer line numbers
              alignItems: "start",
              backgroundColor: "#ffffff",
              color: "#000",
              p: 2,
              overflow: "auto",
              maxHeight: "80vh",
              fontFamily: "monospace",
              textAlign: "left",
              color: "#999",
              whiteSpace: "pre",
              fontSize: "17px",
              lineHeight: "2.1",
            }}
          >
            {/* Line numbers */}
            <Box>
              {Array.from(
                { length: output.split("\n").length },
                (_, i) => i + 1
              ).join("\n")}
            </Box>

            {/* JSON viewer */}
            <Box sx={{ minWidth: 0, mt: "-6px", ml: "10px" }}>
              <JsonView
                data={JSON.parse(output)}
                style={{
                  ...defaultStyles,
                  container: {
                    ...defaultStyles.container,
                  },
                }}
                shouldExpandNode={() => true}
                displayDataTypes={false}
                enableClipboard={false}
                indentWidth={2}
                displayObjectSize={false}
              />
            </Box>
          </Box>
        </Paper>
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
