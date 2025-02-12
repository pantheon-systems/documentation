import React, { useState } from "react"
import { activeReleaseNoteCategories } from "../data/releaseNoteCategories"
import { Button, FlexContainer, Popover } from "@pantheon-systems/pds-toolkit-react"

const ReleaseNotePopoverCategorySelector = ({filters, setFilters, setCurrentPage, isDisabled}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  // Get the active categories data.
  const activeCategories = JSON.parse(activeReleaseNoteCategories())

  const handleCheckbox = (cat) => {
    // Find the index of the category in the filters.categories array by matching the slug
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

    // Move pager to the first page
    setCurrentPage(1)
  }

  const handleClearCategoriesFilters = () => {
    setFilters(prevState => ({...prevState, categories: []}))

    // Move pager to the first page
    setCurrentPage(1)
  }

  const handlePopoverClose = () => {
    setIsPopoverOpen(false)
  }

  // Set the icon based on the popover state: 'angleUp' if open, 'angleDown' if closed
  let popoverTriggerIcon = isPopoverOpen ? 'angleUp' : 'angleDown'

  // Popover columns config
  const itemsPerColumn = 6
  const totalItems = activeCategories.length
  const totalColumns = totalItems / itemsPerColumn

  const popoverContent = (
    <>
      <div className='rn-popover-content' id='popoverContent'>
        {/* Create an array, with length defined in `totalColumns` */}
        {Array.from({ length: totalColumns }, (_, columnIndex) => (
          // Iterate over each column
          <div key={columnIndex} className="rn-popover-content-inner">
            {/* For each column, render items within the specified range based on `itemsPerColumn`
            and slice `activeCategories` to get the items for the current column. */}
            { activeCategories.slice(columnIndex * itemsPerColumn, (columnIndex + 1) * itemsPerColumn).map(item => {
              // Check in the state if the category/item is selected
              const isChecked = filters.categories.some(category => category.slug === item.slug)
              return (
                // Render each category/item with a checkbox and label
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
      disabled={isDisabled}
    />
  )

  return (
    <>
      <Popover
        customTrigger={popoverTrigger}
        title={'Categories'}
        content={popoverContent}
        hasCloseButton={true}
        className={'rn-popover-categories'}
        placement='bottom-start'
        onClose={handlePopoverClose}
        offsetValue= {18}
      />
    </>
  )
}

export default ReleaseNotePopoverCategorySelector
