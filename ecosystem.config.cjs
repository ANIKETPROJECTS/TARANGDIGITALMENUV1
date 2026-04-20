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
      PORT: process.env.PORT || 3002,
      MONGODB_URI: process.env.MONGODB_URI,
      SESSION_SECRET: process.env.SESSION_SECRET,
      ADMIN_API_TOKEN: process.env.ADMIN_API_TOKEN
    }
  }]
};
