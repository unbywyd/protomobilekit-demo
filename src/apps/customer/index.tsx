import {
  Navigator,
  useNavigate,
  useRoute,
  useQuery,
  useRepo,
  useTheme,
  Screen,
  Header,
  BackButton,
  ScrollView,
  Section,
  Card,
  List,
  ListItem,
  Avatar,
  Badge,
  Button,
  SearchBar,
  ImageViewer,
  Text,
  StatusBadge,
  Confirm,
  DashboardStats,
  formatCurrency,
  createFrame,
  defineFrames,
  defineFlow,
  // Auth
  useAuth,
  useIsAuthenticated,
  OTPAuth,
  // Onboarding
  Onboarding,
} from 'protomobilekit'
import { useState } from 'react'
import { Home, ClipboardList, User, MapPin, Phone, Check, Clock, ChefHat, Package, Truck, CreditCard, Bell, HelpCircle, Settings, Heart, Gift, Star, LogOut } from 'lucide-react'
import type { Restaurant, Dish, Order, Courier } from '../../entities'

// Onboarding data
const ONBOARDING_SLIDES = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    title: 'Discover Restaurants',
    description: 'Find the best restaurants near you with thousands of dishes to choose from',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=300&fit=crop',
    title: 'Fast Delivery',
    description: 'Get your food delivered in minutes. Track your order in real-time',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    title: 'Easy Payment',
    description: 'Pay with card, cash or bonuses. Earn points with every order',
  },
]

// Check if onboarding was completed
const ONBOARDING_KEY = 'customer-onboarding-completed'

function useOnboardingCompleted() {
  const [completed, setCompleted] = useState(() => {
    return localStorage.getItem(ONBOARDING_KEY) === 'true'
  })

  const markCompleted = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setCompleted(true)
  }

  return { completed, markCompleted }
}

// Onboarding Screen
function OnboardingScreen() {
  const { navigate } = useNavigate()
  const { markCompleted } = useOnboardingCompleted()

  const handleComplete = () => {
    markCompleted()
    navigate('login')
  }

  return (
    <Onboarding
      slides={ONBOARDING_SLIDES}
      onComplete={handleComplete}
      onSkip={handleComplete}
      nextText="Next"
      completeText="Get Started"
    />
  )
}

// Login Screen
function LoginScreen() {
  const { navigate } = useNavigate()

  return (
    <OTPAuth
      onSuccess={() => navigate('home')}
      countryCode="GB"
      otpLength={4}
      skipProfile
    />
  )
}

// Home Screen - Restaurant List
function HomeScreen() {
  const { navigate } = useNavigate()
  const [search, setSearch] = useState('')

  const { items: restaurants } = useQuery<Restaurant>('Restaurant')

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Screen header={<Header title="Delivery" />}>
      <ScrollView padding="md">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search restaurants..."
        />

        <div className="mt-4 space-y-3">
          {filtered.map((restaurant) => (
            <Card
              key={restaurant.id}
              onPress={() => navigate('restaurant', { id: restaurant.id })}
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-36 object-cover rounded-t-xl"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="success" size="sm">★ {restaurant.rating}</Badge>
                </div>
              </div>
              <div className="p-3">
                <Text semibold size="lg">{restaurant.name}</Text>
                <div className="flex items-center gap-2 mt-1">
                  <Text secondary size="sm">{restaurant.cuisine}</Text>
                  <Text secondary size="sm">•</Text>
                  <Text secondary size="sm">{restaurant.deliveryTime}</Text>
                </div>
                <Text secondary size="xs" className="mt-1">
                  Min. order {formatCurrency(restaurant.minOrder, 'RUB')}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </ScrollView>
    </Screen>
  )
}

// Restaurant Screen - Menu
function RestaurantScreen() {
  const { navigate, goBack } = useNavigate()
  const { params } = useRoute<{ id: string }>()
  const { create: createOrder } = useRepo('Order')
  const { user } = useAuth()

  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerImage, setViewerImage] = useState('')

  const { items: restaurants } = useQuery<Restaurant>('Restaurant', {
    filter: (r) => r.id === params.id,
  })
  const restaurant = restaurants[0]

  const { items: dishes } = useQuery<Dish>('Dish', {
    filter: (d) => d.restaurantId === params.id,
  })

  if (!restaurant) return null

  const handleQuickOrder = (dish: Dish) => {
    createOrder({
      status: 'pending',
      customerId: user?.id ?? 'anonymous',
      restaurantId: params.id,
      items: JSON.stringify([{ dishId: dish.id, name: dish.name, qty: 1, price: dish.price }]),
      total: dish.price,
      address: '123 Main St, London',
      courierId: null,
    })
    navigate('orderSuccess', { dishName: dish.name })
  }

  return (
    <Screen
      header={
        <Header
          title={restaurant.name}
          left={<BackButton onPress={goBack} />}
        />
      }
    >
      <ScrollView>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="success">★ {restaurant.rating}</Badge>
            <Text secondary size="sm">
              {restaurant.deliveryTime} • Min {formatCurrency(restaurant.minOrder, 'RUB')}
            </Text>
          </div>

          <Section title="Menu">
            <List
              items={dishes}
              keyExtractor={(d) => d.id}
              renderItem={(dish) => (
                <ListItem
                  left={
                    <button onClick={() => {
                      setViewerImage(dish.image)
                      setViewerOpen(true)
                    }}>
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </button>
                  }
                  subtitle={dish.description}
                  right={
                    <Button size="sm" onClick={() => handleQuickOrder(dish)}>
                      {formatCurrency(dish.price, 'RUB')}
                    </Button>
                  }
                >
                  {dish.name}
                </ListItem>
              )}
            />
          </Section>
        </div>
      </ScrollView>

      <ImageViewer
        images={[{ src: viewerImage }]}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        showThumbnails={false}
        showCounter={false}
      />
    </Screen>
  )
}

// Order Success Screen
function OrderSuccessScreen() {
  const { navigate } = useNavigate()
  const { params } = useRoute<{ dishName: string }>()

  return (
    <Screen>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <Text size="2xl" bold className="mb-2">Order Placed!</Text>
        <Text secondary className="mb-2">{params.dishName}</Text>
        <Text secondary size="sm" className="mb-8">Check Courier app to deliver</Text>
        <Button onClick={() => navigate('home')}>Back to Home</Button>
      </div>
    </Screen>
  )
}

// Order Status Steps
const ORDER_STEPS = [
  { status: 'pending', label: 'Order Placed', icon: Clock },
  { status: 'confirmed', label: 'Confirmed', icon: Check },
  { status: 'preparing', label: 'Preparing', icon: ChefHat },
  { status: 'ready', label: 'Ready', icon: Package },
  { status: 'delivering', label: 'On the Way', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: Check },
]

function getStepIndex(status: string): number {
  if (status === 'cancelled') return -1
  const idx = ORDER_STEPS.findIndex((s) => s.status === status)
  return idx >= 0 ? idx : 0
}

// Order Details Screen
function OrderDetailsScreen() {
  const { goBack } = useNavigate()
  const { params } = useRoute<{ id: string }>()
  const { update } = useRepo('Order')

  const { items: orders } = useQuery<Order>('Order', {
    filter: (o) => o.id === params.id,
  })
  const order = orders[0]

  const { items: restaurants } = useQuery<Restaurant>('Restaurant')
  const restaurant = restaurants.find((r) => r.id === order?.restaurantId)

  const { items: couriers } = useQuery<Courier>('Courier')
  const courier = order?.courierId ? couriers.find((c) => c.id === order.courierId) : null

  if (!order) return null

  const items = JSON.parse(order.items || '[]') as { name: string; qty: number; price: number }[]
  const currentStep = getStepIndex(order.status)
  const isCancelled = order.status === 'cancelled'
  const isDelivered = order.status === 'delivered'
  const canCancel = order.status === 'pending'

  const handleCancel = () => {
    update(order.id, { status: 'cancelled' })
  }

  return (
    <Screen
      header={
        <Header
          title={`Order #${order.id.slice(-4)}`}
          left={<BackButton onPress={goBack} />}
        />
      }
    >
      <ScrollView padding="md">
        {/* Status Timeline */}
        <Card className="mb-4">
          <div className="p-4">
            <Text semibold className="mb-4">Order Status</Text>
            {isCancelled ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Text danger>✕</Text>
                </div>
                <Text danger semibold>Order Cancelled</Text>
              </div>
            ) : (
              <div className="space-y-3">
                {ORDER_STEPS.map((step, idx) => {
                  const StepIcon = step.icon
                  const isCompleted = idx <= currentStep
                  const isCurrent = idx === currentStep
                  return (
                    <div key={step.status} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <StepIcon size={18} />
                      </div>
                      <div className="flex-1">
                        <Text
                          semibold={isCurrent}
                          secondary={!isCompleted}
                          success={isCompleted && !isCurrent}
                        >
                          {step.label}
                        </Text>
                      </div>
                      {isCompleted && idx < currentStep && (
                        <Check size={16} className="text-green-500" />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Card>

        {/* Courier Info */}
        {courier && !isCancelled && (
          <Card className="mb-4">
            <div className="p-4">
              <Text secondary size="xs" className="mb-2">YOUR COURIER</Text>
              <div className="flex items-center gap-3">
                <Avatar src={courier.avatar} name={courier.name} size="lg" />
                <div className="flex-1">
                  <Text semibold>{courier.name}</Text>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="success" size="sm">★ {courier.rating}</Badge>
                  </div>
                </div>
                <a
                  href={`tel:${courier.phone}`}
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </Card>
        )}

        {/* Delivery Address */}
        <Card className="mb-4">
          <div className="p-4">
            <Text secondary size="xs" className="mb-2">DELIVERY ADDRESS</Text>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-400 mt-0.5" />
              <Text>{order.address}</Text>
            </div>
          </div>
        </Card>

        {/* Restaurant & Items */}
        <Card className="mb-4">
          <div className="p-4">
            <Text secondary size="xs" className="mb-2">ORDER FROM</Text>
            <Text semibold className="mb-3">{restaurant?.name || 'Restaurant'}</Text>

            <div className="border-t pt-3 space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <Text>{item.qty}× {item.name}</Text>
                  <Text>{formatCurrency(item.price * item.qty, 'GBP')}</Text>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t">
                <Text semibold>Total</Text>
                <Text primary semibold size="lg">{formatCurrency(order.total, 'GBP')}</Text>
              </div>
            </div>
          </div>
        </Card>

        {/* Cancel Button */}
        {canCancel && (
          <Button variant="danger" fullWidth onClick={handleCancel}>
            Cancel Order
          </Button>
        )}

        {isDelivered && (
          <div className="text-center py-4">
            <Text success semibold>Thank you for your order!</Text>
          </div>
        )}
      </ScrollView>
    </Screen>
  )
}

// Orders Screen
function OrdersScreen() {
  const { navigate } = useNavigate()
  const { user } = useAuth()
  const { items: orders } = useQuery<Order>('Order', {
    filter: (o) => o.customerId === user?.id,
  })

  return (
    <Screen header={<Header title="My Orders" />}>
      <ScrollView padding="md">
        {orders.length === 0 ? (
          <Text secondary center className="py-12">No orders yet</Text>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order.id} onPress={() => navigate('orderDetails', { id: order.id })}>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Text semibold>Order #{order.id.slice(-4)}</Text>
                    <StatusBadge status={order.status} />
                  </div>
                  <Text secondary size="sm">{order.address}</Text>
                  <Text primary size="lg" semibold className="mt-2">
                    {formatCurrency(order.total, 'GBP')}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollView>
    </Screen>
  )
}

// Profile Screen
function ProfileScreen() {
  const { navigate } = useNavigate()
  const { colors } = useTheme()
  const { user, logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Get user's orders
  const { items: orders } = useQuery<Order>('Order', {
    filter: (o) => o.customerId === user?.id,
  })

  const handleLogout = () => {
    logout()
    localStorage.removeItem(ONBOARDING_KEY)
    navigate('onboarding')
  }

  const isPremium = user?.role === 'premium'

  return (
    <Screen header={<Header title="Profile" />}>
      <ScrollView>
        {/* Profile Header */}
        <div className="px-4 pt-6 pb-6" style={{ backgroundColor: colors.surface }}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar src={user?.avatar} name={user?.name || 'User'} size="xl" />
              {isPremium && (
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#f59e0b' }}
                >
                  <Star size={14} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Text size="xl" semibold>{user?.name || 'User'}</Text>
                {isPremium && (
                  <Badge variant="warning" size="sm">Premium</Badge>
                )}
              </div>
              <Text secondary size="sm">{user?.phone || ''}</Text>
            </div>
          </div>

          {/* Stats row */}
          <DashboardStats
            columns={2}
            className="mt-6"
            stats={[
              { value: orders.length, label: 'Total Orders' },
              { value: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length, label: 'Active' },
            ]}
          />
        </div>

        <div className="p-4 space-y-4">
          {/* Quick Actions */}
          <Card>
            <div className="p-4">
              <Text semibold className="mb-3">Quick Actions</Text>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: Heart, label: 'Favorites', color: colors.danger },
                  { icon: Gift, label: 'Promo', color: '#8b5cf6' },
                  { icon: Star, label: 'Reviews', color: '#f59e0b' },
                  { icon: HelpCircle, label: 'Help', color: colors.primary },
                ].map((item) => (
                  <button key={item.label} className="flex flex-col items-center gap-1">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: item.color + '15' }}
                    >
                      <item.icon size={22} color={item.color} />
                    </div>
                    <Text size="xs" secondary>{item.label}</Text>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Settings Menu */}
          <Card>
            <List
              items={[
                { id: 'addresses', icon: MapPin, label: 'My Addresses', color: colors.primary },
                { id: 'payment', icon: CreditCard, label: 'Payment Methods', color: '#22c55e' },
                { id: 'notifications', icon: Bell, label: 'Notifications', color: '#f59e0b' },
                { id: 'settings', icon: Settings, label: 'Settings', color: colors.textSecondary },
              ]}
              keyExtractor={(item) => item.id}
              renderItem={(item) => (
                <ListItem
                  left={
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: item.color + '15' }}
                    >
                      <item.icon size={18} color={item.color} />
                    </div>
                  }
                  showChevron
                >
                  {item.label}
                </ListItem>
              )}
            />
          </Card>

          {/* Logout */}
          <Card>
            <ListItem
              left={
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.danger + '15' }}
                >
                  <LogOut size={18} color={colors.danger} />
                </div>
              }
              onPress={() => setShowLogoutConfirm(true)}
            >
              <Text danger>Log Out</Text>
            </ListItem>
          </Card>

          <Text secondary size="xs" center className="pt-2">
            Version 1.0.0 • Made with MobileKit
          </Text>
        </div>
      </ScrollView>

      <Confirm
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Log Out"
        message="Are you sure you want to log out? You'll need to sign in again to access your account."
        confirmText="Log Out"
        destructive
        onConfirm={handleLogout}
      />
    </Screen>
  )
}

// Main Customer App
export function CustomerApp() {
  const isAuthenticated = useIsAuthenticated()
  const { completed: onboardingCompleted, markCompleted } = useOnboardingCompleted()

  // If user logged in via DevTools, skip onboarding
  if (isAuthenticated && !onboardingCompleted) {
    markCompleted()
  }

  // Determine initial screen based on auth state
  const initialScreen = isAuthenticated ? 'home' : (onboardingCompleted ? 'login' : 'onboarding')

  return (
    <Navigator key={initialScreen} initial={initialScreen} type="tabs">
      {/* Auth flow screens (no tabs) */}
      <Navigator.Screen name="onboarding" component={OnboardingScreen} />
      <Navigator.Screen name="login" component={LoginScreen} />

      {/* Main app screens (with tabs) */}
      <Navigator.Screen name="home" component={HomeScreen} icon={<Home size={24} />} label="Home" />
      <Navigator.Screen name="restaurant" component={RestaurantScreen} />
      <Navigator.Screen name="orderSuccess" component={OrderSuccessScreen} />
      <Navigator.Screen name="orders" component={OrdersScreen} icon={<ClipboardList size={24} />} label="Orders" />
      <Navigator.Screen name="orderDetails" component={OrderDetailsScreen} />
      <Navigator.Screen name="profile" component={ProfileScreen} icon={<User size={24} />} label="Profile" />
    </Navigator>
  )
}

// Create frames as reusable objects
const onboardingFrame = createFrame({
  id: 'onboarding',
  name: '0.1 Onboarding',
  description: 'Welcome slides',
  component: OnboardingScreen,
  tags: ['auth', 'onboarding'],
})

const loginFrame = createFrame({
  id: 'login',
  name: '0.2 Login',
  description: 'OTP authentication',
  component: LoginScreen,
  tags: ['auth', 'login'],
})

const homeFrame = createFrame({
  id: 'home',
  name: '1.1 Home',
  description: 'Restaurant list with search',
  component: HomeScreen,
  tags: ['main', 'list'],
})

const restaurantFrame = createFrame({
  id: 'restaurant',
  name: '1.2 Restaurant',
  description: 'Restaurant menu',
  component: RestaurantScreen,
  tags: ['detail'],
  onNavigate: (nav) => nav.navigate('restaurant', { id: 'r1' }),
})

const orderSuccessFrame = createFrame({
  id: 'orderSuccess',
  name: '1.3 Order Success',
  description: 'Order confirmation',
  component: OrderSuccessScreen,
  tags: ['success'],
  onNavigate: (nav) => nav.navigate('orderSuccess', { dishName: 'Demo Dish' }),
})

const ordersFrame = createFrame({
  id: 'orders',
  name: '2.1 Orders',
  description: 'Order history',
  component: OrdersScreen,
  tags: ['list'],
})

const orderDetailsFrame = createFrame({
  id: 'orderDetails',
  name: '2.2 Order Details',
  description: 'Order tracking & details',
  component: OrderDetailsScreen,
  tags: ['detail'],
  onNavigate: (nav) => nav.navigate('orderDetails', { id: 'o1' }),
})

const profileFrame = createFrame({
  id: 'profile',
  name: '3.1 Profile',
  description: 'User settings',
  component: ProfileScreen,
  tags: ['settings'],
})

// Register frames
defineFrames({
  appId: 'customer',
  appName: 'Customer App',
  initial: 'onboarding',
  frames: [
    onboardingFrame,
    loginFrame,
    homeFrame,
    restaurantFrame,
    orderSuccessFrame,
    ordersFrame,
    orderDetailsFrame,
    profileFrame,
  ],
})

// Define demo flow for customer order journey
defineFlow({
  id: 'customer-order',
  name: 'Order Journey',
  description: 'Complete customer order flow',
  appId: 'customer',
  steps: [
    { frame: onboardingFrame },
    { frame: loginFrame, tasks: ['Enter phone number', 'Enter OTP code'] },
    { frame: homeFrame, tasks: ['Search restaurant', 'Select restaurant'] },
    { frame: restaurantFrame, tasks: ['Browse menu', 'Order dish'] },
    { frame: orderSuccessFrame },
    { frame: ordersFrame, tasks: ['View order status'] },
  ],
})
