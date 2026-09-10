import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  Building2,
  Image as ImageIcon,
  Wand2,
  ArrowRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export type AdminSection =
  | 'overview'
  | 'courses'
  | 'posts'
  | 'enrollments'
  | 'departments'
  | 'media'
  | 'content';

const groups: { label: string; items: { key: AdminSection; title: string; icon: any }[] }[] = [
  {
    label: 'داشبورد',
    items: [{ key: 'overview', title: 'نمای کلی', icon: LayoutDashboard }],
  },
  {
    label: 'آموزش',
    items: [
      { key: 'courses', title: 'دوره‌ها', icon: BookOpen },
      { key: 'departments', title: 'دپارتمان‌ها', icon: Building2 },
      { key: 'enrollments', title: 'ثبت‌نام‌ها', icon: Users },
    ],
  },
  {
    label: 'محتوا',
    items: [
      { key: 'posts', title: 'مطالب', icon: FileText },
      { key: 'media', title: 'رسانه', icon: ImageIcon },
      { key: 'content', title: 'متن‌های سایت', icon: Wand2 },
    ],
  },
];

interface Props {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
}

const AdminSidebar = ({ active, onChange }: Props) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleSelect = (key: AdminSection) => {
    onChange(key);
    if (isMobile) setOpenMobile(false);
  };


  return (
    <Sidebar collapsible="icon" side="right">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
            آ
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">پنل مدیریت</p>
            <p className="truncate text-xs text-muted-foreground">
              {user ? `${user.first_name} ${user.last_name}` : 'آرمانیان'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      isActive={active === item.key}
                      tooltip={item.title}
                      onClick={() => handleSelect(item.key)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="بازگشت به سایت" onClick={() => navigate('/')}>
              <ArrowRight className="h-4 w-4" />
              <span>بازگشت به سایت</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="خروج"
              onClick={async () => {
                await signOut();
                navigate('/');
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>خروج از حساب</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
