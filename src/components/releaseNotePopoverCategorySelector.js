import React, { useState, useRef } from "react"
import { activeReleaseNoteCategories } from "../data/releaseNoteCategories"
import { Button, FlexContainer, Popover } from "@pantheon-systems/pds-toolkit-react"

const ReleaseNotePopoverCategorySelector = ({filters, setFilters}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  // Get the active categories data.
  const activeCategories = JSON.parse(activeReleaseNoteCategories())

  const handleCheckbox = (cat) => {
    const index = filters.categories.findIndex(category => category.slug === cat.slug)
    let updatedCategories

    if (index !== -1){
      // If category is selected, remove it
      updatedCategories = filters.categories.filter(item => item.slug !== cat.slug)
      setFilters(prevState => ({...prevState, categories: updatedCategories}))
    } else {
      // If category is not selected, add it
      updatedCategories = [...filters.categories, cat]
      setFilters( prevState => ({...prevState, categories: [...prevState.categories, cat]}))
    }
  }

  const handleClearCategoriesFilters = () => {
    setFilters( prevState => ({...prevState, categories: []}))
  }

  const handlePopoverClose = () => {
    setIsPopoverOpen(false)
  }
  let popoverTriggerIcon = isPopoverOpen ? 'angleUp' : 'angleDown'

  const itemsPerColumn = 6
  const totalItems = activeCategories.length
  const totalColumns = totalItems / itemsPerColumn

  const popoverContent = (
    <>
      <div className='popover-content' id='popoverContent'>
        {Array.from({ length: totalColumns }, (_, columnIndex) => (
          <div key={columnIndex} className="popover-content-inner">
            { activeCategories.slice(columnIndex * itemsPerColumn, (columnIndex + 1) * itemsPerColumn).map(item => {
              const isChecked = filters.categories.some(category => category.slug === item.slug)
              return (
                <FlexContainer
                  key={item.slug}
                  style={{ gap: '8px' }}
                  className='pds-spacing-pad-block-end-m category-checkbox-group'
                  mobileFlex='same'
                >
                  <input
                    type='checkbox'
                    name={item.displayName}
                    id={item.displayName}
                    onChange={() => handleCheckbox(item)}
                    checked={isChecked}
                  />
                  <label
                    htmlFor={item.displayName}
                    className="pds-spacing-mar-block-end-none"
                    style={{ fontWeight: 400 }}
                  >
                    {item.displayName}
                  </label>
                </FlexContainer>
              )
            })}
          </div>
        ))}
      </div>
      <Button
        label='Clear all filters'
        variant='subtle'
        size='sm'
        onClick={handleClearCategoriesFilters}
      />
    </>
  )

  const popoverTrigger = (
    <Button
      label='Filter by category'
      size='md'
      variant='secondary'
      iconName={popoverTriggerIcon}
      displayType='icon-end'
      onClick={() => setIsPopoverOpen(true)}
    />
  )

  return (
    <>
      <Popover
        customTrigger={popoverTrigger}
        title={'Categories'}
        content={popoverContent}
        hasCloseButton={true}
        className={'popover-categories'}
        placement='bottom-start'
        onClose={handlePopoverClose}
        offsetValue= {18}
      />
    </>
  )
}

export default ReleaseNotePopoverCategorySelector
