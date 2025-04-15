import { ShoppingBag } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import OrderTable from "../../components/dashboard/OrderTable"
import Card from "../../components/ui/Card"
import Heading from "../../components/ui/Heading"
import NoData from "../../components/ui/NoData"
import Spinner from "../../components/ui/Spinner"
import Text from "../../components/ui/Text"
import { USER_ROLES } from "../../constants"
import { AuthContext } from "../../contexts/AuthContext"
import orderService from "../../services/orderService"

const OrdersPage = () => {
  const { user } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  const fetchOrders = async (page = 1) => {
    setLoading(true)
    try {
      let response
      response = await orderService.getOrders({ page })
      // console.log("Fetched orders data:", response?.data?.results)
      setOrders(response?.data?.results || [])
      setPagination({
        count: response?.data?.count || 0,
        next: response?.data?.next,
        previous: response?.data?.previous,
      })
      setError(null)
    } catch (err) {
      setError("Failed to load orders")
      toast.error("Failed to load orders")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Log orders state whenever it changes
  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const handlePageChange = (page) => {
    fetchOrders(page)
  }

  return (
    <div>
      <div className="mb-6">
        <Heading as="h1" size="h3">
          Orders
        </Heading>
        <Text muted>
          {user?.role === USER_ROLES.CUSTOMER ? "View and manage your orders" : "View and manage all customer orders"}
        </Text>
      </div>

      <Card>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="p-6">
            <NoData
              title="Error Loading Orders"
              description={error}
              icon={<ShoppingBag size={64} className="text-gray-400" />}
              showAction={false}
            />
          </div>
        ) : orders.length === 0 ? (
          <div className="p-6">
            <NoData
              title="No Orders Found"
              description={
                user?.role === USER_ROLES.CUSTOMER
                  ? "You haven't placed any orders yet."
                  : "No orders have been placed yet."
              }
              icon={<ShoppingBag size={64} className="text-gray-400" />}
              actionLink="/products"
              actionText="Browse Products"
              showAction={user?.role === USER_ROLES.CUSTOMER}
            />
          </div>
        ) : (
          <OrderTable orders={orders} pagination={pagination} onPageChange={handlePageChange} />
        )}
      </Card>
    </div>
  )
}

export default OrdersPage
