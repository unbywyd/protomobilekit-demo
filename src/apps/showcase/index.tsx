import {
  Navigator,
  useNavigate,
  useTheme,
  defineFrames,

  // Layout
  Screen,
  Header,
  BackButton,
  ScrollView,
  Section,
  Content,
  Card,
  Divider,
  Spacer,

  // Interactive
  Button,
  TextButton,
  IconButton,
  Input,
  Select,
  TextArea,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  Slider,
  SearchBar,
  SearchableSelect,
  Autocomplete,
  CurrencyInput,
  PriceRange,

  // Data display
  List,
  ListItem,
  MenuItem,
  Avatar,
  AvatarGroup,
  Badge,
  Chip,
  Tabs,
  AccordionGroup,
  AccordionItem,
  Carousel,

  // Menus
  DropdownMenu,
  HorizontalMenu,

  // Overlays
  BottomSheet,
  ActionSheet,
  Modal,
  Alert,
  Confirm,
  Prompt,
  useToast,
  ToastProvider,
  ImageViewer,

  // Pickers
  DatePicker,
  Calendar,
  TimePicker,
  DateTimePicker,

  // Feedback
  Spinner,
  ProgressBar,
  CircularProgress,
  FAB,
  SpeedDial,

  // Forms
  Form,
  FormField,
  FormRow,
  FormSection,
  PhoneInput,
  OTPInput,
  PinInput,
  useForm,
} from 'protomobilekit'
import { useState } from 'react'
import {
  Plus,
  Pencil,
  Share2,
  Copy,
  Trash2,
  Settings,
  User,
  Bell,
  Tag,
  Layout,
  MousePointerClick,
  TextCursor,
  SlidersHorizontal,
  BarChart3,
  Menu,
  Layers,
  CalendarDays,
  Clock,
  FileText,
  ChevronRight,
  MoreVertical,
} from 'lucide-react'

// Component category type
interface ComponentCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const categories: ComponentCategory[] = [
  { id: 'layout', name: 'Layout', description: 'Screen, Card, Section, Divider', icon: <Layout size={24} /> },
  { id: 'buttons', name: 'Buttons', description: 'Button, TextButton, FAB', icon: <MousePointerClick size={24} /> },
  { id: 'inputs', name: 'Inputs', description: 'Input, TextArea, Select', icon: <TextCursor size={24} /> },
  { id: 'controls', name: 'Controls', description: 'Switch, Checkbox, Radio, Slider', icon: <SlidersHorizontal size={24} /> },
  { id: 'data', name: 'Data Display', description: 'List, Avatar, Badge, Chip', icon: <BarChart3 size={24} /> },
  { id: 'menus', name: 'Menus', description: 'Dropdown, Horizontal, Context', icon: <Menu size={24} /> },
  { id: 'overlays', name: 'Overlays', description: 'Modal, BottomSheet, Alert', icon: <Layers size={24} /> },
  { id: 'pickers', name: 'Pickers', description: 'Date, Time, Calendar', icon: <CalendarDays size={24} /> },
  { id: 'feedback', name: 'Feedback', description: 'Spinner, Progress, Toast', icon: <Clock size={24} /> },
  { id: 'forms', name: 'Forms', description: 'Form, FormField, Phone, OTP', icon: <FileText size={24} /> },
]

// Main showcase screen - category list
function ShowcaseHome() {
  const { navigate } = useNavigate()
  const { colors } = useTheme()

  return (
    <Screen header={<Header title="UI Components" />}>
      <ScrollView padding="md">
        <div className="space-y-2">
          {categories.map((cat) => (
            <Card key={cat.id} onPress={() => navigate(cat.id)}>
              <div className="p-4 flex items-center gap-4">
                <span style={{ color: colors.primary }}>{cat.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: colors.text }}>{cat.name}</p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>{cat.description}</p>
                </div>
                <ChevronRight size={20} style={{ color: colors.textSecondary }} />
              </div>
            </Card>
          ))}
        </div>
      </ScrollView>
    </Screen>
  )
}

// Layout components
function LayoutScreen() {
  const { goBack } = useNavigate()
  const { colors } = useTheme()

  return (
    <Screen header={<Header title="Layout" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="Card">
          <Card>
            <div className="p-4">
              <p style={{ color: colors.text }}>Basic Card</p>
            </div>
          </Card>
          <Spacer size="sm" />
          <Card onPress={() => {}}>
            <div className="p-4">
              <p style={{ color: colors.text }}>Pressable Card</p>
            </div>
          </Card>
        </Section>

        <Section title="Section">
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Sections group related content with a title
          </p>
        </Section>

        <Section title="Content">
          <Content>
            <p style={{ color: colors.text }}>Content component wraps text with proper padding</p>
          </Content>
        </Section>

        <Section title="Divider">
          <Card>
            <div className="p-4">
              <p style={{ color: colors.text }}>Above divider</p>
            </div>
            <Divider />
            <div className="p-4">
              <p style={{ color: colors.text }}>Below divider</p>
            </div>
          </Card>
        </Section>

        <Section title="Spacer">
          <div className="flex items-center gap-2">
            <Badge>Before</Badge>
            <Spacer size="lg" />
            <Badge>After spacer</Badge>
          </div>
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Buttons
function ButtonsScreen() {
  const { goBack } = useNavigate()
  const { colors } = useTheme()
  const [loading, setLoading] = useState(false)

  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Screen header={<Header title="Buttons" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="Button Variants">
          <div className="space-y-2">
            <Button fullWidth>Primary (Default)</Button>
            <Button fullWidth variant="secondary">Secondary</Button>
            <Button fullWidth variant="outline">Outline</Button>
            <Button fullWidth variant="ghost">Ghost</Button>
            <Button fullWidth variant="danger">Danger</Button>
          </div>
        </Section>

        <Section title="Button Sizes">
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Section>

        <Section title="Button States">
          <div className="space-y-2">
            <Button fullWidth disabled>Disabled</Button>
            <Button fullWidth loading={loading} onClick={handleLoading}>
              {loading ? 'Loading...' : 'Click to Load'}
            </Button>
          </div>
        </Section>

        <Section title="TextButton">
          <div className="flex gap-4">
            <TextButton>Default</TextButton>
            <TextButton color="primary">Primary</TextButton>
            <TextButton color="danger">Danger</TextButton>
          </div>
        </Section>

        <Section title="IconButton">
          <div className="flex gap-3 flex-wrap">
            <IconButton icon={<Plus size={20} />} onPress={() => {}} />
            <IconButton icon={<Pencil size={20} />} onPress={() => {}} variant="secondary" />
            <IconButton icon={<Share2 size={20} />} onPress={() => {}} variant="outline" />
            <IconButton icon={<Settings size={20} />} onPress={() => {}} variant="ghost" />
            <IconButton icon={<Trash2 size={20} />} onPress={() => {}} variant="danger" />
          </div>
          <div className="flex gap-3 items-center mt-3">
            <IconButton icon={<Bell size={16} />} onPress={() => {}} size="sm" />
            <IconButton icon={<Bell size={20} />} onPress={() => {}} size="md" />
            <IconButton icon={<Bell size={24} />} onPress={() => {}} size="lg" />
          </div>
        </Section>

        <Section title="FAB">
          <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
            Floating Action Button (bottom-left)
          </p>
          <FAB
            icon={<Plus size={24} />}
            onPress={() => {}}
            position="bottom-left"
          />
        </Section>

        <Section title="SpeedDial">
          <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
            Expandable FAB (bottom-right, tap to expand)
          </p>
          <SpeedDial
            icon={<Plus size={24} />}
            position="bottom-right"
            actions={[
              { icon: <Pencil size={20} />, label: 'Edit', onPress: () => {} },
              { icon: <Share2 size={20} />, label: 'Share', onPress: () => {} },
            ]}
          />
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Inputs
function InputsScreen() {
  const { goBack } = useNavigate()
  const [text, setText] = useState('')
  const [textarea, setTextarea] = useState('')
  const [select, setSelect] = useState('')
  const [search, setSearch] = useState('')
  const [searchable, setSearchable] = useState('')
  const [autocomplete, setAutocomplete] = useState('')
  const [currency, setCurrency] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const selectOptions = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3' },
  ]

  const searchableOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
  ]

  return (
    <Screen header={<Header title="Inputs" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="Input">
          <div className="space-y-3">
            <Input label="Default" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
            <Input label="With Helper" value="" onChange={() => {}} helper="This is helper text" />
            <Input label="With Error" value="" onChange={() => {}} error="This field is required" />
            <Input label="Disabled" value="Disabled input" onChange={() => {}} disabled />
            <Input label="Password" type="password" value={text} onChange={(e) => setText(e.target.value)} placeholder="Password" />
          </div>
        </Section>

        <Section title="TextArea">
          <TextArea
            label="Description"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            placeholder="Enter description..."
            rows={4}
          />
        </Section>

        <Section title="Select">
          <Select
            label="Choose option"
            value={select}
            onChange={setSelect}
            options={selectOptions}
            placeholder="Select..."
          />
        </Section>

        <Section title="SearchBar">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search..."
          />
        </Section>

        <Section title="SearchableSelect">
          <SearchableSelect
            label="Search & Select"
            value={searchable}
            onChange={(v) => setSearchable(v as string)}
            options={searchableOptions}
            placeholder="Type to search..."
          />
        </Section>

        <Section title="Autocomplete">
          <Autocomplete
            label="Autocomplete"
            value={autocomplete}
            onChange={(v) => setAutocomplete(v as string)}
            options={searchableOptions}
            placeholder="Start typing..."
          />
        </Section>

        <Section title="CurrencyInput">
          <CurrencyInput
            label="Price"
            value={currency}
            onChange={setCurrency}
            currency="RUB"
          />
        </Section>

        <Section title="PriceRange">
          <PriceRange
            label="Price Range"
            value={priceRange}
            onChange={setPriceRange}
            min={0}
            max={10000}
            currency="RUB"
          />
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Controls
function ControlsScreen() {
  const { goBack } = useNavigate()
  const [switchValue, setSwitchValue] = useState(false)
  const [checkbox1, setCheckbox1] = useState(false)
  const [checkbox2, setCheckbox2] = useState(true)
  const [radio, setRadio] = useState('opt1')
  const [slider, setSlider] = useState(50)

  return (
    <Screen header={<Header title="Controls" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="Switch">
          <Card>
            <ListItem right={<Switch checked={switchValue} onChange={setSwitchValue} />}>
              Toggle Switch
            </ListItem>
            <ListItem right={<Switch checked disabled onChange={() => {}} />}>
              Disabled On
            </ListItem>
            <ListItem right={<Switch checked={false} disabled onChange={() => {}} />}>
              Disabled Off
            </ListItem>
          </Card>
        </Section>

        <Section title="Checkbox">
          <Card>
            <ListItem
              left={<Checkbox checked={checkbox1} onChange={setCheckbox1} />}
            >
              Unchecked item
            </ListItem>
            <ListItem
              left={<Checkbox checked={checkbox2} onChange={setCheckbox2} />}
            >
              Checked item
            </ListItem>
            <ListItem
              left={<Checkbox checked disabled onChange={() => {}} />}
            >
              Disabled checked
            </ListItem>
          </Card>
        </Section>

        <Section title="Radio">
          <Card>
            <ListItem left={<Radio checked={radio === 'opt1'} onChange={() => setRadio('opt1')} />}>
              Option 1
            </ListItem>
            <ListItem left={<Radio checked={radio === 'opt2'} onChange={() => setRadio('opt2')} />}>
              Option 2
            </ListItem>
            <ListItem left={<Radio checked={radio === 'opt3'} onChange={() => setRadio('opt3')} />}>
              Option 3
            </ListItem>
          </Card>
        </Section>

        <Section title="RadioGroup">
          <RadioGroup
            value={radio}
            onChange={setRadio}
            options={[
              { value: 'opt1', label: 'First choice' },
              { value: 'opt2', label: 'Second choice' },
              { value: 'opt3', label: 'Third choice' },
            ]}
          />
        </Section>

        <Section title="Slider">
          <Card>
            <div className="p-4 space-y-4">
              <Slider value={slider} onChange={setSlider} min={0} max={100} />
              <p className="text-center text-sm">Value: {slider}</p>
              <Slider value={75} onChange={() => {}} disabled />
            </div>
          </Card>
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Data Display
function DataScreen() {
  const { goBack } = useNavigate()
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState('tab1')

  const listItems = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
  ]

  return (
    <Screen header={<Header title="Data Display" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="List & ListItem">
          <Card>
            <List
              items={listItems}
              keyExtractor={(item) => item.id}
              renderItem={(item) => (
                <ListItem
                  left={<Avatar name={item.name} />}
                  subtitle={item.email}
                  showChevron
                >
                  {item.name}
                </ListItem>
              )}
            />
          </Card>
        </Section>

        <Section title="MenuItem">
          <Card>
            <MenuItem icon={<Settings size={20} />} label="Settings" />
            <MenuItem icon={<User size={20} />} label="Profile" showChevron onPress={() => {}} />
            <MenuItem icon={<Bell size={20} />} label="Notifications" onPress={() => {}} />
            <MenuItem label="Delete Account" destructive onPress={() => {}} />
          </Card>
        </Section>

        <Section title="Avatar">
          <div className="flex items-center gap-4">
            <Avatar name="John Doe" size="sm" />
            <Avatar name="Jane Smith" size="md" />
            <Avatar name="Bob Johnson" size="lg" />
            <Avatar name="Alice Brown" size="xl" />
          </div>
        </Section>

        <Section title="AvatarGroup">
          <AvatarGroup
            avatars={[
              { name: 'John' },
              { name: 'Jane' },
              { name: 'Bob' },
              { name: 'Alice' },
              { name: 'Charlie' },
            ]}
            max={3}
          />
        </Section>

        <Section title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </Section>

        <Section title="Chip">
          <div className="flex flex-wrap gap-2">
            <Chip>Basic</Chip>
            <Chip selected>Selected</Chip>
            <Chip dismissible onDismiss={() => {}}>Removable</Chip>
            <Chip icon={<Tag size={14} />}>With Icon</Chip>
          </div>
        </Section>

        <Section title="Tabs">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabs={[
              { key: 'tab1', label: 'First' },
              { key: 'tab2', label: 'Second' },
              { key: 'tab3', label: 'Third' },
            ]}
          />
          <div className="p-4">
            <p style={{ color: colors.text }}>Content for: {activeTab}</p>
          </div>
        </Section>

        <Section title="Accordion">
          <Card>
            <AccordionGroup>
              <AccordionItem id="section1" title="First Section">
                <p style={{ color: colors.text }}>Content of the first section</p>
              </AccordionItem>
              <AccordionItem id="section2" title="Second Section">
                <p style={{ color: colors.text }}>Content of the second section</p>
              </AccordionItem>
              <AccordionItem id="section3" title="Third Section">
                <p style={{ color: colors.text }}>Content of the third section</p>
              </AccordionItem>
            </AccordionGroup>
          </Card>
        </Section>

        <Section title="Carousel">
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>
            Swipe to navigate between cards
          </p>
          <Carousel
            items={[
              {
                key: '1',
                content: (
                  <Card>
                    <img
                      src="https://picsum.photos/seed/promo1/400/200"
                      alt="Promo 1"
                      className="w-full h-32 object-cover rounded-t-xl"
                    />
                    <div className="p-3">
                      <p className="font-semibold" style={{ color: colors.text }}>Summer Sale</p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>Up to 50% off</p>
                    </div>
                  </Card>
                ),
              },
              {
                key: '2',
                content: (
                  <Card>
                    <img
                      src="https://picsum.photos/seed/promo2/400/200"
                      alt="Promo 2"
                      className="w-full h-32 object-cover rounded-t-xl"
                    />
                    <div className="p-3">
                      <p className="font-semibold" style={{ color: colors.text }}>New Arrivals</p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>Check out new items</p>
                    </div>
                  </Card>
                ),
              },
              {
                key: '3',
                content: (
                  <Card>
                    <img
                      src="https://picsum.photos/seed/promo3/400/200"
                      alt="Promo 3"
                      className="w-full h-32 object-cover rounded-t-xl"
                    />
                    <div className="p-3">
                      <p className="font-semibold" style={{ color: colors.text }}>Free Delivery</p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>Orders over $50</p>
                    </div>
                  </Card>
                ),
              },
            ]}
            showDots
            peek={16}
            autoPlay={5000}
          />
        </Section>

        <Section title="Carousel with Peek">
          <Carousel
            items={[
              { key: 'a', content: <Card><div className="p-4 text-center" style={{ color: colors.text }}>Card A</div></Card> },
              { key: 'b', content: <Card><div className="p-4 text-center" style={{ color: colors.text }}>Card B</div></Card> },
              { key: 'c', content: <Card><div className="p-4 text-center" style={{ color: colors.text }}>Card C</div></Card> },
              { key: 'd', content: <Card><div className="p-4 text-center" style={{ color: colors.text }}>Card D</div></Card> },
            ]}
            peek={40}
            gap={8}
            showDots
          />
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Menus
function MenusScreen() {
  const { goBack } = useNavigate()
  const { colors } = useTheme()
  const [activeMenu, setActiveMenu] = useState('home')
  const [moreMenu, setMoreMenu] = useState(false)

  return (
    <Screen header={<Header title="Menus" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="DropdownMenu">
          <DropdownMenu
            trigger={<Button>Open Dropdown</Button>}
            items={[
              { label: 'Edit', icon: <Pencil size={18} />, onPress: () => {} },
              { label: 'Duplicate', icon: <Copy size={18} />, onPress: () => {} },
              { label: 'Delete', icon: <Trash2 size={18} />, destructive: true, onPress: () => {} },
            ]}
          />
        </Section>

        <Section title="HorizontalMenu">
          <HorizontalMenu
            items={[
              { key: 'home', label: 'Home' },
              { key: 'popular', label: 'Popular' },
              { key: 'new', label: 'New' },
              { key: 'trending', label: 'Trending' },
            ]}
            activeKey={activeMenu}
            onChange={setActiveMenu}
          />
          <Card>
            <div className="p-4">
              <p style={{ color: colors.text }}>Selected: {activeMenu}</p>
            </div>
          </Card>
        </Section>

        <Section title="More Menu (ActionSheet)">
          <Card>
            <div className="p-4 flex items-center justify-between">
              <p style={{ color: colors.text }}>Tap the menu button</p>
              <button
                onClick={() => setMoreMenu(true)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <MoreVertical size={20} color={colors.textSecondary} />
              </button>
            </div>
          </Card>
          <ActionSheet
            open={moreMenu}
            onClose={() => setMoreMenu(false)}
            options={[
              { label: 'Copy', onPress: () => setMoreMenu(false) },
              { label: 'Cut', onPress: () => setMoreMenu(false) },
              { label: 'Paste', onPress: () => setMoreMenu(false) },
              { label: 'Delete', destructive: true, onPress: () => setMoreMenu(false) },
            ]}
          />
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Overlays
function OverlaysScreen() {
  const { goBack } = useNavigate()
  const toast = useToast()
  const [modal, setModal] = useState(false)
  const [bottomSheet, setBottomSheet] = useState(false)
  const [actionSheet, setActionSheet] = useState(false)
  const [alert, setAlert] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [prompt, setPrompt] = useState(false)
  const [imageViewer, setImageViewer] = useState(false)

  return (
    <Screen header={<Header title="Overlays" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="Modal">
          <Button fullWidth onClick={() => setModal(true)}>Open Modal</Button>
          <Modal open={modal} onClose={() => setModal(false)} title="Modal Title">
            <div className="p-4">
              <p>This is modal content.</p>
              <Spacer size="md" />
              <Button fullWidth onClick={() => setModal(false)}>Close</Button>
            </div>
          </Modal>
        </Section>

        <Section title="BottomSheet">
          <Button fullWidth onClick={() => setBottomSheet(true)}>Open Bottom Sheet</Button>
          <BottomSheet open={bottomSheet} onClose={() => setBottomSheet(false)} title="Bottom Sheet">
            <div className="p-4 space-y-2">
              <ListItem>Option 1</ListItem>
              <ListItem>Option 2</ListItem>
              <ListItem>Option 3</ListItem>
            </div>
          </BottomSheet>
        </Section>

        <Section title="ActionSheet">
          <Button fullWidth onClick={() => setActionSheet(true)}>Open Action Sheet</Button>
          <ActionSheet
            open={actionSheet}
            onClose={() => setActionSheet(false)}
            title="Choose Action"
            options={[
              { label: 'Take Photo', onPress: () => setActionSheet(false) },
              { label: 'Choose from Library', onPress: () => setActionSheet(false) },
              { label: 'Delete', destructive: true, onPress: () => setActionSheet(false) },
            ]}
          />
        </Section>

        <Section title="Alert">
          <Button fullWidth onClick={() => setAlert(true)}>Show Alert</Button>
          <Alert
            open={alert}
            onClose={() => setAlert(false)}
            title="Alert Title"
            message="This is an alert message."
          />
        </Section>

        <Section title="Confirm">
          <Button fullWidth onClick={() => setConfirm(true)}>Show Confirm</Button>
          <Confirm
            open={confirm}
            onClose={() => setConfirm(false)}
            title="Confirm Action"
            message="Are you sure you want to proceed?"
            onConfirm={() => {
              setConfirm(false)
              toast.success('Confirmed!')
            }}
          />
        </Section>

        <Section title="Prompt">
          <Button fullWidth onClick={() => setPrompt(true)}>Show Prompt</Button>
          <Prompt
            open={prompt}
            onClose={() => setPrompt(false)}
            title="Enter Name"
            message="Please enter your name:"
            placeholder="Name..."
            onSubmit={(value) => {
              setPrompt(false)
              toast.info(`You entered: ${value}`)
            }}
          />
        </Section>

        <Section title="Toast">
          <div className="space-y-2">
            <Button fullWidth variant="secondary" onClick={() => toast.success('Success message!')}>
              Success Toast
            </Button>
            <Button fullWidth variant="secondary" onClick={() => toast.error('Error message!')}>
              Error Toast
            </Button>
            <Button fullWidth variant="secondary" onClick={() => toast.warning('Warning message!')}>
              Warning Toast
            </Button>
            <Button fullWidth variant="secondary" onClick={() => toast.info('Info message!')}>
              Info Toast
            </Button>
          </div>
        </Section>

        <Section title="ImageViewer">
          <Button fullWidth onClick={() => setImageViewer(true)}>Open Image Viewer</Button>
          <ImageViewer
            open={imageViewer}
            onClose={() => setImageViewer(false)}
            images={[
              { src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
              { src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' },
              { src: 'https://picsum.photos/800/600?random=3', alt: 'Image 3' },
            ]}
          />
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Pickers
function PickersScreen() {
  const { goBack } = useNavigate()
  const { colors } = useTheme()
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [timePickerOpen, setTimePickerOpen] = useState(false)
  const [dateTimePickerOpen, setDateTimePickerOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState({ hours: 12, minutes: 0 })
  const [dateTime, setDateTime] = useState<Date>(new Date())
  const [calendarDate, setCalendarDate] = useState<Date>(new Date())

  return (
    <Screen header={<Header title="Pickers" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="DatePicker">
          <Button variant="secondary" fullWidth onClick={() => setDatePickerOpen(true)}>
            {date.toLocaleDateString()}
          </Button>
          <DatePicker
            open={datePickerOpen}
            onClose={() => setDatePickerOpen(false)}
            value={date}
            onChange={setDate}
          />
        </Section>

        <Section title="TimePicker">
          <Button variant="secondary" fullWidth onClick={() => setTimePickerOpen(true)}>
            {`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`}
          </Button>
          <TimePicker
            open={timePickerOpen}
            onClose={() => setTimePickerOpen(false)}
            value={time}
            onChange={setTime}
          />
        </Section>

        <Section title="DateTimePicker">
          <Button variant="secondary" fullWidth onClick={() => setDateTimePickerOpen(true)}>
            {dateTime.toLocaleString()}
          </Button>
          <DateTimePicker
            open={dateTimePickerOpen}
            onClose={() => setDateTimePickerOpen(false)}
            value={dateTime}
            onChange={setDateTime}
          />
        </Section>

        <Section title="Calendar">
          <Card>
            <Calendar
              value={calendarDate}
              onChange={setCalendarDate}
            />
          </Card>
          <Spacer size="sm" />
          <p className="text-sm text-center" style={{ color: colors.textSecondary }}>
            Selected: {calendarDate.toLocaleDateString()}
          </p>
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Feedback
function FeedbackScreen() {
  const { goBack } = useNavigate()
  const { colors } = useTheme()

  return (
    <Screen header={<Header title="Feedback" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="Spinner">
          <Card>
            <div className="p-4 flex items-center justify-around">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </Card>
        </Section>

        <Section title="ProgressBar">
          <div className="space-y-4">
            <ProgressBar value={25} />
            <ProgressBar value={50} />
            <ProgressBar value={75} />
            <ProgressBar value={100} />
          </div>
        </Section>

        <Section title="CircularProgress">
          <Card>
            <div className="p-4 flex items-center justify-around">
              <CircularProgress value={25} size={60} />
              <CircularProgress value={50} size={60} />
              <CircularProgress value={75} size={60} />
              <CircularProgress value={100} size={60} />
            </div>
          </Card>
        </Section>

        <Section title="Indeterminate Progress">
          <Card>
            <div className="p-4">
              <p className="mb-2" style={{ color: colors.textSecondary }}>ProgressBar:</p>
              <ProgressBar indeterminate />
              <Spacer size="md" />
              <p className="mb-2" style={{ color: colors.textSecondary }}>CircularProgress:</p>
              <div className="flex justify-center">
                <CircularProgress indeterminate size={60} />
              </div>
            </div>
          </Card>
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Forms
function FormsScreen() {
  const { goBack } = useNavigate()
  const { colors } = useTheme()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [pin, setPin] = useState('')

  const form = useForm({
    values: { name: '', email: '', city: '', zip: '' },
    onSubmit: (values) => {
      console.log('Form submitted:', values)
    },
  })

  return (
    <Screen header={<Header title="Forms" left={<BackButton onPress={goBack} />} />}>
      <ScrollView padding="md">
        <Section title="Form with FormField">
          <Form form={form}>
            <FormSection title="Personal Info">
              <FormField name="name" label="Full Name">
                <Input placeholder="Enter your name" />
              </FormField>
              <FormField name="email" label="Email">
                <Input type="email" placeholder="Enter your email" />
              </FormField>
            </FormSection>

            <FormSection title="Contact">
              <FormRow>
                <FormField name="city" label="City">
                  <Input placeholder="City" />
                </FormField>
                <FormField name="zip" label="ZIP">
                  <Input placeholder="ZIP" />
                </FormField>
              </FormRow>
            </FormSection>

            <Button fullWidth type="submit">Submit</Button>
          </Form>
        </Section>

        <Section title="PhoneInput">
          <PhoneInput
            value={phone}
            onChange={setPhone}
            defaultCountry="RU"
          />
          <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
            Value: {phone || 'empty'}
          </p>
        </Section>

        <Section title="OTPInput">
          <OTPInput
            value={otp}
            onChange={setOtp}
            length={6}
          />
          <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
            Value: {otp || 'empty'}
          </p>
        </Section>

        <Section title="PinInput">
          <PinInput
            value={pin}
            onChange={setPin}
            length={4}
            masked
          />
          <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
            Value: {pin || 'empty'}
          </p>
        </Section>
      </ScrollView>
    </Screen>
  )
}

// Main Showcase App
export function ShowcaseApp() {
  return (
    <ToastProvider>
      <Navigator initial="home">
        <Navigator.Screen name="home" component={ShowcaseHome} />
        <Navigator.Screen name="layout" component={LayoutScreen} />
        <Navigator.Screen name="buttons" component={ButtonsScreen} />
        <Navigator.Screen name="inputs" component={InputsScreen} />
        <Navigator.Screen name="controls" component={ControlsScreen} />
        <Navigator.Screen name="data" component={DataScreen} />
        <Navigator.Screen name="menus" component={MenusScreen} />
        <Navigator.Screen name="overlays" component={OverlaysScreen} />
        <Navigator.Screen name="pickers" component={PickersScreen} />
        <Navigator.Screen name="feedback" component={FeedbackScreen} />
        <Navigator.Screen name="forms" component={FormsScreen} />
      </Navigator>
    </ToastProvider>
  )
}

// Register frames
defineFrames({
  appId: 'showcase',
  appName: 'UI Showcase',
  initial: 'home',
  frames: [
    { id: 'home', name: '1.0 Home', description: 'Component categories', component: ShowcaseHome, tags: ['main'] },
    { id: 'layout', name: '1.1 Layout', description: 'Card, Section, Divider', component: LayoutScreen, tags: ['layout'] },
    { id: 'buttons', name: '1.2 Buttons', description: 'Button, FAB, SpeedDial', component: ButtonsScreen, tags: ['interactive'] },
    { id: 'inputs', name: '1.3 Inputs', description: 'Input, Select, TextArea', component: InputsScreen, tags: ['form'] },
    { id: 'controls', name: '1.4 Controls', description: 'Switch, Checkbox, Radio', component: ControlsScreen, tags: ['form'] },
    { id: 'data', name: '1.5 Data Display', description: 'List, Avatar, Badge', component: DataScreen, tags: ['data'] },
    { id: 'menus', name: '1.6 Menus', description: 'Dropdown, Context, Horizontal', component: MenusScreen, tags: ['interactive'] },
    { id: 'overlays', name: '1.7 Overlays', description: 'Modal, Alert, Toast', component: OverlaysScreen, tags: ['overlay'] },
    { id: 'pickers', name: '1.8 Pickers', description: 'Date, Time, Calendar', component: PickersScreen, tags: ['picker'] },
    { id: 'feedback', name: '1.9 Feedback', description: 'Spinner, Progress', component: FeedbackScreen, tags: ['feedback'] },
    { id: 'forms', name: '1.10 Forms', description: 'Form, Phone, OTP', component: FormsScreen, tags: ['form'] },
  ],
})
