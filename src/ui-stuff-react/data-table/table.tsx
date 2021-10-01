import * as React from 'react'

function Table(props: React.PropsWithChildren<HTMLTableElement>) {
    return (
        <table className="min-w-full divide-y divide-gray-200" {...props}>
            {props.children}
        </table>
    )
}

export { Table }
