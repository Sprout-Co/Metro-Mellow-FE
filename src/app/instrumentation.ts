export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side instrumentation can go here if needed
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime instrumentation can go here if needed
  }
}
