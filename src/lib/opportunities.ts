export interface Opportunity {
  id: number;
  community: string;
  author: string;
  title: string;
  excerpt: string;
  intent: 'Buying soon' | 'Comparing options' | 'Researching';
  match: number;
  hours: number;
  comments: number;
  votes: number;
  category: string;
  reason: string;
}

export const opportunities: Opportunity[] = [
  { id: 1, community: 'projectmanagement', author: 'dana_builds', title: 'Moving off spreadsheets — best PM tool for a 12-person remote team?', excerpt: 'We’re a small agency juggling client timelines across Google Sheets. Need something lighter than Jira, but with real roadmapping and time tracking. Budget is flexible if it saves us the weekly status chaos.', intent: 'Buying soon', match: 98, hours: 2, comments: 18, votes: 42, category: 'project management software remote teams agency tasks', reason: 'A specific team size, clear pain point, and flexible budget make this a strong opportunity for a lightweight project management product.' },
  { id: 2, community: 'startups', author: 'maya_ships', title: 'Asana vs Monday vs ClickUp — which actually sticks after month two?', excerpt: 'We’ve tried three tools and everyone eventually reverts to email. We just need shared task boards and a simple roadmap. What made the switch finally hold for your team?', intent: 'Comparing options', match: 94, hours: 5, comments: 27, votes: 31, category: 'project management software remote teams tasks startup', reason: 'They’re actively comparing alternatives and value simplicity and team adoption over a long list of features.' },
  { id: 3, community: 'SaaS', author: 'alex_onboard', title: 'Looking for a client portal that doesn’t take a week to set up', excerpt: 'Running a design studio with 8 people. I want clients to see project progress without the daily “any updates?” emails. Has anyone found a simple tool for this?', intent: 'Buying soon', match: 91, hours: 9, comments: 12, votes: 26, category: 'project management software client portal design agency', reason: 'A concrete workflow problem and a request for recommendations suggest an active buying decision.' },
  { id: 4, community: 'Entrepreneur', author: 'leo_makes', title: 'How do you keep track of deliverables when your team is fully remote?', excerpt: 'Our team has grown from 3 to 10 and our Slack channels are getting messy. Curious what other founders use to keep accountability without micromanaging people.', intent: 'Researching', match: 87, hours: 23, comments: 34, votes: 58, category: 'project management software remote teams tasks founder', reason: 'Team growth is creating a new need for structured task ownership, although they haven’t specified a budget yet.' },
  { id: 5, community: 'smallbusiness', author: 'nina_studio', title: 'Any good invoicing tools for a small creative studio?', excerpt: 'I spend too much time chasing invoices and tracking payments. Looking for recurring billing, automatic reminders, and something that looks professional to clients.', intent: 'Buying soon', match: 96, hours: 4, comments: 16, votes: 22, category: 'invoice invoicing billing payments finance software', reason: 'They’ve named three required features and an immediate operational pain point.' },
  { id: 6, community: 'productivity', author: 'sam_writes', title: 'Meeting notes never turn into tasks. Has anyone solved this?', excerpt: 'Our weekly recap is a graveyard. I’d love something that extracts action items and assigns them to the right person, without another giant project management suite.', intent: 'Comparing options', match: 93, hours: 7, comments: 21, votes: 45, category: 'meeting notes ai assistant productivity software tasks', reason: 'The requested action-item extraction is an exact fit for a meeting-notes assistant.' },
];