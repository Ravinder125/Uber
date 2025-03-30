const captainModel = require('../models/captain.model');

module.exports.createCaptain = async (fullname, email, password, telCode, tel, status, vehicle, location) => {
    try {
        // Validate required fields
        if (!fullname || !fullname?.firstname || !fullname?.lastname ||
            !email ||
            !password ||
            !telCode ||
            !tel ||
            !vehicle || !vehicle?.color || !vehicle?.plate) {
            throw new Error('All required fields must be provided');
        }

        // Create captain with validated data
        const newCaptain = await captainModel.create({
            fullName: {
                firstName: fullname?.firstname,
                middleName: fullname?.middlename || '',
                lastName: fullname?.lastname,
            },
            email,
            password,
            telCode,
            tel,
            status: status || 'inactive',
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity || 4,
                vehicleType: vehicle.type || 'car'
            },
            location: {
                lat: location?.latitude || null,
                lng: location?.longitude || null
            }
        })

        // Remove password from response
        newCaptain.password = undefined;
        return newCaptain;

    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key errors
            const field = Object.keys(error.keyPattern)[0];
            throw new Error(`${field} already exists`);
        }
        throw error;
    }
};