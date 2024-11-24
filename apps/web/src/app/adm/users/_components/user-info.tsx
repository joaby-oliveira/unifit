import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { Eye } from "lucide-react";

export function UserInfo(props: { user: User }) {
  const { user } = props;

  const getStatusText = (status: "waiting" | "inactive" | "active") => {
    const displayTexts = {
      waiting: "Aguardando",
      inactive: "Inativo",
      active: "Ativo",
    };

    return displayTexts[status];
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            {user.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">E-mail:</span>
            <span className="text-sm text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">RA:</span>
            <span className="text-sm text-gray-900">{user.ra}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Status:</span>
            <span className="text-sm text-gray-900">
              {getStatusText(user.status)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Telefone:</span>
            <span className="text-sm text-gray-900">
              {formatPhoneNumber(user.cellphoneNumber)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              Criado em:
            </span>
            <span className="text-sm text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              Atualizado em:
            </span>
            <span className="text-sm text-gray-900">
              {new Date(user.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
