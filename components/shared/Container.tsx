// export default tw.div`container mx-auto px-5`

export default function Container({ children, className }) {
  return <div className={className}>{children}</div>
}
