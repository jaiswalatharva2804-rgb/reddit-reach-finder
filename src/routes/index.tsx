import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from 'react';
import { ArrowUpRight, ArrowUp, Bookmark, Check, ChevronDown, Compass, MessageCircle, Search, SlidersHorizontal, X, Loader2, ArrowRight, Radio, CircleHelp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { opportunities, type Opportunity } from '@/lib/opportunities';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Discover opportunities — ThreadScout' },
    { name: 'description', content: 'Find relevant Reddit conversations, review buyer intent, and shortlist potential customers for your product.' },
    { property: 'og:title', content: 'Discover opportunities — ThreadScout' },
    { property: 'og:description', content: 'Find relevant Reddit conversations and shortlist potential customers for your product.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState('Project management software for remote teams');
  const [searched, setSearched] = useState(query);
  const [saved, setSaved] = useState<number[]>([]);
  const [view, setView] = useState<'discover' | 'saved'>('discover');
  const [intent, setIntent] = useState('All intent');
  const [community, setCommunity] = useState('All communities');
  const [time, setTime] = useState('Last 30 days');
  const [sort, setSort] = useState('Best match');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [help, setHelp] = useState(false);
  const matches = useMemo(() => {
    const words = searched.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !['software', 'built', 'with', 'that', 'tool', 'tools', 'people'].includes(w));
    return opportunities.filter(p => (view === 'saved' ? saved.includes(p.id) : words.length === 0 || words.some(w => `${p.title} ${p.category}`.toLowerCase().includes(w))) && (intent === 'All intent' || p.intent === intent) && (community === 'All communities' || p.community === community) && (time !== 'Last 6 hours' || p.hours <= 6)).sort((a, b) => sort === 'Newest first' ? a.hours - b.hours : sort === 'Most discussed' ? b.comments - a.comments : b.match - a.match);
  }, [searched, saved, view, intent, community, time, sort]);
  function toggleSave(id: number) { setSaved(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]); }
  function runSearch(value = query) { if (!value.trim()) return; setQuery(value); setLoading(true); setView('discover'); window.setTimeout(() => { setSearched(value); setLoading(false); }, 650); }
  const savedPosts = opportunities.filter(p => saved.includes(p.id));
  return <div className="workspace">
    <header className="topbar">
      <a href="/" className="brand"><span className="brand-mark"><Radio size={22} /></span><span>thread<span className="brand-end">scout</span><sup>BETA</sup></span></a>
      <nav aria-label="Main navigation" className="main-nav"><Button variant="ghost" className={view === 'discover' ? 'nav-item active' : 'nav-item'} onClick={() => setView('discover')}><Compass />Discover</Button><Button variant="ghost" className={view === 'saved' ? 'nav-item active' : 'nav-item'} onClick={() => setView('saved')}><Bookmark />Saved<span className="nav-count">{saved.length}</span></Button></nav>
      <div className="header-right"><span className="demo-label"><span />Demo workspace</span><Button variant="ghost" size="icon" title="About this demo" aria-label="About this demo" onClick={() => setHelp(true)}><CircleHelp /></Button><span className="avatar">AJ</span></div>
    </header>
    <main className="page-content">
      <section className="search-section">
        <div className="eyebrow"><span className="tiny-reddit">r/</span>CONVERSATIONS INTO CUSTOMERS</div>
        <h1>Find your next customer.<br /><span>They’re already asking.</span></h1>
        <p className="subtitle">Discover people on Reddit looking for a product like yours.</p>
        <form className="search-form" onSubmit={e => { e.preventDefault(); runSearch(); }}><Search className="search-icon" size={21}/><input aria-label="Describe your product" value={query} onChange={e => setQuery(e.target.value)} placeholder="What does your product do?" required /><Button type="submit" disabled={loading || !query.trim()} size="lg">{loading ? <Loader2 className="spin" /> : <Search />}<span>{loading ? 'Searching' : 'Find opportunities'}</span><ArrowRight /></Button></form>
        <div className="suggestions"><span>Try a search</span>{['Project management', 'AI meeting notes', 'Invoicing software'].map(text => <Button key={text} variant="ghost" size="sm" onClick={() => runSearch(text)}>{text}<ArrowUpRight /></Button>)}</div>
      </section>
      <section className="results-section">
        <div className="results-heading"><div><h2>{view === 'saved' ? 'Saved opportunities' : 'Your opportunities'}<span className="result-count">{matches.length}</span></h2><p>{view === 'saved' ? 'Your shortlist of promising conversations.' : 'Relevant conversations, ranked by how well they fit.'}</p></div><span className="example-label">EXAMPLE RESULTS</span></div>
        <div className="filters"><SlidersHorizontal size={16}/><label><select aria-label="Community" value={community} onChange={e => setCommunity(e.target.value)}><option>All communities</option>{[...new Set(opportunities.map(p => p.community))].map(c => <option value={c} key={c}>r/{c}</option>)}</select><ChevronDown size={13}/></label><label><select aria-label="Buyer intent" value={intent} onChange={e => setIntent(e.target.value)}>{['All intent', 'Buying soon', 'Comparing options', 'Researching'].map(c => <option key={c}>{c}</option>)}</select><ChevronDown size={13}/></label><label><select aria-label="Posted within" value={time} onChange={e => setTime(e.target.value)}><option>Last 30 days</option><option>Last 6 hours</option></select><ChevronDown size={13}/></label><label className="sort-label"><span>Sort by:</span><select aria-label="Sort results" value={sort} onChange={e => setSort(e.target.value)}><option>Best match</option><option>Newest first</option><option>Most discussed</option></select><ChevronDown size={13}/></label></div>
        <div className="results-layout"><div className="post-list" aria-live="polite" aria-busy={loading}>
          {loading ? <div className="empty-state"><Loader2 className="spin"/><h3>Finding example opportunities…</h3></div> : matches.length === 0 ? <div className="empty-state"><Search size={28}/><h3>{view === 'saved' ? 'No saved opportunities yet' : 'No matching example posts'}</h3><p>{view === 'saved' ? 'Save a conversation to keep it here.' : 'Try project management, invoicing, or meeting notes.'}</p><Button variant="outline" onClick={() => {setIntent('All intent');setCommunity('All communities');setTime('Last 30 days');setView('discover');}}>Reset filters</Button></div> : matches.map(post => <article className="post-card" key={post.id}>
            <div className="post-top"><div className="post-meta"><span className="community-icon">r/</span><strong>r/{post.community}</strong><span className="meta-dot">·</span><span>{post.hours < 24 ? `${post.hours}h` : '1d'} ago</span></div><span className="match-badge"><span />{post.match}% match</span></div>
            <h3><Button variant="link" onClick={() => setSelected(post)}>{post.title}</Button></h3><p className="post-excerpt">{post.excerpt}</p>
            <div className="post-tags"><span className={`intent-badge ${post.intent === 'Buying soon' ? 'buying' : post.intent === 'Comparing options' ? 'comparing' : 'researching'}`}><span />{post.intent}</span><span className="post-author">u/{post.author}</span></div>
            <div className="post-footer"><div className="post-stats"><span><ArrowUp size={15}/>{post.votes}</span><span><MessageCircle size={15}/>{post.comments} comments</span></div><div className="post-actions"><Button variant="ghost" size="icon" aria-label={`${saved.includes(post.id) ? 'Unsave' : 'Save'} ${post.title}`} title={saved.includes(post.id) ? 'Remove from saved' : 'Save opportunity'} onClick={() => toggleSave(post.id)} className={saved.includes(post.id) ? 'saved-control' : ''}>{saved.includes(post.id) ? <Check /> : <Bookmark />}</Button><Button variant="outline" size="sm" onClick={() => setSelected(post)}>View conversation<ArrowUpRight /></Button></div></div>
          </article>)}
        </div><aside className="results-aside"><div className="aside-heading"><Bookmark size={17}/><h3>Your shortlist</h3><span>{saved.length}</span></div>{savedPosts.length ? savedPosts.map(p => <div className="saved-row" key={p.id}><span>r/{p.community}</span><Button variant="link" onClick={() => setSelected(p)}>{p.title}</Button></div>) : <div className="shortlist-empty"><span className="empty-bookmark"><Bookmark size={23}/></span><h4>A good lead is worth saving.</h4><p>Your saved conversations will appear here.</p></div>}<div className="aside-divider"/><div className="intent-guide"><h3>Spot the right signals</h3><div><span className="signal-dot buying"/><p><strong>Buying soon</strong><span>A clear need. Ready for a solution.</span></p></div><div><span className="signal-dot comparing"/><p><strong>Comparing options</strong><span>Exploring tools and alternatives.</span></p></div><div><span className="signal-dot researching"/><p><strong>Researching</strong><span>Starting to understand the problem.</span></p></div></div><div className="reddit-note"><span className="tiny-reddit">r/</span><div><strong>Good conversations come first.</strong><p>Be helpful, stay relevant, and respect each community’s rules.</p></div></div></aside></div>
      </section><footer className="page-footer"><span><Radio size={14}/> Built for meaningful connections.</span><span>Sample posts · No live Reddit connection</span></footer>
    </main>
    <Dialog open={selected !== null} onOpenChange={open => {if (!open) setSelected(null);}}><DialogContent className="conversation-dialog">{selected && <><span className="dialog-community">r/{selected.community} · Example conversation</span><DialogTitle>{selected.title}</DialogTitle><DialogDescription>u/{selected.author} · {selected.hours} hours ago</DialogDescription><p className="dialog-excerpt">{selected.excerpt}</p><div className="match-reason"><h4>Why this is a match</h4><p>{selected.reason}</p></div><div className="dialog-actions"><Button variant="outline" onClick={() => toggleSave(selected.id)}><Bookmark/>{saved.includes(selected.id) ? 'Remove from saved' : 'Save opportunity'}</Button><Button asChild><a href={`https://www.reddit.com/r/${selected.community}/search/?q=${encodeURIComponent(selected.title)}&restrict_sr=1`} target="_blank" rel="noopener noreferrer">Search Reddit<ArrowUpRight/></a></Button></div><p className="demo-disclaimer">This is an example post. The link searches the community, not an actual post.</p></>}</DialogContent></Dialog>
    <Dialog open={help} onOpenChange={setHelp}><DialogContent><DialogTitle>About this workspace</DialogTitle><DialogDescription>This is a UI-only demo with fictional Reddit posts. Search and filters work on the sample collection. Saved opportunities last while this page is open. Live Reddit search and AI matching aren’t connected.</DialogDescription></DialogContent></Dialog>
  </div>;
}
