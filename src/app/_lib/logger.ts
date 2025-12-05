type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface LogMeta {
  [key: string]: unknown;
}

const isProd = process.env.NODE_ENV === 'production';

function logBase(level: LogLevel, message: string, meta?: LogMeta) {
  const payload = {
    level,
    message,
    ...meta,
    timestamp: new Date().toISOString(),
  };

  if (isProd) {
    console.log(JSON.stringify(payload));
  } else {
    const prefix = `[${payload.timestamp}] [${level.toUpperCase()}] ${message}`;
    if (meta && Object.keys(meta).length > 0) {
      const fn =
        level === 'error'
          ? console.error
          : level === 'warn'
          ? console.warn
          : console.log;
      fn(prefix, meta);
    } else {
      const fn =
        level === 'error'
          ? console.error
          : level === 'warn'
          ? console.warn
          : console.log;
      fn(prefix);
    }
  }
}

export const logger = {
  debug: (message: string, meta?: LogMeta) =>
    logBase('debug', message, meta),
  info: (message: string, meta?: LogMeta) => logBase('info', message, meta),
  warn: (message: string, meta?: LogMeta) => logBase('warn', message, meta),
  error: (message: string, meta?: LogMeta) => logBase('error', message, meta),
};