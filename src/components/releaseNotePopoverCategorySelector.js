import React from "react"
import { activeReleaseNoteCategories } from "../data/releaseNoteCategories"
import { Popover } from "@pantheon-systems/pds-toolkit-react"
import { FlexContainer } from "@pantheon-systems/pds-toolkit-react"

const ReleaseNotePopoverCategorySelector = ({filters, setFilters}) => {

  // Get the active categories data.
  const activeCategories = JSON.parse(activeReleaseNoteCategories())

  const handleCheckbox = (cat) => {
    const index = filters.categories.findIndex(category => category.slug === cat.slug);
    if (index !== -1){
      setFilters(prevState => ({...prevState, categories: prevState.categories.filter(item => item.slug !== cat.slug)}))
    } else {
      setFilters( prevState => ({...prevState, categories: [...prevState.categories, cat]}))
    }
  }

  const popoverContent = (
    <>
      { activeCategories.map(item => {
        const isChecked = filters.categories.some(category => category.slug === item.slug)
        return (
          <FlexContainer key={item.slug}>
            <input
              type='checkbox'
              name={item.displayName}
              id=''
              onChange={() => handleCheckbox(item)}
              checked={isChecked}
            />
            <label htmlFor={item.displayName}>{item.displayName}</label>
          </FlexContainer>
        )
      })}
    </>
  )

  const popoverTrigger = (
    <button>
      Filter by category
    </button>
  )

  return (
    <>
      <Popover
        customTrigger={popoverTrigger}
        title={'Categories'}
        content={popoverContent}
        hasCloseButton={true}
      />
    </>
  )
}

export default ReleaseNotePopoverCategorySelector
