import {PageProps} from '@primer/react/lib/Pagination/Pagination'

export function PageNumber({children, number, ...props}: PageProps) {
  const isNumber = !isNaN(Number(children as string))
  return <a {...props}>{isNumber ? number.toLocaleString() : children}</a>
}
