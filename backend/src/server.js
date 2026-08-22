import './config/env.js';
import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/db.js';

const PORT = Number(env.PORT) || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Dayflow API running on http://localhost:${PORT}`);
      console.log(`   Environment: ${env.NODE_ENV}`);
      console.log(`   Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
