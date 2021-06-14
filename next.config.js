const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
  images: {
    domains: ['i.ibb.co']
  }
}

module.exports = withPlugins([[withImages]], nextConfig);
