// =============================================================================
// Centralized Logger Utility
// =============================================================================

type LogLevel = "info" | "warn" | "error" | "debug";

const LOG_LEVEL_COLORS = {
  info: "\x1b[36m", // Cyan
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
  debug: "\x1b[35m", // Magenta
};

const RESET_COLOR = "\x1b[0m";

class Logger {
  private isDev = process.env.NODE_ENV === "development";

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    // Only apply ANSI colors in Node.js environment during development
    if (typeof window === "undefined" && this.isDev) {
      return `${LOG_LEVEL_COLORS[level]}${prefix}${RESET_COLOR} ${message}`;
    }
    return `${prefix} ${message}`;
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(this.formatMessage("info", message), ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(this.formatMessage("warn", message), ...args);
  }

  public error(message: string, error?: unknown, ...args: unknown[]): void {
    const formatted = this.formatMessage("error", message);
    if (error) {
      console.error(formatted, error, ...args);
    } else {
      console.error(formatted, ...args);
    }
  }

  public debug(message: string, ...args: unknown[]): void {
    if (this.isDev) {
      console.log(this.formatMessage("debug", message), ...args);
    }
  }
}

export const logger = new Logger();
