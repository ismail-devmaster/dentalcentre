'use client'

import React, { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Bell, Calendar, MessageSquare, Users, Clock, Search, ChevronRight, Plus, X, Edit, Send, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EnhancedReceptionistDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [isSchedulingAppointment, setIsSchedulingAppointment] = useState(false)
  const [queueStats, setQueueStats] = useState({
    totalPatients: 0,
    averageWaitTime: 0,
    occupiedRooms: 0,
    availableRooms: 0,
  })
  const [patientQueue, setPatientQueue] = useState([])
  const [doctorStatuses, setDoctorStatuses] = useState([])

  const patients = [
    { id: 1, name: "John Doe", dob: "01/15/1980", contact: "123-456-7890", insurance: "Blue Cross", medicalHistory: "Allergies: Penicillin" },
    { id: 2, name: "Jane Smith", dob: "05/22/1992", contact: "098-765-4321", insurance: "Aetna", medicalHistory: "Previous surgeries: Appendectomy" },
  ]

  const appointments = [
    { id: 1, patientName: "John Doe", doctorName: "Dr. Smith", date: "2023-06-15", time: "14:00", type: "Consultation" },
    { id: 2, patientName: "Jane Smith", doctorName: "Dr. Johnson", date: "2023-06-16", time: "10:00", type: "Follow-up" },
  ]

  const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "General Practitioner", status: "Available" },
    { id: 2, name: "Dr. Johnson", specialty: "Cardiologist", status: "On Break" },
  ]

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setQueueStats(prevStats => ({
        ...prevStats,
        totalPatients: Math.floor(Math.random() * 20) + 10,
        averageWaitTime: Math.floor(Math.random() * 30) + 15,
        occupiedRooms: Math.floor(Math.random() * 8) + 2,
        availableRooms: Math.floor(Math.random() * 5) + 1,
      }))

      setPatientQueue(prevQueue => {
        const newQueue = [...prevQueue]
        if (Math.random() > 0.7) {
          newQueue.push({
            id: Date.now(),
            name: `Patient ${Math.floor(Math.random() * 100)}`,
            waitTime: Math.floor(Math.random() * 30) + 5,
            priority: Math.random() > 0.8 ? 'High' : 'Normal',
          })
        }
        return newQueue.slice(0, 10) // Keep only top 10 for simplicity
      })

      setDoctorStatuses(prevStatuses => {
        return doctors.map(doctor => ({
          ...doctor,
          status: Math.random() > 0.7 ? 'Available' : 'Busy',
          currentPatients: Math.floor(Math.random() * 3),
        }))
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const addToQueue = (patient) => {
    setPatientQueue(prevQueue => [...prevQueue, {
      id: Date.now(),
      name: patient.name,
      waitTime: 0,
      priority: 'Normal',
    }])
  }

  const removeFromQueue = (patientId) => {
    setPatientQueue(prevQueue => prevQueue.filter(p => p.id !== patientId))
  }

  const updatePriority = (patientId, priority) => {
    setPatientQueue(prevQueue => prevQueue.map(p => 
      p.id === patientId ? { ...p, priority } : p
    ))
  }

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-7 gap-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="queue">Queue</TabsTrigger>
        <TabsTrigger value="patients">Patients</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
        <TabsTrigger value="doctors">Doctors</TabsTrigger>
        <TabsTrigger value="lobby">Lobby</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients in Queue</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{queueStats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">+2 from last hour</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{queueStats.averageWaitTime} min</div>
              <p className="text-xs text-muted-foreground">-3 min from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{queueStats.occupiedRooms}/10</div>
              <p className="text-xs text-muted-foreground">80% occupancy</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{queueStats.availableRooms}</div>
              <p className="text-xs text-muted-foreground">2 cleaning in progress</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              {/* Placeholder for a chart */}
              <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                Peak Hours Chart Placeholder
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="queue" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Patient Queue Management</CardTitle>
            <CardDescription>Manage the current patient queue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <Input placeholder="Search queue..." className="w-1/3" />
              <Button onClick={() => setIsAddingPatient(true)}>Add to Queue</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Wait Time</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientQueue.map((patient, index) => (
                  <TableRow key={patient.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.waitTime} min</TableCell>
                    <TableCell>
                      <Select
                        value={patient.priority}
                        onValueChange={(value) => updatePriority(patient.id, value)}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => removeFromQueue(patient.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="patients" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Patient Management</CardTitle>
            <CardDescription>View and manage patient information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-2"
              />
              <Button onClick={() => setIsAddingPatient(true)}>Add New Patient</Button>
            </div>
            <ScrollArea className="h-[400px]">
              <ul className="space-y-4">
                {patients.map((patient) => (
                  <li key={patient.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-2">
                        <AvatarImage src={`/avatars/0${patient.id}.png`} alt="Patient" />
                        <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">DOB: {patient.dob}</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => setSelectedPatient(patient)}>
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addToQueue(patient)}>
                        Add to Queue
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Dialog open={selectedPatient !== null} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Patient Profile</DialogTitle>
              <DialogDescription>View and edit patient information</DialogDescription>
            </DialogHeader>
            {selectedPatient && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value={selectedPatient.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dob" className="text-right">
                    Date of Birth
                  </Label>
                  <Input id="dob" value={selectedPatient.dob} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact
                  </Label>
                  <Input id="contact" value={selectedPatient.contact} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="insurance" className="text-right">
                    Insurance
                  </Label>
                  <Input id="insurance" value={selectedPatient.insurance} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medical-history" className="text-right">
                    Medical History
                  </Label>
                  <Textarea id="medical-history" value={selectedPatient.medicalHistory} className="col-span-3" />
                </div>
              </div>
            
            )}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the details of the new patient</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-name" className="text-right">
                  Name
                </Label>
                <Input id="new-name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-dob" className="text-right">
                  Date of Birth
                </Label>
                <Input id="new-dob" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-contact" className="text-right">
                  Contact
                </Label>
                <Input id="new-contact" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-insurance" className="text-right">
                  Insurance
                </Label>
                <Input id="new-insurance" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-medical-history" className="text-right">
                  Medical History
                </Label>
                <Textarea id="new-medical-history" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

      <TabsContent value="appointments" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Management</CardTitle>
            <CardDescription>Schedule and manage appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <Input placeholder="Search appointments..." className="w-1/3" />
              <Button onClick={() => setIsSchedulingAppointment(true)}>Schedule New Appointment</Button>
            </div>
            <ScrollArea className="h-[400px]">
              <ul className="space-y-4">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{appointment.patientName} - {appointment.doctorName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.date}, {appointment.time} - {appointment.type}</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">
                        Reschedule
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Dialog open={isSchedulingAppointment} onOpenChange={setIsSchedulingAppointment}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Enter the details for the new appointment</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  Patient
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>{patient.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Doctor
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>{doctor.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="procedure">Procedure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Schedule Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

      <TabsContent value="doctors" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Doctor Availability Dashboard</CardTitle>
            <CardDescription>Real-time doctor status and patient load</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <ul className="space-y-4">
                {doctorStatuses.map((doctor) => (
                  <li key={doctor.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-2">
                        <AvatarImage src={`/avatars/0${doctor.id}.png`} alt="Doctor" />
                        <AvatarFallback>{doctor.name.split(' ')[1][0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={doctor.status === "Available" ? "default" : "secondary"} className="mr-2">
                        {doctor.status}
                      </Badge>
                      <p className="text-sm mr-4">Current patients: {doctor.currentPatients}</p>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Optimize Doctor Schedules</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="lobby" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Lobby Management</CardTitle>
            <CardDescription>Track patient flow and queue status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Current Queue</h3>
                <p className="text-sm text-muted-foreground">{queueStats.totalPatients} patients waiting</p>
              </div>
              <Button>Update Queue</Button>
            </div>
            <ScrollArea className="h-[400px]">
              <ul className="space-y-4">
                {patientQueue.map((patient, index) => (
                  <li key={patient.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">Priority: {patient.priority}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Position: {index + 1}</p>
                      <p className="text-sm text-muted-foreground">Waiting time: {patient.waitTime} min</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-2">
              <Progress value={33} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Average wait time: {queueStats.averageWaitTime} minutes</span>
                <span>Patients seen today: {Math.floor(Math.random() * 50) + 20}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="messages" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Communication Center</CardTitle>
            <CardDescription>Manage messages with patients and doctors</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-2">
                      <AvatarImage src="/avatars/01.png" alt="Patient" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Appointment inquiry</p>
                    </div>
                  </div>
                  <Badge>New</Badge>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9 mr-2">
                      <AvatarImage src="/avatars/03.png" alt="Doctor" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Smith</p>
                      <p className="text-sm text-muted-foreground">Schedule update</p>
                    </div>
                  </div>
                  <Badge variant="outline">Read</Badge>
                </li>
              </ul>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Input placeholder="Type your message..." className="flex-grow" />
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}