import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Path to the Python script
    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "generate_password.py"
    );

    // Execute the Python script
    exec(`python3.9 ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Error running Python script:", error);
        return res.status(500).json({ error: "Failed to generate phrase" });
      }

      if (stderr) {
        console.error("Python script stderr:", stderr);
        return res.status(500).json({ error: "Failed to generate phrase" });
      }

      // Parse the output from the Python script
      const phraseData = JSON.parse(stdout);
      res.status(200).json(phraseData);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
