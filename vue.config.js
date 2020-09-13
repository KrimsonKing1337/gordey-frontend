// const portfinder = require('portfinder');

module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/uploads/img': {
        target: 'http://localhost:3000',
        pathRewrite: { '/uploads/img': '/images' },
        secure: false,
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
