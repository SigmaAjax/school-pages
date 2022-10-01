import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

export const SidebarData = [
	{
		title: 'nový_zaměstnanec',
		icon: <BadgeIcon />,
		link: '/zamestnanci',
	},
	{title: 'příspěvky', icon: <PostAddIcon />, link: '/aktuality'},
	{title: 'fotogalerie', icon: <PhotoLibraryIcon />, link: '/galerie'},
	{title: 'dokumenty', icon: <AssignmentIcon />, link: '/dokumenty'},
];
