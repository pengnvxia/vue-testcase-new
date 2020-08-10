module.exports = {
  host: "0.0.0.0",
  proxy: {
    '^/web': {
      target: 'http://172.19.21.236:8000',
      changeOrigin: true
    }
  }
}
