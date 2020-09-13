import { graphql } from "gatsby";
import React from "react";

import { TotalAmountPanelItem } from "../components/totalAmountItem";
import LandingPageHero from "../components/landingPageHero";
import Layout from "../components/layout";
import SideNav from "../components/sideNav";
import SectionHeader from "../components/sectionHeader";
import styles from "../templates/candidate.module.scss";
import useWindowIsLarge from "../common/hooks/useWindowIsLarge";
import VotersEdgeIcon from "../../static/images/votersEdge.png";
import ChartSection from "./ChartSection";

const supportingCommittees = [
  {
    title: "Yes on Measure E! San José Neighbors for Parks & People",
    value: 500000,
  },
  {
    title: "Yes on Measure E! San José Neighbors for Parks & People",
    value: 400000,
  },
  {
    title: "Yes on Measure E! San José Neighbors for Parks & People",
    value: 14000,
  },
];


function MeasureDetails(props) {
  const measure =
    props.data?.allElection?.edges?.[0]?.node?.Referendums?.[0] ?? {};

  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <LandingPageHero
        background="blue"
        title="Measures"
        subtitle="City of San José Ballot Measures"
      />
      <div className={styles.container}>
        <SideNav>
          <div className={styles.mainSection}>
            <section>
              <SectionHeader title={measure.Title ?? ""} />
              <div className={styles.aboutSection}>
                <div>
                  <p className={styles.aboutTitle}>
                    <span className={styles.currentPosition}>
                      What would this measure do?
                    </span>
                  </p>
                  <p className={styles.aboutText}>
                    {measure?.Description ?? ""}
                  </p>
                  <div className={styles.aboutLinks}>
                    <a
                      href="https://votersedge.org/ca"
                      className={styles.aboutLink}
                    >
                      <img
                        alt="External link icon"
                        src={VotersEdgeIcon}
                        className={styles.icon}
                      />
                      More information on Voter's Edge
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <SectionHeader title="Fundraising totals" />
              <div className={styles.totals}>
                <TotalAmountPanelItem type="measureSupport" total={654876} />
                <TotalAmountPanelItem type="measureOppose" total={383254} />
              </div>
            </section>
            <ChartSection
              title="Supporting Committee(s)"
              type="contributions"
              id="contributions"
              total={654876}
              data={supportingCommittees}
            />
          </div>
        </SideNav>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allElection {
      edges {
        node {
          Referendums {
            Title
            Description
            Total_Contributions
          }
        }
      }
    }
  }
`;

export default MeasureDetails;
