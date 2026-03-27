import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import sequelize from './config/database.js';

try {
    await sequelize.authenticate();
    console.log('DB connected');

    await sequelize.sync({ force: false });
    console.log('Models synced');
} catch (error) {
    console.error('DB error:', error);
}

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Somthing went wrong!'
    });
});

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');

        await sequelize.sync({ force: false, alert: false })
        console.log('✅ All models synchronized with database');
        console.log('📝 Registered models:', Object.keys(sequelize.models));

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error);
        process.exit(1);
    }
};
connectDB();
startServer();

export default app;