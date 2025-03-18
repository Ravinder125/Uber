const captainModel = require('../models/captain.model');

module.exports.createCaptain = async (
    fullname, email, password, phone, status, vehicle, location
) => {
    try {
        if (
            !fullname?.firstname ||
            !fullname?.lastname ||
            !password ||
            !email ||
            !phone ||
            !vehicle?.color ||
            !vehicle.capacity ||
            !vehicle.plate ||
            !vehicle.type ||
            !status
        ) throw new Error('All fields are required');

        const newCaptain = await captainModel.create({
            fullName: {
                firstName: fullname.firstname,
                middleName: fullname.middlename || "",
                lastName: fullname.lastname,
            },
            email,
            password,
            phone,
            status,
            vehicle: {
                color: vehicle.color,
                capacity: vehicle.capacity,
                plate: vehicle.plate,
                vehicleType: vehicle.type
            },
            location: {
                lat: location?.latitude || null,
                lng: location?.longitude || null
            }
        });

        return newCaptain;
    } catch (error) {
        throw error;
    }
};