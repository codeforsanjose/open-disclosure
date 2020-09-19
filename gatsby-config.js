/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `source-api-plugin`,
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/data",
      },
    },
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        filter: { internal: { type: "Candidate" } },
        source: "Name",
        fieldName: "slug",
      },
    },
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        filter: { internal: { type: "CandidatesJson" } },
        source: "name",
        fieldName: "slug",
      },
    },
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        filter: { internal: { type: "OfficeElection" } },
        source: "Title",
        fieldName: "slug",
      },
    },
  ],
}
