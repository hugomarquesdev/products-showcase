import React from 'react'
import { AnimatePresence } from 'framer-motion'

export { default as wrapRootElement } from './src/state/ReduxWrapper'

export const wrapPageElement = ({element}) => (
  <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
)