import React from "react"
import styles from "./tableauViz.module.scss"
import TableauReport from "tableau-react"

class TableauViz extends React.Component {
  constructor(props) {
    super(props)
    this.viz = null
    this.setVizRef = ref => {
      this.viz = ref
    }
  }

  componentDidMount() {
    console.log(this.viz.getUrl())
  }

  render() {
    const { candidateName } = this.props
    const [firstName, lastName] = candidateName.split(" ")

    return (
      <div className={styles.container}>
        <TableauReport
          url="https://public.tableau.com/views/SanJosecampaigndata/Dashboardmap"
          ref={this.setVizRef}
          options={{
            height: 727,
            width: "100%",
            hideTabs: false,
            "San Jose Districts": 4,
            Candidates: candidateName,
            // All other vizCreate options are supported here, too
            // They are listed here: https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#vizcreateoptions_record
          }}
          query={`?:Candidates=${firstName}%20${lastName}`}
        />
      </div>
    )
  }
}

export default TableauViz
