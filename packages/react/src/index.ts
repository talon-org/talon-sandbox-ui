// Talon Sandbox UI · public surface (v0.3 atomic catalog).
//
// Categories mirror components.html sections:
//   Action / Form / Data / Navigation / Feedback / Surfaces / Overlays / Layout
//
// v0.3: PageHeader / FilterBar / LoginLayout / ResRow / FormSection /
// FormGrid 已按新原型重新实现，重新加入公开导出。StatCard / TerminalChrome /
// SandboxStateBar / TweaksPanel / RecordingPlayer / MemberRow / CmdKOverlay /
// FormItem / Table 仍未恢复（纯业务壳，由 app 自行组合）。

// ── Action ──────────────────────────────────────────────────────────
export { Button, buttonVariants } from './components/Button/index.js';
export type { ButtonProps, ButtonIcon } from './components/Button/index.js';

// ── Form fields ─────────────────────────────────────────────────────
export { Label } from './components/Label/index.js';
export type { LabelProps } from './components/Label/index.js';

export {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './components/FormField/index.js';
export type { FormFieldProps, FormLabelProps } from './components/FormField/index.js';

export { FormSection, FormGrid } from './components/FormSection/index.js';
export type { FormSectionProps, FormGridProps } from './components/FormSection/index.js';

export { useFormField } from './primitives/FormFieldContext.js';
export type { FormFieldContextValue } from './primitives/FormFieldContext.js';

export { Input, inputVariants } from './components/Input/index.js';
export type { InputProps } from './components/Input/index.js';

export { InputGroup, InputGroupField, InputAddon, inputGroupVariants } from './components/InputGroup/index.js';
export type { InputGroupProps, InputGroupFieldProps, InputAddonProps, InputGroupSize } from './components/InputGroup/index.js';

export { Search, searchVariants } from './components/Search/index.js';
export type { SearchProps, SearchSize } from './components/Search/index.js';

export { Textarea, textareaVariants } from './components/Textarea/index.js';
export type { TextareaProps } from './components/Textarea/index.js';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  selectTriggerVariants,
} from './components/Select/index.js';
export type {
  SelectTriggerProps,
  SelectContentProps,
  SelectLabelProps,
  SelectItemProps,
  SelectSeparatorProps,
} from './components/Select/index.js';

export {
  NumberInput,
  NumberInputField,
  NumberInputAddon,
  NumberInputStepper,
  numberInputVariants,
  numberInputStepperVariants,
} from './components/NumberInput/index.js';
export type {
  NumberInputProps,
  NumberInputAddonProps,
  NumberInputStepperProps,
} from './components/NumberInput/index.js';

export { Checkbox, CheckboxField, checkboxVariants } from './components/Checkbox/index.js';
export type { CheckboxProps, CheckboxFieldProps } from './components/Checkbox/index.js';

export { RadioGroup, RadioGroupItem, radioGroupItemVariants } from './components/Radio/index.js';
export type { RadioGroupItemProps } from './components/Radio/index.js';

export { Switch, SwitchField, switchVariants } from './components/Switch/index.js';
export type { SwitchProps, SwitchFieldProps } from './components/Switch/index.js';

export { Slider, SliderTrack, SliderRange, SliderThumb, sliderVariants } from './components/Slider/index.js';
export type { SliderProps } from './components/Slider/index.js';

export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
  ComboboxGroup,
  ComboboxEmpty,
  comboboxVariants,
} from './components/Combobox/index.js';
export type {
  ComboboxProps,
  ComboboxTriggerProps,
  ComboboxContentProps,
  ComboboxItemProps,
  ComboboxGroupProps,
  ComboboxEmptyProps,
} from './components/Combobox/index.js';

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectEmpty,
  multiSelectVariants,
} from './components/MultiSelect/index.js';
export type {
  MultiSelectProps,
  MultiSelectTriggerProps,
  MultiSelectContentProps,
  MultiSelectItemProps,
  MultiSelectEmptyProps,
} from './components/MultiSelect/index.js';

export { TagInput, tagInputVariants } from './components/TagInput/index.js';
export type { TagInputProps, TagInputSize } from './components/TagInput/index.js';

export { FileUpload, FileUploadTrigger, FileUploadTitle, FileUploadMeta, fileUploadVariants } from './components/FileUpload/index.js';
export type { FileUploadProps, FileUploadTriggerProps, FileUploadTitleProps, FileUploadMetaProps, FileUploadSize } from './components/FileUpload/index.js';

export { Calendar, calendarVariants } from './components/Calendar/index.js';
export type { CalendarProps } from './components/Calendar/index.js';

export { DateRangePicker, dateRangePickerVariants } from './components/DateRangePicker/index.js';
export type { DateRangePickerProps, DateRangePreset } from './components/DateRangePicker/index.js';

// ── Data display ────────────────────────────────────────────────────
export { Badge, StatusBadge, badgeVariants } from './components/Badge/index.js';
export type { BadgeProps, BadgeVariant, BadgeSize, StatusBadgeProps, SandboxState } from './components/Badge/index.js';

export { Tag, tagVariants } from './components/Tag/index.js';
export type { TagProps, TagSize } from './components/Tag/index.js';

export { FilterChip } from './components/FilterChip/index.js';
export type { FilterChipProps } from './components/FilterChip/index.js';

export { FilterBar } from './components/FilterBar/index.js';
export type { FilterBarProps, FilterBarGroup, FilterBarItem, FilterBarSearch } from './components/FilterBar/index.js';

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
  AvatarGroup,
  avatarVariants,
  avatarStatusVariants,
} from './components/Avatar/index.js';
export type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarStatusProps,
  AvatarGroupProps,
  AvatarSize,
  AvatarStatusKind,
} from './components/Avatar/index.js';

export { Kbd, Shortcut } from './components/Kbd/index.js';
export type { KbdProps, KbdSize, ShortcutProps } from './components/Kbd/index.js';

export { Tree } from './components/Tree/index.js';
export type { TreeProps, TreeNode } from './components/Tree/index.js';

export { Stat, StatLabel, StatValue, StatDelta, StatHint, statVariants, statDeltaVariants } from './components/Stat/index.js';
export type { StatProps, StatLabelProps, StatValueProps, StatDeltaProps, StatHintProps, StatDeltaKind, StatSize } from './components/Stat/index.js';

export { Sparkline } from './components/Sparkline/index.js';
export type { SparklineProps } from './components/Sparkline/index.js';

export { ResRow } from './components/ResRow/index.js';
export type { ResRowProps } from './components/ResRow/index.js';

export { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTitle, TimelineTime, TimelineDesc, timelineItemVariants } from './components/Timeline/index.js';
export type { TimelineProps, TimelineItemProps, TimelineDotProps, TimelineContentProps, TimelineTitleProps, TimelineTimeProps, TimelineDescProps, TimelineItemKind } from './components/Timeline/index.js';

// ── Navigation ──────────────────────────────────────────────────────
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsCount,
  tabsListVariants,
} from './components/Tabs/index.js';
export type { TabsProps } from './components/Tabs/index.js';

export { SegmentedGroup, SegmentedItem, segmentedVariants } from './components/Segmented/index.js';
export type { SegmentedGroupProps, SegmentedItemProps, SegmentedOption, SegmentedSize } from './components/Segmented/index.js';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
} from './components/Breadcrumb/index.js';
export type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
} from './components/Breadcrumb/index.js';

export { TablePagination, TablePaginationInfo } from './components/TablePagination/index.js';
export type { TablePaginationProps, TablePaginationInfoProps } from './components/TablePagination/index.js';

export { Stepper, StepperStep, StepperStepLabel, StepperStepDesc, stepperVariants } from './components/Stepper/index.js';
export type { StepperProps, StepperStepProps, StepperStepLabelProps, StepperStepDescProps, StepperSize } from './components/Stepper/index.js';

export { NavMenu, NavSection, NavItem } from './components/NavMenu/index.js';
export type { NavMenuProps, NavSectionProps, NavItemProps } from './components/NavMenu/index.js';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
} from './components/Menubar/index.js';
export type {
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarSeparatorProps,
  MenubarShortcutProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarCheckboxItemProps,
  MenubarRadioItemProps,
} from './components/Menubar/index.js';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  contextMenuItemVariants,
} from './components/ContextMenu/index.js';
export type {
  ContextMenuCheckboxItemProps,
  ContextMenuRadioItemProps,
} from './components/ContextMenu/index.js';

export type { DropdownItem } from './primitives/dropdown.js';

// ── Feedback ────────────────────────────────────────────────────────
export { ProgressBar, progressBarVariants } from './components/ProgressBar/index.js';
export type { ProgressBarProps } from './components/ProgressBar/index.js';

export { Skeleton, skeletonVariants } from './components/Skeleton/index.js';
export type { SkeletonProps } from './components/Skeleton/index.js';

export { Spinner, spinnerVariants } from './components/Spinner/index.js';
export type { SpinnerProps } from './components/Spinner/index.js';

export {
  Banner,
  BannerIcon,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerActions,
  BannerDismiss,
  bannerVariants,
} from './components/Banner/index.js';
export type {
  BannerProps,
  BannerIconProps,
  BannerContentProps,
  BannerTitleProps,
  BannerDescriptionProps,
  BannerActionsProps,
  BannerDismissProps,
  BannerVariant,
  BannerKind,
  BannerSize,
} from './components/Banner/index.js';

export { Alert, AlertTitle, AlertIcon, AlertDescription, alertVariants } from './components/Alert/index.js';
export type { AlertProps, AlertTitleProps, AlertIconProps, AlertDescriptionProps, AlertVariant, AlertKind, AlertSize } from './components/Alert/index.js';

export { EmptyState, EmptyStateIcon, EmptyStateEyebrow, EmptyStateHeading, EmptyStateDescription, EmptyStateActions, emptyStateVariants } from './components/EmptyState/index.js';
export type { EmptyStateProps, EmptyStateIconProps, EmptyStateEyebrowProps, EmptyStateHeadingProps, EmptyStateDescriptionProps, EmptyStateActionsProps, EmptyStateSize } from './components/EmptyState/index.js';

// ── Surfaces ────────────────────────────────────────────────────────
export {
  DataTable,
  DataTableToolbar,
  DataTableFilters,
  DataTableBulkActions,
  DataTableContent,
  DataTableFooter,
  DataTableViewOptions,
} from './components/DataTable/index.js';
export type {
  DataTableProps,
  DataTableToolbarProps,
  DataTableFiltersProps,
  DataTableBulkActionsProps,
  DataTableContentProps,
  DataTableFooterProps,
  DataTableViewOptionsProps,
  ColumnDef,
  SortState,
} from './components/DataTable/index.js';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  Panel,
} from './components/Card/index.js';
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
} from './components/Card/index.js';

export { KV, kvVariants } from './components/KV/index.js';
export type { KVProps, KVRow } from './components/KV/index.js';

export { Divider } from './components/Divider/index.js';
export type { DividerProps } from './components/Divider/index.js';

export { CodeBlock, codeBlockVariants } from './components/CodeBlock/index.js';
export type { CodeBlockProps } from './components/CodeBlock/index.js';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionSubtitle,
} from './components/Accordion/index.js';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './components/Accordion/index.js';

export { List, ListItem, ListItemIcon, ListItemContent, ListItemPrimary, ListItemSecondary, ListItemMeta, ListItemAction, listVariants } from './components/List/index.js';
export type { ListProps, ListItemProps, ListItemIconProps, ListItemContentProps, ListItemPrimaryProps, ListItemSecondaryProps, ListItemMetaProps, ListItemActionProps } from './components/List/index.js';

export { Splitter, splitterVariants } from './components/Splitter/index.js';
export type { SplitterProps } from './components/Splitter/index.js';

// ── Layout ──────────────────────────────────────────────────────────
export { Flex, flexVariants } from './components/Flex/index.js';
export type { FlexProps, FlexGap } from './components/Flex/index.js';

export { Grid, gridVariants } from './components/Grid/index.js';
export type { GridProps, GridGap } from './components/Grid/index.js';

export { PageHeader } from './components/PageHeader/index.js';
export type { PageHeaderProps } from './components/PageHeader/index.js';

export {
  LoginLayout,
  LoginLayoutBrand,
  LoginLayoutBrandHead,
  LoginLayoutBrandWordmark,
  LoginLayoutBrandPill,
  LoginLayoutBrandFoot,
  LoginLayoutForm,
} from './components/LoginLayout/index.js';
export type {
  LoginLayoutProps,
  LoginLayoutBrandProps,
  LoginLayoutBrandHeadProps,
  LoginLayoutBrandWordmarkProps,
  LoginLayoutBrandPillProps,
  LoginLayoutBrandFootProps,
  LoginLayoutFormProps,
} from './components/LoginLayout/index.js';

// ── Overlays ────────────────────────────────────────────────────────
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  dialogContentVariants,
} from './components/Dialog/index.js';
export type {
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
} from './components/Dialog/index.js';


export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  drawerContentVariants,
} from './components/Drawer/index.js';
export type {
  DrawerOverlayProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerFooterProps,
} from './components/Drawer/index.js';

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipKbd,
  tooltipContentVariants,
} from './components/Tooltip/index.js';
export type {
  TooltipContentProps,
  TooltipKbdProps,
} from './components/Tooltip/index.js';

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
  popoverContentVariants,
} from './components/Popover/index.js';
export type { PopoverContentProps } from './components/Popover/index.js';

export { toast, Toaster, /** @deprecated 用 Toaster 替代，下一个 major 版本删除 */ ToastViewport } from './components/Toast/index.js';
export type { ToastItem, ToastKind } from './components/Toast/index.js';

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  alertDialogContentVariants,
} from './components/AlertDialog/index.js';
export type {
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from './components/AlertDialog/index.js';

export {
  Command,
  CommandDialog,
  CommandPalette,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './components/CommandPalette/index.js';
export type {
  CommandProps,
  CommandDialogProps,
  CommandPaletteProps,
  CommandInputProps,
  CommandListProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
  CommandShortcutProps,
  CommandEmptyProps,
} from './components/CommandPalette/index.js';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  dropdownMenuItemVariants,
} from './components/DropdownMenu/index.js';
export type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
} from './components/DropdownMenu/index.js';
