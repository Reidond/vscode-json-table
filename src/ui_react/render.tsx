/*
 * Andrii Shafar <andrii.shafar@uzhnu.edu.ua> Software Engineer
 * Copyright (C) 2021 Andrii Shafar
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import * as React from 'react'
import * as Server from 'react-dom/server'
import { App } from './app'
import './tailwind.css'

interface Links {
    rel: string
    href: string
}

export function renderAppHtml(links?: Links[] | null) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            ${links?.map(({ rel, href }) => `<link rel=${rel} href=${href}>`)}
        </head>
        <body>${Server.renderToString(<App />)}</body>
    </html>`
}
