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
import {
  locator,
  findByQuery,
  parseQueryArguments
} from '@instructure/ui-test-utils'

import Menu from './index'

import MenuItem from './MenuItem/locator'
import MenuItemGroup from './MenuItemGroup/locator'

import PopoverLocator, { PopoverTriggerLocator } from '@instructure/ui-overlays/lib/components/Popover/locator'

const customMethods = {
  findAllItems: (...args) => {
    return MenuItem.findAll(...args)
  },
  findItem: (...args) => {
    return MenuItem.find(...args)
  },
  findAllGroups: (...args) => {
    return MenuItemGroup.findAll(...args)
  },
  findGroup: (...args) => {
    return MenuItemGroup.find(...args)
  },
  findPopoverTrigger: (...args) => {
    return PopoverTriggerLocator.find(...args)
  },
  findPopoverContent: (...args) => {
    const { element, selector, options } = parseQueryArguments(...args)

    return findByQuery(
      (element, selector, options) => {
        return PopoverLocator.contentQuery(PopoverLocator.query(element))
      },
      element,
      selector,
      {
        ...options,
        customMethods: {
          ...options.customMethods,
          ...customMethods
        }
      }
    )
  }
}

export default locator(Menu.displayName, customMethods)

export { default as MenuItem } from './MenuItem/locator'
export { default as MenuItemGroup } from './MenuItemGroup/locator'
