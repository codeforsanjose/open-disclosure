/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: `http://localhost:5000/open-disclosure/api/v1.0/candidates`,
        method: "get",
        data: {},
        name: `candidates`,
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
  ],
}
