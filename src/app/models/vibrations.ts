export interface VibrationResponse {
    message: string;
    vibrations: Vibration[];
}

export interface Vibration {
    _id: string;
    name: string;
    location: {
        lat: number;
        long: number;
    };
    plantsIds: string[];
    ownerId: string,
    vibrationPath: string
}