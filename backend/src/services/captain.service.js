const captainModel = require('../models/captain.model');

module.exports.createCaptain = async (fullname, email, password, telCode, tel, status, vehicle, location) => {
    try {
        console.log(fullname, email, password, telCode, tel, status, vehicle, location)
        // Validate required fields
        if (!fullname || !fullname.firstname || !fullname.lastname ||
            !email ||
            !password ||
            !telCode ||
            !tel ||
            !vehicle || !vehicle.color || !vehicle.plate) {
            throw new Error('All required fields must be provided');
        }

        // Create captain with validated data
        const newCaptain = await captainModel.create({
            fullName: {
                firstName: fullname.firstname,
                middleName: fullname.middlename || '',
                lastName: fullname.lastname,
            },
            email,
            password,
            telCode,
            tel,
            status: status,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity || 4,
                vehicleType: vehicle.type || 'car'
            },
            location: {
                lat: location && location.latitude || null,
                lng: location && location.longitude || null
            }
        })
        // Remove password from response
        newCaptain.password = undefined;
        return newCaptain;

    } catch (error) {
        throw error;
    }
};