import React from "react"
import * as styles from "./faq.module.scss"
import Layout from "../components/layout"
import FAQItem from "../components/faqitem"
import LandingPageHero from "../components/landingPageHero"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

const faq = [
  {
    sectionName: "About the data",
    questions: [
      {
        question: "Where does the data come from?",
        answer: function dataResponse() {
          return (
            <p>
              Candidates are legally required to file campaign finance forms.
              These forms are then made available by the city of San José at{" "}
              <a href="https://www.southtechhosting.com/SanJoseCity/CampaignDocsWebRetrieval/Search/SearchByElection.aspx">
                this site
              </a>
              . We collect and aggregate the data from these campaign finance
              forms and make it available to you here.
            </p>
          )
        },
      },
      {
        question: "What data is featured on the website?",
        answer:
          "Our data comes from campaign finance information collected from forms submitted to the state of California. We also feature some supplementary information collected from Ballotpedia and the campaigns themselves.",
      },
      {
        question: "How up-to-date is the data?",
        answer:
          "We provide the date when the data was last updated on the home page and aim to refresh the data every two weeks.",
      },
      {
        question:
          "Who do I contact if I believe any of this data is incorrect?",
        answer: function incorrectDataResponse() {
          return (
            <p>
              Please submit your data correction request via email to{" "}
              <a href="mailto:open-disclosure-san-jose@googlegroups.com">
                open-disclosure-san-jose@googlegroups.com
              </a>
              .
            </p>
          )
        },
      },
      {
        question: "What are San José’s campaign finance rules?",
        answer: function campaignFinanceRulesResponse() {
          return (
            <>
              <p>
                The city of San José sets limits on how much non-candidates are
                able to donate to a campaign. The candidate running for office
                can donate as much as they want to themselves, but others can
                only donate up to a certain amount that depends on the seat
                being sought and whether or not the contribution is made before
                or after the election.
              </p>
              <p>
                Anonymous contributions are not allowed; all contributions must
                be itemized no matter who they come from or their amount, and
                can only be accepted during specific windows before and after
                the election.
              </p>
              <p>
                Contributions are non-transferrable to any committee the
                candidate doesn’t control. To be eligible to transfer funds, the
                candidate must have clearly notified contributors of that
                possibility on their campaign materials. Any leftover funds must
                be returned to the contributors or turned over to the city’s
                general fund.
              </p>
              <p>
                Candidates are required to report their earnings and
                expenditures at certain points during the campaign. The City
                Clerk has the discretion to fine them for non-compliance up to
                the amount of the difference in reported contributions and
                expenditures.
              </p>
            </>
          )
        },
      },
    ],
  },
  {
    sectionName: "About the candidates",
    questions: [
      {
        question: "Does Open Disclosure endorse third-party candidates?",
        answer: function thirdPartyEndorsementResponse() {
          return (
            <>
              <p>
                In order to give users as much information about the candidate
                as possible, we may link to content created by third parties
                (including the candidate’s website and social media accounts).
                This information is not created or reviewed by us, and therefore
                we cannot guarantee that it is completely impartial or factual.
              </p>
              <p>
                We are not responsible or liable, directly or indirectly, for
                any damage or loss caused or alleged to be caused by or in
                connection to the use or reliance on any material available on
                or through such websites. Open Disclosure San José is intended
                to be an impartial source of information, and therefore neither
                support nor oppose any political parties, candidates for public
                office, or ballot measures.
              </p>
            </>
          )
        },
      },
      {
        question:
          "Where do I learn more about local candidates on the upcoming ballot?",
        answer: function learnMoreResponse() {
          return (
            <p>
              You can learn more about local candidates via the{" "}
              <a href="https://www.sccgov.org/sites/rov/Pages/Registrar-of-Voters.aspx">
                Santa Clara County Registrar of Voters
              </a>
              , <a href="https://votersedge.org/ca">Voter’s Edge</a>,{" "}
              <a href="https://ballotpedia.org/">Ballotpedia</a>, or the
              candidates’ own websites and social media.
            </p>
          )
        },
      },
      {
        question: "Does this site accept donations from local candidates?",
        answer:
          "No, this site is entirely volunteer-developed and maintained. We do not request nor do we accept funds from local campaigns.",
      },
    ],
  },
  {
    sectionName: "About Open Disclosure San José",
    questions: [
      {
        question: "Who is behind Open Disclosure San José?",
        answer: function aboutOpenDisclosureResponse() {
          return (
            <>
              <p>
                Open Disclosure San José is an open source, volunteer-developed
                project by Code for San José aimed at making it easier for the
                average voter to see where money comes from and goes to in local
                municipal elections.
              </p>
              <p>
                We believe that it is impractical to expect interested voters to
                sift through hundreds of complex PDF and CSV files in order to
                gain an understanding of a campaign’s finances. However, we also
                believe it is important that voters have this information in
                order to make informed decisions when they vote. Therefore, our
                goal is to aggregate and process the information contained in
                those documents in one place in a user-friendly format.
              </p>
            </>
          )
        },
      },
    ],
  },
]

export default function FAQ() {
  const title = "Frequently Asked Questions"
  const subtitle = "Learn more about campaign finance."

  return (
    <Layout
      title={title}
      description={subtitle}
      windowIsLarge={useWindowIsLarge()}
    >
      <header>
        <LandingPageHero title={title} subtitle={subtitle} />
      </header>
      <main className={styles.body}>
        {faq.map((faqSection, index) => (
          <section key={`faq-section-${index}`} className={styles.faqSection}>
            <h2>{faqSection.sectionName}</h2>
            {faqSection.questions.map((faqItem, i) => (
              <FAQItem key={`faq-section-${index}-item-${i}`} {...faqItem} />
            ))}
          </section>
        ))}
      </main>
    </Layout>
  )
}
