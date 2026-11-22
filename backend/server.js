require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

console.log("API KEY EXISTS:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Audio upload configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

// Backend test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ComplyAI Backend is Running 🚀",
  });
});

// AI Audio Analysis API
app.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    console.log("\n========== NEW ANALYSIS ==========");

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API key is missing",
      });
    }

    // Check audio file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is missing",
      });
    }

    console.log("Audio received:", req.file.originalname);

    // STEP 1: Transcribe Audio
    console.log("Step 1: Transcribing audio...");

    const transcription = await openai.audio.transcriptions.create({
      file: new File(
        [req.file.buffer],
        req.file.originalname,
        {
          type: req.file.mimetype,
        }
      ),
      model: "gpt-4o-mini-transcribe",
    });

    const transcript = transcription.text;

    console.log("Transcription completed!");
    console.log("Transcript:", transcript);

    if (!transcript || transcript.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Audio transcription is empty",
      });
    }
    // STEP 2: AI Compliance Analysis
    console.log("Step 2: AI compliance analysis...");

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: `
You are an AI Compliance Auditor.

Analyze customer service conversations.

Return JSON ONLY in this exact structure:

{
  "complianceScore": 85,
  "riskLevel": "Low",
  "violations": [],
  "summary": "Short conversation summary",
  "sentiment": "Positive"
}

Rules:

complianceScore:
Number between 0 and 100.

riskLevel:
Must be Low, Medium, or High.

violations:
Array of compliance violations.
If no violations are found, return an empty array.

summary:
Brief explanation of the conversation.

sentiment:
Must be Positive, Neutral, or Negative.

Check for:
- Misleading statements
- Inappropriate behavior
- Missing disclosures
- Rude communication
- Compliance violations
- Customer dissatisfaction
- Incorrect information

Do not invent violations.
`,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
    });

    // STEP 3: Extract AI result
    const aiText = aiResponse.choices[0].message.content;

    console.log("AI Raw Response:", aiText);

    const analysis = JSON.parse(aiText);

    // STEP 4: Validate AI data
    if (
      typeof analysis.complianceScore !== "number" ||
      !analysis.riskLevel ||
      !Array.isArray(analysis.violations) ||
      !analysis.summary ||
      !analysis.sentiment
    ) {
      throw new Error("AI returned incomplete analysis data");
    }

    console.log("AI Analysis completed successfully!");

    // STEP 5: Send result to frontend
    return res.status(200).json({
      success: true,
      message: "AI Analysis completed successfully!",

      filename: req.file.originalname,

      transcript: transcript,

      analysis: {
        complianceScore: analysis.complianceScore,
        riskLevel: analysis.riskLevel,
        violations: analysis.violations,
        summary: analysis.summary,
        sentiment: analysis.sentiment,
      },
    });

  } catch (error) {
    console.error("\n========== ANALYSIS ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI analysis failed",
      error: error.message,
    });
  }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
  console.log(`🚀 ComplyAI Backend running on port ${PORT}`);
});