import { useEffect, useState } from 'react'

const useDebounce = <Value extends number | string>(
  value?: Value,
  delay = 500
) => {
  const [debouncedValue, setDebouncedValue] = useState<Value>()

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
