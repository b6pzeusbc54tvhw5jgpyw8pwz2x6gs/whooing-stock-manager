"use client"

import { useEffect, useMemo  } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAtom } from "jotai"
import { endDateAtom, startDateAtom } from "@/states/date.state"
import axios from "axios"

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [from, setFrom] = useAtom(startDateAtom)
  const [to, setTo] = useAtom(endDateAtom)

  const date = useMemo(() => {
    return { from, to }
  }, [from, to])

  const handleSelect: SelectRangeEventHandler = (date?: DateRange) => {
    if (!date) {
      return
    }

    if (date.from && from.getTime() !== date.from.getTime()) {
      setFrom(date.from)
    }

    if (date.to && to.getTime() !== date.to.getTime()) {
      setTo(date.to)
    }
  }

  useEffect(() => {
    // axios.get('/api/ticker-prices/005930.KS?from=2024-01-01&to=2024-04-13')
    //   .then(r => {
    //     console.log(r)
    //   })
  }, [])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}