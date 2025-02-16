import { NextApiRequest, NextApiResponse } from "next";
import { PythonShell } from "python-shell";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  PythonShell.run("scripts/generate_password.py", {
    pythonPath:
      process.env.NODE_ENV === "development"
        ? process.env.PYTHON_PATH
        : "/opt/buildhome/python3.12/bin/python3", //
  })
    .then((results) => {
      const phraseData = JSON.parse(results[0]);
      res.status(200).json(phraseData);
    })
    .catch((error) => {
      console.error("Error running Python script:", error);
      return res.status(500).json({ error: "Failed to generate phrase" });
    });
}
