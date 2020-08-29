/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const hostname = process.env.GATSBY_API_SERVER ?? "localhost:5000"

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: `http://${hostname}/open-disclosure/api/v1.0/candidates`,
        method: "get",
        data: {},
        name: `candidate`,
        entityLevel: `Candidates`,
        schemaType: {
          Name: "String",
          Elections: [
            {
              ElectionCycle: "String",
              ElectionTitle: "String",
              Committees: [{ Name: "String", TotalFunding: 1 }],
            },
          ],
        },
        enableDevRefresh: true,
      },
    },
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
