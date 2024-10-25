import React, { useState } from "react";
// import { Link } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Bell, Calendar as CalendarIcon, Clock, User } from "lucide-react";

export default function AppointmentsPage() {
    const [date, setDate] = useState(new Date());

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Appointments
                </h2>
                <Tabs defaultValue="book-new" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8 bg-blue-100 dark:bg-gray-700 rounded-lg p-1">
                        <TabsTrigger
                            value="book-new"
                            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                        >
                            Book New
                        </TabsTrigger>
                        <TabsTrigger
                            value="upcoming"
                            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                        >
                            Upcoming
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                        >
                            History
                        </TabsTrigger>
                        <TabsTrigger
                            value="reminders"
                            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                        >
                            Reminders
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="book-new">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        Select Date and Time
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                        <div className="flex-1">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                className="rounded-md border"
                                            />
                                        </div>
                                        <div className="flex-1 grid grid-cols-2 gap-2">
                                            {Array.from(
                                                { length: 8 },
                                                (_, i) => (
                                                    <Button
                                                        key={i}
                                                        variant="outline"
                                                        className="h-12 hover:bg-blue-50 dark:hover:bg-gray-700"
                                                    >
                                                        {`${9 + i}:00 ${
                                                            i < 3 ? "AM" : "PM"
                                                        }`}
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        Appointment Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="doctor">
                                            Select Doctor
                                        </Label>
                                        <Select>
                                            <SelectTrigger id="doctor">
                                                <SelectValue placeholder="Choose a doctor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dr-smith">
                                                    <div className="flex items-center">
                                                        <Avatar className="h-6 w-6 mr-2">
                                                            <AvatarImage
                                                                src="/placeholder.svg?height=24&width=24"
                                                                alt="Dr. Smith"
                                                            />
                                                            <AvatarFallback>
                                                                DS
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        Dr. Smith (Cardiology)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="dr-johnson">
                                                    <div className="flex items-center">
                                                        <Avatar className="h-6 w-6 mr-2">
                                                            <AvatarImage
                                                                src="/placeholder.svg?height=24&width=24"
                                                                alt="Dr. Johnson"
                                                            />
                                                            <AvatarFallback>
                                                                DJ
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        Dr. Johnson (Neurology)
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reason">
                                            Reason for Visit
                                        </Label>
                                        <Textarea
                                            id="reason"
                                            placeholder="Briefly describe the reason for your visit"
                                            className="min-h-[100px] resize-none"
                                        />
                                        <p className="text-sm text-gray-500">
                                            Maximum 250 characters
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Confirm Appointment</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="upcoming">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 3 }, (_, i) => (
                                <Card
                                    key={i}
                                    className="hover:shadow-lg transition-shadow duration-300"
                                >
                                    <CardHeader className="bg-blue-50 dark:bg-gray-700">
                                        <CardTitle className="flex items-center">
                                            <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                                            {`June ${15 + i}, 2023`}
                                        </CardTitle>
                                        <CardDescription className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                            2:00 PM
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="flex items-center mb-2">
                                            <User className="mr-2 h-4 w-4 text-gray-500" />
                                            <p className="font-semibold">
                                                Dr. Smith
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Cardiology Checkup
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline">
                                            Reschedule
                                        </Button>
                                        <Button variant="destructive">
                                            Cancel
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="history">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Appointment History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
                                    <div className="flex space-x-2">
                                        <Input type="date" className="w-40" />
                                        <Input type="date" className="w-40" />
                                    </div>
                                    <Select>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Filter by Doctor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Doctors
                                            </SelectItem>
                                            <SelectItem value="dr-smith">
                                                Dr. Smith
                                            </SelectItem>
                                            <SelectItem value="dr-johnson">
                                                Dr. Johnson
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Time</TableHead>
                                                <TableHead>Doctor</TableHead>
                                                <TableHead>Reason</TableHead>
                                                <TableHead>Outcome</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {Array.from(
                                                { length: 5 },
                                                (_, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{`May ${
                                                            20 - i
                                                        }, 2023`}</TableCell>
                                                        <TableCell>
                                                            2:00 PM
                                                        </TableCell>
                                                        <TableCell>
                                                            Dr. Smith
                                                        </TableCell>
                                                        <TableCell>
                                                            Cardiology Checkup
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                                Completed
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant="link">
                                                                View Details
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reminders">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center">
                                    <Bell className="mr-2 h-6 w-6 text-blue-500" />
                                    Appointment Reminders
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="email-reminder"
                                            className="flex items-center space-x-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            <span>Email Reminders</span>
                                        </Label>
                                        <Switch id="email-reminder" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="sms-reminder"
                                            className="flex items-center space-x-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            <span>SMS Reminders</span>
                                        </Label>
                                        <Switch id="sms-reminder" />
                                    </div>
                                    <div className="flex  items-center justify-between">
                                        <Label
                                            htmlFor="push-reminder"
                                            className="flex items-center space-x-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-500"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                            </svg>
                                            <span>Push Notifications</span>
                                        </Label>
                                        <Switch id="push-reminder" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reminder-timing">
                                        Reminder Timing
                                    </Label>
                                    <Select>
                                        <SelectTrigger id="reminder-timing">
                                            <SelectValue placeholder="Select timing" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-day">
                                                1 day before
                                            </SelectItem>
                                            <SelectItem value="2-hours">
                                                2 hours before
                                            </SelectItem>
                                            <SelectItem value="1-hour">
                                                1 hour before
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="apply-all"
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <Label htmlFor="apply-all">
                                        Apply to all future appointments
                                    </Label>
                                </div>
                                <Button className="w-full">
                                    Save Reminder Settings
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
