const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Lodestone',
    description: 'React + Redux + Skeleton + EvilIcons',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Lodestone',
        'og:image': '',
        'og:locale': 'en_US',
        'og:title': 'Lodestone',
        'og:description': 'A kindly tongue is the lodestone of the hearts of men.',
        'twitter:card': 'summary',
        'twitter:site': '@oliveroxenham',
        'twitter:creator': '@oliveroxenham',
        'twitter:title': 'Lodestone',
        'twitter:description': 'A kindly tongue is the lodestone of the hearts of men.',
        'twitter:image': '',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
