import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    Bell,
    Calendar,
    CreditCard,
    FileText,
    Home,
    Menu,
    Moon,
    Search,
    Sun,
    User,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import PDashboard from "./Dashboard";
import AppointmentsPage from "./Appointments";
import MyProfilePage from "./Profile";

export default function PatientDashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [activeComponent, setActiveComponent] = useState("dashboard");

    const components = {
        dashboard: <PDashboard />,
        appointments: <AppointmentsPage />,
        profile: <MyProfilePage />
        // records: <MedicalRecordsPage />,
        // payments: <PaymentsPage />
    };

    return (
        <div
            className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${
                darkMode ? "dark" : ""
            }`}
        >
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Patient"
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">
                                John Doe
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="lg:hidden"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <ul className="space-y-2">
                        <li>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${
                                    activeComponent === "dashboard"
                                        ? "bg-blue-500 text-white"
                                        : ""
                                }`}
                                onClick={() => setActiveComponent("dashboard")}
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${
                                    activeComponent === "profile" ? "bg-blue-500 text-white" : ""
                                }`}
                                onClick={() => setActiveComponent("profile")}
                            >
                                <User className="mr-2 h-4 w-4" />
                                My Profile
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${
                                    activeComponent === "appointments"
                                        ? "bg-blue-500 text-white"
                                        : ""
                                }`}
                                onClick={() =>
                                    setActiveComponent("appointments")
                                }
                            >
                                <Calendar className="mr-2 h-4 w-4" />
                                Appointments
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Medical Records
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Payments
                            </Button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    sidebarOpen ? "lg:ml-64" : ""
                }`}
            >
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow-md mb-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                onClick={toggleSidebar}
                                className="mr-4"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Patient Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleDarkMode}
                                        >
                                            {darkMode ? (
                                                <Sun className="h-5 w-5" />
                                            ) : (
                                                <Moon className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>
                                            {darkMode
                                                ? "Switch to Light Mode"
                                                : "Switch to Dark Mode"}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <DropdownMenuLabel>
                                        Notifications
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <span>New appointment scheduled</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Test results available</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>
                                            Prescription refill reminder
                                        </span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav
                        className="text-gray-500 dark:text-gray-400 mb-4"
                        aria-label="Breadcrumb"
                    >
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <a
                                    href="#"
                                    className="hover:text-gray-800 dark:hover:text-white"
                                >
                                    Home
                                </a>
                                <ChevronRight className="h-4 w-4 mx-2" />
                            </li>
                            <li className="flex items-center">
                                <a
                                    href="#"
                                    className="hover:text-gray-800 dark:hover:text-white"
                                >
                                    Dashboard
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Search */}
                    {/* <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search across all sections..."
                                className="pl-8 w-full"
                            />
                        </div>
                    </div> */}

                    {/* Quick Actions */}
                    {/* <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">
                            Quick Actions
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            <Button size="sm">Book Appointment</Button>
                            <Button size="sm" variant="outline">
                                View Medical Records
                            </Button>
                            <Button size="sm" variant="outline">
                                Make a Payment
                            </Button>
                        </div>
                    </div> */}

                    {/* Main Dashboard Content */}
                    <div className="content">
                        {components[activeComponent] || <PDashboard />}
                    </div>
                </div>
            </div>
        </div>
    );
}
