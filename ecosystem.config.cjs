module.exports = {
  apps: [{
    name: "atdigitalmenu",
    script: "./dist/index.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 3002,
      MONGODB_URI: "mongodb+srv://sairajkoyande_db_user:a5RlALolj2OOnZ4q@atdigitalmenu.za2j2lz.mongodb.net/?appName=atdigitalmenu",
      SESSION_SECRET: "f7k2$Xqp9mLzR4#vNwT8@cYdJeA3bQsU"
    }
  }]
};
