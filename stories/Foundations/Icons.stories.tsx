import { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  BankIcon,
  BarbellIcon,
  BeerSteinIcon,
  BoatIcon,
  BowlingBallIcon,
  BroadcastIcon,
  BuildingIcon,
  BuildingApartmentIcon,
  CaretLeftIcon,
  CaretLineLeftIcon,
  CaretLineRightIcon,
  CaretRightIcon,
  CellTowerIcon,
  CheckCircleIcon,
  CheckerboardIcon,
  CityIcon,
  DesktopTowerIcon,
  DotsNineIcon,
  EmptyIcon,
  ErrorIcon,
  FilmReelIcon,
  FilmSlateIcon,
  FlagBannerIcon,
  ForkKnifeIcon,
  GraduationCapIcon,
  GuitarIcon,
  HeadsetIcon,
  InfoIcon,
  KeyboardIcon,
  MaskHappyIcon,
  MicrophoneStageIcon,
  MoneyIcon,
  MusicNotesIcon,
  ParkIcon,
  PencilSimpleIcon,
  PersonSimpleSnowboardIcon,
  PlaylistIcon,
  PlugsIcon,
  ProjectorScreenIcon,
  QueueIcon,
  RadioIcon,
  ScanIcon,
  ScreencastIcon,
  ShippingContainerIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  StarIcon,
  StethoscopeIcon,
  TelevisionSimpleIcon,
  TentIcon,
  TowelIcon,
  TramIcon,
  VideoCameraIcon,
  VolleyballIcon,
  WarningIcon,
  WarningOctagonIcon,
} from '@bmi/tonic-icons-web';
import type { IconVariant } from '@bmi/tonic-icons-web';

/* eslint-disable @typescript-eslint/no-explicit-any */
const icons: { name: string; component: React.ComponentType<any> }[] = [
  { name: 'BankIcon', component: BankIcon },
  { name: 'BarbellIcon', component: BarbellIcon },
  { name: 'BeerSteinIcon', component: BeerSteinIcon },
  { name: 'BoatIcon', component: BoatIcon },
  { name: 'BowlingBallIcon', component: BowlingBallIcon },
  { name: 'BroadcastIcon', component: BroadcastIcon },
  { name: 'BuildingIcon', component: BuildingIcon },
  { name: 'BuildingApartmentIcon', component: BuildingApartmentIcon },
  { name: 'CaretLeftIcon', component: CaretLeftIcon },
  { name: 'CaretLineLeftIcon', component: CaretLineLeftIcon },
  { name: 'CaretLineRightIcon', component: CaretLineRightIcon },
  { name: 'CaretRightIcon', component: CaretRightIcon },
  { name: 'BuildingApartmentIcon', component: BuildingApartmentIcon },
  { name: 'CellTowerIcon', component: CellTowerIcon },
  { name: 'CheckCircleIcon', component: CheckCircleIcon },
  { name: 'CheckerboardIcon', component: CheckerboardIcon },
  { name: 'CityIcon', component: CityIcon },
  { name: 'DesktopTowerIcon', component: DesktopTowerIcon },
  { name: 'DotsNineIcon', component: DotsNineIcon },
  { name: 'EmptyIcon', component: EmptyIcon },
  { name: 'ErrorIcon', component: ErrorIcon },
  { name: 'FilmReelIcon', component: FilmReelIcon },
  { name: 'FilmSlateIcon', component: FilmSlateIcon },
  { name: 'FlagBannerIcon', component: FlagBannerIcon },
  { name: 'ForkKnifeIcon', component: ForkKnifeIcon },
  { name: 'GraduationCapIcon', component: GraduationCapIcon },
  { name: 'GuitarIcon', component: GuitarIcon },
  { name: 'HeadsetIcon', component: HeadsetIcon },
  { name: 'InfoIcon', component: InfoIcon },
  { name: 'KeyboardIcon', component: KeyboardIcon },
  { name: 'MaskHappyIcon', component: MaskHappyIcon },
  { name: 'MicrophoneStageIcon', component: MicrophoneStageIcon },
  { name: 'MoneyIcon', component: MoneyIcon },
  { name: 'MusicNotesIcon', component: MusicNotesIcon },
  { name: 'ParkIcon', component: ParkIcon },
  { name: 'PencilSimpleIcon', component: PencilSimpleIcon },
  { name: 'PersonSimpleSnowboardIcon', component: PersonSimpleSnowboardIcon },
  { name: 'PlaylistIcon', component: PlaylistIcon },
  { name: 'PlugsIcon', component: PlugsIcon },
  { name: 'ProjectorScreenIcon', component: ProjectorScreenIcon },
  { name: 'QueueIcon', component: QueueIcon },
  { name: 'RadioIcon', component: RadioIcon },
  { name: 'ScanIcon', component: ScanIcon },
  { name: 'ScreencastIcon', component: ScreencastIcon },
  { name: 'ShippingContainerIcon', component: ShippingContainerIcon },
  { name: 'ShieldCheckIcon', component: ShieldCheckIcon },
  { name: 'ShoppingBagIcon', component: ShoppingBagIcon },
  { name: 'StarIcon', component: StarIcon },
  { name: 'StethoscopeIcon', component: StethoscopeIcon },
  { name: 'TelevisionSimpleIcon', component: TelevisionSimpleIcon },
  { name: 'TentIcon', component: TentIcon },
  { name: 'TowelIcon', component: TowelIcon },
  { name: 'TramIcon', component: TramIcon },
  { name: 'VideoCameraIcon', component: VideoCameraIcon },
  { name: 'VolleyballIcon', component: VolleyballIcon },
  { name: 'WarningIcon', component: WarningIcon },
  { name: 'WarningOctagonIcon', component: WarningOctagonIcon },
];
/* eslint-enable @typescript-eslint/no-explicit-any */

const variantOptions: IconVariant[] = ['outlined', 'filled', 'contained'];

const Gallery = () => {
  const [search, setSearch] = useState('');
  const [variant, setVariant] = useState<IconVariant>('outlined');

  const filtered = useMemo(
    () => icons.filter((i) => i.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const navigateToIcon = (name: string) => {
    const id = name.toLowerCase();
    const base = window.top?.location.href.split('?')[0] ?? '';
    window.top!.location.href = `${base}?path=/docs/icons-${id}--docs`;
  };

  return (
    <Box>
      {/* Toolbar: search + variant toggle */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
          py: 1.5,
        }}
      >
        <Box
          component="input"
          placeholder="Search icons…"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          sx={{
            flex: 1,
            maxWidth: 360,
            px: 1.5,
            py: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            fontSize: 14,
            outline: 'none',
            bgcolor: 'background.paper',
            color: 'text.primary',
            '&:focus': { borderColor: 'primary.main' },
          }}
        />
        <Box sx={{ display: 'flex', borderRadius: 1, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          {variantOptions.map((v) => (
            <Box
              key={v}
              component="button"
              onClick={() => setVariant(v)}
              sx={{
                px: 2,
                py: 0.75,
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
                bgcolor: variant === v ? 'primary.main' : 'background.paper',
                color: variant === v ? 'primary.contrastText' : 'text.secondary',
                '&:hover': { bgcolor: variant === v ? 'primary.dark' : 'action.hover' },
              }}
            >
              {v}
            </Box>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {filtered.length} icon{filtered.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Icon grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: 1,
        }}
      >
        {filtered.map(({ name, component: Icon }) => (
          <Box
            key={name}
            onClick={() => navigateToIcon(name)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              p: 2,
              borderRadius: 1,
              cursor: 'pointer',
              color: 'text.primary',
              '&:hover': { bgcolor: 'action.hover' },
              transition: 'background-color 0.15s',
            }}
          >
            <Icon size="large" variant={variant} />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: 'center', wordBreak: 'break-word', lineHeight: 1.3 }}
            >
              {name.replace(/Icon$/, '')}
            </Typography>
          </Box>
        ))}
      </Box>

      {filtered.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 6 }}>
          No icons match &ldquo;{search}&rdquo;
        </Typography>
      )}
    </Box>
  );
};

const meta: Meta = {
  title: 'Assets/Icons',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Searchable icon gallery. Toggle between outlined and filled variants. Click an icon to view its full documentation. */
export const AllIcons: Story = {
  render: () => <Gallery />,
};
