import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatOrderDate(orderDate: Date) {
  const newDateString = orderDate.toString()
  let orderDateObj = new Date(newDateString)
  const now = new Date()

  if (!isValid(orderDateObj)) {
    orderDateObj = parseISO(newDateString)
  }

  if (!isValid(orderDateObj)) {
    return 'Invalid Date'
  }

  const differenceInMinutes = (now.getTime() - orderDateObj.getTime()) / 60000

  if (differenceInMinutes < 60) {
    if (differenceInMinutes < 1) {
      return 'há 1 minuto'
    }
    return formatDistanceToNow(orderDateObj, { addSuffix: true, locale: ptBR })
  }

  return format(orderDateObj, 'dd/MM/yyyy', { locale: ptBR })
}
