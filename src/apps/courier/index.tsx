import {
  Navigator,
  useNavigate,
  useRoute,
  useRepo,
  useQuery,
  useStore,
  useTheme,
  useAuth,
  useIsAuthenticated,
  OTPAuth,
  defineFrames,
  Screen,
  Header,
  BackButton,
  ScrollView,
  Card,
  List,
  ListItem,
  Button,
  Switch,
  Text,
  StatusBadge,
  ActionFooter,
  formatCurrency,
  getAppUsers,
  Avatar,
} from 'protomobilekit'
import { useState } from 'react'
import { MapPin, Navigation, Package, User } from 'lucide-react'
import type { Order, Restaurant } from '../../entities'

// Login Screen
function LoginScreen() {
  const { navigate } = useNavigate()

  return (
    <OTPAuth
      onSuccess={() => navigate('orders')}
      countryCode="GB"
      otpLength={4}
      skipProfile
    />
  )
}

// Available Orders Screen - shows only orders assigned to current courier
function OrdersScreen() {
  const { navigate } = useNavigate()
  const { colors } = useTheme()
  const { user } = useAuth()
  const [isOnline, setIsOnline] = useState(true)

  // Filter orders: show orders assigned to this courier OR unassigned ready orders
  const { items: orders } = useQuery<Order>('Order', {
    filter: (o) => {
      // Show orders assigned to current courier
      if (o.courierId === user?.id) {
        return o.status === 'ready' || o.status === 'delivering'
      }
      // Also show unassigned ready orders (available for pickup)
      if (!o.courierId && o.status === 'ready') {
        return true
      }
      return false
    },
  })

  const { items: restaurants } = useQuery<Restaurant>('Restaurant')
  const getRestaurant = (id: string | null) => restaurants.find((r) => r.id === id)

  // Separate my orders from available orders
  const myOrders = orders.filter((o) => o.courierId === user?.id)
  const availableOrders = orders.filter((o) => !o.courierId)

  return (
    <Screen
      header={
        <Header
          title="Deliveries"
          right={
            <div className="flex items-center gap-2">
              <Text size="sm" success={isOnline} secondary={!isOnline}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
              <Switch checked={isOnline} onChange={setIsOnline} />
            </div>
          }
        />
      }
    >
      <ScrollView padding="md">
        {!isOnline ? (
          <Text secondary center className="py-12">You're offline. Go online to see orders.</Text>
        ) : (
          <div className="space-y-4">
            {/* My Active Orders */}
            {myOrders.length > 0 && (
              <div>
                <Text semibold size="sm" className="mb-2" style={{ color: colors.primary }}>
                  MY ORDERS ({myOrders.length})
                </Text>
                <div className="space-y-3">
                  {myOrders.map((order) => {
                    const restaurant = getRestaurant(order.restaurantId)
                    return (
                      <Card key={order.id} onPress={() => navigate('delivery', { id: order.id })}>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <Text semibold>#{order.id.slice(-4)}</Text>
                            <StatusBadge status={order.status} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Navigation size={18} color={colors.primary} />
                              <Text secondary size="sm">{restaurant?.name || 'Restaurant'}</Text>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={18} color={colors.danger} />
                              <Text secondary size="sm">{order.address}</Text>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t" style={{ borderColor: colors.border }}>
                            <Text primary size="lg" semibold>{formatCurrency(order.total, 'RUB')}</Text>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Available Orders */}
            {availableOrders.length > 0 && (
              <div>
                <Text semibold size="sm" className="mb-2" style={{ color: colors.textSecondary }}>
                  AVAILABLE ({availableOrders.length})
                </Text>
                <div className="space-y-3">
                  {availableOrders.map((order) => {
                    const restaurant = getRestaurant(order.restaurantId)
                    return (
                      <Card key={order.id} onPress={() => navigate('delivery', { id: order.id })}>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <Text semibold>#{order.id.slice(-4)}</Text>
                            <StatusBadge status={order.status} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Navigation size={18} color={colors.primary} />
                              <Text secondary size="sm">{restaurant?.name || 'Restaurant'}</Text>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={18} color={colors.danger} />
                              <Text secondary size="sm">{order.address}</Text>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t" style={{ borderColor: colors.border }}>
                            <Text primary size="lg" semibold>{formatCurrency(order.total, 'RUB')}</Text>
                            <Button size="sm">Accept</Button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {myOrders.length === 0 && availableOrders.length === 0 && (
              <Text secondary center className="py-12">No orders available</Text>
            )}
          </div>
        )}
      </ScrollView>
    </Screen>
  )
}

interface OrderItem {
  dishId: string
  name: string
  qty: number
  price: number
}

// Delivery Detail Screen
function DeliveryScreen() {
  const { goBack } = useNavigate()
  const { params } = useRoute<{ id: string }>()
  const { colors } = useTheme()
  const { user } = useAuth()

  const orders = useRepo<Order>('Order')
  const { items: orderList } = useQuery<Order>('Order', {
    filter: (o) => o.id === params.id,
  })
  const order = orderList[0]

  const { items: restaurants } = useQuery<Restaurant>('Restaurant')
  const restaurant = restaurants.find((r) => r.id === order?.restaurantId)

  // Get customer info from registry
  const customerUsers = getAppUsers('customer')
  const customer = order ? customerUsers.find((u) => u.id === order.customerId) : null

  if (!order) return null

  const items: OrderItem[] = JSON.parse(order.items || '[]')
  const isMyOrder = order.courierId === user?.id

  const acceptOrder = () => {
    // Assign order to current courier
    orders.update(order.id, { courierId: user?.id || null, status: 'delivering' })
  }

  const updateStatus = (newStatus: Order['status']) => {
    orders.update(order.id, { status: newStatus })
  }

  const getNextAction = () => {
    // If order is not assigned to me, show accept button
    if (!isMyOrder && order.status === 'ready') {
      return { label: 'Accept Order', onPress: acceptOrder }
    }
    // If it's my order, show next status action
    if (isMyOrder) {
      switch (order.status) {
        case 'ready': return { label: 'Pick Up Order', onPress: () => updateStatus('delivering') }
        case 'delivering': return { label: 'Complete Delivery', onPress: () => { updateStatus('delivered'); goBack() } }
        default: return null
      }
    }
    return null
  }

  const nextAction = getNextAction()

  return (
    <Screen
      header={<Header title={`Order #${order.id.slice(-4)}`} left={<BackButton onPress={goBack} />} />}
      footer={nextAction && <ActionFooter actions={nextAction} />}
    >
      <ScrollView padding="md">
        {/* Status Card */}
        <Card className="mb-4">
          <div className="p-4 flex items-center justify-between">
            <Text secondary size="sm">Order Status</Text>
            <StatusBadge status={order.status} />
          </div>
        </Card>

        {/* Route Card - Pickup & Delivery */}
        <Card className="mb-4">
          {/* Pickup */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: colors.primary + '20' }}>
                <Navigation size={18} color={colors.primary} />
              </div>
              <div className="flex-1 min-w-0">
                <Text secondary size="xs" className="mb-0.5">PICKUP FROM</Text>
                <Text semibold>{restaurant?.name}</Text>
                <Text secondary size="sm">ул. Тверская, д. 15</Text>
              </div>
            </div>
          </div>

          {/* Connector line */}
          <div className="pl-9 -my-1">
            <div className="w-0.5 h-4 ml-4" style={{ backgroundColor: colors.border }} />
          </div>

          {/* Delivery */}
          <div className="p-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: colors.danger + '20' }}>
                <MapPin size={18} color={colors.danger} />
              </div>
              <div className="flex-1 min-w-0">
                <Text secondary size="xs" className="mb-0.5">DELIVER TO</Text>
                <div className="flex items-center gap-2">
                  <Avatar src={customer?.avatar} name={customer?.name || 'Customer'} size="sm" />
                  <div>
                    <Text semibold>{customer?.name || 'Customer'}</Text>
                    {customer?.phone && <Text secondary size="xs">{customer.phone}</Text>}
                  </div>
                </div>
                <Text secondary size="sm" className="mt-1">{order.address}</Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card>
          <div className="px-4 pt-3 pb-2">
            <Text secondary size="xs">ORDER ITEMS</Text>
          </div>
          <List
            items={items}
            keyExtractor={(item) => item.dishId}
            renderItem={(item) => (
              <ListItem
                right={
                  <div className="flex items-center gap-2">
                    <Text secondary size="sm">×{item.qty}</Text>
                    <Text size="sm">{formatCurrency(item.price * item.qty, 'RUB')}</Text>
                  </div>
                }
              >
                {item.name}
              </ListItem>
            )}
          />
          <div className="p-4 border-t flex justify-between items-center" style={{ borderColor: colors.border }}>
            <Text semibold>Total</Text>
            <Text primary semibold size="lg">{formatCurrency(order.total, 'RUB')}</Text>
          </div>
        </Card>
      </ScrollView>
    </Screen>
  )
}

// Profile Screen
function ProfileScreen() {
  const { navigate } = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('login')
  }

  return (
    <Screen header={<Header title="Profile" />}>
      <ScrollView padding="md">
        <div className="flex flex-col items-center py-6">
          <Avatar src={user?.avatar} name={user?.name || 'Courier'} size="xl" />
          <Text size="xl" semibold className="mt-3">{user?.name || 'Courier'}</Text>
          <Text secondary>{user?.phone || ''}</Text>
          {user?.role && <Text secondary size="sm" className="mt-1">Role: {user.role}</Text>}
        </div>

        <Card className="mb-4">
          <List
            items={[
              { id: 'earnings', label: 'My Earnings' },
              { id: 'history', label: 'Delivery History' },
              { id: 'settings', label: 'Settings' },
              { id: 'support', label: 'Support' },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <ListItem showChevron>{item.label}</ListItem>
            )}
          />
        </Card>

        <Button variant="danger" fullWidth onClick={handleLogout}>
          Log Out
        </Button>
      </ScrollView>
    </Screen>
  )
}

// Main Courier App
export function CourierApp() {
  const isAuthenticated = useIsAuthenticated()
  const initialScreen = isAuthenticated ? 'orders' : 'login'

  return (
    <Navigator key={initialScreen} initial={initialScreen} type="tabs">
      {/* Auth screen */}
      <Navigator.Screen name="login" component={LoginScreen} />
      {/* Main screens with tabs */}
      <Navigator.Screen name="orders" component={OrdersScreen} icon={<Package size={24} />} label="Orders" />
      <Navigator.Screen name="delivery" component={DeliveryScreen} />
      <Navigator.Screen name="profile" component={ProfileScreen} icon={<User size={24} />} label="Profile" />
    </Navigator>
  )
}

const getFirstOrderId = () => {
  const state = useStore.getState()
  const orders = state.entities.Order || {}
  return Object.keys(orders)[0] || 'demo-order'
}

defineFrames({
  appId: 'courier',
  appName: 'Courier App',
  initial: 'orders',
  frames: [
    { id: 'login', name: '0.1 Login', description: 'Courier authentication', component: LoginScreen, tags: ['auth'] },
    { id: 'orders', name: '1.1 Orders', description: 'Available deliveries', component: OrdersScreen, tags: ['main', 'list'] },
    { id: 'delivery', name: '1.2 Delivery', description: 'Delivery details', component: DeliveryScreen, tags: ['detail'], onNavigate: (nav) => nav.navigate('delivery', { id: getFirstOrderId() }) },
    { id: 'profile', name: '2.1 Profile', description: 'Courier profile & logout', component: ProfileScreen, tags: ['settings'] },
  ],
})
