import { FaCog } from 'react-icons/fa';
import { IoMdArrowRoundUp } from 'react-icons/io';
import { AiFillFire, AiFillMessage } from 'react-icons/ai';
import { MdFeedback, MdNightlightRound } from 'react-icons/md';
import { BsSearch, BsEyeFill, BsPeopleFill, BsBookmarkFill, BsTerminalFill } from 'react-icons/bs';

export const sidebarData = [
  {
    name: 'Discover',
    items: [
      {
        title: 'Popular',
        icon: AiFillFire,
      },
      {
        title: 'Most Upvoted',
        icon: IoMdArrowRoundUp,
      },
      {
        title: 'Best Discussions',
        icon: AiFillMessage,
      },
      {
        title: 'Search',
        icon: BsSearch,
      },
    ],
  },
  {
    name: 'Manage',
    items: [
      {
        title: 'Bookmarks',
        icon: BsBookmarkFill,
      },
      {
        title: 'Reading history',
        icon: BsEyeFill,
      },
      {
        title: 'Focus Mode',
        icon: MdNightlightRound,
      },
      {
        title: 'Customize',
        icon: FaCog,
      },
    ],
  },
];

export const sidebarFooterData = [
  {
    name: '',
    items: [
      {
        title: 'Docs',
        icon: BsBookmarkFill,
      },
      {
        title: 'Changelog',
        icon: BsTerminalFill,
      },
      {
        title: 'Feedback',
        icon: MdFeedback,
      },
      {
        title: 'Invite people',
        icon: BsPeopleFill,
      },
    ],
  },
];
