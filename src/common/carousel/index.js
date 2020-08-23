import React, { useEffect, useState, useCallback } from "react"
import styles from "./styles.module.scss"
import { useEmblaCarousel } from "embla-carousel/react"

const Carousel = props => {
  const [EmblaCarouselReact, embla] = useEmblaCarousel({
    loop: true,
    startIndex: 1,
  })

  return (
    <EmblaCarouselReact>
      <div className={styles.embla}>
        {props.items.map(item => (
          <div className={styles.emblaSlide}>{props.renderItem(item)}</div>
        ))}
      </div>
    </EmblaCarouselReact>
  )
}

export default Carousel
