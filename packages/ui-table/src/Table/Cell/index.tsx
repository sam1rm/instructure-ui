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

/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps, callRenderProp } from '@instructure/ui-react-utils'
import { View } from '@instructure/ui-view'

import { withStyle, jsx } from '@instructure/emotion'

import generateStyle from './styles'
import generateComponentTheme from './theme'
import { TableCellProps } from './types'

/**
---
parent: Table
id: Table.Cell
---
**/
@withStyle(generateStyle, generateComponentTheme)
class Cell extends Component<TableCellProps> {
  static readonly componentId = 'Table.Cell'

  /* eslint-disable react/require-default-props */
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isStacked: PropTypes.bool,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    /**
     * Control the text alignment in cell
     */
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    textAlign: 'start',
    children: null
  }

  componentDidMount() {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  // @ts-expect-error ts-migrate(6133) FIXME: 'prevProps' is declared but its value is never rea... Remove this comment to see the full error message
  componentDidUpdate(prevProps, prevState, snapshot) {
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.makeStyles()
  }

  render() {
    const { children, styles, isStacked, header } = this.props

    return (
      <View
        {...View.omitViewProps(omitProps(this.props, Cell.propTypes), Cell)}
        as={isStacked ? 'div' : 'td'}
        css={styles.cell}
        role={isStacked ? 'cell' : null}
      >
        {header && callRenderProp(header)}
        {header && ': '}
        {callRenderProp(children)}
      </View>
    )
  }
}

export default Cell
export { Cell }
