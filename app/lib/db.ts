import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined, // port 값을 숫자로 변환
  waitForConnections: true,
  // connectionLimit: 10,
  queueLimit: 0,
});

type QueryParams = {
  query: string;
  queryParams: Array<string | number | Date>;
};

const executeQuery = async <T>(
  query: string,
  queryParams: Array<string | number | Date>,
  retries: number = 10
): Promise<T> => {
  let attempt = 0;
  while (attempt < retries) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query<RowDataPacket[] | ResultSetHeader>(
        query,
        queryParams
      );
      const result: T = JSON.parse(JSON.stringify(rows));
      return result;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} - Error processing request:`, error);
      if (attempt >= retries) {
        if (error instanceof Error) {
          throw new Error(`Failed after ${attempt} attempts: ${error.message}`);
        }
        throw new Error(
          `Failed after ${attempt} attempts: An unknown error occurred`
        );
      }
      // 잠시 대기 후 재시도
      await new Promise((res) => setTimeout(res, 30000)); //
    } finally {
      connection.release();
    }
  }
  throw new Error("Unexpected error");
};

export const db = async <T>({
  query,
  queryParams,
}: QueryParams): Promise<T> => {
  return await executeQuery<T>(query, queryParams);
};

export default pool;
