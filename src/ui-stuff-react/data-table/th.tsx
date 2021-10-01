import * as React from 'react'

function Th(props: React.PropsWithChildren<HTMLTableHeaderCellElement>) {
    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            {...props}
        >
            {props.children}
        </th>
    )
}

export { Th }
