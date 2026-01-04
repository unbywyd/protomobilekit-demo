import { entity, useStore } from 'protomobilekit'
import type { InferEntity } from 'protomobilekit'

// Restaurant entity
export const Restaurant = entity({
  name: 'Restaurant',
  fields: {
    name: 'string',
    image: 'image',
    cuisine: { type: 'enum', values: ['Japanese', 'Italian', 'Mexican', 'American', 'Chinese', 'Indian'] as const },
    rating: 'number',
    deliveryTime: 'string',
    minOrder: 'number',
  }
})
export type Restaurant = InferEntity<typeof Restaurant>

// Dish entity
export const Dish = entity({
  name: 'Dish',
  fields: {
    name: 'string',
    description: 'string',
    price: 'number',
    image: 'image',
    restaurantId: { type: 'relation', collection: 'Restaurant' },
    category: { type: 'enum', values: ['Appetizer', 'Main', 'Dessert', 'Drink'] as const },
  }
})
export type Dish = InferEntity<typeof Dish>

// Order entity
export const Order = entity({
  name: 'Order',
  fields: {
    status: {
      type: 'enum',
      values: ['pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled'] as const,
      default: 'pending'
    },
    customerId: 'string',
    restaurantId: { type: 'relation', collection: 'Restaurant' },
    items: 'string', // JSON stringified array
    total: 'number',
    address: 'string',
    courierId: { type: 'relation', collection: 'Courier', required: false },
  }
})
export type Order = InferEntity<typeof Order>

// Courier entity
export const Courier = entity({
  name: 'Courier',
  fields: {
    name: 'string',
    phone: 'phone',
    avatar: 'image',
    status: { type: 'enum', values: ['available', 'busy', 'offline'] as const, default: 'available' },
    rating: 'number',
  }
})
export type Courier = InferEntity<typeof Courier>

// Seed initial data (prevent duplicate seeding)
let seeded = false
export function seedData() {
  if (seeded) return
  seeded = true

  const store = useStore.getState()

  // Check if already has data
  const existingRestaurants = store.getAll('Restaurant')
  if (existingRestaurants.length > 0) return

  const silent = { silent: true }

  // Restaurants
  store.create('Restaurant', { id: 'r1', name: 'Sakura Sushi', image: 'https://picsum.photos/seed/sushi/400/200', cuisine: 'Japanese', rating: 4.8, deliveryTime: '25-35 min', minOrder: 500 }, silent)
  store.create('Restaurant', { id: 'r2', name: 'Pizza Roma', image: 'https://picsum.photos/seed/pizza/400/200', cuisine: 'Italian', rating: 4.5, deliveryTime: '30-40 min', minOrder: 400 }, silent)
  store.create('Restaurant', { id: 'r3', name: 'Taco Fiesta', image: 'https://picsum.photos/seed/taco/400/200', cuisine: 'Mexican', rating: 4.6, deliveryTime: '20-30 min', minOrder: 350 }, silent)

  // Dishes
  store.create('Dish', { id: 'd1', name: 'Dragon Roll', description: 'Shrimp tempura, eel, avocado', price: 450, image: 'https://picsum.photos/seed/roll/200/200', restaurantId: 'r1', category: 'Main' }, silent)
  store.create('Dish', { id: 'd2', name: 'Salmon Sashimi', description: 'Fresh salmon, 8 pieces', price: 550, image: 'https://picsum.photos/seed/salmon/200/200', restaurantId: 'r1', category: 'Appetizer' }, silent)
  store.create('Dish', { id: 'd3', name: 'Margherita', description: 'Tomato, mozzarella, basil', price: 380, image: 'https://picsum.photos/seed/marg/200/200', restaurantId: 'r2', category: 'Main' }, silent)
  store.create('Dish', { id: 'd4', name: 'Pepperoni', description: 'Pepperoni, cheese, tomato sauce', price: 420, image: 'https://picsum.photos/seed/pep/200/200', restaurantId: 'r2', category: 'Main' }, silent)
  store.create('Dish', { id: 'd5', name: 'Beef Tacos', description: '3 tacos with beef, salsa, guacamole', price: 320, image: 'https://picsum.photos/seed/beef/200/200', restaurantId: 'r3', category: 'Main' }, silent)
  store.create('Dish', { id: 'd6', name: 'Nachos Grande', description: 'Chips, cheese, jalapeños, sour cream', price: 280, image: 'https://picsum.photos/seed/nachos/200/200', restaurantId: 'r3', category: 'Appetizer' }, silent)

  // Couriers - IDs match users.ts for consistency
  store.create('Courier', { id: 'alex', name: 'Alex Johnson', phone: '+7 999 123 4567', avatar: 'https://i.pravatar.cc/150?u=alex', status: 'available', rating: 4.9 }, silent)
  store.create('Courier', { id: 'maria', name: 'Maria Garcia', phone: '+7 999 234 5678', avatar: 'https://i.pravatar.cc/150?u=maria', status: 'available', rating: 4.7 }, silent)
  store.create('Courier', { id: 'david', name: 'David Wilson', phone: '+7 999 345 6789', avatar: 'https://i.pravatar.cc/150?u=david', status: 'offline', rating: 4.5 }, silent)

  // Sample orders with different statuses - customerIds match users.ts
  store.create('Order', {
    id: 'o1',
    status: 'pending',
    customerId: 'alice',
    restaurantId: 'r1',
    items: JSON.stringify([{ dishId: 'd1', name: 'Dragon Roll', qty: 2, price: 450 }]),
    total: 900,
    address: '123 Oxford Street, London',
    courierId: null,
  }, silent)

  store.create('Order', {
    id: 'o2',
    status: 'preparing',
    customerId: 'bob',
    restaurantId: 'r2',
    items: JSON.stringify([{ dishId: 'd3', name: 'Margherita', qty: 1, price: 380 }, { dishId: 'd4', name: 'Pepperoni', qty: 1, price: 420 }]),
    total: 800,
    address: '45 Baker Street, London',
    courierId: null,
  }, silent)

  store.create('Order', {
    id: 'o3',
    status: 'delivering',
    customerId: 'alice',
    restaurantId: 'r3',
    items: JSON.stringify([{ dishId: 'd5', name: 'Beef Tacos', qty: 3, price: 320 }]),
    total: 960,
    address: '78 Regent Street, London',
    courierId: 'alex',
  }, silent)

  store.create('Order', {
    id: 'o4',
    status: 'delivered',
    customerId: 'charlie',
    restaurantId: 'r1',
    items: JSON.stringify([{ dishId: 'd2', name: 'Salmon Sashimi', qty: 2, price: 550 }]),
    total: 1100,
    address: '15 Piccadilly, London',
    courierId: 'maria',
  }, silent)

  store.create('Order', {
    id: 'o5',
    status: 'ready',
    customerId: 'bob',
    restaurantId: 'r3',
    items: JSON.stringify([{ dishId: 'd6', name: 'Nachos Grande', qty: 1, price: 280 }]),
    total: 280,
    address: '99 Camden High Street, London',
    courierId: null,
  }, silent)
}
