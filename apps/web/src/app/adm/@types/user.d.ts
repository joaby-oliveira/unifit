interface User {
    id: number;
    email: string;
    password: string;
    accessLevel: string;
    name: string;
    status: "waiting" | "inactive" | "active";
    ra: string;
    cellphoneNumber: string;
    profilePicture?: string | null;
    role: "USER" | "ADMIN"; // Adicione mais roles conforme necessário
    createdAt: Date;
    updatedAt: Date;
}