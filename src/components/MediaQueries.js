import { css } from 'styled-components'

export const breakpoint = {
    xl:'1200px',
    l:'1024px',
    m:'700px',
    s:'500px'
}

export const media = {
    xl: (...args) =>
    css`
        @media screen and (max-width: ${breakpoint.xl}) {
            ${css(...args)}
        }
    `,
    l: (...args) =>
        css`
        @media screen and (max-width: ${breakpoint.l}) {
            ${css(...args)}
        }
    `,
    m: (...args) =>
        css`
        @media screen and (max-width: ${breakpoint.m}) {
            ${css(...args)}
        }
    `,
    s: (...args) =>
        css`
        @media screen and (max-width: ${breakpoint.s}) {
            ${css(...args)}
        }
    `
};