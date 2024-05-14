import React, { useState, useRef } from "react"
import { activeReleaseNoteCategories } from "../data/releaseNoteCategories"
import { Button, FlexContainer, Popover } from "@pantheon-systems/pds-toolkit-react"

const ReleaseNotePopoverCategorySelector = ({filters, setFilters}) => {
  const [popoverTriggerIcon, setPopoverTriggerIcon] = useState('angleDown')

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

  const handleClearCategoriesFilters = () => {
    setFilters( prevState => ({...prevState, categories: []}))
  }

  const handlePopoverTriggerIcon = () => {
    const newIcon = popoverTriggerIcon === 'angleDown' ? 'angleUp' : 'angleDown'
    setPopoverTriggerIcon(newIcon)
  }

  const itemsPerColumn = 6
  const totalItems = activeCategories.length
  const totalColumns = totalItems / itemsPerColumn

  const popoverContent = (
    <>
      <div style={{ display: 'flex', gap: 74}} id='popoverContent'>
        {Array.from({ length: totalColumns }, (_, columnIndex) => (
          <div key={columnIndex} style={{ marginBottom: '10px' }}>
            { activeCategories.slice(columnIndex * itemsPerColumn, (columnIndex + 1) * itemsPerColumn).map(item => {
              const isChecked = filters.categories.some(category => category.slug === item.slug)
              return (
                <FlexContainer key={item.slug} style={{ gap: '8px' }} className='pds-spacing-pad-block-end-m'>
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
      variant='secondary'
      iconName={popoverTriggerIcon}
      displayType='icon-end'
      onClick={handlePopoverTriggerIcon}
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
      />
    </>
  )
}

export default ReleaseNotePopoverCategorySelector
