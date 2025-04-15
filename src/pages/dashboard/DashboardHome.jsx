
import { ArrowUpRight, CreditCard, Package, ShoppingBag, Store, TrendingUp, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import OrderTable from "../../components/dashboard/OrderTable"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card"
import Grid from "../../components/ui/Grid"
import Heading from "../../components/ui/Heading"
import Spinner from "../../components/ui/Spinner"
import Text from "../../components/ui/Text"
import { USER_ROLES } from "../../constants"
import { AuthContext } from "../../contexts/AuthContext"
import orderService from "../../services/orderService"
import productService from "../../services/productService"
import storeService from "../../services/storeService"
import userService from "../../services/userService"

const StatCard = ({ title, value, icon, trend, color }) => {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  }

  return (
    <Card className="overflow-visible">
      <Card.Body>
        <div className="flex items-center justify-between">
          <div>
            <Text size="sm" muted className="mb-1">
              {title}
            </Text>
            <Heading as="h3" size="h3">
              {value}
            </Heading>
            {trend && (
              <Text
                size="sm"
                className={`mt-1 flex items-center ${
                  trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                <TrendingUp className={`mr-1 h-4 w-4 ${trend < 0 ? "rotate-180" : ""}`} />
                {trend > 0 ? "+" : ""}
                {trend}% from last month
              </Text>
            )}
          </div>
          <div className={`rounded-full p-4 ${colorClasses[color] || colorClasses.purple}`}>{icon}</div>
        </div>
      </Card.Body>
    </Card>
  )
}

const DashboardHome = () => {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalStores: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch recent orders
        let ordersResponse = { data: { results: [], count: 0 } }
        try {
          ordersResponse = await orderService.getOrders({ limit: 5 })
        } catch (error) {
          console.error("Failed to fetch orders:", error)
        }

        setRecentOrders(ordersResponse.data.results || [])

        // Fetch stats based on user role
        if (user?.role === USER_ROLES.ADMIN) {
          // Admin sees global stats
          let productsRes = { data: { count: 0 } }
          let usersRes = { data: { count: 0 } }
          let storesRes = { data: { count: 0 } }

          try {
            productsRes = await productService.getProducts({ limit: 1 })
          } catch (error) {
            console.error("Failed to fetch products:", error)
          }

          try {
            usersRes = await userService.getUsers({ limit: 1 })
          } catch (error) {
            console.error("Failed to fetch users:", error)
          }

          try {
            storesRes = await storeService.getStores({ limit: 1 })
          } catch (error) {
            console.error("Failed to fetch stores:", error)
          }

          setStats({
            totalSales: 15789.45, // Mock data
            totalOrders: ordersResponse.data.count || 0,
            totalProducts: productsRes.data.count || 0,
            totalUsers: usersRes.data.count || 0,
            totalStores: storesRes.data.count || 0,
          })
        } else if (user?.role === USER_ROLES.STORE_OWNER) {
          // Store owner sees their store stats
          let myStoresRes = { data: { count: 0 } }
          let storeProductsRes = { data: { count: 0 } }

          try {
            myStoresRes = await storeService.getMyStores()
          } catch (error) {
            console.error("Failed to fetch my stores:", error)
          }

          try {
            storeProductsRes = await productService.getProducts({ store_owner: user.id, limit: 1 })
          } catch (error) {
            console.error("Failed to fetch store products:", error)
          }

          setStats({
            totalSales: 5432.1, // Mock data
            totalOrders: ordersResponse.data.count || 0,
            totalProducts: storeProductsRes.data.count || 0,
            totalStores: myStoresRes.data.count || 0,
          })
        } else {
          // Customer sees their order stats
          let orderHistoryRes = { data: { count: 0, results: [] } }

          try {
            orderHistoryRes = await orderService.getOrderHistory()
          } catch (error) {
            console.error("Failed to fetch order history:", error)
          }

          setStats({
            totalOrders: orderHistoryRes.data.count || 0,
            totalSpent: (orderHistoryRes.data.results || []).reduce((sum, order) => sum + (order.total_amount || 0), 0),
          })
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchDashboardData()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Heading as="h1" size="h3">
            Dashboard
          </Heading>
          <Text muted>Welcome back, {user?.first_name || user?.username || "User"}!</Text>
        </div>
        <div className="flex gap-2">
          {user?.role === USER_ROLES.STORE_OWNER && (
            <Button as={Link} to="/dashboard/products/new" variant="primary" leftIcon={<Package className="h-4 w-4" />}>
              Add Product
            </Button>
          )}
          {(user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.STORE_OWNER) && (
            <Button as={Link} to="/dashboard/stores/new" variant="secondary" leftIcon={<Store className="h-4 w-4" />}>
              Add Store
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <Grid cols={user?.role === USER_ROLES.CUSTOMER ? 2 : 4} gap={6} className="mb-8">
        {user?.role !== USER_ROLES.CUSTOMER && (
          <StatCard
            title="Total Sales"
            value={`$${stats.totalSales.toLocaleString()}`}
            icon={<CreditCard className="h-6 w-6" />}
            trend={12.5}
            color="green"
          />
        )}

        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingBag className="h-6 w-6" />}
          trend={5.2}
          color="purple"
        />

        {user?.role === USER_ROLES.CUSTOMER ? (
          <StatCard
            title="Total Spent"
            value={`$${(stats.totalSpent || 0).toLocaleString()}`}
            icon={<CreditCard className="h-6 w-6" />}
            color="blue"
          />
        ) : (
          <>
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              icon={<Package className="h-6 w-6" />}
              trend={8.1}
              color="blue"
            />

            {user?.role === USER_ROLES.ADMIN && (
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<Users className="h-6 w-6" />}
                trend={3.7}
                color="amber"
              />
            )}

            <StatCard
              title="Total Stores"
              value={stats.totalStores}
              icon={<Store className="h-6 w-6" />}
              trend={7.3}
              color="amber"
            />
          </>
        )}
      </Grid>

    {/* Recent Orders */}
    <OrderTable orders={recentOrders} />
      {/* <Card className="mb-8">
        <Card.Header className="flex items-center justify-between">
          <Heading as="h2" size="h4">
            Recent Orders
          </Heading>
          <Button
            as={Link}
            to="/dashboard/orders"
            variant="link"
            className="flex items-center text-purple-600 dark:text-purple-400"
          >
            View All <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          {recentOrders.length > 0 ? (
            <OrderTable orders={recentOrders} />
          ) : (
            <div className="flex h-32 items-center justify-center">
              <Text muted>No recent orders found</Text>
            </div>
          )}
        </Card.Body>
      </Card> */}
    </div>
  )
}

export default DashboardHome
