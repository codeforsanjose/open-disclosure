import React from "react"
import MainPageSection from "./mainPageSection"
import Carousel from "../common/carousel/index"

const CandidateSection = ({ candidates, windowIsLarge }) => {
  return (
    <MainPageSection
      offWhite
      carousel
      windowIsLarge={windowIsLarge}
      {...candidates}
    >
      {!windowIsLarge && <Carousel {...candidates} />}
    </MainPageSection>
  )
}

export default CandidateSection
