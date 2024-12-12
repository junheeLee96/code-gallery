import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined, // port 값을 숫자로 변환
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

type QueryParams = {
  query: string;
  queryParams: string[];
};

export const db = async <T>({
  query,
  queryParams,
}: QueryParams): Promise<T> => {
  try {
    const [row] = await pool.query<RowDataPacket[] | ResultSetHeader>(
      query,
      queryParams
    );

    return row as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export default pool;
