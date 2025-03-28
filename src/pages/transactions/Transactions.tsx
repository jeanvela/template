import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ClockIcon, RefreshCwIcon, UserIcon } from "lucide-react"

// Ejemplo de datos de QR
const qrData = {
  id: "QR-2023-0042",
  createdAt: "2023-10-15T14:30:00Z",
  expiresAt: "2024-10-15T14:30:00Z",
  purpose: "Acceso a evento",
  location: "Sala de Conferencias A",
  owner: "María González",
  scans: 3,
  lastScan: "2024-03-27T09:15:00Z",
}

export default function Transactions() {
  // En una aplicación real, este estado vendría de una API o base de datos
  const [status, setStatus] = useState<"active" | "in-use" | "expired">("active")

  // Función para cambiar el estado (solo para demostración)
  const cycleStatus = () => {
    if (status === "active") setStatus("in-use")
    else if (status === "in-use") setStatus("expired")
    else setStatus("active")
  }

  // Determinar color y texto según el estado
  const statusConfig = {
    active: { color: "bg-green-500", text: "Activo", description: "Listo para usar" },
    "in-use": { color: "bg-yellow-500", text: "En Uso", description: "Actualmente en uso" },
    expired: { color: "bg-red-500", text: "Expirado", description: "Ya no es válido" },
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  return (
    <>
   <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Información de QR</CardTitle>
          <Badge className={`${statusConfig[status].color} text-white hover:${statusConfig[status].color}`}>
            {statusConfig[status].text}
          </Badge>
        </div>
        <CardDescription>{statusConfig[status].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="qr">Código QR</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ID</p>
                <p>{qrData.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Propósito</p>
                <p>{qrData.purpose}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
              <p>{qrData.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Creado</p>
                  <p className="text-sm">{formatDate(qrData.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expira</p>
                  <p className="text-sm">{formatDate(qrData.expiresAt)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Propietario</p>
                <p>{qrData.owner}</p>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium">Estadísticas de uso</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total de escaneos</p>
                  <p className="text-xl font-bold">{qrData.scans}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Último escaneo</p>
                  <p className="text-sm">{formatDate(qrData.lastScan)}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="qr" className="flex justify-center py-6">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Código QR"
                className="border-2 border-gray-200 rounded-lg"
                width={200}
                height={200}
              />
              <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${statusConfig[status].color}`}></div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Descargar QR</Button>
        {/* Este botón es solo para demostración, para cambiar entre estados */}
        <Button onClick={cycleStatus} variant="secondary" size="icon">
          <RefreshCwIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
    </>
  )
}