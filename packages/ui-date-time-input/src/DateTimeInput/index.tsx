/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 - present Instructure, Inc.
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

import React, { Component, SyntheticEvent } from 'react'
import PropTypes from 'prop-types'

import { controllable } from '@instructure/ui-prop-types'
import { DateTime, I18nPropTypes, Locale } from '@instructure/ui-i18n'
import { FormPropTypes, FormFieldGroup } from '@instructure/ui-form-field'
import type { FormMessage } from '@instructure/ui-form-field'

import { DateInput } from '@instructure/ui-date-input'
import { TimeSelect } from '@instructure/ui-time-select'
import type { InteractionType } from '@instructure/ui-react-utils'
import { Calendar } from '@instructure/ui-calendar'

type DateTimeInputProps = {
  /**
   * The label over the composite `DateTimeInput` component
   **/
  description: any
  /**
   * The label over the Date Input
   **/
  dateLabel: string
  /**
   * A button to render in the calendar navigation header. The recommendation is
   * to compose it with the [Button](#Button) component, setting the `variant`
   * prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to
   * [IconArrowOpenEnd](#iconography).
   */
  renderNextMonthButton: ((...args: any[]) => any) | React.ReactNode
  /**
   * A button to render in the calendar navigation header. The recommendation is
   * to compose it with the [Button](#Button) component, setting the `variant`
   * prop to `icon`, the `size` prop to `small`, and setting the `icon` prop to
   * [IconArrowOpenStart](#iconography).
   */
  renderPrevMonthButton: ((...args: any[]) => any) | React.ReactNode
  /**
   * HTML placeholder text to display when the date input has no value.
   * This should be hint text, not a label replacement.
   **/
  datePlaceholder?: string
  /**
   * The format of the date shown in the `DateInput` when a date is selected.
   * Valid formats are compatible with
   * [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
   * including localized formats.
   *
   * If omitted, defers to the underlying `DateInput`'s default.
   **/
  dateFormat?: string
  /**
   * The label over the time input
   **/
  timeLabel: string
  /**
   * The number of minutes to increment by when generating the allowable time options.
   */
  timeStep?: 5 | 10 | 15 | 20 | 30 | 60
  /**
   * The format of the time shown in the `TimeSelect` when a time is selected.
   * Valid formats are compatible with
   * [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
   * including localized formats.
   *
   * If omitted, defers to the underlying `TimeSelect`'s default.
   **/
  timeFormat?: string
  /**
   * A standard language identifier.
   *
   * See [moment.js i18n](https://momentjs.com/docs/#/i18n/) for more details.
   *
   * This property can also be set via a context property and if both are set then the component property takes
   * precedence over the context property.
   *
   * The web browser's locale will be used if no value is set via a component property or a context
   * property.
   **/
  locale?: string
  /**
   * A timezone identifier in the format: Area/Location
   *
   * See [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the list
   * of possible options.
   *
   * This property can also be set via a context property and if both are set then the component property takes
   * precedence over the context property.
   *
   * The web browser's timezone will be used if no value is set via a component property or a context
   * property.
   **/
  timezone?: string
  /**
   * The message shown to the user when the data is invalid.
   * If a string, shown to the user anytime the input is invalid.
   *
   * If a function, receives 2 parameters:
   *  *rawDateValue*: the string entered as a date by the user,
   *  *rawTimeValue*: the string entered as a time by the user.
   *
   * Currently, times must be selected from a list, it can never be incorrect,
   * Though `invalidDateTimeMessage` will be called if the user selects a time without
   * setting the date.
   *
   * Either parameter is undefined if the user has not entered anything,
   * which you can use to test for no input if the `DateTimeInput` is required.
   **/
  invalidDateTimeMessage:
    | string
    | ((rawDateValue?: string, rawTimeValue?: string) => string)
  /**
   * Messages my parent would like displayed
   */
  messages?: FormMessage[]
  /**
   * This format of the composite date-time when displayed in messages.
   * Valid formats are compatible with
   * [moment.js formats](https://momentjs.com/docs/#/displaying/format/),
   * including localized formats.
   **/
  messageFormat?: string
  /**
   * Vertically stacked, horizontally arranged in 2 columns, or inline.
   * See [FormFieldGroup](#FormFieldGroup) for details.
   **/
  layout?: 'stacked' | 'columns' | 'inline'
  /**
   * An ISO 8601 formatted date string representing the current date-time
   * (must be accompanied by an onChange prop).
   **/
  value?: any //controllable(I18nPropTypes.iso8601, 'onChange'),
  /**
   * An ISO 8601 formatted date string to use if `value` isn't provided.
   **/
  defaultValue?: string //I18nPropTypes.iso8601,
  /**
   * An array of labels containing the name of each day of the week. The visible
   * portion of the label should be abbreviated (no longer than three characters).
   * Note that screen readers will read this content preceding each date as the
   * `<Calendar />` is navigated. Consider using
   * [AccessibleContent](#AccessibleContent) with the `alt` prop containing the
   * full day name for assistive technologies and the children containing the
   * abbreviation. ex. `[<AccessibleContent alt="Sunday">Sun</AccessibleContent>, ...]`
   */
  renderWeekdayLabels: (((...args: any[]) => any) | React.ReactNode)[]
  /**
   * Specifies if the input is required.
   */
  isRequired?: boolean
  /**
   * Specifies if interaction with the input is enabled, disabled, or readonly.
   * When "disabled", the input changes visibly to indicate that it cannot
   * receive user interactions. When "readonly" the input still cannot receive
   * user interactions but it keeps the same styles as if it were enabled.
   */
  interaction?: InteractionType
  /**
   * Called when the date-time value has changed.
   * The passed in parameters are
   * *event*: the triggering event (which may be from the underlying
   * `DateInput` or `TimeSelect`), *isoValue*: the new date value in ISO 8601 format.
   **/
  onChange?: (...args: any[]) => any
  /**
   * The <input> element where the date is entered.
   **/
  dateInputRef?: (...args: any[]) => any
  /**
   * The <input> element where the time is entered.
   **/
  timeInputRef?: (...args: any[]) => any
  /**
   * onBlur event handler for when focus leaves DateTimeInput.
   * Does not fire when focus moves between DateInput and TimeSelect within the component
   */
  onBlur?: (...args: any[]) => any
}

type DateTimeInputState = {
  iso?: string // the time and date currently shown
  message?: FormMessage
  isShowingCalendar?: boolean
}
/**
---
category: components
---
@tsProps
**/
//@testable()
class DateTimeInput extends Component<DateTimeInputProps, DateTimeInputState> {
  static propTypes = {
    description: PropTypes.node.isRequired,
    dateLabel: PropTypes.string.isRequired,
    renderNextMonthButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
      .isRequired,
    renderPrevMonthButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
      .isRequired,
    datePlaceholder: PropTypes.string,
    dateFormat: PropTypes.string,
    interaction: PropTypes.oneOf(['enabled', 'disabled', 'readonly']),
    timeLabel: PropTypes.string.isRequired,
    timeStep: PropTypes.oneOf([5, 10, 15, 20, 30, 60]),
    timeFormat: PropTypes.string,
    locale: PropTypes.string,
    timezone: PropTypes.string,
    invalidDateTimeMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    messages: PropTypes.arrayOf(FormPropTypes.message),
    messageFormat: PropTypes.string,
    layout: PropTypes.oneOf(['stacked', 'columns', 'inline']),
    value: controllable(I18nPropTypes.iso8601, 'onChange'),
    defaultValue: I18nPropTypes.iso8601,
    renderWeekdayLabels: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    ).isRequired,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func,
    dateInputRef: PropTypes.func,
    timeInputRef: PropTypes.func,
    onBlur: PropTypes.func
  }

  static defaultProps = {
    layout: 'inline',
    timeStep: 30,
    messageFormat: 'LLL',
    isRequired: false,
    // Leave interaction default undefined so that `disabled` and `readOnly` can also be supplied
    interaction: undefined,
    onBlur: undefined,
    timeInputRef: undefined,
    dateInputRef: undefined,
    onChange: undefined,
    defaultValue: undefined,
    value: undefined,
    messages: undefined,
    timezone: undefined,
    locale: undefined,
    timeFormat: undefined,
    datePlaceholder: undefined,
    dateFormat: undefined
  }

  // TODO static contextTypes = {
  //  locale: PropTypes.string,
  //  timezone: PropTypes.string
  //}
  private _dateInput?: DateInput
  private _timeInput?: TimeSelect

  constructor(props: DateTimeInputProps) {
    super(props)

    this.state = {
      ...this.parseISO(props.value || props.defaultValue),
      isShowingCalendar: false
    }
  }

  componentWillReceiveProps(nextProps: DateTimeInputProps) {
    const valueChanged =
      nextProps.value !== this.props.value ||
      nextProps.defaultValue !== this.props.defaultValue
    const isUpdated =
      valueChanged ||
      nextProps.locale !== this.props.locale ||
      nextProps.timezone !== this.props.timezone

    if (isUpdated) {
      this.setState((prevState: DateTimeInputState) => {
        const iso = valueChanged
          ? nextProps.value || nextProps.defaultValue
          : prevState.iso
        return {
          ...this.parseISO(iso, nextProps.locale, nextProps.timezone)
        }
      })
    }
  }

  get locale() {
    return (
      this.props.locale || /*this.context.locale ||*/ Locale.browserLocale()
    )
  }

  get timezone() {
    return (
      this.props.timezone ||
      /*this.context.timezone ||*/ DateTime.browserTimeZone()
    )
  }

  getErrorMessage(
    rawDateValue?: string,
    rawTimeValue?: string
  ): FormMessage | undefined {
    const { invalidDateTimeMessage } = this.props
    const text =
      typeof invalidDateTimeMessage === 'function'
        ? invalidDateTimeMessage(rawDateValue, rawTimeValue)
        : invalidDateTimeMessage

    return text ? { text, type: 'error' } : undefined
  }

  parseISO(
    iso = '',
    locale = this.locale,
    timezone = this.timezone
  ): DateTimeInputState {
    const parsed = DateTime.parse(iso, locale, timezone)

    if (parsed.isValid()) {
      return {
        iso: parsed.toISOString(true),
        message: {
          type: 'success',
          text: parsed.format(this.props.messageFormat)
        }
      }
    }
    return {
      iso: undefined,
      message: iso ? this.getErrorMessage(...iso.split('T')) : undefined
    }
  }

  combineDateAndTime(dateISO?: string, timeISO?: string) {
    if (!dateISO) {
      return ''
    }
    if (!timeISO) {
      return dateISO
    }
    const date = dateISO.replace(/T.*/, '')
    const time = timeISO.replace(/.*T/, '')

    return `${date}T${time}`
  }

  handleChange = (e: SyntheticEvent, value: string) => {
    const { iso, message } = this.parseISO(value)
    if ((iso && iso !== this.state.iso) || !message) {
      if (this.props.onChange) {
        this.props.onChange(e, iso)
      }
      return this.setState({ iso, message })
    }
    return this.setState({ message })
  }

  handleDateChange = (
    e: SyntheticEvent,
    isoValue: string,
    rawValue: string,
    rawConversionFailed: boolean
  ) => {
    const date = rawConversionFailed ? rawValue : isoValue
    const value = this.combineDateAndTime(date, this.state.iso)
    this.handleChange(e, value)
  }

  handleTimeChange = (
    e: SyntheticEvent,
    option?: { value: string; label: string }
  ) => {
    const date = this.state.iso
    // eslint-disable-next-line no-console
    console.log('onTimeChange', option)
    if (date) {
      const value = (option && option.value) || ''
      this.handleChange(e, value)
    } else {
      const label = (option && option.label) || ''
      this.setState({
        message: this.getErrorMessage('', label)
      })
    }
  }

  handleBlur = (e: any) => {
    if (this.props.isRequired && !this.state.iso) {
      this.setState({
        message: this.getErrorMessage()
      })
    }
    // when TABbing from the DateInput to TimeInput or visa-versa, the blur
    // happens on the target before the relatedTarget gets focus.
    // The timeout gives it a moment for that to happen
    if (typeof this.props.onBlur === 'function') {
      window.setTimeout(() => {
        if (!this.focused) {
          this.props.onBlur?.(e)
        }
      }, 0)
    }
  }

  /**
   * Focus me.
   *
   * When this `DateTimeInput` gets focus, we hand it off to the
   * underlying `DateInput`.
   */
  focus() {
    if (this._dateInput) {
      // @ts-expect-error TODO fix this when DateInput is typed
      this._dateInput.focus()
    }
  }

  get focused() {
    return (
      // @ts-expect-error TODO fix this when DateInput is typed
      (this._dateInput && this._dateInput.focused) ||
      (this._timeInput && this._timeInput.focused)
    )
  }

  dateInputComponentRef = (node: DateInput) => {
    this._dateInput = node
  }

  timeInputComponentRef = (node: TimeSelect) => {
    this._timeInput = node
  }

  handleShowCalendar = (_event: any) => {
    this.setState({ isShowingCalendar: true })
  }

  handleHideCalendar = (_event: any) => {
    this.setState({ isShowingCalendar: false })
  }

  generateMonth = (renderedDate = this.state.iso) => {
    const date = DateTime.parse(renderedDate!, this.locale, this.timezone)
      .startOf('month')
      .startOf('week')
    // eslint-disable-next-line prefer-spread
    return Array.apply(null, Array(Calendar.DAY_COUNT)).map(() => {
      const currentDate = date.clone()
      date.add(1, 'days')
      return currentDate
    })
  }

  handleDayClick = (_event: any, { date }: any) => {
    this.setState({
      iso: date
      //selectedDate: date,
      //renderedDate: date,
      //messages: []
    })
  }

  formatDate = (dateInput?: string) => {
    if (!dateInput) {
      return ''
    }
    const date = DateTime.parse(dateInput, this.locale, this.timezone)
    return `${date.format('MMMM')} ${date.format('D')}, ${date.format('YYYY')}`
  }

  renderDays() {
    const { iso } = this.state

    return this.generateMonth().map((date) => {
      const dateStr = date.toISOString()

      return (
        <DateInput.Day
          key={dateStr}
          date={dateStr}
          isSelected={date.isSame(iso, 'day')}
          isToday={date.isSame(DateTime.now(this.locale, this.timezone), 'day')}
          isOutsideMonth={!date.isSame(iso, 'month')}
          label={`${date.format('D')} ${date.format('MMMM')} ${date.format(
            'YYYY'
          )}`} // TODO
          onClick={this.handleDayClick}
        >
          {date.format('D')}
        </DateInput.Day>
      )
    })
  }

  render() {
    const {
      description,
      datePlaceholder,
      dateLabel,
      renderNextMonthButton,
      renderPrevMonthButton,
      //dateFormat,
      dateInputRef,
      timeLabel,
      timeFormat,
      timeStep,
      timeInputRef,
      locale,
      timezone,
      messages,
      layout,
      isRequired,
      interaction,
      renderWeekdayLabels
    } = this.props
    const { iso, message } = this.state
    const renderedDate = this.formatDate(iso)
    // eslint-disable-next-line no-console
    console.log('RENDER ', iso)
    return (
      <FormFieldGroup
        description={description}
        colSpacing="medium"
        rowSpacing="small"
        layout={layout}
        vAlign="top"
        messages={[...(message ? [message] : []), ...(messages || [])]}
      >
        <DateInput
          value={renderedDate}
          onChange={this.handleDateChange}
          onBlur={this.handleBlur}
          ref={this.dateInputComponentRef}
          inputRef={dateInputRef}
          placeholder={datePlaceholder}
          renderLabel={dateLabel}
          renderWeekdayLabels={renderWeekdayLabels}
          onRequestShowCalendar={this.handleShowCalendar}
          onRequestHideCalendar={this.handleHideCalendar}
          isShowingCalendar={this.state.isShowingCalendar}
          //locale={locale}
          //format={dateFormat}
          renderNextMonthButton={renderNextMonthButton}
          renderPrevMonthButton={renderPrevMonthButton}
          //timezone={timezone}
          //validationFeedback={false}
          isRequired={isRequired}
          interaction={interaction}
        >
          {this.renderDays()}
        </DateInput>
        <TimeSelect
          value={iso}
          onChange={this.handleTimeChange}
          onBlur={this.handleBlur}
          ref={this.timeInputComponentRef}
          renderLabel={timeLabel}
          locale={locale}
          format={timeFormat}
          step={timeStep}
          timezone={timezone}
          inputRef={timeInputRef}
          interaction={interaction}
        />
      </FormFieldGroup>
    )
  }
}

export default DateTimeInput
export { DateTimeInput }
