import { useAuth } from "@/hooks/useAuth.js";
import { useNavigate, Link } from "react-router-dom";
import {useEffect, useState} from "react";
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  X, 
  Briefcase,
  Home as HomeIcon
} from "lucide-react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {notificationAPI} from "@/api/notificationAPI.js";
import { useLocation } from "react-router-dom"

export function NavBar({ className, ...props }) {
  const { user, isLoading } = useAuth();
  let location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({});
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(location.pathname == "/")
  }, [location]);

  const getUserInitials = () => {
    if (!user) return "?";
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user.email ? user.email[0].toUpperCase() : "?";
  };

  let menu = [
    { title: "Home", url: "/" },
    { title: "Dashboard", url: "/dashboard" }
    ];

  useEffect(() => {
    const init = async () => {
      try {
        const notData = await notificationAPI.getNotifications();
        setNotifications(notData);
      } catch {
        //
      }
    }
    init().then()
  }, []);

  return hide ? (<></>) : (
    <section className={cn(className, 'py-4')} {...props}>
      <div className="container mx-auto px-4">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/icon.png" alt="icon" className="max-h-8"/>
              <span className="text-lg font-semibold tracking-tighter">InternRealm</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList href="/">
                  {menu.map((item) => {
                    if (item.items)
                      {
                        return (
                          <NavigationMenuItem key={item.title}>
                            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-popover text-popover-foreground">
                              {
                                item.items.map((subitem) => (
                                  <NavigationMenuLink asChild key={subitem.title} className="w-80">
                                    <Link to={subitem.url} className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground">
                                      <div className="text-foreground">{subitem.icon}</div>
                                      <div>
                                        <div className="text-sm font-semibold">{subitem.title}</div>
                                        {subitem.description && (
                                          <p className="text-sm leading-snug text-muted-foreground">{subitem.description}</p>
                                        )}
                                      </div>
                                    </Link>
                                  </NavigationMenuLink>
                                ))
                              }
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        );
                      }
                    return (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuLink href={item.url} className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">{item.title}</NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-2">
            {notifications.success && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative mr-2">
                    <Bell className="h-5 w-5" />
                    {notifications.unread_count !== 0 && (<span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"/>)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.unread_count == 0 && (<div className="py-2 px-4 text-sm text-gray-500">
                    No new notifications
                  </div>)}
                  {notifications.notifications.map((notification) => (<DropdownMenuItem></DropdownMenuItem>))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!isLoading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.email} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.first_name
                      ? `${user.first_name} ${user.last_name}`
                      : user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/logout")}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </section>
  )


}

export function _NavBar({ className, ...props }) {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserInitials = () => {
    if (!user) return "?";
    if (user.first_name && user.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user.email ? user.email[0].toUpperCase() : "?";
  };

  return (
    <nav
      className={cn(
        "bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center space-x-3">
          <Briefcase className="h-8 w-8 text-indigo-600" />

          <span className="self-center text-xl font-semibold whitespace-nowrap">
            InternRealm
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm  text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div
          className={cn(
            "hidden w-full md:flex md:w-auto md:order-1",
            isMenuOpen && "block"
          )}
        >
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link
                to="/"
                className="flex items-center py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0"
              >
                <HomeIcon className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/internships"
                className="flex items-center py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-indigo-600 md:p-0"
              >
                <Briefcase className="w-4 h-4 mr-1" />
                Internships
              </Link>
            </li>
          </ul>
        </div>

        {/* Search, notifications, and user dropdown */}
        <div className="flex items-center md:order-2">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex md:mr-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <Input
                type="search"
                className="pl-10 pr-3 py-2 w-full md:w-60 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search internships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative mr-2">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-2 px-4 text-sm text-gray-500">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User dropdown */}
          {!isLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.email} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.first_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-gray-800 hover:bg-gray-100"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full">
            <ul className="flex flex-col mt-4 font-medium">
              <li>
                <Link
                  to="/"
                  className="flex items-center py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={toggleMenu}
                >
                  <HomeIcon className="w-4 h-4 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/internships"
                  className="flex items-center py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={toggleMenu}
                >
                  <Briefcase className="w-4 h-4 mr-1" />
                  Internships
                </Link>
              </li>
              <li className="mt-3">
                <form onSubmit={handleSearch} className="flex">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="w-4 h-4 text-gray-500" />
                    </div>
                    <Input
                      type="search"
                      className="pl-10 pr-3 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Search internships..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
