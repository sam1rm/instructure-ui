/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { AsElementType } from '@instructure/shared-types'
import type {
  PlacementPropValues,
  PositionConstraint,
  PositionMountNode
} from '@instructure/ui-position'

export type ChildrenArgs = {
  focused: boolean
  getTriggerProps: <P extends Record<string, unknown>>(
    props: P
  ) => P & { 'aria-describedby': string }
}

export type TooltipProps = {
  makeStyles?: (...args: any[]) => any
  styles?: any
  renderTip: React.ReactNode | ((...args: any[]) => any)
  isShowingContent?: boolean
  defaultIsShowingContent?: boolean
  as?: AsElementType
  on?: ('click' | 'hover' | 'focus') | ('click' | 'hover' | 'focus')[]
  color?: 'primary' | 'primary-inverse'
  placement?: PlacementPropValues
  mountNode?: PositionMountNode
  constrain?: PositionConstraint
  positionTarget?: PositionMountNode
  offsetX?: string | number
  offsetY?: string | number
  onShowContent?: (...args: any[]) => any
  onHideContent?: (...args: any[]) => any
  children?: React.ReactNode | ((args: ChildrenArgs) => React.ReactNode)
}
