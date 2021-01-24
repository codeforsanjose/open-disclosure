/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Open Disclosure San José",
    description:
      "Keep tabs on the influence of money in local San José elections",
    author: "Code for San José",
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-axe`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-1ZFK2JF1YP",
      },
    },
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
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        filter: { internal: { type: "Referendum" } },
        source: "Name",
        fieldName: "slug",
      },
    },
  ],
}
