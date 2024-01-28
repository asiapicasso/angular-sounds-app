export interface PlantResponse {
    message: string;
    plants: Plant[];
}

export interface Plant {
    _id: string;
    name: string;
    ownerId: string;
    // Ajoutez d'autres propriétés si nécessaire
}
