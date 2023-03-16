import React from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useCalendarContext } from '@/store/CalendarContext'
import CircleIcon from '@mui/icons-material/Circle'
import AddIcon from '@mui/icons-material/Add'

export const noValue = ''

interface DayProps {
  key: any
  day: Number
  dayOfWeek: String
  handleDayClick: any
}

const icons = { CircleIcon }
interface IconItems {
  icon: keyof typeof icons
  color: string
  event: string
}

const Day = (props: DayProps) => {
  let IconList: IconItems[] = [
    { icon: 'CircleIcon', color: '#0072ea', event: 'ev1' },
    { icon: 'CircleIcon', color: '#a8ea00', event: 'ev1' },
    { icon: 'CircleIcon', color: '#ea00e6', event: 'ev1' },
    { icon: 'CircleIcon', color: '#ea7d00', event: 'ev1' }
    // { icon: 'CircleIcon', color: '#0013ea', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#ea2300', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#00ea5e', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#5e00ea', event: 'ev1' }
    // { icon: 'CircleIcon', color: '#ea6900', event: 'ev1' }
    // { icon: 'CircleIcon', color: '#3b00ea', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#ea008c', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#eaa800', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#eae600', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#00ea42', event: 'ev1' },
    // { icon: 'CircleIcon', color: 'black', event: 'ev1' }
  ]
  const { isYearView } = useCalendarContext()

  const CheckKey = (index: number) => {
    if (index === 7 && IconList.length > 8) {
      return <AddIcon sx={{ minHeight: '9px', maxHeight: '9px' }}></AddIcon>
    } else if (IconList.length > index) {
      let Icon = icons[IconList[index].icon]
      let color = IconList[index].color
      return <Icon sx={{ color: color, minHeight: '8px', maxHeight: '8px' }} />
    } else {
      return ' '
    }
  }

  function ReturnMonthGrid() {
    if (IconList.length < 13) {
      return (
        <>
          {IconList.map(({ icon, color }, index) => {
            const Icon = icons[icon]
            return (
              <Grid key={index} xs={2}>
                <Icon
                  sx={{ color: color, minHeight: '17px', maxHeight: '17px' }}
                />
              </Grid>
            )
          })}
        </>
      )
    } else {
      return (
        <>
          {IconList.slice(0, 11).map(({ icon, color }, index) => {
            const Icon = icons[icon]
            return (
              <Grid key={index} xs={2}>
                <Icon
                  sx={{ color: color, minHeight: '17px', maxHeight: '17px' }}
                />
              </Grid>
            )
          })}
          <Grid xs={2}>+{IconList.length - 11}</Grid>
        </>
      )
    }
  }

  function ReturnYearGrid() {
    return (
      <Grid
        container
        minHeight="0"
        maxHeight="0"
        maxWidth="33px"
        minWidth="33px"
      >
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(5)}
        </Grid>

        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(6)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(7)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(3)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {' '}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(4)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(0)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(1)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(2)}
        </Grid>
      </Grid>
    )
  }

  const renderDayOfWeek = () => {
    if (props.dayOfWeek != noValue) {
      return (
        <>
          {props.dayOfWeek}
          <br />
        </>
      )
    }
  }

  const renderDate = () => {
    if (props.day === 0) {
      return (
        <Button
          disabled
          size={isYearView ? 'small' : 'large'}
          style={{
            opacity: 0,
            fontSize: isYearView ? '100%' : '24px',
            color: '#4D4D4D',
            maxWidth: isYearView ? '30px' : '60px',
            minWidth: isYearView ? '30px' : '60px'
          }}
        >
          1
        </Button>
      )
    } else if (isYearView) {
      return (
        <div className="yearParent">
          <div className="symbols">
            <ReturnYearGrid></ReturnYearGrid>
          </div>
          <div className="days">
            <Button
              onClick={() => props.handleDayClick(props.day)}
              size={isYearView ? 'small' : 'large'}
              style={{
                fontSize: isYearView ? '100%' : '24px',
                color: '#4D4D4D',
                maxWidth: isYearView ? '30px' : '60px',
                minWidth: isYearView ? '30px' : '60px'
              }}
            >
              {props.day.toString()}
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <Grid container>
            <Grid xs={12}>
              <Button
                onClick={() => props.handleDayClick(props.day)}
                size={isYearView ? 'small' : 'large'}
                style={{
                  fontSize: isYearView ? '100%' : '24px',
                  color: '#4D4D4D',
                  maxWidth: isYearView ? '30px' : '60px',
                  minWidth: isYearView ? '30px' : '60px'
                }}
              >
                {props.day.toString()}
              </Button>
            </Grid>
            <Grid container xs={12} paddingRight="5px" paddingLeft="5px">
              <ReturnMonthGrid></ReturnMonthGrid>
            </Grid>
          </Grid>
        </>
      )
    }
  }

  return (
    <Grid
      sx={{ height: 'auto' }}
      xs={1}
      borderRight={isYearView ? 0 : 1}
      borderBottom={isYearView ? 0 : 1}
      display="flex"
      justifyContent="center"
      alignItems="top"
    >
      <Typography
        fontSize={isYearView ? '80%' : '24px'}
        variant={isYearView ? 'body1' : 'h6'}
      >
        {renderDayOfWeek()}
        {renderDate()}
      </Typography>
    </Grid>
  )
}

export default Day
