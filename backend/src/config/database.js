import { Sequelize } from 'sequelize';
import "dotenv/config";

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL connect avec succes !");
    } catch (error) {
        console.error("❌ Error connection DB:", error);
        process.exit(1);
    }
}
export default sequelize;
export { connectDB };
