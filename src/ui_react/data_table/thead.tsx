import * as React from 'react'

function THead(props: React.PropsWithChildren<HTMLTableSectionElement>) {
    return (
        <thead className="bg-gray-50" {...props}>
            {props.children}
        </thead>
    )
}

export { THead }
