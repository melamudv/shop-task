import "dotenv/config";

const requiredEnvironmentVariables = [
    "MONGODB_URI",
    "PORT",
    "CLIENT_URL",
] as const;

for (const variableName of requiredEnvironmentVariables) {
    if (!process.env[variableName]) {
        throw new Error(`Missing required environment variable: ${variableName}`);
    }
}

export const env = {
    mongoDbUri: process.env.MONGODB_URI,
    port: Number(process.env.PORT),
    clientUrl: process.env.CLIENT_URL,
};