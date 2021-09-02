---
describes: DateTimeInput
---

A DateTimeInput component is used to enter a date-time value. It is built as a composition
of the [DateInput](#DateInput) and [TimeInput](#TimeInput) components.

A DateTimeInput with `column` layout and a default value:

```js
---
example: true
render: false
---
class Example extends React.Component {
  render () {
    const buttonProps = (type = 'prev') => ({
        size: 'small',
        withBackground: false,
        withBorder: false,
        renderIcon: type === 'prev'
          ? <IconArrowOpenStartSolid color="primary" />
          : <IconArrowOpenEndSolid color="primary" />,
        screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
      })

    return (
      <div style= { {height: 350,width: '40em'}}>
        <DateTimeInput
          description="Pick a date and time"
          datePlaceholder="Choose a date"
          dateLabel="Date"
          timeLabel="Time"
          renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
          renderNextMonthButton={<IconButton {...buttonProps('prev')} />}
          invalidDateTimeMessage={(dvalue, tvalue) => {
            return `'${dvalue} ${tvalue}' is not valid.`
          }}
          layout="columns"
          defaultValue="2018-01-18T13:10"
          onBlur={() => {
            console.log('>>>onblur')
          }}
          renderWeekdayLabels={[
            <AccessibleContent alt="Sunday">h</AccessibleContent>,
            <AccessibleContent alt="Sunday">k</AccessibleContent>,
            <AccessibleContent alt="Sunday">sz</AccessibleContent>,
            <AccessibleContent alt="Sunday">cs</AccessibleContent>,
            <AccessibleContent alt="Sunday">p</AccessibleContent>,
            <AccessibleContent alt="Sunday">sz</AccessibleContent>,
            <AccessibleContent alt="Sunday">v</AccessibleContent>]}
        />
    </div>)
  }
}
render(<Example />)
```

<!--
A required DateInput with `stacked` layout that warns if the value in the past:

```js
---
example: true
render: false
---

class Example extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: undefined,
      messages: []
    }
  }

  onChange = (e, isoDate) => {
    const now = new Date();
    const newValue = new Date(isoDate);
    let messages = [];
    if ( newValue.valueOf() <= now.valueOf()) {
      messages = [{text: 'That date-time is in the past', type: 'hint'}]
    }
    this.setState({ value: isoDate, messages })
  }

  invalidDateTimeMessage (rawDateValue, rawTimeValue) {
    if (rawDateValue) {
      return `'${rawDateValue}' is not a valid date.`
    } else {
      if (rawTimeValue) {
        return 'You must provide a date with a time.'
      } else {
        return 'Date and time values are required.'
      }
    }
  }

  render () {
    const buttonProps = (type = 'prev') => ({
      size: 'small',
      withBackground: false,
      withBorder: false,
      renderIcon: type === 'prev'
        ? <IconArrowOpenStartSolid color="primary" />
        : <IconArrowOpenEndSolid color="primary" />,
      screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
    })

    const text = this.state.value ? new Date(this.state.value).toString() : 'N/A'
    return (
      <div style={{width: '20em'}}>
        <div style={{marginBottom: '1em', fontStyle: 'italic'}}>You entered:<br/>{text}</div>
        <div style={{height: 350}}>
          <DateTimeInput
            description={<ScreenReaderContent>Pick a date and time</ScreenReaderContent>}
            datePlaceholder="Choose"
            dateLabel="Date"
            timeLabel="Time"
            renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
            renderNextMonthButton={<IconButton {...buttonProps('next')} />}
            onChange={this.onChange}
            layout="stacked"
            value={this.state.value}
            invalidDateTimeMessage={this.invalidDateTimeMessage}
            messages={this.state.messages}
            isRequired
          />
        </div>
      </div>
    )
  }
}
render(<Example />)
```

A disabled DateTimeInput:

```js
---
example: true
render: false
---
class Example extends React.Component {

  render() {
    const buttonProps = (type = 'prev') => ({
      size: 'small',
      withBackground: false,
      withBorder: false,
      renderIcon: type === 'prev'
        ? <IconArrowOpenStartSolid color="primary" />
        : <IconArrowOpenEndSolid color="primary" />,
      screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
    })

    return (
      <DateTimeInput
        description="Pick a date and time"
        datePlaceholder="Choose a date"
        dateLabel="Date"
        timeLabel="Time"
        renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
        renderNextMonthButton={<IconButton {...buttonProps('next')} />}
        invalidDateTimeMessage={(dvalue, tvalue) => { return `'${dvalue} ${tvalue}' is not valid.` }}
        layout="columns"
        defaultValue="2018-01-18T13:10"
        interaction="disabled"
      />
    )
  }
}
```

A DateTimeInput in a different locale:

```js
---
example: true
render: false
---
class Example extends React.Component {

  render() {
    const buttonProps = (type = 'prev') => ({
      size: 'small',
      withBackground: false,
      withBorder: false,
      renderIcon: type === 'prev'
        ? <IconArrowOpenStartSolid color="primary"/>
        : <IconArrowOpenEndSolid color="primary"/>,
      screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
    })

    return (
      <div style={{ height: 350, width: '40em' }}>
        <DateTimeInput
          description="Pick a date and time"
          datePlaceholder="Choose a date"
          dateLabel="Date"
          timeLabel="Time"
          renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
          renderNextMonthButton={<IconButton {...buttonProps('next')} />}
          invalidDateTimeMessage={(dvalue, tvalue) => {
            return `'${dvalue} ${tvalue}' is not valid.`
          }}
          layout="columns"
          defaultValue="2018-01-18T13:10"
          locale="fr"
        />
      </div>)
  }
}
```

The properties of DateTimeInput prefaced
with _date_ are passed to the underlying [DateInput](#DateInput)
(e.g. _dateLabel_ is DateInput's _label_), while the properties prefaced
with _time_ are forwarded to the underlying
[TimeSelect](#TimeSelect). Others are either shared by both sub-components (e.g. locale), or
are unique to DateTimeInput (e.g. description).

The user input error message function property `invalidDateTimeMessage` has to handle
a number of cases: date input is invalid, date is missing when time is entered, and
date and time are missing when component is required. (It is currently impossible to
enter in invalid time, but that will eventually need to be handled.)  A function that
handles these cases might look like
```js
function invalidDateTimeMessage (rawDateValue, rawTimeValue) {
  if (rawDateValue) {
    return `'${rawDateValue}' is not a valid date.`
  } else {
    if (rawTimeValue) {
      return 'You must provide a date with a time.'
    } else {
      return 'Date and time values are required.'  // if required is true
    }
  }
}
```
-->
