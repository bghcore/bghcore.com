import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const port = 4173;
const outDir = "out";
const pdfPath = resolve("public/bradley-hanson-resume.pdf");
const chrome = process.env.CHROME_PATH ?? "/opt/google/chrome/chrome";

if (!existsSync(`${outDir}/resume/index.html`)) {
  console.error("Missing out/resume/index.html. Run pnpm build first.");
  process.exit(1);
}

const userDataDir = mkdtempSync(resolve(tmpdir(), "resume-pdf-"));
const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", outDir], {
  stdio: "ignore",
});

function stopServer() {
  server.kill();
  rmSync(userDataDir, { recursive: true, force: true });
}

try {
  await delay(400);
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--no-pdf-header-footer",
    "--no-first-run",
    "--disable-extensions",
    `--user-data-dir=${userDataDir}`,
    `--print-to-pdf=${pdfPath}`,
    `http://127.0.0.1:${port}/resume/`,
  ];
  const child = spawn(chrome, args, { stdio: "ignore" });
  const started = Date.now();
  let exitCode = null;
  child.on("exit", (code) => {
    exitCode = code ?? 1;
  });

  while (Date.now() - started < 25_000) {
    await delay(300);
    if (exitCode !== null) break;
    if (existsSync(pdfPath) && statSync(pdfPath).size > 20_000 && Date.now() - started > 2_000) {
      // Analytics and font loading can keep the tab alive after the PDF is on disk.
      await delay(800);
      break;
    }
  }

  if (exitCode === null) child.kill();
  if (!existsSync(pdfPath) || statSync(pdfPath).size < 20_000) {
    console.error(`Chrome did not write a usable PDF (exit ${exitCode ?? "timeout"})`);
    process.exit(1);
  }
  console.log(`Wrote ${pdfPath}`);
} finally {
  stopServer();
}
