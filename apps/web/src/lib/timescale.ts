import pg from "pg";

const { Pool } = pg;

let tigerData: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!tigerData) {
    if (!process.env.TIMESCALE_URL) {
      throw new Error("TIMESCALE_URL environment variable is required");
    }
    const connectionString = process.env.TIMESCALE_URL;
    tigerData = new Pool({
      connectionString,
      ssl: connectionString.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : false,
    });
  }
  return tigerData;
}

export { getPool as tigerData };

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  try {
    const result = await getPool().query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error("TimescaleDB query error:", error);
    throw error;
  }
}

export async function execute(text: string, params?: unknown[]): Promise<void> {
  try {
    await getPool().query(text, params);
  } catch (error) {
    console.error("TimescaleDB execute error:", error);
    throw error;
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const client = await getPool().connect();
    await client.query("SELECT 1");
    client.release();
    console.log("✅ TimescaleDB connection successful");
    return true;
  } catch (error) {
    console.error("❌ TimescaleDB connection failed:", error);
    return false;
  }
}
