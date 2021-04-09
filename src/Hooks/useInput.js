import  isEmpty  from 'lodash/isEmpty'
import { useState } from 'react'

export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e) => {
        isEmpty(e)
            ? setValue('')
            : setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}