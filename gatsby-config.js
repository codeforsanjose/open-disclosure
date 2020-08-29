/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const hostname = process.env.GATSBY_API_SERVER ?? "localhost:5000"

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `source-api-plugin`,
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        filter: { internal: { type: "candidate" } },
        source: "Name",
        fieldName: "slug",
      },
    },
  ],
}
