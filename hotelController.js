import Hotel from "./Models/Hotel.js";

class hotelController {
    async getHotels(req, res) {
        try {
            const { sortBy, sortOrder, page, limit, search, city } = req.body;
            const sortObj =
                sortBy && sortOrder
                    ? { [sortBy]: sortOrder === "desc" ? -1 : 1 }
                    : {};

            const skip = (page - 1) * limit;

            const hotelsFilter = {
                city: city,
                $or: [{ name: { $regex: search, $options: "i" } }],
            };

            const hotels = await Hotel.find(hotelsFilter)
                .sort(sortObj)
                .skip(skip)
                .limit(limit);

            const totalPage = await Hotel.countDocuments(hotelsFilter);

            return res.json({ hotels, totalPage });
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async getHotel(req, res) {
        try {
            const { id } = req.body;

            const hotel = await Hotel.findOne({ _id: id });

            if (!hotel)
                return res.status(400).json({
                    message: "A Hotel does not exists",
                });

            return res.json(hotel);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new hotelController();
