import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [{
    resolve: `gatsby-plugin-output`,
    options: {
      // default values
      publicPath: 'public',
      rmPublicFolder: false
    }
  }],
}

export default config
