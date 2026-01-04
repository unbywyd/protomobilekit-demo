import {
  useRepo,
  useQuery,
  Screen,
  Header,
  BackButton,
  ScrollView,
  Card,
  List,
  ListItem,
  Avatar,
  Button,
  Tabs,
  BottomSheet,
  useForm,
  Form,
  FormField,
  FormSection,
  Input,
  Select,
  TextArea,
  Autocomplete,
  validators,
  Text,
  StatusBadge,
  InfoRow,
  InfoGroup,
  DashboardStats,
  formatCurrency,
  getAppUsers,
} from 'protomobilekit'
import { useState } from 'react'
import type { Dish, Courier, Order, Restaurant } from '../../entities'

// Admin Dashboard
export function AdminApp() {
  const [activeTab, setActiveTab] = useState('orders')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedCourierId, setSelectedCourierId] = useState<string>('')

  const orders = useRepo<Order>('Order')
  const { items: allOrders } = useQuery<Order>('Order')
  const { items: restaurants } = useQuery<Restaurant>('Restaurant')
  const { items: couriers } = useQuery<Courier>('Courier')

  const getRestaurant = (id: string | null) => id ? restaurants.find((r) => r.id === id) : null
  const getCourier = (id: string | null) => id ? couriers.find((c) => c.id === id) : null

  // Get customer users from registry
  const customerUsers = getAppUsers('customer')
  const getCustomer = (customerId: string | null) => customerId ? customerUsers.find((u) => u.id === customerId) : null

  const stats = {
    total: allOrders.length,
    pending: allOrders.filter((o) => o.status === 'pending').length,
    active: allOrders.filter((o) => ['confirmed', 'preparing', 'ready', 'delivering'].includes(o.status)).length,
    completed: allOrders.filter((o) => o.status === 'delivered').length,
  }

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    orders.update(orderId, { status: newStatus })
    setSelectedOrder(null)
  }

  const assignCourier = (orderId: string, courierId: string) => {
    orders.update(orderId, { courierId, status: 'delivering' })
    setSelectedOrder(null)
  }

  return (
    <Screen
      header={
        <Header
          title="Admin Panel"
          right={activeTab === 'orders' && (
            <Button size="sm" onClick={() => setShowCreateForm(true)}>Create Order</Button>
          )}
        />
      }
    >
      {/* Stats */}
      <div className="p-4">
        <DashboardStats
          stats={[
            { value: stats.total, label: 'Total' },
            { value: stats.pending, label: 'Pending', color: 'warning' },
            { value: stats.active, label: 'Active', color: 'primary' },
            { value: stats.completed, label: 'Done', color: 'success' },
          ]}
        />
      </div>

      <Tabs
        tabs={[{ key: 'orders', label: 'Orders' }, { key: 'couriers', label: 'Couriers' }]}
        activeKey={activeTab}
        onChange={setActiveTab}
      />

      <ScrollView padding="md">
        {activeTab === 'orders' && (
          <div className="space-y-2">
            {allOrders.map((order) => {
              const restaurant = getRestaurant(order.restaurantId)
              const courier = getCourier(order.courierId)

              return (
                <Card key={order.id} onPress={() => setSelectedOrder(order)}>
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Text semibold size="sm">#{order.id.slice(-4)}</Text>
                        <StatusBadge status={order.status} />
                      </div>
                      <Text primary semibold>{formatCurrency(order.total, 'RUB')}</Text>
                    </div>
                    <div className="space-y-1">
                      <Text secondary size="xs">{restaurant?.name}</Text>
                      <Text secondary size="xs">{order.address}</Text>
                      {courier && (
                        <div className="flex items-center gap-1">
                          <Avatar name={courier.name} size="xs" />
                          <Text secondary size="xs">{courier.name}</Text>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {activeTab === 'couriers' && (
          <List
            items={couriers}
            keyExtractor={(c) => c.id}
            renderItem={(courier) => (
              <ListItem
                left={<Avatar src={courier.avatar} name={courier.name} />}
                subtitle={courier.phone}
                right={<StatusBadge status={courier.status} />}
              >
                {courier.name}
              </ListItem>
            )}
          />
        )}
      </ScrollView>

      {/* Order Detail Sheet */}
      <BottomSheet
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order #${selectedOrder?.id.slice(-4)}`}
      >
        {selectedOrder && (() => {
          const customer = getCustomer(selectedOrder.customerId)
          return (
          <div className="p-4 space-y-4">
            <InfoGroup>
              <InfoRow label="Status"><StatusBadge status={selectedOrder.status} /></InfoRow>
              <InfoRow label="Total">
                <Text primary semibold>{formatCurrency(selectedOrder.total, 'RUB')}</Text>
              </InfoRow>
              <InfoRow label="Customer">
                <div className="flex items-center gap-2">
                  <Avatar src={customer?.avatar} name={customer?.name || 'Unknown'} size="sm" />
                  <div>
                    <Text size="sm">{customer?.name || selectedOrder.customerId}</Text>
                    {customer?.phone && <Text secondary size="xs">{customer.phone}</Text>}
                  </div>
                </div>
              </InfoRow>
              <InfoRow label="Address" vertical>
                <Text>{selectedOrder.address}</Text>
              </InfoRow>
            </InfoGroup>

            <div className="space-y-2 pt-4">
              {selectedOrder.status === 'pending' && (
                <Button fullWidth onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}>
                  Confirm Order
                </Button>
              )}
              {selectedOrder.status === 'confirmed' && (
                <Button fullWidth onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}>
                  Start Preparing
                </Button>
              )}
              {selectedOrder.status === 'preparing' && (
                <Button fullWidth onClick={() => updateOrderStatus(selectedOrder.id, 'ready')}>
                  Mark Ready
                </Button>
              )}
              {selectedOrder.status === 'ready' && !selectedOrder.courierId && (
                <div className="space-y-3">
                  <Text size="sm" semibold>Assign Courier:</Text>
                  <Autocomplete<Courier>
                    collection="Courier"
                    getOptionValue={(c) => c.id}
                    getOptionLabel={(c) => c.name}
                    getOptionDescription={(c) => `${c.phone} • ${c.status}`}
                    value={selectedCourierId}
                    onChange={(v) => setSelectedCourierId(typeof v === 'string' ? v : '')}
                    placeholder="Search courier..."
                    filter={(c, s) => c.name.toLowerCase().includes(s.toLowerCase()) || c.phone?.toLowerCase().includes(s.toLowerCase())}
                  />
                  {selectedCourierId && (
                    <Button fullWidth onClick={() => { assignCourier(selectedOrder.id, selectedCourierId); setSelectedCourierId('') }}>
                      Assign & Start Delivery
                    </Button>
                  )}
                </div>
              )}
              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <Button variant="danger" fullWidth onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}>
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        )})()}
      </BottomSheet>

      <CreateOrderForm open={showCreateForm} onClose={() => setShowCreateForm(false)} restaurants={restaurants} />
    </Screen>
  )
}

// Create Order Form - Full Screen
function CreateOrderForm({ open, onClose, restaurants }: { open: boolean; onClose: () => void; restaurants: Restaurant[] }) {
  const orders = useRepo<Order>('Order')
  const { items: allDishes } = useQuery<Dish>('Dish')

  const form = useForm({
    values: { restaurantId: '', customerId: '', address: '', total: '', status: 'pending', dishIds: [] as string[] },
    validate: {
      restaurantId: validators.required('Select restaurant'),
      customerId: validators.required('Select customer'),
      address: validators.required('Enter delivery address'),
      total: (v) => !v ? 'Enter order total' : isNaN(Number(v)) || Number(v) <= 0 ? 'Amount must be positive' : null,
      dishIds: (v) => !v || (Array.isArray(v) && v.length === 0) ? 'Select at least one dish' : null,
    },
    onSubmit: async (values) => {
      const selectedDishes = allDishes.filter((d) => values.dishIds.includes(d.id))
      if (selectedDishes.length === 0) { form.setError('dishIds', 'Select at least one dish'); return }

      let total = Number(values.total)
      if (!total || total <= 0) total = selectedDishes.reduce((sum, d) => sum + d.price, 0)

      orders.create({
        status: values.status,
        customerId: values.customerId,
        restaurantId: values.restaurantId,
        items: JSON.stringify(selectedDishes.map((d) => ({ dishId: d.id, name: d.name, qty: 1, price: d.price }))),
        total,
        address: values.address,
        courierId: null,
      })
      form.clear()
      onClose()
    },
  })

  if (!open) return null

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white">
      <Screen
        header={
          <Header
            title="Create Order"
            left={<BackButton onPress={onClose} />}
            right={
              <Button size="sm" onClick={() => form.submit()} disabled={form.submitting}>
                {form.submitting ? 'Saving...' : 'Save'}
              </Button>
            }
          />
        }
      >
        <Form form={form}>
          <ScrollView padding="md">
            <FormSection title="Basic Information">
              <FormField name="restaurantId" label="Restaurant">
                {(() => {
                  const fp = form.getFieldProps('restaurantId')
                  return <Select options={restaurants.map((r) => ({ value: r.id, label: r.name }))} placeholder="Select restaurant" value={fp.value || ''} onChange={fp.onChange} />
                })()}
              </FormField>
              <FormField name="customerId" label="Customer">
                {(() => {
                  const fp = form.getFieldProps('customerId')
                  return (
                    <Autocomplete<Courier>
                      collection="Courier"
                      getOptionValue={(c) => c.id}
                      getOptionLabel={(c) => c.name}
                      getOptionDescription={(c) => c.phone}
                      value={fp.value || ''}
                      onChange={fp.onChange}
                      placeholder="Search customer..."
                      filter={(c, s) => c.name.toLowerCase().includes(s.toLowerCase()) || c.phone?.toLowerCase().includes(s.toLowerCase())}
                    />
                  )
                })()}
              </FormField>
              <FormField name="address" label="Delivery Address">
                <TextArea placeholder="123 Main St, Apt 4" rows={3} />
              </FormField>
            </FormSection>

            <FormSection title="Order Details">
              <FormField name="total" label="Order Total" helper="Enter amount in rubles">
                <Input type="number" placeholder="1000" />
              </FormField>
              <FormField name="status" label="Status">
                {(() => {
                  const fp = form.getFieldProps('status')
                  return <Select options={[{ value: 'pending', label: 'Pending' }, { value: 'confirmed', label: 'Confirmed' }, { value: 'preparing', label: 'Preparing' }, { value: 'ready', label: 'Ready' }]} value={fp.value || ''} onChange={fp.onChange} />
                })()}
              </FormField>
              <FormField name="dishIds" label="Dishes">
                {(() => {
                  const fp = form.getFieldProps('dishIds')
                  return (
                    <Autocomplete<Dish>
                      collection="Dish"
                      getOptionValue={(d) => d.id}
                      getOptionLabel={(d) => d.name}
                      getOptionDescription={(d) => `${formatCurrency(d.price, 'RUB')} • ${d.category}`}
                      value={fp.value || []}
                      onChange={fp.onChange}
                      placeholder="Search dishes..."
                      multiple
                      filter={(d, s) => {
                        if (!form.getValue('restaurantId') || d.restaurantId !== form.getValue('restaurantId')) return false
                        const l = s.toLowerCase()
                        return d.name.toLowerCase().includes(l) || d.description?.toLowerCase().includes(l) || d.category.toLowerCase().includes(l)
                      }}
                    />
                  )
                })()}
              </FormField>
            </FormSection>
          </ScrollView>
        </Form>
      </Screen>
    </div>
  )
}

