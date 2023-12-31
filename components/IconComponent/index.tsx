import { LucideProps } from "lucide-react"
import { Icons } from "@/components/Icons"

interface IIconComponentProps {
  iconName: keyof typeof Icons
  props?: LucideProps
}
const IconComponent = ({ iconName, props }: IIconComponentProps) => {
  const Icon = Icons[iconName]

  if (!Icon) {
    return null
  }
  return <Icon {...props} />
}

export default IconComponent
