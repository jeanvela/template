import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, RefreshCwIcon, UserIcon } from "lucide-react";
import { getQrClient, updateQr } from "@/services/leparis";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../loading/Loading";
import { QR_STATUS } from "@/config/constans";
import { IconId, IconPhone } from "@tabler/icons-react";

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
};

export default function QR() {
  const { qrId } = useParams();
  // En una aplicación real, este estado vendría de una API o base de datos
  const [status, setStatus] = useState<string>("ACTIVE");
  const [loading, setLoading] = useState(true);
  const [qrData2, setQrData2] = useState({});

  // Determinar color y texto según el estado
  const statusConfig = {
    ACTIVE: {
      color: "bg-green-500",
      text: "Activo",
      description: "Listo para usar",
    },
    EXPIRED: {
      color: "bg-red-500",
      text: "Expirado",
      description: "Ya no es válido",
    },
    USED: {
      color: "bg-yellow-500",
      text: "En Uso",
      description: "El QR ya fue usado",
    },
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getQR = async () => {
    setLoading(true);
    const { ok, data } = await getQrClient(qrId);
    console.log(data);

    if (!ok) {
      toast.warning("No pudimos traer el qr");
    }

    if (data.data.status === QR_STATUS.active) {
      await updateQr(QR_STATUS.expired, qrId);
    }

    setStatus(data.data.status);

    setQrData2(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getQR();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="h-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Información de QR</CardTitle>
            <Badge
              className={`${statusConfig[status].color} text-white hover:${statusConfig[status].color}`}
            >
              {statusConfig[status].text}
            </Badge>
          </div>
          <CardDescription>{statusConfig[status].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID</p>
              <p>{qrData2.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Propósito
              </p>
              <p>{qrData.purpose}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Ubicación
            </p>
            <p>{qrData.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Creado
                </p>
                <p className="text-sm">{formatDate(qrData2.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Propietario
              </p>
              <p>{qrData2.firstName} {qrData2.lastName}</p>
            </div>
          </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <IconPhone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Telefono
                </p>
                <p className="text-sm">{qrData2.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
            <IconId className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Nro. Documento
              </p>
              <p>{qrData2.docNum}</p>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
