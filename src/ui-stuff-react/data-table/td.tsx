import * as React from 'react'

function Td(props: React.PropsWithChildren<HTMLTableDataCellElement & { subtext?: string }>) {
    return (
        <td className="px-6 py-4 whitespace-nowrap" {...props}>
            <div className="flex items-center">
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{props.children}</div>
                    <div className="text-sm text-gray-500">{props.subtext}</div>
                </div>
            </div>
        </td>
    )
}

export { Td }
