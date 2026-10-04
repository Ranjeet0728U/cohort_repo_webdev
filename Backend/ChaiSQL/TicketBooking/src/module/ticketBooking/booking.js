import db from '../../db/index.js';
import { eq, and } from 'drizzle-orm';
import { seat } from '../../db/schema.js';
import ApiError from '../../common/utils/apiError.js';
import apiResponse from '../../common/utils/api-respons.js';

const booking = async (req, res) => {
    const { name, seatNumber } = req.body;
    const customerId = req.user.id;

    try {
        await db.transaction(async (tx) => {

            const seats = await tx
                .select()
                .from(seat)
                .where(
                    and(
                        eq(seat.seatNumber, seatNumber),
                        eq(seat.isBooked, false)
                    )
                )
                .for('update');

            if (seats.length === 0) {
                throw ApiError.isBooked('Seat is not available');
            }

            const selectedSeat = seats[0];

            await tx
                .update(seat)
                .set({
                    customerId,
                    name,
                    isBooked: true
                })
                .where(eq(seat.id, selectedSeat.id));
        });

        return apiResponse.ok(
            res,
            'Seat is booked successfully'
        );

    } catch (err) {
        console.error(err);

        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        });
    }
};

export default booking;