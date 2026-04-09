export function checkRateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  let requestData = rateLimitMap.get(ip);

  if (!requestData) {
    requestData = { count: 1, firstRequestAt: now };
    rateLimitMap.set(ip, requestData);
    return { success: true, remaining: limit - 1 };
  }

  if (requestData.firstRequestAt < windowStart) {
    requestData.count = 1;
    requestData.firstRequestAt = now;
    rateLimitMap.set(ip, requestData);
    return { success: true, remaining: limit - 1 };
  }

  if (requestData.count >= limit) {
    return { success: false, remaining: 0 };
  }

  requestData.count += 1;
  rateLimitMap.set(ip, requestData);
  return { success: true, remaining: limit - requestData.count };
}

// Cleanup function to avoid memory leaks
export function cleanupRateLimitMap(windowMs = 60000) {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (data.firstRequestAt < now - windowMs) {
      rateLimitMap.delete(ip);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => cleanupRateLimitMap(), 5 * 60 * 1000);
}
