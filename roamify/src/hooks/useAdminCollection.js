import { useEffect, useState } from 'react'

function useAdminCollection(readCollection, storageKey) {
  const [items, setItems] = useState(() => readCollection())

  useEffect(() => {
    setItems(readCollection())

    if (typeof window === 'undefined') {
      return undefined
    }

    const syncItems = () => {
      setItems(readCollection())
    }

    const handleStorage = (event) => {
      if (!event.key || event.key === storageKey) {
        syncItems()
      }
    }

    const handleAdminContentChange = (event) => {
      if (event.detail?.storageKey === storageKey) {
        syncItems()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('roamify-admin-content-change', handleAdminContentChange)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('roamify-admin-content-change', handleAdminContentChange)
    }
  }, [readCollection, storageKey])

  return [items, setItems]
}

export default useAdminCollection
