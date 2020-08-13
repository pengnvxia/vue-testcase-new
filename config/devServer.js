module.exports = {
  host: "0.0.0.0",
  proxy: {
    '^/': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true
    }
  }
}
