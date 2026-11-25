// Console-only logger for Content Publisher code.
//
// The CPUB playground this was copied from ships logs to Google Cloud Logging
// via @google-cloud/logging and swaps in a client stub with a webpack plugin.
// This site builds with Turbopack and has no GCP logging credentials, so we
// keep the same API but write to the console on both server and client.
export const trimErrorMessage = (s: string) =>
  `${s.substring(0, 1024)}${s.length > 1024 ? "..." : ""}`;

class Logger {
  static async error(message: unknown) {
    let logString: string;
    if (typeof message === "string") {
      logString = trimErrorMessage(message);
    } else if (message instanceof Error && message.stack) {
      logString = trimErrorMessage(message.stack);
    } else {
      logString = trimErrorMessage(`${message}`);
    }
    console.error(logString);
  }

  static async info(message: string) {
    console.info(message);
  }
}

export default Logger;
