import React from "react"
import styles from "./tableauViz.module.scss"
import TableauReport from "tableau-react"

const TableauViz = ({ candidateName }) => {
  // const [firstName, lastName] = candidateName.split(" ")
  console.log(candidateName)
  return (
    <div className={styles.container}>
      <TableauReport
        url="https://public.tableau.com/views/SanJosecampaigndata/Dashboardmap"
        options={{
          height: 600,
          width: 1000,
          hideTabs: false,
          // All other vizCreate options are supported here, too
          // They are listed here: https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#vizcreateoptions_record
        }}
        // query={`language=en&Candidates=${firstName}%20${lastName}`}
      />
    </div>
  )
}

export default TableauViz
