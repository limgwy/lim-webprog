import { NavLink } from 'react-router-dom';

const links = [
    {label: 'Home', to: '/' },
    {label: 'About', to: '/about' },
    {label: 'Articles', to: '/articles'}
];

const navLinkClassName = ({ isActive }) =>
[
    'rount-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
    ? 'border-zinc-900 bg-zinc-900 text-zinc-50'
    : 'border-transparent text-zinc-500 hover:border-zinc-900 '
]
