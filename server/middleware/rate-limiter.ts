import type { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: number[];
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 60000 = 1 minute)
  maxRequests?: number; // Max requests per window (default: 100)
  keyGenerator?: (req: Request) => string;
  message?: string;
}

export function rateLimiter(options: RateLimitOptions = {}) {
  const {
    windowMs = 60000, // 1 minute
    maxRequests = 100,
    keyGenerator = (req: Request) => req.ip || "unknown",
    message = "Too many requests, please try again later.",
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();
    const windowStart = now - windowMs;

    // Initialize store for this key if needed
    if (!store[key]) {
      store[key] = [];
    }

    // Remove old requests outside the window
    store[key] = store[key].filter((timestamp) => timestamp > windowStart);

    // Check if limit exceeded
    if (store[key].length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((store[key][0] + windowMs - now) / 1000),
      });
    }

    // Record this request
    store[key].push(now);

    // Set rate limit headers
    res.setHeader("X-RateLimit-Limit", maxRequests.toString());
    res.setHeader("X-RateLimit-Remaining", (maxRequests - store[key].length).toString());
    res.setHeader("X-RateLimit-Reset", new Date(store[key][0] + windowMs).toISOString());

    next();
  };
}

// Clean up old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  const maxAge = 5 * 60 * 1000; // 5 minutes

  Object.keys(store).forEach((key) => {
    store[key] = store[key].filter((timestamp) => now - timestamp < maxAge);
    if (store[key].length === 0) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);
