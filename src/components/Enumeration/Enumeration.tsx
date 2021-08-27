import React, { memo } from 'react'

const Enumeration = (props: {enumerables: string[]}) => {
    const { enumerables } = props;
    const enumerablesLen = enumerables.length
    return (
        <>
            {enumerables.map((enumerable, i) => {
                if (enumerablesLen === i + 1) {
                    // last one
                    return enumerable
                } else {
                    // not last one
                    return enumerable+', '
                }
            })}
        </>
    )
}

export default memo(Enumeration)