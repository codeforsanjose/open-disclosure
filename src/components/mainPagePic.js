import { Link } from 'gatsby';
import React from 'react';

import styles from './mainPagePic.module.scss';

const MainPagePic = (props) => {
  const { reversed, title, description, linkTo, linkImg, image } = props;

  return (
    <section className={`${styles.container} ${reversed && styles.reversed}`}>
      <img alt="main-page" className="responsive" width="665px" src={image} />
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={linkTo}>
          <img alt="link" src={linkImg} />
        </Link>
      </div>
    </section>
  );
};

export default MainPagePic
