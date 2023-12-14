import Rate from "./Models/Rate.js";
import Hotel from "./Models/Hotel.js";
import User from "./Models/User.js";
import Jwt from "jsonwebtoken";

class rateController {
    async getRates(req, res) {
        try {
            const { sortBy, sortOrder, page, limit, id } = req.body;

            const sortObj =
                sortBy && sortOrder
                    ? { [sortBy]: sortOrder === "desc" ? -1 : 1 }
                    : {};

            const skip = (page - 1) * limit;

            const ratesFilter = {
                hotel_id: id,
            };

            const rates = await Rate.find(ratesFilter)
                .sort(sortObj)
                .skip(skip)
                .limit(limit);

            const totalPage = await Rate.countDocuments(ratesFilter);

            const user_id = Jwt.decode(
                req.headers.authorization.split(" ")[1]
            ).id;
            const oldRate = await Rate.findOne({
                user_id: user_id,
                hotel_id: id,
            });
            const reviewed = oldRate !== null;

            return res.json({ rates, totalPage, reviewed });
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async create(req, res) {
        try {
            const { hotel_id, text, stars, username } = req.body;
            const user_id = Jwt.decode(
                req.headers.authorization.split(" ")[1]
            ).id;

            const hotel = await Hotel.findOne({ _id: hotel_id });
            if (hotel == null || !hotel) {
                return res.json({
                    message: "A Hotel with this name does not exists",
                });
            }

            const oldRate = await Rate.findOne({
                user_id: user_id,
                hotel_id: hotel_id,
            });
            if (oldRate || oldRate != null) {
                return res.json({
                    message: "A review already exists",
                });
            }

            const rate = new Rate({
                hotel_id: hotel_id,
                user_id: user_id,
                text: text,
                username: username,
                stars: stars,
            });
            await rate.save();

            const reviews = await Rate.find({ hotel_id: hotel_id });
            let averageStars = 0;

            if (reviews.length > 0) {
                const totalStars = reviews.reduce(
                    (sum, review) => sum + review.stars,
                    0
                );
                averageStars = totalStars / reviews.length;
            }

            await Hotel.findOneAndUpdate(
                { _id: hotel_id },
                {
                    $set: {
                        stars: averageStars,
                        reviews: reviews.length,
                    },
                }
            );

            return res.json({ message: "Review added" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async delete(req, res) {
        try {
            const { hotel_id } = req.body;
            const user_id = Jwt.decode(
                req.headers.authorization.split(" ")[1]
            ).id;

            await Rate.deleteOne({
                hotel_id: hotel_id,
                user_id: user_id,
            });

            const reviews = await Rate.find({ hotel_id: hotel_id });
            let averageStars = 0;

            if (reviews.length > 0) {
                const totalStars = reviews.reduce(
                    (sum, review) => sum + review.stars,
                    0
                );
                averageStars = totalStars / reviews.length;
            }

            await Hotel.findOneAndUpdate(
                { _id: hotel_id },
                {
                    $set: {
                        stars: averageStars,
                        reviews: reviews.length,
                    },
                }
            );

            return res.json({ message: "Review deleted" });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default new rateController();
