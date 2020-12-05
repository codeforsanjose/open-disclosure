import React from "react"
import styles from "./tableauViz.module.scss"
import TableauReport from "tableau-react"

export default function TableauViz({ candidateName, candidateSeat }) {
  const [firstName, lastName] = candidateName.split(" ")
  const candidateSeatArray = candidateSeat.split(" ")
  const candidateDistrict = candidateSeatArray[candidateSeatArray.length - 1]

  return (
    <div className={styles.container}>
      <TableauReport
        url="https://public.tableau.com/views/SanJosecampaigndata3/Dashboardmap"
        options={{
          height: 750,
          width: "100%",
          "Council district calc": candidateDistrict,
          CandidateControlledName: candidateName,
          "Candidate or Independent merged": candidateName,
          "Form type calc": "Contributions",
        }}
        query={`?:Candidates=${firstName}%20${lastName}`}
      />
    </div>
  )
}
