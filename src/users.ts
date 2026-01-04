import { defineUsers, defineRoles } from 'protomobilekit'

/**
 * Test users and roles for demo apps
 *
 * These are predefined users that can be quickly switched
 * via DevTools Auth panel for testing different scenarios.
 */

// =============================================================================
// CUSTOMER APP
// =============================================================================

defineRoles({
  appId: 'customer',
  roles: [
    { value: 'regular', label: 'Regular', description: 'Standard customer' },
    { value: 'premium', label: 'Premium', description: 'Premium member', color: '#f59e0b' },
  ],
})

defineUsers({
  appId: 'customer',
  users: [
    {
      id: 'alice',
      name: 'Alice Smith',
      phone: '+447911123456',
      role: 'premium',
      avatar: 'https://i.pravatar.cc/150?u=alice',
    },
    {
      id: 'bob',
      name: 'Bob Jones',
      phone: '+447922234567',
      role: 'regular',
      avatar: 'https://i.pravatar.cc/150?u=bob',
    },
    {
      id: 'charlie',
      name: 'Charlie Brown',
      phone: '+447933345678',
      role: 'regular',
      avatar: 'https://i.pravatar.cc/150?u=charlie',
    },
  ],
})

// =============================================================================
// COURIER APP
// =============================================================================

defineRoles({
  appId: 'courier',
  roles: [
    { value: 'walker', label: 'Walker', description: 'Foot delivery only' },
    { value: 'biker', label: 'Biker', description: 'Bicycle delivery', color: '#22c55e' },
    { value: 'driver', label: 'Driver', description: 'Car delivery', color: '#3b82f6' },
  ],
})

defineUsers({
  appId: 'courier',
  users: [
    {
      id: 'alex',
      name: 'Alex Johnson',
      phone: '+447944456789',
      role: 'driver',
      avatar: 'https://i.pravatar.cc/150?u=alex',
    },
    {
      id: 'maria',
      name: 'Maria Garcia',
      phone: '+447955567890',
      role: 'biker',
      avatar: 'https://i.pravatar.cc/150?u=maria',
    },
    {
      id: 'david',
      name: 'David Wilson',
      phone: '+447966678901',
      role: 'walker',
      avatar: 'https://i.pravatar.cc/150?u=david',
    },
  ],
})

// =============================================================================
// ADMIN APP
// =============================================================================

defineRoles({
  appId: 'admin',
  roles: [
    { value: 'moderator', label: 'Moderator', description: 'Can manage orders' },
    { value: 'manager', label: 'Manager', description: 'Full access to orders and users', color: '#8b5cf6' },
    { value: 'superadmin', label: 'Super Admin', description: 'Full system access', color: '#ef4444' },
  ],
})

defineUsers({
  appId: 'admin',
  users: [
    {
      id: 'admin',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'superadmin',
      avatar: 'https://i.pravatar.cc/150?u=admin',
    },
    {
      id: 'manager1',
      name: 'Emma Manager',
      email: 'emma@example.com',
      role: 'manager',
      avatar: 'https://i.pravatar.cc/150?u=emma',
    },
  ],
})
