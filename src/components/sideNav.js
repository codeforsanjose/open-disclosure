import React, { PureComponent } from "react"
import sideNavStyles from "./sideNav.module.css"

export default class sideNav extends PureComponent {
  render() {
    return (
      <nav style={this.props.smallWindowStyle}>
        {this.props.menuItems.map((menuItem, menuIndex) => (
          <div key={`menuItem ${menuIndex}`} className={sideNavStyles.section}>
            <div className={sideNavStyles.border} />
            <h4 className={sideNavStyles.sectionTitle}>
              {menuItem.sectionName}
            </h4>
            {menuItem.sectionItems.map((sectionItem, sectionItemIndex) =>
              sectionItem.measureName ? (
                <div
                  key={`sectionItem ${sectionItemIndex}`}
                  className={`${sideNavStyles.sectionItem} ${sideNavStyles.measureItem}`}
                  onClick={() => this.props.selectItem(sectionItem)}
                  style={
                    this.props.selectedCategory.measureName ===
                    sectionItem.measureName
                      ? { backgroundColor: "#ffdd1f" }
                      : {}
                  }
                >
                  {sectionItem.measureName}
                  <span className={sideNavStyles.measureDescription}>
                    {sectionItem.description}
                  </span>
                </div>
              ) : (
                <div
                  key={`sectionItem ${sectionItemIndex}`}
                  className={sideNavStyles.sectionItem}
                  onClick={() => this.props.selectItem(sectionItem)}
                  style={
                    this.props.selectedCategory === sectionItem
                      ? { backgroundColor: "#ffdd1f" }
                      : {}
                  }
                >
                  {sectionItem}
                </div>
              )
            )}
          </div>
        ))}
      </nav>
    )
  }
}
