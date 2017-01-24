module.exports = {
    apps : [
      {
        name: 'oinkster',
        cwd:'/home/ubuntu/oinkster/',
        script: 'dist/server/index.js',
        watch: false,
        exec_mode: 'cluster',
        instances: 'max',
        env: {
          'NODE_ENV': 'dev',
          'PORT': 3000
        },
        env_production : {
          'NODE_ENV': 'production',
          'PORT': 5000
        },
        out_file: './logs/production/out.log',
        error_file: './logs/production/err.log',
        merge_logs: true
      }
  ]
}
