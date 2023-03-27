type Props = {
  title: string
  icon: React.ComponentType<{}> | React.ReactNode
}

export default function Preview({ title, icon: Icon }: Props) {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        justifyItems: "center",
      }}>
      {/* @ts-ignore */}
      <Icon fontSize={40} />
      {title}
    </div>
  )
}
