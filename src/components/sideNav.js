import React, { PureComponent } from "react"
import sideNavStyles from "./sideNav.module.css"

export default class sideNav extends PureComponent {
  
  render() {
    return (
      <nav className={sideNavStyles.navBar}>
        {this.props.children}
        {this.props.menuItems.map((menuItem, menuIndex) => (
          <div key={`menuItem ${menuIndex}`} className={sideNavStyles.listItem}>
            <h4 className={sideNavStyles.sectionTitle}>
              {menuItem.sectionName}
            </h4>
            
            {menuItem.sectionItems.map((sectionItem, sectionItemIndex) =>
              <div
                key={`sectionItem ${sectionItemIndex}`}
                  className={sideNavStyles.sectionItem}
                 >
                   {sectionItem}
                 </div>
       
            )}
          </div>
      ))}
    </nav>
  )}
}