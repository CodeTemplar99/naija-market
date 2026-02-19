import React, { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

const FilterBar = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false)

  const sortOpts = ['Newest', 'Ending Soon', 'Highest Bid', 'Competitive']
  const periodOpts = ['Daily', 'Weekly', 'Monthly', 'Annual']
  const statusOpts = ['Active', 'Resolved', 'Suspended']
  const hideOpts = ['Sports', 'Crypto']

  const update = (key, val) => setFilters(prev => ({ ...prev, [key]: val }))
  const toggleHide = (val) => {
    setFilters(prev => {
      const arr = prev.hide || []
      return { ...prev, hide: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] }
    })
  }
  const clearAll = () => setFilters({ sort: '', period: '', status: '', hide: [] })
  const hasFilters = filters.sort || filters.period || filters.status || (filters.hide && filters.hide.length > 0)

  return (
    <div className="fb-wrap">
      <button className={`fb-toggle btn btn-ghost btn-sm ${open ? 'active' : ''} ${hasFilters ? 'has-filter' : ''}`} onClick={() => setOpen(!open)}>
        <SlidersHorizontal size={15} />
        Filters
        {hasFilters && <span className="fb-count">{[filters.sort, filters.period, filters.status, ...(filters.hide || [])].filter(Boolean).length}</span>}
      </button>

      {open && (
        <div className="fb-panel glass animate-slide-up">
          <div className="fb-row">
            <div className="fb-group">
              <label className="fb-label">Sort by</label>
              <div className="fb-chips">
                {sortOpts.map(o => (
                  <button key={o} className={`fb-chip ${filters.sort === o ? 'active' : ''}`} onClick={() => update('sort', filters.sort === o ? '' : o)}>{o}</button>
                ))}
              </div>
            </div>

            <div className="fb-group">
              <label className="fb-label">Prediction Period</label>
              <div className="fb-chips">
                {periodOpts.map(o => (
                  <button key={o} className={`fb-chip ${filters.period === o ? 'active' : ''}`} onClick={() => update('period', filters.period === o ? '' : o)}>{o}</button>
                ))}
              </div>
            </div>

            <div className="fb-group">
              <label className="fb-label">Status</label>
              <div className="fb-chips">
                {statusOpts.map(o => (
                  <button key={o} className={`fb-chip ${filters.status === o ? 'active' : ''}`} onClick={() => update('status', filters.status === o ? '' : o)}>{o}</button>
                ))}
              </div>
            </div>

            <div className="fb-group">
              <label className="fb-label">Hide</label>
              <div className="fb-chips">
                {hideOpts.map(o => (
                  <button key={o} className={`fb-chip danger ${(filters.hide || []).includes(o) ? 'active' : ''}`} onClick={() => toggleHide(o)}>Hide {o}</button>
                ))}
              </div>
            </div>
          </div>

          {hasFilters && (
            <button className="fb-clear" onClick={clearAll}><X size={14} /> Clear all filters</button>
          )}
        </div>
      )}

      <style>{`
        .fb-wrap { margin-bottom: 1.25rem; }
        .fb-toggle.has-filter { border-color: var(--primary); color: var(--primary-light); }
        .fb-count { background: var(--primary); color: white; width: 18px; height: 18px; border-radius: 50%; font-size: 0.6rem; display: flex; align-items: center; justify-content: center; font-weight: 800; }

        .fb-panel { padding: 1.25rem; border-radius: 16px; margin-top: 0.5rem; }
        .fb-row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .fb-group { flex: 1; min-width: 200px; }
        .fb-label { display: block; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; letter-spacing: 0.04em; }
        .fb-chips { display: flex; gap: 0.35rem; flex-wrap: wrap; }
        .fb-chip {
          padding: 0.35rem 0.75rem; border-radius: 8px; border: 1px solid var(--border);
          background: var(--surface-light); color: var(--text-muted); font-size: 0.75rem;
          font-weight: 700; cursor: pointer; transition: all 0.15s; font-family: var(--font-main);
        }
        .fb-chip:hover { color: var(--text); background: var(--surface-hover); }
        .fb-chip.active { background: var(--primary); border-color: var(--primary); color: white; }
        .fb-chip.danger.active { background: rgba(255,61,0,0.15); border-color: rgba(255,61,0,0.3); color: var(--accent-no); }

        .fb-clear {
          display: flex; align-items: center; gap: 0.4rem; margin-top: 1rem;
          background: none; border: none; color: var(--accent-no); font-size: 0.8rem;
          font-weight: 700; cursor: pointer; font-family: var(--font-main);
        }
      `}</style>
    </div>
  )
}

export default FilterBar
