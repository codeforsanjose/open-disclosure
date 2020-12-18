import { Link } from "gatsby"
import React from "react"

import styles from "./mainPagePic.module.scss"

const MainPagePic = props => {
  const { reversed, title, description, href, linkImg, image } = props

  return (
    <section className={styles.outerContainer}>
      <div
        className={`${styles.innerContainer} ${reversed && styles.reversed}`}
      >
        <img
          alt="main-page"
          width="549px"
          height="574px"
          className={styles.blob}
          src={image}
        />
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
          <Link to={href}>
            <img alt="link" src={linkImg} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MainPagePic
