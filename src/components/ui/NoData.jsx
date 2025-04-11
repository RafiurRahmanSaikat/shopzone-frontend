import { PackageX } from "lucide-react"
import Heading from "./Heading"
import Text from "./Text"
import Button from "./Button"
import { Link } from "react-router-dom"

const NoData = ({
  title = "No Data Found",
  description = "We couldn't find any data to display",
  icon = <PackageX size={64} className="text-gray-400" />,
  actionLink = "/",
  actionText = "Go Back",
  showAction = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center py-12 text-center
        ${className}
      `}
      {...props}
    >
      <div className="mb-4">{icon}</div>
      <Heading as="h3" size="h3" className="mb-2">
        {title}
      </Heading>
      <Text muted className="mb-6 max-w-md">
        {description}
      </Text>
      {showAction && (
        <Link to={actionLink}>
          <Button variant="primary">{actionText}</Button>
        </Link>
      )}
    </div>
  )
}

export default NoData
