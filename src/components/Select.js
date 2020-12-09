import React, { useEffect, useRef } from 'react'

function Select({ data, setViews, views, inputName, setForm, form, selects, setSelects }) {
    const optionsRef = useRef();

    function closedOptions(evt) {
        if (!evt.path.includes(optionsRef.current)) {
            setViews({
                ...views,
                [inputName]: false
            })
        } else {
            setForm({
                ...form,
                [inputName]: {
                    ...form[inputName],
                    value: evt.target.getAttribute('value')
                }
            })
            setViews({
                ...views,
                [inputName]: false
            })

            setSelects({
                ...selects,
                [inputName]: evt.target.textContent
            })
        }
    }

    useEffect(() => {
        document.addEventListener('click', closedOptions)
        return () => { document.removeEventListener('click', closedOptions) }
    }, [])

    return (
        <div ref={optionsRef} className="options">
            {data.map(item => {
                return <div key={item.name} className="option"><p value={item.value}>{item.name}</p></div>
            })}
        </div>
    )
}

export default Select
