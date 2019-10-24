import React, { PureComponent } from "react"
import sideNavStyles from "./sideNav.module.css"

export default class sideNav extends PureComponent {
  menuItems = [
    {
      sectionName: "City-Wide Office",
      sectionItems: ["Mayor", "City Auditor"],
    },
    {
      sectionName: "City Council",
      sectionItems: [
        "City Council District 2",
        "City Council District 4",
        "City Council District 6",
      ],
    },
    {
      sectionName: "San José Unified School District",
      sectionItems: [
        "SJUSD District 2",
        "SJUSD District 4",
        "SJUSD District 6",
      ],
    },
    {
      sectionName: "Ballot Measures",
      sectionItems: [
        {
          measureName: "Measure AA",
          description: "San José Children's Initiative",
        },
        {
          measureName: "Measure V",
          description: "Cannabis Business Tax",
        },
        {
          measureName: "Measure W",
          description: "Vacant Property Parcel Tax",
        },
        {
          measureName: "Measure X",
          description: "Tiered Real Property Transfer Tax",
        },
        {
          measureName: "Measure Y",
          description: "Just Cause Eviction Agreements",
        },
        {
          measureName: "Measure Z",
          description: "Hotel Employee Minimum Wage and Workplace Protections",
        },
      ],
    },
  ]

  render() {
    return (
      <nav>
        {this.menuItems.map((menuItem, menuIndex) => (
          <div className={sideNavStyles.section}>
            <div className={sideNavStyles.border} />
            <h4 className={sideNavStyles.sectionTitle}>
              {menuItem.sectionName}
            </h4>
            {menuItem.sectionItems.map((sectionItem, sectionItemIndex) =>
              sectionItem.measureName ? (
                <div
                  className={`${sideNavStyles.sectionItem} ${sideNavStyles.measureItem}`}
                >
                  {sectionItem.measureName}
                  <span className={sideNavStyles.measureDescription}>
                    {sectionItem.description}
                  </span>
                </div>
              ) : (
                <div className={sideNavStyles.sectionItem}>{sectionItem}</div>
              )
            )}
          </div>
        ))}
      </nav>
    )
  }
}
