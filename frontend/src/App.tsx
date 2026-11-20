import { useEffect, useState } from 'react'
import {
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  Compass,
  LayoutDashboard,
  MapPin,
  PartyPopper,
  Search,
  Ticket,
  UserRound,
  Users,
  Zap,
} from 'lucide-react'
import './App.css'

const API_URL = (import.meta.env.VITE_API_URL || 'https://nikki-2-0g3d.onrender.com').replace(/\/$/, '')
const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || '67108570-2b7c-45ba-a11f-dcc3d1532dd7'

type EventItem = {
  id: string
  title: string
  capacity: number
  status?: string
  organizer_id?: string
  venue_location?: string
  start_time?: string
}

type Tab = 'discover' | 'passes' | 'host' | 'insights'

const categoryIcons = [Compass, PartyPopper, Zap, Users]

async function apiFetch(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(data?.error || `Request failed (${response.status})`)
  return data
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('discover')
  const [events, setEvents] = useState<EventItem[]>([])
  const [passes, setPasses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [toast, setToast] = useState('')
  const [busyId, setBusyId] = useState('')

  const loadEvents = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch('/api/events')
      setEvents(data)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not load events')
    } finally {
      setLoading(false)
    }
  }

  const loadPasses = async () => {
    try {
      const data = await apiFetch(`/api/me/registrations?user_id=${encodeURIComponent(DEMO_USER_ID)}`)
      setPasses(Array.isArray(data) ? data : [])
    } catch {
      setPasses([])
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    if (activeTab === 'passes') loadPasses()
  }, [activeTab])

  const register = async (event: EventItem) => {
    setBusyId(event.id)
    setError('')
    try {
      await apiFetch('/api/registrations', {
        method: 'POST',
        body: JSON.stringify({ user_id: DEMO_USER_ID, event_id: event.id }),
      })
      setToast(`You are registered for ${event.title}`)
      await Promise.all([loadEvents(), loadPasses()])
      window.setTimeout(() => setToast(''), 3000)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Registration failed')
    } finally {
      setBusyId('')
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || event.title.toLowerCase().includes(category.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveTab('discover')}>
          <span className="brand-mark"><Zap size={20} fill="currentColor" /></span>
          <span><strong>CampusPulse</strong><small>Live campus node</small></span>
        </button>
        <div className="persona">
          <span className="persona-dot" />
          <UserRound size={16} />
          <span>Student</span>
        </div>
      </header>

      <main>
        {error && <div className="error-banner"><span>{error}</span><button onClick={() => setError('')}>Dismiss</button></div>}

        {activeTab === 'discover' && (
          <Discover
            events={filteredEvents}
            loading={loading}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            register={register}
            busyId={busyId}
            reload={loadEvents}
          />
        )}
        {activeTab === 'passes' && <Passes passes={passes} reload={loadPasses} />}
        {activeTab === 'host' && <Host events={events} reload={loadEvents} />}
        {activeTab === 'insights' && <Insights events={events} />}
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        <NavButton icon={Compass} label="Explore" active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
        <NavButton icon={Ticket} label="My passes" active={activeTab === 'passes'} onClick={() => setActiveTab('passes')} />
        <NavButton icon={LayoutDashboard} label="Host" active={activeTab === 'host'} onClick={() => setActiveTab('host')} />
        <NavButton icon={BarChart3} label="Insights" active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} />
      </nav>

      {toast && <div className="toast"><Check size={18} />{toast}</div>}
    </div>
  )
}

function NavButton({ icon: Icon, label, active, onClick }: { icon: typeof Compass; label: string; active: boolean; onClick: () => void }) {
  return <button className={active ? 'nav-item active' : 'nav-item'} onClick={onClick}><Icon size={20} /><span>{label}</span></button>
}

function Discover({ events, loading, search, setSearch, category, setCategory, register, busyId, reload }: any) {
  const categories = ['All', 'Tech', 'AI', 'Data', 'ML']
  return (
    <div className="page discover-page">
      <section className="pulse-banner">
        <div><span className="live-label"><i />Live campus pulse</span><h1>Find your next crowd.</h1></div>
        <div className="pulse-count"><strong>{events.length}</strong><span>Events live</span></div>
      </section>

      <div className="search-row">
        <label className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search campus events" /></label>
        <button className="icon-button" onClick={reload} aria-label="Refresh events"><Zap size={18} /></button>
      </div>

      <div className="category-row">
        {categories.map((item, index) => {
          const Icon = categoryIcons[index % categoryIcons.length]
          return <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}><Icon size={15} />{item}</button>
        })}
      </div>

      {loading ? <Loading /> : events.length === 0 ? <Empty /> : (
        <div className="event-grid">
          {events.map((event: EventItem, index: number) => (
            <article className="event-card" key={event.id}>
              <div className={`event-art art-${index % 4}`}>
                <span className="status-pill">{event.status || 'Open'}</span>
                <span className="event-node">Campus node {String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="event-body">
                <div className="event-meta"><CalendarDays size={14} /><span>Campus event</span><span className="dot" /><MapPin size={14} /><span>{event.venue_location || 'Campus'}</span></div>
                <h2>{event.title}</h2>
                <div className="capacity-row"><span>Capacity</span><strong>{event.capacity} seats</strong></div>
                <div className="capacity-track"><span style={{ width: `${Math.min(100, 35 + index * 14)}%` }} /></div>
                <button className="primary-button" disabled={busyId === event.id} onClick={() => register(event)}>
                  {busyId === event.id ? 'Registering...' : 'Register'}<ChevronRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function Passes({ passes, reload }: { passes: any[]; reload: () => void }) {
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">Your access</span><h1>My passes</h1></div><button className="icon-button" onClick={reload}><Zap size={18} /></button></div>
      {passes.length === 0 ? <div className="empty-pass"><Ticket size={30} /><h2>No passes yet</h2><p>Register for an event to create a live pass.</p></div> : (
        <div className="pass-grid">
          {passes.map((pass: any, index: number) => {
            const event = pass.events || {}
            return <article className="pass-card" key={pass.id || index}><div className="pass-top"><span>Verified entry</span><strong>#{pass.id?.slice(0, 8).toUpperCase() || 'REG-' + index}</strong></div><h2>{event.title || 'Campus event'}</h2><p><MapPin size={14} />{event.venue_location || 'Campus venue'}</p><div className="qr"><span /><i /><b /></div></article>
          })}
        </div>
      )}
    </div>
  )
}

function Host({ events, reload }: { events: EventItem[]; reload: () => void }) {
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">Organizer mode</span><h1>Host desk</h1></div><button className="icon-button" onClick={reload}><Zap size={18} /></button></div>
      <div className="host-summary"><div><Users size={20} /><span>Hosted events</span><strong>{events.length}</strong></div><div><Ticket size={20} /><span>Total capacity</span><strong>{events.reduce((sum, event) => sum + (event.capacity || 0), 0)}</strong></div></div>
      <div className="host-list">
        {events.map((event) => <article key={event.id} className="host-row"><div className="host-icon"><CalendarDays size={20} /></div><div><h2>{event.title}</h2><p>{event.status || 'upcoming'} · {event.capacity} seats</p></div><ChevronRight size={18} /></article>)}
      </div>
    </div>
  )
}

function Insights({ events }: { events: EventItem[] }) {
  const totalCapacity = events.reduce((sum, event) => sum + (event.capacity || 0), 0)
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">Live analytics</span><h1>Campus insights</h1></div></div>
      <div className="metric-grid"><article><span>Live events</span><strong>{events.length}</strong></article><article><span>Total capacity</span><strong>{totalCapacity}</strong></article><article><span>Network</span><strong>Live</strong></article></div>
      <section className="chart-panel"><div className="chart-heading"><span>Capacity by event</span><small>Seats</small></div>{events.map((event) => <div className="chart-row" key={event.id}><span>{event.title}</span><div><i style={{ width: `${Math.max(8, (event.capacity / Math.max(totalCapacity, 1)) * 100)}%` }} /></div><strong>{event.capacity}</strong></div>)}</section>
    </div>
  )
}

function Loading() { return <div className="loading"><i /><i /><i /></div> }
function Empty() { return <div className="empty-pass"><Compass size={30} /><h2>No matching events</h2><p>Try another search or category.</p></div> }

export default App
