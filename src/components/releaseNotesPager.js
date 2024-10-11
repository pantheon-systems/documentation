import React from 'react'
import { Icon } from "@pantheon-systems/pds-toolkit-react"
import { navigate } from 'gatsby'

const ReleaseNotesPager = ({currentPage, setCurrentPage, totalPagesRef, queryStrings, setIsPageLoaded }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }

  const handlePageChange = (newPage) => {
    setIsPageLoaded(false)
    setCurrentPage(newPage)
    navigate(`/release-notes/${newPage}/?${queryStrings}`)
    scrollToTop()
  }

  const createPageRange = (currentPage, totalPages, delta = 2) => {
    const range = []
    const sideDelta = 2

    if (currentPage <= delta + 1) {
      // Near the start
      for (let i = 1; i <= Math.min(totalPages, delta * 2 + 1); i++) {
        range.push(i)
      }
      if (totalPages > delta * 2 + 1) {
        range.push('...')
      }
    } else if (currentPage >= totalPages - delta) {
      // Near the end
      range.push('...');
      for (let i = Math.max(1, totalPages - delta * 2); i <= totalPages; i++) {
        range.push(i)
      }
    } else {
      // In the middle
      range.push('...')
      for (let i = currentPage - sideDelta; i <= currentPage + sideDelta; i++) {
        range.push(i)
      }
      range.push('...')
    }

    if (range[range.length - 1] !== totalPages) {
      range.push(totalPages);
    }

    return range;
  }

  // Generate the range of pages to display
  const pages = createPageRange(currentPage, totalPagesRef.current, 2);

  return (
    <div className="rn-pagination-controls">
      { currentPage > 1 &&
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>First</button>
      }
      { totalPagesRef.current > 1 && currentPage > 1 &&
        <button onClick={() => handlePageChange(currentPage - 1)} className='arrowIcon'>
          <Icon iconName='arrowLeft' />
        </button>
      }
      {
        pages.map((page, index) => {
          return (
            <button
              key={page === '...' ? `dots-${index}` : page}
              onClick={() => page !== '...' && handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          )
        })
      }
      { totalPagesRef.current > 1 && currentPage < totalPagesRef.current &&
        <button onClick={() => handlePageChange(currentPage + 1)} className='arrowIcon' disabled={totalPagesRef.current === 1 || currentPage === totalPagesRef.current}>
          <Icon iconName='arrowRight' />
        </button>
      }
      { currentPage !== totalPagesRef.current &&
        <button onClick={() => handlePageChange(totalPagesRef.current)} disabled={currentPage === totalPagesRef.current}>Last</button>
      }
    </div>
  )
}

export default ReleaseNotesPager