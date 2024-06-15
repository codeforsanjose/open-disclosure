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
        nodeType: "Candidate",
        baseField: 'Name',
        fieldName: "slug",
      },
    },
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        nodeType: 'CandidatesJson',
        baseField: 'name',
        fieldName: "slug",
      },
    },
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        nodeType: 'OfficeElection',
        baseField: 'Title',
        fieldName: "slug",
      },
    },
    {
      resolve: "gatsby-plugin-slug-field",
      options: {
        nodeType: 'Referendum',
        baseField: 'Title',
        fieldName: "slug",
      },
    },
  ],
}
